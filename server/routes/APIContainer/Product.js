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
      CPU: [10, 25],
      GPU: [0, 15],
      RAM: [5, 15],
      Mainboard: [5, 20],
      Storage: [5, 20],
      PSU: [0, 15],
      Case: [0, 10],
      Cooling: [0, 10],
    },
    graphicDesign: {
      CPU: [10, 20],
      GPU: [10, 25],
      RAM: [5, 17],
      Mainboard: [5, 17],
      Storage: [0, 15],
      PSU: [0, 12],
      Case: [0, 8],
      Cooling: [0, 8],
    },
    office: {
      CPU: [10, 25],
      GPU: [0, 15],
      RAM: [5, 20],
      Mainboard: [5, 20],
      Storage: [5, 25],
      PSU: [0, 15],
      Case: [0, 8],
      Cooling: [0, 8],
    },
    gaming: {
      CPU: [10, 23],
      GPU: [15, 23],
      RAM: [5, 17],
      Mainboard: [0, 20],
      Storage: [5, 20],
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

async function build(totalBudget, configType) {
  const pcBuild = calculatePcBuildRanges(totalBudget, configType);
  const components = [
    {
      key: "CPUs",
      subCategoryId: "6728734ca6595b31391c62e9",
      matchField: "CPU",
    },
    {
      key: "Mainboards",
      subCategoryId: "6728734ca6595b31391c62ea",
      matchField: "Mainboard",
    },
    {
      key: "GPUs",
      subCategoryId: "6728734ca6595b31391c62eb",
      matchField: "GPU",
    },
    {
      key: "RAMs",
      subCategoryId: "6728734ca6595b31391c62e8",
      matchField: "RAM",
    },
    {
      key: "Storages",
      subCategoryId: "6728734ca6595b31391c62ee",
      matchField: "Storage",
    },
    {
      key: "PSUs",
      subCategoryId: "6728734ca6595b31391c62ec",
      matchField: "PSU",
    },
    {
      key: "Cases",
      subCategoryId: "6728734ca6595b31391c62ef",
      matchField: "Case",
    },
    {
      key: "Coolings",
      subCategoryId: "6728734ca6595b31391c62ed",
      matchField: "Cooling",
    },
  ];

  const options = {};

  try {
    for (const component of components) {
      const { key, subCategoryId, matchField } = component;
      const range = pcBuild[matchField];
      options[key] = await Product.aggregate([
        {
          $match: {
            price: { $lte: range.maxPrice, $gte: range.minPrice },
            sub_category_id: subCategoryId,
          },
        },
      ]).sort({ price: -1 });
    }

    const configurations = [];
    for (let i = 0; i < 3; i++) {
      const configuration = {};
      for (const { key } of components) {
        const items = options[key];
        if (items.length > 0) {
          configuration[key.slice(0, -1)] = items[i % items.length];
        }
      }
      configurations.push(configuration);
    }

    return { option: options, suggest: configurations };
  } catch (error) {
    console.error("Error building PC options:", error);
    throw new Error("Unable to build PC configurations.");
  }
}

exports.buildPcAutomatic = async (req, res) => {
  const { totalBudget, configType } = req.body;

  if (!totalBudget || !configType) {
    return res.status(400).json({
      message: "totalBudget and configType are required.",
    });
  }

  try {
    const result = await build(totalBudget, configType);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in buildPcAutomatic:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while building the PC." });
  }
};
