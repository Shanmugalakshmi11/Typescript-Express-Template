"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;
// Connect to MySQL using Sequelize
const todoSequelize = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
});
exports.default = todoSequelize;
