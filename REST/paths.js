
//acquire data schema

const Data = require("../dataSchema/data.js")
const asyncWrppr = require("../middleware/asyncWrppr")


//get sum of amount from entries



//get all entries

const getAllEntries = asyncWrppr(async (req,res) =>{
//below sort by date old to new
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
})


//create entry

const createEntry = asyncWrppr(async (req, res) => {
        const entry = await Data.create(req.body)
        res.status(201).json({entry})
})

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