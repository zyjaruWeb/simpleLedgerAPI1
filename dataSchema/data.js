// specifies technicalities/limits/types of handled data

const mongoose = require("mongoose")


const EntrySchema = new mongoose.Schema({
    date1:{type: Date ,
    required: [true,"must provide date mm/dd/yyyy"],
    
    },
    
    date: {
        type:String,
        required: [true,"must provide date mm/dd/yyyy"], 
        maxLength: 10,
    },
    from: {
        type:String,
        required: [true,"must provide from or to who"],
        maxLength: 20,
    },
    description: {
        type:String,
        required: [true,"must provide description"],
        maxLength: 20,
    },
    amount:{
        type:Number,
        required: [true,"must provide amount, a '-' means deduct form you balance (paid), '+' means you received "],
        maxLength: 20,
    }
})

// db.EntrySchema.find().sort({ date : 1})

module.exports = mongoose.model("Data", EntrySchema)