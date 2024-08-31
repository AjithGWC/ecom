require('dotenv').config();
const express = require("express");
const mongoose  = require("mongoose");
const cookieParser = require('cookie-parser');

const MONGODB_URL = process.env.MONGODB_URL;
const DB_SERVER = process.env.DB_SERVER;

const users = require("../routes/admin/user");
const roles = require("../routes/admin/roles");
const auth = require("../routes/frontend/auth");
const product = require("../routes/admin/product");
const category = require("../routes/admin/category");
const seller = require("../routes/admin/seller");
const country = require("../routes/admin/countryCode");

const app = express();

const cors = require('cors');
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use("/admin", users);
app.use("/admin", roles);
app.use("/", auth);
app.use("/admin", product);
app.use("/admin", category);
app.use("/admin", seller);  
app.use("/admin", country);

function connectToDB(){
    mongoose.connect(MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        app.listen(DB_SERVER, (err) => {
            if(err){
                console.log("server failed");
            }
            console.log(`listening now ${DB_SERVER}`); 
        });
    }) 
}
connectToDB();

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: "Internal Server Error" });
// });