"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dotenv = require("dotenv");
var _rootRouter = require("./routes/rootRouter");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = exports.app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: "*"
}));
app.use(_bodyParser["default"].json());
(0, _dotenv.configDotenv)();
app.use("/api", _rootRouter.rootRouter);