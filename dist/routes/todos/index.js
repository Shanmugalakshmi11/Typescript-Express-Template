"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const TodoModel_1 = __importDefault(require("../../database/models/TodoModel"));
const TodosRouter = (0, express_1.Router)();
// GET REQUESTS
// /v1/todos/bytodoid
TodosRouter.get("/byid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = parseInt(req.query.todoId);
    if (!todoId) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(http_status_codes_1.ReasonPhrases.BAD_REQUEST);
        return;
    }
    const todo = yield TodoModel_1.default.findOne({ where: { id: todoId } });
    res.status(http_status_codes_1.StatusCodes.OK).json({ todo });
}));
// Alle Todos von einer UserId
TodosRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield TodoModel_1.default.findAll();
    res.status(http_status_codes_1.StatusCodes.OK).send(todos);
}));
// PUT REQUESTS
TodosRouter.put("/mark", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId, newIsDone } = req.body;
        if (!todoId)
            throw Error("keine User Id");
        yield TodoModel_1.default.update({ isDone: newIsDone }, { where: { id: todoId } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ updatedTodoId: todoId });
    }
    catch (e) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(e);
    }
}));
TodosRouter.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId, newTask, newIsDone, newDueDate } = req.body;
    yield TodoModel_1.default.update({
        task: newTask,
        isDone: newIsDone,
        dueDate: newDueDate,
    }, { where: { id: todoId } });
    res.status(http_status_codes_1.StatusCodes.OK).json({ updatedTodoId: todoId });
}));
// POST REQUESTS
TodosRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newTask, newIsDone, newDueDate, newUserId } = req.body;
    console.log("Here we are", newTask, newIsDone, newDueDate, newUserId);
    if (!newTask || !newDueDate || !newUserId) {
        throw ReferenceError("One of my required Parameters is not defined");
    }
    const newTodo = {
        task: newTask,
        isDone: newIsDone,
        dueDate: new Date(newDueDate),
        userId: newUserId,
    };
    const todo = yield TodoModel_1.default.create(newTodo);
    res.status(http_status_codes_1.StatusCodes.OK).json({ todo: todo });
}));
// DELETE REQUEST
TodosRouter.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoId } = req.body; //req.body.todoId
    yield TodoModel_1.default.destroy({ where: { id: todoId } });
    res.status(http_status_codes_1.StatusCodes.OK).json({ deletedTodosId: todoId });
}));
exports.default = TodosRouter;
