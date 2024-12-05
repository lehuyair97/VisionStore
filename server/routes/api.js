const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const userAPI = require("./APIContainer/Users");
const categoryAPI = require("./APIContainer/Category");
const productAPI = require("./APIContainer/Product");
const cartAPI = require("./APIContainer/cart");
const orderAPI = require("./APIContainer/Order");
const brandAPI = require("./APIContainer/Brand");
const bannerAPI = require("./APIContainer/Banner");
const subCategoryAPI = require("./APIContainer/SubCategory");
const authMiddleware = require("../middleware/authMiddleware");
const FCMAPI = require("./APIContainer/firebase_noti");
const notificationAPI = require("./APIContainer/Notification");
const voucherAPI = require("./APIContainer/Voucher");
const commentAPI = require("./APIContainer/Comment");
const messageAPI = require("./APIContainer/Message");
const paypalAPI = require("./APIContainer/Paypal");
const VnPay = require("./APIContainer/VnPay");
// Sử dụng body-parser để phân tích dữ liệu từ form
router.use(bodyParser.urlencoded({ extended: true }));

// Thiết lập lưu trữ cho tệp avatar
const getStorage = (type) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${type}`); // Thư mục để lưu trữ tệp avatar
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Tên file được lưu trữ là timestamp + tên gốc của file
    },
  });
  return storage;
};

// Đường dẫn để lấy ảnh Users
router.get("/uploads/users/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads/users", filename);
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(imagePath);
  });
});

// Đường dẫn để lấy ảnh Brand
router.get("/uploads/brands/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads/brands", filename);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(imagePath);
  });
});

router.get("/uploads/reviews/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads/reviews", filename);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(imagePath);
  });
});

//Token routes
router.post("/refreshtoken", userAPI.refreshToken);

router.post("/send-notification-fcm", FCMAPI.pushNotification);
// // Users Controller
router.post(
  "/users/upload",
  multer({ storage: getStorage("users") }).single("avatar"),
  userAPI.createUserWithImage
);
router.post("/users", userAPI.createUser);
router.get("/users", userAPI.getAllUsers);
router.get("/users/:id", userAPI.getUserById);
router.post("/users/recentproducts/:id", userAPI.addRecentProducts);
router.get("/users/recentproducts/:id", userAPI.getRecentProducts);
router.post("/change_pw/:id", userAPI.changePassword);
router.put("/favorites/:id", userAPI.updateFavorite);
router.put("/users/replaceupdate/:id", userAPI.updateAndReplaceInfo);
router.patch("/updateInfo/:id", userAPI.updateInfo);
router.delete("/users/:id", userAPI.deleteUser);
router.post("/login", userAPI.login);
router.post("/sign-in-google", userAPI.signinWithGoogle);
router.put("/users/update-address/:id", userAPI.updateAddress);
router.put("/users/remove-address/:id", userAPI.deleteAddress);
router.put(
  "/users/update-avatar/:id",
  multer({ storage: getStorage("users") }).single("avatar"),
  userAPI.updateAvatar
);
// // Category routes
router.get("/category", categoryAPI.getAllCategories);
router.get("/category/:id", categoryAPI.getCategoryById);
router.post("/category", categoryAPI.createCategory);
router.put("/category/:id", categoryAPI.updateCategoryById);
router.delete("/category/:id", categoryAPI.deleteCategoryById);

// Banner routes
router.get("/banner", bannerAPI.getAllBanners);
router.get("/banner/:id", bannerAPI.getBannerById);
router.post("/banner", bannerAPI.createBanner);
router.put("/banner/:id", bannerAPI.updateBannerById);
router.delete("/banner/:id", bannerAPI.deleteBannerById);

// // SubCategory routes
router.get("/subcategory", subCategoryAPI.getAllSubCategories);
router.get("/subcategory/:id", subCategoryAPI.getSubCategoryById);
router.post("/subcategory", subCategoryAPI.createSubCategory);
router.put("/subcategory/:id", subCategoryAPI.updateSubCategoryById);
router.delete("/subcategory/:id", subCategoryAPI.deleteSubCategoryById);
router.get(
  "/subcategory/category/:categoryId",
  subCategoryAPI.getSubCategoryByCategoryId
);
router.get("/subcategory/type/:type", subCategoryAPI.getSubCategoryByType);
router.get(
  "/subcategory/component/:id",
  subCategoryAPI.getSubCategoryByComponents
);
router.get(
  "/subcategory/accesspries/:id",
  subCategoryAPI.getSubCategoryByAccessories
);
// // Product routes
router.get("/products", productAPI.getAllProducts);
router.get("/products/pagination", productAPI.getAllProductsWithPagination);
router.post("/products/build", productAPI.buildPcAutomatic);

router.get("/productsgrouped", productAPI.getAllProductsGroupedByBrand);
router.get(
  "/productsgroupedbySubCategory",
  productAPI.getAllProductsGroupedByBrandForSubCategory
);
router.get("/products/:id", productAPI.getProductById);
router.get("/products-brands", productAPI.getProductsByBrandId);
router.post("/products", productAPI.createProduct);
router.put("/products/:id", productAPI.updateProductById);
router.delete("/products/:id", productAPI.deleteProductById);
router.post("/products/search", productAPI.searchProducts);
router.post(
  "/products/components/search/:id",
  productAPI.searchProductsOfComponents
);

router.get("/products/subcategory/:id", productAPI.getProductBySubCategoryID);

// // carts
router.post("/cart", cartAPI.addToCart);
router.post("/cart/quantity", cartAPI.updateQuantity);
router.delete("/cart/:customerId/:productId", cartAPI.removeFromCart);
router.get("/cart/users/:customerId", cartAPI.getCart);

// // nitificaiotn routes
router.post("/notifications", notificationAPI.createNotification);
router.get("/notifications", notificationAPI.getAllNotifications);
router.get(
  "/notifications/user/:userId",
  notificationAPI.getNotificationsByUserId
);
router.put("/notifications/:id/read", notificationAPI.markAsRead);
router.delete("/notifications/:id", notificationAPI.deleteNotificationById);

// // Order routes
router.get("/orders", orderAPI.getAllOrders);
router.get("/orders/:id", orderAPI.getOrderById);
router.post("/orders", orderAPI.createOrder);
router.put("/orders/status/:id", orderAPI.updateOrderStatus);
router.put("/orders/:id/commented", orderAPI.markAsCommented);
router.get("/orders/status", orderAPI.getOrdersByStatus);
router.delete("/orders/:id", orderAPI.deleteOrder);
router.get("/orders/users/:id", orderAPI.getOrdersByUserId);

// // Brand routes
router.get("/brands", brandAPI.getAllBrands);
router.get("/brands/:id", brandAPI.getBrandById);
router.post(
  "/brandsHasUpload",
  multer({ storage: getStorage("brands") }).single("logo"),
  brandAPI.createBrand
);
router.post("/brands", brandAPI.createBrand);
router.put("/brands/:id", brandAPI.updateBrand);
router.put(
  "/brandsHasUpload/:id",
  multer({ storage: getStorage("brands") }).single("logo"),
  brandAPI.updateBrand
);
router.delete("/brands/:id", brandAPI.deleteBrandById);

// // Voucher routes
router.post("/voucher", voucherAPI.createVoucher);
router.get("/active-voucher", voucherAPI.getAllActiveVouchers);
router.get("/voucher", voucherAPI.getAllVouchers);
router.post("/use-voucher", voucherAPI.useVoucher);

// // comment routes
router.post(
  "/comment",
  multer({ storage: getStorage("reviews") }).array("images", 3),
  commentAPI.addComment
);
router.post("/comment/:id/like", commentAPI.likeComment);
router.get("/comment/:id", commentAPI.getCommentById);
router.get("/comment-by-product/:productID", commentAPI.getCommentsByProductID);
router.get("/comment-by-user/:userID", commentAPI.getCommentsByUserID);

// // message routes
router.post("/message", messageAPI.sendMessage);
// router.get("/messages/:userId", messageAPI.getMessagesByUserId);
// router.delete("/message/:id", messageAPI.deleteMessage);
// router.put("/message/:id", messageAPI.updateMessage);
router.get("/conversations", messageAPI.getAllActiveConversations); 

// // paypal
router.post("/paypal/create", paypalAPI.createPayment);
router.post("/paypal/execute", paypalAPI.executePayment);
router.get("/paypal/cancel", paypalAPI.cancelPayment);

// // vnpay
router.get("/", (req, res) => {
  res.render("orderlist", { title: "Danh sách đơn hàng" });
});

router.get("/create_payment_url", (req, res) => {
  res.render("order", { title: "Tạo mới đơn hàng", amount: 10000 });
});

router.get("/vnpay_return", (req, res) => {
  res.render("vnpay_return", {
    title: "Thông tin return",
    vnp_ResponseCode: req.query.vnp_ResponseCode,
    vnp_TransactionStatus: req.query.vnp_TransactionStatus,
    vnp_Message: req.query.vnp_Message,
    vnp_Amount: req.query.vnp_Amount,
    vnp_OrderInfo: req.query.vnp_OrderInfo,
    vnp_PayDate: req.query.vnp_PayDate,
  });
});

router.get("/querydr", (req, res) => {
  res.render("querydr", { title: "Truy vấn kết quả thanh toán" });
});

router.get("/refund", (req, res) => {
  res.render("refund", { title: "Hoàn tiền giao dịch thanh toán" });
});
router.get("/success", (req, res) => {
  res.render("success", { title: "Thanh Toán thành công" });
});

router.post("/create_payment_url", VnPay.createPaymentUrl);
router.get("/vnpay_return", VnPay.vnpayReturn);
router.get("/vnpay_ipn", VnPay.vnpayIpn);
router.post("/querydr", VnPay.querydr);
router.post("/refund", VnPay.refund);

module.exports = router;
