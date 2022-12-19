const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const books = require('./routes/api/books');
const app = express();

require('dotenv').config()
const uri="mongodb+srv://book:book@cluster0.wuqmavi.mongodb.net/book?retryWrites=true&w=majority"
// const uri="mongodb://127.0.0.1:27017/book_info"

const connectDB = () => {
  try {
     mongoose.connect(
     uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      }
      );
      console.log('MongoDB is Connected...');

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
// console.log("mongo uri is ",process.env.MONGO_URI);

connectDB();

// cors
app.use(cors({ 
  origin: ["http://localhost:3000",
  "https://mern-book.onrender.com"], 
  credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));


// if (process.env.NODE_ENV == "production") {
//     app.use(express.static("client/build"));
//     app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
// }
// use Routes
app.use('/api/books', books);

const PORT = process.env.PORT || 8082;

// app.get('/', (req, res) => {
//   res.sendStatus(200)
// })
// "proxy":"http://localhost:8082",

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
