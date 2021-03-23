const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { get404 } = require("./controllers/error");
const sequelize = require("./util/db");
const session = require("express-session");
const Product = require("./models/product");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
const store = new sequelizeStore({ db: sequelize });

const admin = require("./routes/admin");
const shop = require("./routes/shop");
const auth = require("./routes/auth");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "user secret",
    resave: false,
    saveUninitialized: false,
    store: store, 
  })
);

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
app.use(auth);

app.use(get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  //.sync({ force: true })
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
  .then((cart) => {
    const PORT = 3000 || process.env.PORT;
    app.listen(PORT, () => console.log(`server running on ${PORT}`));
  })
  .catch((err) => console.log(err));
