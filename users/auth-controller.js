import * as usersDao from "./users-dao.js";

var currentUserVar;

const AuthController = (app) => {
    // the register API retrieves the username and password from the requested body
    // if there's already a user with that username then we respond with an error.
    // Otherwise, we create the new user and store it in the session's currentUser property, so we
    // can remember that this new user is now the currently logged-in user
    const register = async (req, res) => {
        const user = await usersDao.findUserByUsername(req.body.username);
        if (user) { // if user exists already
            res.sendStatus(403);
            return;
        }
        const newUser = await usersDao.createUser(req.body);// new user's info is in
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };
    // an existing user can identify themselves by providing their credentials as username and
    // password. the login API below looks up the user by their credentials and responds with
    // the user if they exist. Otherwise, we respond with an error.
    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const user = await usersDao.findUserByCredentials(username, password);
            if (user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    };
    // if a user has already logged in, we can retrieve the current user by using the profile
    // API as shown below
    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };
    // logout users by destroying the session
    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = (req, res) => {
        const currentUser = currentUserVar;
        if (!currentUser) {
            res.sendStatus(404);
        }
        const updateContent = req.body;
        const currentUserId = currentUser._id;
        const updatedUser = usersDao.updateUser(currentUserId, updateContent);
        if (updatedUser) {
            currentUserVar = updatedUser;
            res.json(updatedUser);
        } else {
            res.sendStatus(404);
        }
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users", update);
}

export default AuthController;