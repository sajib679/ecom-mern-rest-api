const express = require("express");
const { requireSignIn, adminMiddleware } = require("../../common-middleware");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order.admin");
const router = express.Router();

router.post(`/order/update`, requireSignIn, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requireSignIn,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;
