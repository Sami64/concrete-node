const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { get404 } = require("./controllers/error");
const { db } = require("./util/db");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const admin = require("./routes/admin");
const shop = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", admin);
app.use(shop);

app.use(get404);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
