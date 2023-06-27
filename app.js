import express from 'express'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./tuits/tuits-controller.js";
import cors from 'cors'
import session from 'express-session'
import AuthController from "./users/auth-controller.js";
import mongoose from 'mongoose';

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    session({
                secret: "any string",
                resave: false,
                saveUninitialized: true,
            })
);
app.use(
    cors({
             credentials: true,
             origin: ["http://localhost:3000", "https://a6--musical-duckanoo-05ddab.netlify.app"],
         }))

app.use(express.json());
app.get('/api', (req, res) => {
    res.send('Welcome to the API');
});

AuthController(app);
TuitsController(app);
HelloController(app);
UserController(app);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});