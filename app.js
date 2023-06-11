import express from 'express';
// const express = require('express'); // same as import express library
import cors from "cors"
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./tuits/tuits-controller.js";
import session from "express-session"; // import new server session library
import AuthController from "./users/auth-controller.js";

const allowedOrigins = ["http://localhost:3000", "https://musical-duckanoo-05ddab.netlify.app/"];

const app = express();
app.use( // configure server session
         session({
                     secret: "any string",
                     resave: false,
                     saveUninitialized: true
                 })
);
// cors - cross-origin resource sharing - establish rules by which resources can be shared
// across domains
app.use(cors({ // restrict cross-origin resource sharing to the React application
                 credentials: true,
                 // origin: "http://localhost:3000",
                 origin: function (origin, callback) {
                     if (!origin || allowedOrigins.includes(origin)) {
                         callback(null, true);
                     } else {
                         callback(new Error("Not allowed by CORS"));
                     }
                 },
             }));
app.use(express.json()); // parse JSON from HTTP request body because express does not know how
// to extract data from an HTTP body. Express defines a JSON middleware to parse data from the
// body. All requests will first go through this middleware parsing the HTTP body into a JSON
// object added to the requested object in a new body property that later HTTP handlers can access.
const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);