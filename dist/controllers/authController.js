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
exports.forgotPassword = exports.login = exports.signup = void 0;
const password_util_1 = require("../utils/password_util");
const user_util_1 = require("../utils/user_util");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password } = req.body;
    try {
        let user = yield (0, user_util_1.getUser)(email);
        if (user) {
            return res.status(403).json({
                status: "Failed",
                error: "Email is already in use",
            });
        }
        const hashedPassword = yield (0, password_util_1.hashPassword)(password);
        user = yield (0, user_util_1.createUser)(firstname, lastname, email, hashedPassword);
        const UserResponse = {
            id: user === null || user === void 0 ? void 0 : user.id,
            firstname: user === null || user === void 0 ? void 0 : user.firstname,
            lastname: user === null || user === void 0 ? void 0 : user.lastname,
            email: user === null || user === void 0 ? void 0 : user.email,
            password: user === null || user === void 0 ? void 0 : user.password,
            createdat: user === null || user === void 0 ? void 0 : user.createdat,
            updatedat: user === null || user === void 0 ? void 0 : user.updatedat,
        };
        return res.status(200).json({
            status: "Success",
            data: { user: UserResponse },
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            error: err.message,
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield (0, user_util_1.getUser)(email);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                error: "User does not exist",
            });
        }
        const compareResult = yield (0, password_util_1.comparePassword)(password, user.password);
        if (!compareResult) {
            return res.status(404).json({
                status: "failed",
                error: "Incorrect password",
            });
        }
        const userResponse = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
        };
        return res.status(200).json({
            status: "Success",
            data: { user: userResponse },
        });
    }
    catch (err) {
        res.status(500).json({
            status: "failed",
            error: err.message,
        });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    try {
        let user = yield (0, user_util_1.getUser)(email);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                error: "No user found with this email",
            });
        }
        const hashedPassword = yield (0, password_util_1.hashPassword)(newPassword);
        yield (0, user_util_1.updateUserPassword)(user.email, hashedPassword);
        const userResponse = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        };
        return res.status(200).json({
            status: "Success",
            error: { user: userResponse },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "failed",
            error: "Failed to change password please try again later",
        });
    }
});
exports.forgotPassword = forgotPassword;
