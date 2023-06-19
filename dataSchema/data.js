// specifies technicalities/limits/types of handled data

const mongoose = require("mongoose")


const EntrySchema = new mongoose.Schema({
    date1:{type: Date ,
    required: [true,"must provide date dd/mm/yyyy"],
    
    },
    
    date: {
        type:String,
        required: [true,"must provide date dd/mm/yyyy"], 
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
        min: 0,
        required: [true,"must provide amount, a '-' means deduct form you balance (paid), '+' means you received "],
        maxLsength: 20,
    }
})

// db.EntrySchema.find().sort({ date : 1})

module.exports = mongoose.model("Data", EntrySchema)