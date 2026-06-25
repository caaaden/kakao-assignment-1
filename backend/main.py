import os
from pathlib import Path
from typing import List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from sqlalchemy import Boolean, Column, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker


# 로컬 개발 환경에서는 backend/.env.local 값을 환경변수로 불러옵니다.
def load_local_env():
    env_path = Path(__file__).with_name(".env.local")

    if not env_path.exists():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue

        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


load_local_env()

DATABASE_URL = os.environ["DATABASE_URL"]
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.environ["FRONTEND_ORIGINS"].split(",")
    if origin.strip()
]

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# DB 모델: 실제 todos 테이블의 컬럼 구조를 정의합니다.
class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False, nullable=False)


# 요청 스키마: Todo 생성 시 클라이언트가 보내는 데이터입니다.
class TodoCreate(BaseModel):
    title: str
    completed: bool = False


# 요청 스키마: Todo 수정 시 클라이언트가 보내는 데이터입니다.
class TodoUpdate(BaseModel):
    title: str
    completed: bool


# 응답 스키마: API가 클라이언트에게 반환하는 Todo 데이터입니다.
class TodoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    completed: bool


# 앱 시작 전에 테이블이 없으면 자동으로 생성합니다.
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")

# Next.js 프론트엔드에서 API를 호출할 수 있도록 CORS를 허용합니다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 요청마다 DB 세션을 만들고, 응답 후에는 반드시 닫습니다.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/todos", response_model=List[TodoResponse])
def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).order_by(Todo.id.desc()).all()


@app.post("/todos", response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    new_todo = Todo(title=todo.title, completed=todo.completed)

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db)):
    target_todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if target_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    target_todo.title = todo.title
    target_todo.completed = todo.completed

    db.commit()
    db.refresh(target_todo)

    return target_todo


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    target_todo = db.query(Todo).filter(Todo.id == todo_id).first()

    if target_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(target_todo)
    db.commit()

    return {"message": "Todo deleted"}
