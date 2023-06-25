const errHndlr = (err,req,res,next) => {
    return res.status(err.status).json({msg: `No file available`})
}

module.exports = errHndlr