const notFound = (req,res) => res.status(404).send("File does not exist")

module.exports = notFound 

//if requested route is other than those available above error message dipslays