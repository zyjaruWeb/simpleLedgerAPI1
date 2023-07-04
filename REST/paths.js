
//acquire data schema

const Data = require("../dataSchema/data.js")
const asyncWrppr = require("../middleware/asyncWrppr")
// const json2csv = require("json2csv");
const { Parser } = require("json2csv")

// https://www.google.com/search?q=transform+json+to+csv+nodejs&rlz=1C1YTUH_en-GBGB1012GB1012&sxsrf=AB5stBgvnz_1oBV32Wr0hyEAjgdf874veA%3A1688423833797&ei=mU2jZOCdMK6jhbIP04-R0AM&ved=0ahUKEwigzt_2zPP_AhWuUUEAHdNHBDoQ4dUDCA8&uact=5&oq=transform+json+to+csv+nodejs&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIICAAQigUQhgMyCAgAEIoFEIYDMggIABCKBRCGAzoKCAAQRxDWBBCwAzoKCAAQigUQsAMQQzoFCAAQgARKBAhBGABQoQRYrwpgrwtoAXABeACAAXKIAcEFkgEDMy40mAEAoAEBwAEByAEJ&sclient=gws-wiz-serp

//get data for CSV download

const getCsv =  asyncWrppr(async (req,res) =>{
  //below sort by date old to new

    const entries = await Data.find({}).sort({ date1 : 1})
    let fields = ["_id", "date", "from", "description", "amount"]    
        
    const parser = new Parser({
      fields, 
      unwind: ["_id", "date1", "date", "from", "description", "amount", "__v"]
    })
          const csv = parser.parse(entries)

          res.setHeader('Content-disposition', 'attachment; filename=simpleLedgerAPI.csv');
          res.set('Content-Type', 'text/csv');
          res.status(200).send(csv)
          
  })

  

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
    deleteAllEntries,
    getCsv
}