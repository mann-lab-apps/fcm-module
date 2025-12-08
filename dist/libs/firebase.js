"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firebaseMessaging = void 0;
var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));
var _config = require("../config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_firebaseAdmin["default"].initializeApp({
  credential: _firebaseAdmin["default"].credential.cert({
    type: "service_account",
    project_id: _config.FIREBASE_PROJECT_ID,
    private_key: _config.FIREBASE_PRIVATE_KEY === null || _config.FIREBASE_PRIVATE_KEY === void 0 ? void 0 : _config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: _config.FIREBASE_CLIENT_EMAIL
  })
});
var firebaseMessaging = exports.firebaseMessaging = _firebaseAdmin["default"].messaging();