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
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDelete = exports.addTask = exports.taskEdit = exports.displayUserTasks = void 0;
const task_util_1 = require("../utils/task_util");
const displayUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.body;
    try {
        const userTasks = (yield (0, task_util_1.getUserTasks)(userid));
        if (!userTasks) {
            return res.status(404).json({
                status: "failed",
                message: "User does not exist",
            });
        }
        return res.status(200).json({
            status: "Success",
            data: userTasks,
        });
    }
    catch (_a) {
        return res.status(500).json({
            status: "failed",
            error: "Unexpected error occured.",
        });
    }
});
exports.displayUserTasks = displayUserTasks;
const taskEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, status } = req.body;
    const { id } = req.params;
    try {
        const response = (yield (0, task_util_1.editTask)(title, content, status, id));
        if (!response) {
            return res.status(404).json({
                status: "failed",
                error: "Task not found",
            });
        }
        return res.status(200).json({
            status: "Success",
            data: Object.assign({}, response),
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            error: error.message,
        });
    }
});
exports.taskEdit = taskEdit;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, status, userid } = req.body;
    try {
        const task = (yield (0, task_util_1.createTask)(title, content, status, userid));
        return res.status(200).json({
            status: "Success",
            data: Object.assign({}, task),
        });
    }
    catch (error) {
        res.status(500).json({
            ststus: "failed",
            error: error.message,
        });
    }
});
exports.addTask = addTask;
const taskDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        (yield (0, task_util_1.getTaskById)(id));
        const response = (yield (0, task_util_1.deleteTask)(id));
        if (!response) {
            return res.status(404).json({
                status: "failed",
                error: "Task does not exist",
            });
        }
        return res.status(200).json({
            status: "Success",
            data: { id: response.id },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            error: error.message,
        });
    }
});
exports.taskDelete = taskDelete;
