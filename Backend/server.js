const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectdb = require("./Config/db")
const userroute = require('./routes/Userroute')

dotenv.config();  

const app = express();
const PORT = process.env.PORT || 3000;

connectdb()

app.use(cors());
app.use(express.json());

app.use("/api/users", userroute);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('Furnish Store API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

