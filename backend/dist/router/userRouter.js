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
const image_downloader_1 = __importDefault(require("image-downloader"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../db/userModel"));
const middleware_1 = __importDefault(require("../middleware"));
const path_1 = __importDefault(require("path"));
const placeModel_1 = __importDefault(require("../db/placeModel"));
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
        console.log("hahs");
        if (userExists) {
            return res.json(409).json({ message: "user already exist. Please sign-in" });
        }
        const salt = yield bcrypt_1.default.genSalt(8);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({ name, email, password: hashedPassword });
        res.status(200).json({ message: "User created successfully", user });
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
        return res.status(200).json({ existingUser });
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/profile', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("ehy");
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        //@ts-ignore
        const user = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
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
router.post('/logout', (req, res) => {
    res.clearCookie('token').json(true);
    res.status(200).json({ message: "Logged out successfully" });
});
router.post('/uploadByLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link } = req.body;
        const imageName = "image" + Date.now() + '.jpg';
        const dest = path_1.default.join(__dirname, 'uploads', imageName);
        const options = yield image_downloader_1.default.image({
            url: link,
            dest: dest
        });
        res.status(200).json(imageName);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "oo" });
    }
}));
const dest = path_1.default.join(__dirname, 'uploads');
const photoMiddleware = (0, multer_1.default)({ dest: dest });
router.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
    const files = req.files;
    const uploadFiles = [];
    if (!files || !Array.isArray(files)) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    for (let i = 0; i < (files === null || files === void 0 ? void 0 : files.length); i++) {
        const { path, originalname } = files[i];
        console.log(files);
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;
        fs_1.default.renameSync(path, newPath);
        uploadFiles.push(newPath.replace('uploads/', ''));
        console.log(uploadFiles);
    }
    return res.status(200).json(uploadFiles);
});
router.post('/places', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, address, description, perks, addedPhotos, extraInfo, maxGuest, checkIn, checkOut } = req.body;
        console.log(req.body);
        //@ts-ignore
        const user = yield userModel_1.default.findById(req.user.id);
        const userId = user === null || user === void 0 ? void 0 : user._id;
        const username = user === null || user === void 0 ? void 0 : user.name;
        const newPlace = yield placeModel_1.default.create({
            owner: userId,
            ownerName: username || "John",
            title, address, description, perks, addedPhotos, extraInfo, maxGuest, checkIn, checkOut
        });
        res.status(200).json(newPlace);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/places', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    //@ts-ignore
    const user = yield userModel_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
    const userId = user === null || user === void 0 ? void 0 : user._id;
    const getPlaces = yield placeModel_1.default.find({ owner: userId });
    console.log(getPlaces);
    res.json(getPlaces);
}));
exports.default = router;
