require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect(process.env.DATABASE_CREDENTIAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use("/public", express.static(path.join(__dirname, "/src/uploads")));

// Main App Body

// routes

const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin/auth");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
const initialDataRoutes = require("./src/routes/admin/initialData");
const pageRoutes = require("./src/routes/admin/page");
const addressRoutes = require("./src/routes/address");
const orderRoutes = require("./src/routes/order");
const adminOrderRoute = require("./src/routes/admin/order.routes");

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);

// Main App Body End

app.listen(process.env.PORT, () => {
  console.log(`SERVER started at, http://localhost:` + process.env.PORT);
});
