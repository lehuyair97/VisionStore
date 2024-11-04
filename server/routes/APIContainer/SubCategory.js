const SubCategory = require("./../../models/sub_categoryModel");
const { v4: uuidv4 } = require("uuid");

exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find(); // Lấy tất cả subcategories
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id); // Lấy subcategory theo ID
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    if (
      req.body.sub_category_list &&
      Array.isArray(req.body.sub_category_list)
    ) {
      req.body.sub_category_list = req.body.sub_category_list.map((item) => ({
        ...item,
        _id: uuidv4(),
      }));
    }

    const subCategory = await SubCategory.create(req.body);
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // Cập nhật subcategory theo ID
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id); // Xóa subcategory theo ID
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(204).end(); // Trả về 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubCategoryByCategoryId = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const subCategories = await SubCategory.find({
      categoryID: categoryId,
    });
    if (!subCategories.length) {
      return res
        .status(404)
        .json({ message: "No subcategories found for this category" });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubCategoryByType = async (req, res) => {
  const { type } = req.params;
  try {
    const subCategories = await SubCategory.find({ sub_category_type: type });
    if (!subCategories.length) {
      return res
        .status(404)
        .json({ message: "No subcategories found for this type" });
    }
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubCategoryByAccessories = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const subCategory = await SubCategory.findOne({
      sub_category_type: "accessories",
    });

    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const item = subCategory.sub_category_list.find(
      (item) => item._id.toString() === id
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving subcategory", error });
  }
};

exports.getSubCategoryByComponents = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const subCategory = await SubCategory.findOne({
      sub_category_type: "components",
    });

    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const item = subCategory.sub_category_list.find(
      (item) => item._id.toString() === id
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving subcategory", error });
  }
};
