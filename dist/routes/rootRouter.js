"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _sendFcmMessage = require("../controller/sendFcmMessage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var rootRouter = exports.rootRouter = _express["default"].Router();
rootRouter.post("/fcm/send", _sendFcmMessage.sendFcmMessage);