const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')

require("dotenv").config({ path: '../.env'});

const app = express()
app.use(express.json());
app.use(cors())

// connect to MongoDBAtlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err))

//Import Routs
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// let db = new sqlite3.Database('credentials.db' , (err)=> {
//     if (err) {
//         console.log('connect to the access database.');
//     }
// })

// app.post('/validatePassword', (req, res) => {
//     const {username, password} = req.body

//     db.all(`select * from credentials where username = '${username}' and password = '${password}'`, (err, rows) => {
//         if(err){
//             throw err;
//         }
//         if (rows.length > 0){
//             res.send({validation : true})
//         }else{
//             res.send({validation:false})
//         }
//     })
// })


// app.listen(3001, () => console.log("Listening at port 3001"))