"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
// Initialisierung von expres
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Use for development
app.use((0, cors_1.default)());
app.use("/v1", routes_1.default);
exports.default = app;
