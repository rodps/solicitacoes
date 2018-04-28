const express = require("express");
const app = express();
const models = require("./models");
const path = require("path");

const bodyParser = require("body-parser");

const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

models.sequelize.sync().then(() => {
  app.listen(3000, function() {
    console.log("The Server Has Started!");
  });
});

app.use("/", homeRouter);
app.use("/usuarios", userRouter);
