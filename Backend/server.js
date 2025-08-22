const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectdb = require("./Config/db")
const userroute = require('./routes/Userroute')
const productroute = require('./routes/Productroutes')
const cartroute = require('./routes/Cartroutes')


dotenv.config();  

const app = express();
const PORT = process.env.PORT || 3000;

connectdb()

app.use(cors());
app.use(express.json());

app.use("/api/users", userroute);
app.use("/api/products", productroute);
app.use('/api/cart',cartroute)

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Furnish Store API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

