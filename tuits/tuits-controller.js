// import posts from "./tuits.js";
// let tuits = posts;

import * as tuitsDao from "./tuits-dao.js";

const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.time = "0h";
    newTuit.likes = 0; // initialize likes counter
    newTuit.liked = false;
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit.explored = false;
    newTuit.disliked = false;
    newTuit.dislikes = 0;
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);
}

const findTuits = async (req, res) => {
    const tuits = await tuitsDao.findTuits();
    res.json(tuits);
}

const updateTuit = async (req, res) => {
    const tuitdId = req.params["tid"];
    const updates = req.body;
    const status = await tuitsDao.updateTuit(tuitdId, updates);
    res.json(status);
}

const deleteTuit = async (req, res) => {
    const tuitdIdToDelete = req.params["tid"];
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.json(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
