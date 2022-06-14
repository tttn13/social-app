const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const multer = require('multer');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const path = require('path');
const cors = require('cors');
const {XMLParser} = require('fast-xml-parser');

const axiosYoutube = require("axios").create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
});
const axiosEvents = require("axios").create({
  baseURL: "https://app.ticketmaster.com/discovery/v2/",
})
const DEFAULT_PARAMS={
  key: process.env.REACT_APP_YOUTUBE_API,
};

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('connected to mongoDB');
  }
);
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));
//middleware
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

//fetching videos 
app.get("/api/videos", async (req, res) => {
  try {
    const params = {
      part: "snippet",
      relatedToVideoId: "oZLnHWTfP8I",
      type: "video",
      maxResults: 5,
      ...DEFAULT_PARAMS
    };
    const response = await axiosYoutube.get("/search", { params });
    return res.send(response.data);
  } catch (err) {
    res.status(505).json({ message: err });
  }
});

//fetching news
app.get("/api/news", async(req,res) => {
  try {
    const url = "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
    const response = await axios.get(url);
    const options = {
      ignoreAttributes : false
    };
  
    const parser = new XMLParser(options);
    let jsonObj = parser.parse(response.data);

    return res.send(jsonObj.rss.channel.item.slice(0,15));
  } catch (error) {
    res.status(505).json({ message: err });
  }
})

//fetch events from Ticketmaster API
app.get("/api/events", async (req, res) => {
  try {
    const params = {
      countryCode: "US",
      page: 0,
      size: 10,
      apikey: process.env.REACT_APP_EVENT_API_KEY
    };
    const response = await axiosEvents.get("/events.json", { params });
    return res.send(response.data);
  } catch (err) {
    res.status(505).json({ message: err });
  }
});

//file uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded successfully');
  } catch (error) {
    console.error(error);
  }
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 8800, () => {
  console.log('backend server is running ! on port', process.env.PORT || 8800);
});
