"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database = __importStar(require("./config/database"));
const index_router_1 = __importDefault(require("./routes/client/index.router"));
const index_router_2 = __importDefault(require("./routes/admin/index.router"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const express_flash_1 = __importDefault(require("express-flash"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
database.connect();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server);
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)('_method'));
app.use((0, cookie_parser_1.default)("vadasd"));
app.use((0, express_session_1.default)({ cookie: { maxAge: 6000 } }));
app.use((0, express_flash_1.default)());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express_1.default.static(`${__dirname}/public`));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/tinymce', express_1.default.static(path_1.default.join(__dirname, 'node_modules', 'tinymce')));
app.use((req, res, next) => {
    res["io"] = io;
    next();
});
(0, index_router_1.default)(app);
(0, index_router_2.default)(app);
app.get("*", (req, res) => {
    res.send("bug");
});
server.listen(port, () => {
    console.log("App run on port: " + process.env.PORT);
});
