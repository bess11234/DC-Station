const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require("cookie-parser");

require("dotenv").config({ path: __dirname+'/./../.env'});

const app = express()
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true //for send cookie
}))

// connect to MongoDBAtlas
mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log("❌ MongoDB Connection Error:", err))

//Import router from folder routers
app.use("/api/auth", require("./routes/auth"));
app.use("/api/animals", require("./routes/animal"));
app.use("/api/requests", require("./routes/request"));
app.use("/api/knowledges", require("./routes/knowledge"));
app.use("/api/counts", require("./routes/counts"));

const PORT = process.env.NEXT_PUBLIC_BACKENDPORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

