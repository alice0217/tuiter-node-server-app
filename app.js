import express from 'express';
// const express = require('express'); // same as import express library
import cors from "cors"
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./tuits/tuits-controller.js";
import session from "express-session"; // import new server session library
import AuthController from "./users/auth-controller.js";

const app = express();
const port = process.env.PORT || 4000;

app.use( // configure server session
         session({
                     secret: "any string",
                     resave: false,
                     saveUninitialized: true
                 })
);
// cors - cross-origin resource sharing - establish rules by which resources can be shared
// across domains
// app.use((req, res, next) => {
//     const allowedOrigins = ["http://localhost:3000", "https://musical-duckanoo-05ddab.netlify.app/"];
//     const origin = req.headers.origin;
//
//     if (allowedOrigins.includes(origin)) {
//         res.header("Access-Control-Allow-Origin", origin);
//     }
//
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://musical-duckanoo-05ddab.netlify.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json()); // parse JSON from HTTP request body because express does not know how
// to extract data from an HTTP body. Express defines a JSON middleware to parse data from the
// body. All requests will first go through this middleware parsing the HTTP body into a JSON
// object added to the requested object in a new body property that later HTTP handlers can access.
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);