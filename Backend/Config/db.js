const mongoose = require("mongoose")

const connectdb = async () =>
{
     try
     {
          await mongoose.connect(process.env.MONGO_URI)
          console.log("mongodb connect succesfully")
     } catch(err)
     {
          console.error("Mongodb connection failed",err)
          process.exit(1)
     }
     
}
module.exports = connectdb