const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product')
const User = require('./models/User')
const Cart = require('./models/Cart')
const products = require('./data/product')

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })

const seeddata = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        await Cart.deleteMany()

        const createUser = await User.create({
            name: "admin user",
            email: "admin@gmail.com",
            password: "123456",
            role: "admin"
        })

        const userId = createUser._id
        const sampleProducts = products.map((p) => {
            return { ...p, user: userId }   
        })

        await Product.insertMany(sampleProducts)

        console.log("Products seeded successfully ")
        process.exit()
    } catch (err) {
        console.error("Error seeding the data", err)
        process.exit(1)
    }
}

seeddata()
