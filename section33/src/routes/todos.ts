import { Router } from "express";
import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };
let todos: Todo[] = [];

const router = Router();

router.get("/", (_req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);

  res.status(201).json({ message: "Added Todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
    // router.put은 return값을 void로 생각하고 있기 때문에 return res.status를 하였을 시 타입스크립트에서 오류를 발생시킨다
    // 그렇기 때문에 router.put 안에서 return을 쓰는것은 조심해야한다
    // return res.status(200).json({ message: "Updated todo", todos: todos });
    // return res...와 같이 res...를 반환하지말고 밑에 return을 사용하면 원하는 동작이 가능해진다
    res.status(200).json({ message: "Updated todo", todos: todos });
    return;
  }
  res.status(404).json({ message: "Could not find todo for this id" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
  res.status(200).json({ message: "Deleted todo", todos: todos });
});
export default router;
