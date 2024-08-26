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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../db/userModel"));
const middleware_1 = __importDefault(require("../middleware"));
const router = express_1.default.Router();
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!(email || password)) {
        return res.status(400).json({ message: "Please provide the required data" });
    }
    try {
        const userExists = yield userModel_1.default.findOne({ email });
        if (userExists) {
            return res.json(409).json({ message: "user already exist. Please sign-in" });
        }
        const salt = yield bcrypt_1.default.genSalt(8);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({ name, email, password: hashedPassword });
        res.status(200).json({ message: "User created succesfully", user });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email || password)) {
        return res.status(500).json({ message: "Please provide username and password" });
    }
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Email does not exist" });
        }
        const matchPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(500).json({ message: "Incorrect username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ email, id: existingUser._id.toString() }, jwtSecret);
        res.cookie("token", token);
        res.status(200).json({ messsage: "Logged in succesfully", token });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/profile', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ehy");
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        //@ts-ignore
        const user = yield userModel_1.default.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get('/logout', (req, res) => {
    res.clearCookie('token').json(true);
    res.status(200).json({ message: "Logged out succesfully" });
});
exports.default = router;
