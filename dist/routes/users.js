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
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersRouter = express_1.default.Router();
usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userList = yield user_1.User.find().select('name phone');
    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(userList);
}));
usersRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('The user not found');
    }
    if (user && bcrypt_1.default.compareSync(req.body.password, user.password)) {
        const secret = "Randy";
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
            isAdmin: user.isAdmin,
        }, secret, { expiresIn: '1d' });
        res.status(200).send({ user: user.email, token });
    }
    else {
        res.status(400).send('Invalid password');
    }
}));
usersRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt_1.default.hashSync(req.body.password, "012345678910111213"),
        phone: req.body.isAdmin,
        street: req.body.street,
        apartament: req.body.apartament,
        zip: req.body.zip,
        city: req.body.city,
    });
    const addUser = yield user.save();
    if (!addUser) {
        return res.status(400).send('The user cannot be created!');
    }
    res.status(201).send(addUser);
}));
exports.default = usersRouter;
