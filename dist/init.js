"use strict";

var _server = require("./server");
var onRunning = function onRunning() {
  console.log("onRunning");
};
_server.app.listen(8000, onRunning);