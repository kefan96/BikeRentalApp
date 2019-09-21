const express = require("express");
const app = express();
const fs = require("fs");
const flash = require("connect-flash");

var PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(require("express-session")({
    secret: "Jake wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.success = req.flash("success");
    next();
});

var contents = fs.readFileSync("bikerentals.json");
var jsonContent = JSON.parse(contents);

// console.log(jsonContent.products[1]);

app.get("/", (req, res) => {
    res.render("index", {rentalList: jsonContent.products});
});

app.post("/", (req, res) => {
    req.flash("success", "Checked out successfully!");
    res.redirect("back");
})

app.listen(PORT, () => {
    console.log("App listen on port " + PORT + "!!!");
});