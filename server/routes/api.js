
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const userAPI = require("./APIContainer/Users");
const categoryAPI = require("./APIContainer/Category"); 
const furnitureAPI = require("./APIContainer/Furniture"); 
const orderAPI = require("./APIContainer/Order")
router.use(bodyParser.urlencoded({ extended: true }));



// Thiết lập lưu trữ cho tệp avatar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Thư mục để lưu trữ tệp avatar
  },
  filename: function (req, file, cb) {
    // Tên file được lưu trữ là timestamp + tên gốc của file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

router.get("/images/:filename", (req, res) => {
  // Lấy tên của ảnh từ tham số của URL
  const filename = req.params.filename;

  // Đường dẫn tới thư mục chứa ảnh
  const imagePath = path.join(__dirname, "../uploads", filename);

  // Kiểm tra xem file có tồn tại không
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Nếu file không tồn tại, trả về lỗi 404
      return res.status(404).json({ message: "Image not found" });
    }

    // Trả về file ảnh
    res.sendFile(imagePath);
  });
});

// Thiết lập tải lên với Multer
const upload = multer({ storage: storage });

// Users Controler
router.post("/users/upload", upload.single("avatar"), userAPI.createUserWithImage);
router.post("/users/uploads", upload.array("avatar"), userAPI.createUserWithImages);
router.post("/users", userAPI.createUser);
router.get("/users", userAPI.getAllUsers);
router.get("/users/:id", userAPI.getUserById);
router.put("/change_pw/:id", userAPI.changePassword);
router.put("/favorites/:id", userAPI.updateFavorite);
router.put("/updateInfo/:id", userAPI.updateInfo);
router.put("/payment_method/:id", userAPI.updatePaymentMethod);
router.delete("/users/:id", userAPI.deleteUser);
router.post("/login", userAPI.login);

// Category routes
router.get("/category", categoryAPI.getAllCategories);
router.get("/category/:id", categoryAPI.getCategoryById);
router.post("/category", categoryAPI.createCategory);
router.put("/category/:id", categoryAPI.updateCategoryById);
router.delete("/category/:id", categoryAPI.deleteCategoryById);

// Furniture routes
router.get("/furniture", furnitureAPI.getAllFurnitureItems);
router.get("/furniture/:id", furnitureAPI.getFurnitureItemById);
router.post("/furniture", furnitureAPI.createFurnitureItem);
router.put("/furniture/:id", furnitureAPI.updateFurnitureItemById);
router.delete("/furniture/:id", furnitureAPI.deleteFurnitureItemById);

//Order routes
router.get('/orders', orderAPI.getAllOrders);
router.get('/orders/:id', orderAPI.getOrderByID);
router.get('/orders/users/:customerId', orderAPI.getOrdersByUserId);
router.post('/orders', orderAPI.createOrder);
router.put('/orders/:id', orderAPI.updateOrderById);
router.delete('/orders/:id', orderAPI.deleteOrderById);


module.exports = router;
