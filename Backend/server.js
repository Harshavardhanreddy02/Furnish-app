const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectdb = require("./Config/db")
const userroute = require('./routes/Userroute')
const productroute = require('./routes/Productroutes')
const cartroute = require('./routes/Cartroutes')
const checkoutroute = require('./routes/checkoutroute')
const orderroute = require('./routes/orderroutes')
const uploadroute = require('./routes/uploadroutes')
const subscriberoute = require('./routes/subscriberoute')
const adminroute = require('./routes/adminroute')
const productadminroutes = require('./routes/productadminroutes')
const adminorders = require('./routes/adminorderroute')


dotenv.config();  

const app = express();
const PORT = process.env.PORT || 3000;

connectdb()

app.use(cors({
  origin: "https://furnituresapplication.vercel.app", // replace with your frontend URL
  credentials: true,
}));
app.use(express.json());

app.use("/api/users", userroute);
app.use("/api/products", productroute);
app.use('/api/cart',cartroute)
app.use('/api/checkout',checkoutroute)
app.use('/api/order',orderroute)
app.use('/api/upload',uploadroute)
app.use('/api/subscribe',subscriberoute)


app.use('/api/admin/users',adminroute)
app.use('/api/admin/products',productadminroutes)
app.use('/api/admin/orders',adminorders)

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Furnish Store API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

