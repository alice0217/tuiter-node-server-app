import people from "./users.js"; // import the array of users, include the extension
let users = people;

// C(post) R(get) U(put) D(delete)
const UserController = (app) => {
    app.get("/api/users", findUsers); // request pattern /api/users to call a function
    app.get("/api/users/:uid", findUserById); // map path pattern to handler function,
    // parameter: uid
    app.post("/api/users", createUser);
    app.delete("/api/users/:uid", deleteUser);
    app.put("/api/users/:uid", updateUser);
};

const updateUser = (req, res) => { // handle PUT /api/users/:uid
    const userId = req.params["uid"]; // get user ID from path
    const updates = req.body; // BODY includes updated fields
    users = users.map((usr) => // create a new array of users
    usr._id === userId ? // if current user's ID matches ID we want to update
        {...usr, ...updates} : usr); // merge old usr with new updates using the spread operator
    // otherwise keep the old user
    res.sendStatus(200); // 200 = ok
}

const deleteUser = (req, res) => {
    const userId = req.params["uid"]; // get user ID from path parameter uid filter out the user
    users = users.filter(usr => usr._id !== userId); // whose ID is the ID of the user we want
    // to remove
    res.sendStatus(200); // respond with success code
}

const createUser = (req, res) => {
    const newUser = req.body; // extract new user from BODY in request
    newUser._id = (new Date()).getTime() + ''; // add an _id property with unique timestamp
    users.push(newUser); // append new user to users array
    res.json(newUser); // respond with new user to client
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
}

const findUsers = (req, res) => {
    const type = req.query.type; // retrieve type parameter from query, if type parameter in
    // query, find users of that type
    if (type) { // if type is not null
        const userOfType = users.filter(u => u.type === type);
        res.json(userOfType);
        return;
    }
    res.json(users); // responds with JSON array of users
}

export default UserController;