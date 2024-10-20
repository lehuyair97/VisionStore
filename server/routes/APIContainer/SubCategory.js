const SubCategory = require("./../../models/sub_categoryModel");

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
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body); // Tạo subcategory mới
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Cập nhật subcategory theo ID
    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
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
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(204).end(); // Trả về 204 No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};