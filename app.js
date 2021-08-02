require("dotenv").config();
const express = require("express");
const connectDB = require("./src/db");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

connectDB();

app.use("/public", express.static(path.join(__dirname, "/src/uploads")));

// Main App Body

// routes

const adminRoutes = require("./src/routes/admin/auth");
const initialDataRoutes = require("./src/routes/admin/initialData");
const pageRoutes = require("./src/routes/admin/page");
const adminOrderRoute = require("./src/routes/admin/order.routes");

const authRoutes = require("./src/routes/auth");
const categoryRoutes = require("./src/routes/category");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
const addressRoutes = require("./src/routes/address");
const orderRoutes = require("./src/routes/order");
const bannerRoutes = require("./src/routes/banner");
const uploadRoutes = require("./src/routes/upload");

app.use("/api", uploadRoutes);
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
app.use("/api", bannerRoutes);

// Main App Body End

app.listen(process.env.PORT, () => {
  console.log(`SERVER started at, http://localhost:` + process.env.PORT);
});
