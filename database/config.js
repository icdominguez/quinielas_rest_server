const mongoose = require('mongoose')

const dbConnection = async() =>  {
    try{
        await mongoose.connect(process.env.MONGO_CNN)

        console.log('Database Online')
    } catch(error) {
        console.log(error)
        throw new Error('Error trying to initialize database')
    }
}

module.exports = {
    dbConnection
}