const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
// const exp = require("constants");
const Collection = require("./config");
const { name } = require("ejs");

const app = express();
// convert data into json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//use EJS as the view engine
app.set("view engine", "ejs");
//static file
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

//Register User
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  // check if the user already exsist in the database
  const exsistingUser = await Collection.findOne({ name: data.name });
  if (exsistingUser) {
    res.send("User already exists. Please choose a different username.");
  } else {
    // hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // Replace the hash password with original password

    const userdata = await Collection.insertMany(data);
    console.log(userdata);
  }

  const userdata = await Collection.insertMany(data);
  console.log(userdata);
});

// Login user
app.post("/login", async(req,res)=>{
    try{
        const user = await Collection.findOne({name:req.body.username});
        if(check){
            res.send("user name cannot found");
        }
    //compare the hash password from the database with the plan text
         if(isPasswordMatch){
          res.render("home");
        }else{
        req.send("wrong password");
        }
    }catch{
    res.send("Wrong Details");
 }
})

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
