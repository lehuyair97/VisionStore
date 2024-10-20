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
const subCategoryAPI = require("./APIContainer/SubCategory");


// Sử dụng body-parser để phân tích dữ liệu từ form
router.use(bodyParser.urlencoded({ extended: true }));

// Thiết lập lưu trữ cho tệp avatar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Thư mục để lưu trữ tệp avatar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Tên file được lưu trữ là timestamp + tên gốc của file
  },
});

// Đường dẫn để lấy ảnh
router.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads", filename);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.sendFile(imagePath);
  });
});

// Thiết lập tải lên với Multer
const upload = multer({ storage: storage });

// // Users Controller
router.post("/users/upload", upload.single("avatar"), userAPI.createUserWithImage);
router.post("/users", userAPI.createUser);
router.get("/users", userAPI.getAllUsers);
router.get("/users/:id", userAPI.getUserById);
router.put("/change_pw/:id", userAPI.changePassword);
router.put("/favorites/:id", userAPI.updateFavorite);
router.put("/updateInfo/:id", userAPI.updateInfo);
router.delete("/users/:id", userAPI.deleteUser);
router.post("/login", userAPI.login);

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
router.put("/subcategory/:id", subCategoryAPI.updateSubCategoryById); 
router.delete("/subcategory/:id", subCategoryAPI.deleteSubCategoryById); 

// // Product routes
router.get("/products", productAPI.getAllProducts);
router.get("/products/:id", productAPI.getProductById);
router.post("/products", productAPI.createProduct);
router.put("/products/:id", productAPI.updateProductById);
router.delete("/products/:id", productAPI.deleteProductById);

// // Order routes
router.get('/orders', orderAPI.getAllOrders);
router.get('/orders/:id', orderAPI.getOrderById);
router.get('/orders/users/:customerId', orderAPI.getOrdersByUserId);
router.post('/orders', orderAPI.createOrder);
router.put('/orders/:id', orderAPI.updateOrderById);
router.delete('/orders/:id', orderAPI.deleteOrderById);

module.exports = router;