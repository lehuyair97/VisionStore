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

// // Users Controller
router.post(
  "/users/upload",
  multer({ storage: getStorage("users") }).single("avatar"),
  userAPI.createUserWithImage
);
router.post("/users", userAPI.createUser);
router.get("/users", authMiddleware, userAPI.getAllUsers);
router.get("/users/:id", authMiddleware, userAPI.getUserById);
router.put("/change_pw/:id", authMiddleware, userAPI.changePassword);
router.put("/favorites/:id", authMiddleware, userAPI.updateFavorite);
router.put("/updateInfo/:id", authMiddleware, userAPI.updateInfo);
router.delete("/users/:id", authMiddleware, userAPI.deleteUser);
router.post("/login", userAPI.login);
router.post("/sign-in-google", userAPI.signinWithGoogle);

// // Category routes
router.get("/category", categoryAPI.getAllCategories);
router.get("/category/:id", categoryAPI.getCategoryById);
router.post("/category", authMiddleware, categoryAPI.createCategory);
router.put("/category/:id", authMiddleware, categoryAPI.updateCategoryById);
router.delete("/category/:id", authMiddleware, categoryAPI.deleteCategoryById);

// // SubCategory routes
router.get("/subcategory", subCategoryAPI.getAllSubCategories);
router.get("/subcategory/:id", subCategoryAPI.getSubCategoryById);
router.post("/subcategory", authMiddleware, subCategoryAPI.createSubCategory);
router.put(
  "/subcategory/:id",
  authMiddleware,
  subCategoryAPI.updateSubCategoryById
);
router.delete(
  "/subcategory/:id",
  authMiddleware,
  subCategoryAPI.deleteSubCategoryById
);

// // Product routes
router.get("/products", authMiddleware, productAPI.getAllProducts);
router.get(
  "/productsgrouped",
  authMiddleware,
  productAPI.getAllProductsGroupedByBrand
);
router.get("/products/:id", authMiddleware, productAPI.getProductById);
router.get(
  "/products?categoryId=:id&brandId=:id",
  authMiddleware,
  productAPI.getProductsByBrandId
);
router.post("/products", authMiddleware, productAPI.createProduct);
router.put("/products/:id", authMiddleware, productAPI.updateProductById);
router.delete("/products/:id", authMiddleware, productAPI.deleteProductById);

// // Order routes
router.get("/orders", authMiddleware, orderAPI.getAllOrders);
router.get("/orders/:id", authMiddleware, orderAPI.getOrderById);
router.get(
  "/orders/users/:customerId",
  authMiddleware,
  orderAPI.getOrdersByUserId
);
router.post("/orders", authMiddleware, orderAPI.createOrder);
router.put("/orders/:id", authMiddleware, orderAPI.updateOrderById);
router.delete("/orders/:id", authMiddleware, orderAPI.deleteOrderById);

// // Brand routes
router.get("/brands", authMiddleware, brandAPI.getAllBrands);
router.get("/brands/:id", authMiddleware, brandAPI.getBrandById);
router.post(
  "/brands",
  multer({ storage: getStorage("brands") }).single("logo"),
  brandAPI.createBrand
);
router.put(
  "/brands/:id",
  multer({ storage: getStorage("brands") }).single("logo"),
  authMiddleware,
  brandAPI.updateBrand
);
router.delete("/brands/:id", authMiddleware, brandAPI.deleteBrandById);

module.exports = router;
