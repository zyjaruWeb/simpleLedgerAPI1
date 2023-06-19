const express = require("express")
const router = express.Router()


//specify types of paths to be routed

const {
    getAllEntries,
    createEntry,
    deleteEntry,
    deleteAllEntries
} = require("../REST/paths")

router.route("/").get(getAllEntries).post(createEntry).delete(deleteAllEntries) //all type routes
router.route("/:id").delete(deleteEntry) //specific by id type routes

module.exports = router