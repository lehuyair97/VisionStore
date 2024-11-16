const SubCategory = require("../../models/sub_categoryModel");
const Product = require("./../../models/productModel");
const mongoose = require("mongoose");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllProductsGroupedByBrand = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const matchStage = categoryId
      ? { $match: { category_id: new mongoose.Types.ObjectId(categoryId) } }
      : null;
    const products = await Product.aggregate([
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$brand",
          products: { $push: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "_id",
          foreignField: "_id",
          as: "brandDetails",
        },
      },
      {
        $unwind: "$brandDetails",
      },
      {
        $project: {
          brand: "$brandDetails.name",
          products: 1,
        },
      },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProductsGroupedByBrandForSubCategory = async (req, res) => {
  const { subCategory_child_ID } = req.query;
  try {
    // Thực hiện truy vấn aggregate để nhóm sản phẩm theo thương hiệu
    const products = await Product.aggregate([
      {
        $match: {
          sub_category_id: subCategory_child_ID, // Lọc theo sub_category_id
        },
      },
      {
        $group: {
          _id: "$brand", // Nhóm theo brand
          products: { $push: "$$ROOT" }, // Đưa tất cả sản phẩm vào mảng products
        },
      },
      {
        $lookup: {
          from: "brands", // Tìm trong collection brands
          localField: "_id", // Trường brand trong Product
          foreignField: "_id", // Trường _id trong Brands
          as: "brandDetails", // Lưu thông tin thương hiệu vào mảng brandDetails
        },
      },
      {
        $unwind: "$brandDetails", // Giải nén mảng brandDetails
      },
      {
        $project: {
          brand: "$brandDetails.name", // Lấy tên thương hiệu từ brandDetails
          products: 1, // Giữ nguyên mảng sản phẩm
        },
      },
    ]);

    // Kiểm tra nếu không có sản phẩm nào được tìm thấy
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this sub-category." });
    }

    // Trả về kết quả
    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log lỗi chi tiết cho dễ dàng debug
    res.status(500).json({ message: error.message }); // Trả về lỗi cho client
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductBySubCategoryID = async (req, res) => {
  console.log('here')
  console.log(req)
  
  try {
    const products = await Product.find({sub_category_id: req.params.id})
 
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByBrandId = async (req, res) => {
  const { categoryId, brandId } = req.query;
  const filter = {};

  if (categoryId) filter.category_id = categoryId;
  if (brandId) filter.brand = brandId;
  try {
    const products = await Product.find(filter);

    if (!products) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  exports.searchProducts = async (req, res) => {
  try {
    const { name } = req.body; 
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" }; 
    }

    const products = await Product.find(filter);
    if (!products.length) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error); 
    res.status(500).json({ message: error.message });
  }
  };
