"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_handle_1 = require("./helpers/error_handle");
// import cors from 'cors';
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
const api = 'localhost/api/v1';
app.use(express_1.default.json());
app.use(error_handle_1.errorHandle);
app.use(`${api}/product`, products_1.default);
app.use(`${api}/user`, users_1.default);
mongoose_1.default.connect("mongodb://root:example@localhost:27017/?authMechanism=DEFAULT", {
    //useNewUrIParser: true,
    //useUnifiedTopology: true,
    dbName: 'MERN_SHOP',
})
    .then(() => {
    console.log("Database connection is ready...");
})
    .catch((err) => {
    console.log(err);
});
app.listen(3000, () => {
    console.log(`The server was running in port ${3000}`);
});
