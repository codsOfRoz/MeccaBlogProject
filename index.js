const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
// const ScrollReveal= require('scrollreveal');
// window.sr = ScrollReveal(); 

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

 
// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/home-images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const postImage = multer({ storage: storage });

//Mecca's blog posts
let posts = [
  {
    id: 1,
    title: "Kaaba",
    body: "The Kaaba is one of Saudi Arabia's most beautiful and revered sites, and it is also known as the House of Allah since it is the first Qibla for Muslims.",
    image: "home-images/kabba.jpg",
  },
    {
      id: 2,
      title: "Masjid Aysha",
      body: "this mosque is a famous destination for Hajj and Umrah pilgrims to perform their rituals. Visit the Mosque which is a Midget or a station for dressing up in Ihram clothing.",
      image: "home-images/Masjid-Aisha.jpg",
    },
    {
      id: 3,
      title: "City of Mina",
      body: "pilgrims set out from Mecca after their seven rounds ritual at Mecca, Safa, and Murah. Explore the fascinating tent city and experience the stoning of the Devil, a ritual performed by the Hajj pilgrims on the last day of the Hajj.",
      image: "home-images/cityOfMina.jpg",
    },
    
    {
        id: 4,
        title: "Jabal Al Nour",
        body: "Also known as the Mountain of Light, it is the place where the Prophet is said to have meditated to receive the first revelations. It is an important religious and pilgrimage site for many muslims across the world. ",
        image: "home-images/Jaba-al-nour.jpg",
      },
      {
        id: 5,
        title: "Al-Bait Tower",
        body: "Abraj Al-Bait is a giant skyscraper, standing elegantly in the central area of Mecca, Saudi Arabia. The mega tall building is well known as Makkah Royal Clock and also informally called Mecca Clock Tower. ",
        image: "home-images/AbrajAlBaitTower.jpg",
      },
      {
        id: 6,
        title: "Mount Arafat",
        body: "According to Islamic tradition, the hill is the place where the Prophet Muhammad stood with a Farewell Sermon to the Muslims who chaperoned him on the Hajj, which is also known as the Khutbat al-Wada.",
        image: "home-images/MountArafat.jpg",
      },
      {
        id: 7,
        title: "Jabal Thawr Mecca",
        body: "The location is a mountain occupying a cave where Prophet Muhammad and his companion Abu Bakr hid for three days and three nights before escaping to Medina.",
        image: "home-images/JabalThawrMacca.jpg",
      },
      {
        id: 8,
        title: "Jamaraat Bridge",
        body: "Jamarat Bridge is a pedestrian bridge sited in the city of Mina just east of Mecca. The bridge is one of the holy places which is populated annually by Muslim pilgrims to perform Islamic Hajj.",
        image: "home-images/JamaraatBridge.jpg",
      },
      {
        id: 9,
        title: "Masjid al-Haram",
        body: "This Mosque is a site of main pilgrimage amongst the Islamic world and houses some important structural elements of religious importance such as the Black Stone, the Zamzam well, Maqam Ibrahim and the hills of Safa and Marwa.",
        image: "home-images/MasjidAlHaram.jpg",
      },
      {
        id: 10,
        title: "Makkah Museum",
        body: "Makkah Museum is the historic center of Muslim pilgrimage that welcomes thousands of pilgrims for thousands of years. The historic Museum houses rare artifacts, fascinating collections, and displays that showcase the culture. ",
        image: "home-images/MakkahMuseum.jpg",
      }
    
  ];

app.get("/", function(req,res){
    res.render("index",{ posts });
});
app.get("/index", function(req,res){
    res.render("index",{ posts });
});
app.get("/newPost", function(req,res){
    res.render("newPost");
});

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((post) => post.id === postId);
  res.render("edit-post", { post });
});

app.post("/edit/:id", postImage.single("image"), (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, body } = req.body;
  const image = req.file ? "/home-images/" + req.file.filename : null;
  const index = posts.findIndex((post) => post.id === postId);
  if (index !== -1) {
    posts[index].title = title;
    posts[index].body = body;
    if (image) {
      posts[index].image = image;
    }
  }

  // res.redirect("/");
});

app.post("/newPost", postImage.single("image"), (req, res) => {
  const { title, body } = req.body;
  const image = req.file ? "/home-images/" + req.file.filename : null;
  const newPost = { id: posts.length + 1, title, body, image};
  posts.push(newPost);
  // res.redirect("/");
});


app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.redirect("/");
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });