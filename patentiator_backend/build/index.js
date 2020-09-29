"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const PORT = 3000;
const app = express_1.default();
app.use(express_1.default.json());
app.get('/ping', (_reg, res) => {
    res.send('pong');
});
http_1.default.createServer(app).listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
