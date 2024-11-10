const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const userAPI = require("./APIContainer/Users");
const categoryAPI = require("./APIContainer/Category");
const productAPI = require("./APIContainer/Product");
const orderAPI = require("./APIContainer/Order");
const brandAPI = require("./APIContainer/Brand");
const subCategoryAPI = require("./APIContainer/SubCategory");
const authMiddleware = require("../middleware/authMiddleware");
const notificationAPI = require("./APIContainer/notification");
const voucherAPI = require("./APIContainer/Voucher");
const commentAPI = require("./APIContainer/Comment");
const messageAPI = require("./APIContainer/Message");

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
router.get("/images/brands/:filename", (req, res) => {
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
router.get("/images/brands/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads/brands", filename);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(imagePath);
  });
});

//Token routes
router.post("/refreshtoken", userAPI.refreshToken);

router.post("/send-notification", notificationAPI.pushNotification);
// // Users Controller
router.post(
  "/users/upload",
  multer({ storage: getStorage("users") }).single("avatar"),
  userAPI.createUserWithImage
);
router.post("/users", userAPI.createUser);
router.get("/users", userAPI.getAllUsers);
router.get("/users/:id", userAPI.getUserById);
router.put("/change_pw/:id", userAPI.changePassword);
router.put("/favorites/:id", userAPI.updateFavorite);
router.put("/updateInfo/:id", userAPI.updateInfo);
router.delete("/users/:id", userAPI.deleteUser);
router.post("/login", userAPI.login);
router.post("/sign-in-google", userAPI.signinWithGoogle);

// // Category routes
router.get("/category", categoryAPI.getAllCategories);
router.get("/category/:id", categoryAPI.getCategoryById);
router.post("/category", categoryAPI.createCategory);
router.put("/category/:id", categoryAPI.updateCategoryById);
router.delete("/category/:id", categoryAPI.deleteCategoryById);

// // SubCategory routes
router.get("/subcategory", subCategoryAPI.getAllSubCategories);
router.get("/subcategory/:id", subCategoryAPI.getSubCategoryById);
router.post("/subcategory", subCategoryAPI.createSubCategory);
router.put(
  "/subcategory/:id",

  subCategoryAPI.updateSubCategoryById
);
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
router.get("/productsgrouped", productAPI.getAllProductsGroupedByBrand);
router.get("/products/:id", productAPI.getProductById);
router.get("/products-brands", productAPI.getProductsByBrandId);
router.post("/products", productAPI.createProduct);
router.put("/products/:id", productAPI.updateProductById);
router.delete("/products/:id", productAPI.deleteProductById);
router.post("/products/search", productAPI.searchProducts);

// // Order routes
router.get("/orders", orderAPI.getAllOrders);
router.get("/orders/:id", orderAPI.getOrderById);
router.get("/orders/users/:customerId", orderAPI.getOrdersByUserId);
router.post("/orders", orderAPI.createOrder);
router.put("/orders/:id", orderAPI.updateOrderById);
router.delete("/orders/:id", orderAPI.deleteOrderById);
router.delete("/orders", orderAPI.deleteOrdersByIds);
// // Brand routes
router.get("/brands", brandAPI.getAllBrands);
router.get("/brands/:id", brandAPI.getBrandById);
router.post(
  "/brands",
  multer({ storage: getStorage("brands") }).single("logo"),
  brandAPI.createBrand
);
router.put(
  "/brands/:id",
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
router.post("/comment", commentAPI.addComment);
router.get("/comment/:id", commentAPI.getCommentById);
router.get("/comment-by-product/:productID", commentAPI.getCommentsByProductID);

// // message routes
router.post("/message", messageAPI.sendMessage);
router.get("/messages/:userId", messageAPI.getMessagesByUserId);
router.delete("/message/:id", messageAPI.deleteMessage);
router.put("/message/:id", messageAPI.updateMessage);
router.get("/conversations", messageAPI.getAllConversations); // Lấy tất cả cuộc trò chuyện với các client

function calculateComponentPriceRange(totalBudget, percentageMin, percentageMax) {
  const minPrice = (totalBudget * percentageMin) / 100;
  const maxPrice = (totalBudget * percentageMax) / 100;
  return { minPrice, maxPrice };
}

function calculatePcBuildRanges(totalBudget, configType) {
  let config = {};
  
  const configs = {
      developer: {
          CPU: [30, 35],
          GPU: [5, 10],
          RAM: [15, 20],
          Mainboard: [10, 15],
          Storage: [15, 20],
          PSU: [5, 10],
          Case: [0, 5],
          Cooling: [0, 5],
      },
      graphicDesign: {
          CPU: [20, 25],
          GPU: [30, 35],
          RAM: [15, 20],
          Mainboard: [10, 15],
          Storage: [10, 15],
          PSU: [5, 10],
          Case: [0, 5],
          Cooling: [0, 5],
      },
      office: {
          CPU: [25, 30],
          GPU: [5, 10],
          RAM: [10, 15],
          Mainboard: [10, 15],
          Storage: [15, 20],
          PSU: [5, 10],
          Case: [0, 5],
          Cooling: [0, 5],
      },
      gaming: {
          CPU: [20, 25],
          GPU: [30, 35],
          RAM: [10, 20],  
          Mainboard: [10, 15],
          Storage: [10, 15],
          PSU: [5, 10],
          Case: [0, 5],
          Cooling: [0, 5],
      }
  };

  const selectedConfig = configs[configType];

  for (let component in selectedConfig) {
      const [percentageMin, percentageMax] = selectedConfig[component];
      config[component] = calculateComponentPriceRange(totalBudget, percentageMin, percentageMax);
  }

  return config;
}

const totalBudget = 10000000; 
const configType = 'gaming'; 

const pcBuild = calculatePcBuildRanges(totalBudget, configType);
console.log(pcBuild);

module.exports = router;
