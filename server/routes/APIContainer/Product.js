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

exports.getProductsByBrandId = async (req, res) => {
  const { categoryId, brandId } = req.query;
  const filter = {};

  if (categoryId) filter.category_id = categoryId;
  if (brandId) filter.brand = brandId;
  console.log(categoryId);
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
    if (req.body.sub_category_id) {
      const subCategory = await SubCategory.findOne({
        sub_category_type: "components",
      });

      if (!subCategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }
      const item = subCategory.sub_category_list.find(
        (item) => item._id.toString() === product.sub_category_id
      );

      if (item) {
        product.sub_category = item;
        await product.save();
      }
    }

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
    const { name } = req.body; // Lấy tên từ body của yêu cầu
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" }; // Tìm kiếm không phân biệt chữ hoa chữ thường
    }

    // Chỉ tìm kiếm theo tên, không sử dụng _id
    const products = await Product.find(filter);

    if (!products.length) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error); // Ghi lại lỗi chi tiết
    res.status(500).json({ message: error.message });
  }
};
