const Product = require("../../models/productModel");

exports.buildPCManual = async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findById(product_id).populate({
      path: "compatible_with.memory compatible_with.graphics compatible_with.storage compatible_with.motherboard",
      model: "Product",
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Tạo một đối tượng để lưu trữ danh sách phụ thuộc
    const dependencies = {
      memory: product.compatible_with.memory || [],
      graphics: product.compatible_with.graphics || [],
      storage: product.compatible_with.storage || [],
      motherboard: product.compatible_with.motherboard || [],
    };

    // Nếu sản phẩm là CPU, lấy Mainboard tương thích
    if (product.child_type === "processor") {
      const compatibleMotherboards = await Product.find({
        "compatible_with.processor": product._id,
      });
      dependencies.motherboard = compatibleMotherboards;
    }

    // Nếu sản phẩm là Mainboard, lấy RAM, Graphics Card, Storage tương thích
    if (product.child_type === "motherboard") {
      const compatibleRams = await Product.find({
        "compatible_with.motherboard": product._id,
      });
      const compatibleGraphics = await Product.find({
        "compatible_with.graphics": product._id,
      });
      const compatibleStorage = await Product.find({
        "compatible_with.storage": product._id,
      });
      dependencies.memory.push(...compatibleRams);
      dependencies.graphics.push(...compatibleGraphics);
      dependencies.storage.push(...compatibleStorage);
    }

    return res.status(200).json({
      product: product,
      dependencies: dependencies,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};
