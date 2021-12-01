const express = require("express")
const app = express()
const mongoose = require('mongoose');
const dotenv = require("dotenv")
// const morgan = require("morgan")
const helmet = require("helmet")
const multer = require("multer")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const commentRoute = require("./routes/comments")
const path = require("path")
dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true
}, () => {
    console.log("connected to mongoDB")
})

app.use("/images", express.static(path.join(__dirname, "public/images")));
//middleware 
app.use(express.json()) 
app.use(helmet())
// app.use(morgan("common"))
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)


//file uploading 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});
  
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
    }
});

app.listen(8800, () => {
    console.log("backend server is running !")
})