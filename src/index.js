require("dotenv").config();
const app = require('./app');
const mongoose = require('mongoose');
const cors = require("cors");

app.use(cors({
    origin : "*"
}))

// console.log(process.env.DATABASE_URL)
//connect to DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})



app.listen(3000, () => console.log('Server running......'));

