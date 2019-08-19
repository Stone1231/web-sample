"use strict";
/* app/server.ts */
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
var express = require("express");
// Import WecomeController from controllers entry point
var controllers_1 = require("./controllers");
var cors = require("cors");
// Create a new express application instance
var app = express();
// The port the express app will listen on
var port = process.env.PORT || 8080;
// Mount the WelcomeController at the /welcome route
app.use(cors());
app.use('/test', controllers_1.TestController);
app.use('/task', controllers_1.TaskController);
//app.options('*',cors());
// Serve the application at the given port
app.listen(port, function () {
    // Success callback
    console.log("Listening at http://localhost:" + port + "/");
});
//# sourceMappingURL=server.js.map