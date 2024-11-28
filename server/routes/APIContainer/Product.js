const SubCategory = require("../../models/sub_categoryModel");
const Product = require("./../../models/productModel");
const Brand = require("./../../models/brandModel");
const mongoose = require("mongoose");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProductsWithPagination = async (req, res) => {
  try {
    // Lấy tham số truy vấn từ yêu cầu
    const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
    const limit = parseInt(req.query.limit) || 10; // Số sản phẩm trên mỗi trang, mặc định là 10

    // Tính toán số sản phẩm cần bỏ qua
    const skip = (page - 1) * limit;

    // Lấy sản phẩm với phân trang
    const products = await Product.find()
      .skip(skip) // Bỏ qua số sản phẩm đã chỉ định
      .limit(limit); // Giới hạn số sản phẩm trả về

    // Lấy tổng số sản phẩm để tính toán tổng số trang
    const totalProducts = await Product.countDocuments();

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalProducts / limit);

    // Trả về sản phẩm và thông tin phân trang
    res.status(200).json({
      totalProducts,
      totalPages,
      currentPage: page,
      products,
    });
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
        $unwind: "$brandDetails",
      },
      {
        $project: {
          brand: "$brandDetails.name",
          products: 1,
        },
      },
    ]);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this sub-category." });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
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

exports.getProductBySubCategoryID = async (req, res) => {
  try {
    const products = await Product.find({ sub_category_id: req.params.id });

    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByBrandId = async (req, res) => {
  const { brandType, categoryId, brandId, subCategoryId } = req.query;
  const filter = {};
  if (brandId) filter.brand = brandId;
  if (brandType === "subCategory") {
    if (subCategoryId) filter.sub_category_id = subCategoryId;
  } else {
    if (categoryId) filter.category_id = categoryId;
  }
  try {
    const products = await Product.find(filter);
    const brand = await Brand.findById(brandId);
    if (!products || !brand) {
      return res.status(404).json({ message: "No products or brands found" });
    }
    res
      .status(200)
      .json({ isSuccess: true, data: { brand: brand, products: products } });
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
exports.searchProductsOfComponents = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const filter = {};

    if (id) {
      filter.sub_category_id = id;
    }

    if (name && name.trim() !== "") {
      filter.name = { $regex: name, $options: "i" };
    }

    const products = await Product.find(filter);

    if (!products.length) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
// async function getProd() {
//   const res = await Product.find({
//     sub_category_id: "6728734ca6595b31391c62ea",
//   });
//   const arr1 = res.map((prod) => {
//     const { _id, name } = prod;
//     return { _id, name };
//   });
//   console.log(arr1);
// }

// async function updateCompatible() {
//   const res = await Product.findById("6739d83498863f5042e255e7");
//   res.compatible_with.memory = [
//     "67385a8f398460b90c243259",
//     "67385a8f398460b90c24325b",
//     "67385c7f398460b90c24327d",
//     "67385c7f398460b90c24327a",
//     "67385c7f398460b90c24327e",
//     "673861ba398460b90c2432c8",
//     "673861ba398460b90c2432ca",
//     "673861ba398460b90c2432c7"
//   ]

//   res.save();
//   console.log('success')
// }
// updateCompatible()
// // getProd();
function calculateComponentPriceRange(
  totalBudget,
  percentageMin,
  percentageMax
) {
  const minPrice = (totalBudget * percentageMin) / 100;
  const maxPrice = (totalBudget * percentageMax) / 100;
  return { minPrice, maxPrice };
}

function calculatePcBuildRanges(totalBudget, configType) {
  let config = {};

  const configs = {
    developer: {
      CPU: [25, 35],
      GPU: [0, 10],
      RAM: [10, 20],
      Mainboard: [5, 15],
      Storage: [15, 20],
      PSU: [0, 10],
      Case: [0, 5],
      Cooling: [0, 5],
    },
    graphicDesign: {
      CPU: [15, 25],
      GPU: [25, 40],
      RAM: [10, 20],
      Mainboard: [5, 15],
      Storage: [0, 15],
      PSU: [0, 10],
      Case: [0, 5],
      Cooling: [0, 5],
    },
    office: {
      CPU: [25, 35],
      GPU: [0, 10],
      RAM: [5, 15],
      Mainboard: [5, 15],
      Storage: [5, 20],
      PSU: [0, 10],
      Case: [0, 5],
      Cooling: [0, 5],
    },
    gaming: {
      CPU: [15, 25],
      GPU: [20, 35],
      RAM: [5, 20],
      Mainboard: [0, 15],
      Storage: [5, 15],
      PSU: [0, 10],
      Case: [0, 5],
      Cooling: [0, 5],
    },
  };

  const selectedConfig = configs[configType];

  for (let component in selectedConfig) {
    const [percentageMin, percentageMax] = selectedConfig[component];
    config[component] = calculateComponentPriceRange(
      totalBudget,
      percentageMin,
      percentageMax
    );
  }
  return config;
}

const totalBudget = 10000000;
const configType = "gaming";

const pcBuild = calculatePcBuildRanges(totalBudget, configType);

// exports.buildPCAutomatic = async (req,res) =>{
//   const totalBudget = 10000000;
//   const configType = "gaming";

// const pcBuild = calculatePcBuildRanges(totalBudget, configType);
// const CPU = await Product.find
// }
// async function build() {
//   const totalBudget = 20000000;
//   const configType = "gaming";

//   const pcBuild = calculatePcBuildRanges(totalBudget, configType);
//   console.log("?", pcBuild);
//   const option = []
//   const CPU = await Product.aggregate([
//     {
//       $match: {
//         price: { $lte: pcBuild.CPU.maxPrice, $gte: pcBuild.CPU.minPrice },
//         sub_category_id: "6728734ca6595b31391c62e9",
//       },
//     },
//   ]);
//   const motherboardIds = CPU.flatMap(cpu => cpu.compatible_with.motherboard);
//   const mainboards = await Product.aggregate([
//     {
//       $match: {
//         _id: { $in: motherboardIds },
//         sub_category_id: '6728734ca6595b31391c62ea', 
//         price: { $lte: pcBuild.Mainboard.maxPrice, $gte: pcBuild.Mainboard.minPrice },

//       },
//     },
//   ]);
//   const graphics  = await Product.aggregate([
//     {
//       $match: {
//         _id: { $in: mainboards[0].compatible_with.graphics },
//         sub_category_id: '6728734ca6595b31391c62eb', 
//         price: { $lte: pcBuild.GPU.maxPrice, $gte: pcBuild.GPU.minPrice },

//       },
//     },
//   ]);
//   console.log(graphics);
// }
// build()
