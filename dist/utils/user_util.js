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
exports.updateUserPassword = exports.createUser = exports.getUser = void 0;
const db_1 = require("../config/db");
const getUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("SELECT * FROM users WHERE email=$1;", [
        email,
    ]);
    if (rows) {
        return rows[0];
    }
    return null;
});
exports.getUser = getUser;
const createUser = (firstname, lastname, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;", [firstname, lastname, email, password]);
    if (rows) {
        return rows[0];
    }
    return null;
});
exports.createUser = createUser;
const updateUserPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.client.query("UPDATE users SET password=$1 WHERE email=$2 RETURNING *;", [newPassword, email]);
    if (rows) {
        return rows[0];
    }
    return null;
});
exports.updateUserPassword = updateUserPassword;
