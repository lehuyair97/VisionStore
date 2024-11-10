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
        RAM: [15, 15],
        Mainboard: [10, 15],
        Storage: [10, 15],
        PSU: [5, 10],
        Case: [0, 5],
        Cooling: [0, 5],
    }
};
console.log('huhu casi nafy khó gõ quá đi')
if (totalBudget > 20000000 && totalBudget <= 40000000) {
    configs.developer.CPU = [30, 40];
    configs.developer.GPU = [10, 15]; 
    configs.graphicDesign.GPU = [35, 40]; 
    configs.graphicDesign.CPU = [20, 25];
    configs.gaming.GPU = [35, 40]; 
    configs.office.CPU = [30, 35]; 
} else if (totalBudget > 40000000) {
    configs.developer.CPU = [35, 45];
    configs.developer.GPU = [10, 20]; 
    configs.graphicDesign.GPU = [40, 45];
    configs.graphicDesign.CPU = [20, 30]; 
    configs.gaming.GPU = [40, 50]; 
    configs.gaming.CPU = [20, 25];
    configs.office.CPU = [35, 40]; 
}

// Tính toán khoảng giá cho từng thành phần
const selectedConfig = configs[configType];
for (let component in selectedConfig) {
    const [percentageMin, percentageMax] = selectedConfig[component];
    config[component] = calculateComponentPriceRange(totalBudget, percentageMin, percentageMax);
}

return config;
}



const pcBuild1 = calculatePcBuildRanges(15030540, configType);
exports.BuildPCAutomatic = async (req, res) => {
  const { bucket } = req.body;

};
