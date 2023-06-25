const asyncWrppr = (request) =>{
    return async (req,res,next) =>{
        try {
            await request(req,res,next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncWrppr