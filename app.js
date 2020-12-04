const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { get404 } = require("./controllers/error");
const sequelize = require("./util/db");
const Product = require("./models/product");
const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const admin = require("./routes/admin");
const shop = require("./routes/shop");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", admin);
app.use(shop);

app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Sami", email: "gas@gmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((result) => {
    //console.log(result);
    const PORT = 3000 || process.env.PORT;
    app.listen(PORT, () => console.log(`server running on ${PORT}`));
  })
  .catch((err) => console.log(err));
