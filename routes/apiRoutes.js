const router = require("express").Router();
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const asyncRead = util.promisify(fs.readFile);
const asyncWrite = util.promisify(fs.writeFile);

const getAllNotes = () => {
    return asyncRead("./db/db.json","utf8").then((notes) => {
        return JSON.parse(notes);
    });
}

const addOneNote = (note) => {

    const newNote = note;
    newNote.id = uuidv4();

    return getAllNotes().then((notes) => {
        const allNotes = notes;
        allNotes.push(newNote);
        asyncWrite("./db/db.json","utf8",JSON.stringify(allNotes))
    });
}

const destroyNotes = (id) => {
    return getAllNotes().then((notes) => {
        const allNotes = notes;
        const filterNotes = allNotes.filter((note) => id !== note.id);
        asyncWrite("./db/db.json","utf8",JSON.stringify(filterNotes))
    });
}

router.get("/api/notes",(req,res) => {
    getAllNotes().then((notes) => {
        res.json(notes);
    });
});

router.post("/api/notes",(req,res) => {
    addOneNote(req.body).then((notes) => {
        res.json(notes);
    });
});

router.delete("/api/notes/:id",(req,res) => {
    destroyNotes(req.params.id).then((notes) => {
        res.json({success: true});
    });
});

module.exports = router;