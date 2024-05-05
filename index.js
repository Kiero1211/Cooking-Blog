const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const PORT = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static("public"));
app.use(expressLayouts);

app.use(cookieParser("CookingBlogSecure"));
app.use(session({
    secret: "CookingBlogSecretSession",
    saveUninitialized: false,
    resave: false
}))

app.use(flash());
app.use(fileUpload());

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

const routes = require("./server/routes/recipeRoutes");
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Listening to port: http://localhost:${PORT}`);
})