//app.get("/api/v1/tasks")          -get all the tasks
//app.post("/api/v1/tasks")         -create a new task
//app.get("/api/v1/tasks/:id")      -get signle task
//app.patch("/api/v1/tasks/:id")    -update task
//app.delete("/api/v1/tasks/:id")   -delete task



//app.get("/api/simpleLedger/entry")          -get all the entries
//app.delete("/api/simpleLedger/entry/:id")   -delete entry
//app.delete("/api/simpleLedger/entry")       -delete entries
//app.post("/api/simpleLedger/entry")         -create a new entry
//app.get("/api/simpleLedger/entry/:id")      -get signle task
//app.patch("/api/simpleLedger/entry/:id")    -update task



//acquire data schema

const Data = require("../dataSchema/data.js")

//use async as promise based, error handling


//get sum of amount from entries



//get all entries

const getAllEntries = async (req,res) =>{
    try { //below sort by date old to new
        const entries = await Data.find({}).sort({ date1 : 1})
        //add query to sum amounts
        const amounts = await Data.aggregate(    [
            {
              $group: {
                _id: "$company",
                total: {
                  $sum: {$round: ["$amount", 2]}
                }
              }
            }
          ],)

        res.status(200).json({entries,amounts})
        
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


//create entry

const createEntry = async (req, res) => {
    try {
        const entry = await Data.create(req.body)
        res.status(201).json({entry})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

// const getEntry = async (req, res) => {

// }

// const updateEntry = async (req, res) => {
    
// }

//delete entry 

const deleteEntry = async (req, res) => {
    try {
        const {id: entryID}=req.params
        const entry = await Data.findOneAndDelete({_id:entryID})
        if(!entry){
            return res.status(404).json({msg:`No entry with ID: ${entryID}`})
        }
        res.status(200).json({entry})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}


//delete all entries
const deleteAllEntries = async (req, res) => {
    try {
        const entries = await Data.deleteMany({})
        res.status(200).json({entries})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}



module.exports = {
    createEntry,
    getAllEntries,
    deleteEntry,
    deleteAllEntries
}