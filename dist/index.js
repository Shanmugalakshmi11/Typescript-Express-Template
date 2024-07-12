"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database/setup/database"));
const server_1 = __importDefault(require("./server"));
// Zugriff auf Umgebungsvariablen
// const { PORT } = process.env;
const PORT = process.env.PORT;
database_1.default
    .sync()
    .then(() => {
    console.log("DB has been successfully initialized");
})
    .catch((e) => {
    console.log(e);
});
// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
server_1.default.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
