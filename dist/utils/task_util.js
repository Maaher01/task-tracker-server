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
exports.deleteTask = exports.editTask = exports.createTask = exports.getUserTasks = exports.getTaskById = void 0;
const db_1 = require("../config/db");
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("SELECT * FROM tasks WHERE id=$1;", [id]);
    if (rows) {
        return rows[0];
    }
    return null;
});
exports.getTaskById = getTaskById;
const getUserTasks = (userid) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("SELECT id, title, content, status, createdat, updatedat FROM tasks WHERE userid=$1;", [userid]);
    if (rows) {
        return rows;
    }
    return null;
});
exports.getUserTasks = getUserTasks;
const createTask = (title, content, status, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("INSERT INTO tasks (title, content, status, userid) VALUES ($1, $2, $3, $4);", [title, content, status, userid]);
    if (rows) {
        return rows[0];
    }
    return null;
});
exports.createTask = createTask;
const editTask = (title, content, status, taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("UPDATE tasks SET title=$1, content=$2, status=$3 WHERE id=$4 returning *;", [title, content, status, taskId]);
    if (rows) {
        return rows[0];
    }
    return null;
});
exports.editTask = editTask;
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("DELETE FROM tasks WHERE id=$1 returning id;", [id]);
    if (rows) {
        return rows[0];
    }
    return null;
});
exports.deleteTask = deleteTask;
