import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import UserModel from "../../database/models/UserModel";
import { IMarkTodoBody } from "../../interfaces/routes/todos/TodoRequestTypes";

const UserRouter = Router();

// GET REQUESTS
// /v1/todos/bytodoid
UserRouter.get("/byid", async (req, res) => {
  const todoId = parseInt(req.query.todoId as string);

  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const todo = await UserModel.findOne({ where: { id: todoId } });

  res.status(StatusCodes.OK).json({ todo });
});

// Alle Todos von einer UserId

UserRouter.get("/all", async (req, res) => {
  const todos = await UserModel.findAll();
  res.status(StatusCodes.OK).send(todos);
});

// DELETE REQUEST
UserRouter.delete("/delete", async (req, res) => {
  const { todoId } = req.body as IMarkTodoBody; //req.body.todoId

  await UserModel.destroy({ where: { id: todoId } });

  res.status(StatusCodes.OK).json({ deletedTodosId: todoId });
});

export default UserRouter;
