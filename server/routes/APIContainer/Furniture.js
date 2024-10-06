const  FurnitureItems  = require("./../../models/furnitureModel");

// Get all Furniture items
exports.getAllFurnitureItems = async (req, res) => {
  try {
    const furnitureItems = await FurnitureItems.find();
    res.status(200).json(furnitureItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getFurnitureItemById = async (req, res) => {
  try {
    const furnitureItems = await FurnitureItems.findById(req.params.id);
    if (!furnitureItems) {
      return res.status(404).json({ message: 'Furniture item not found' });
    }
    res.status(200).json(furnitureItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFurnitureItem = async (req, res) => {
  try {
    const furnitureItems = await FurnitureItems.create(req.body);
    res.status(201).json(furnitureItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFurnitureItemById = async (req, res) => {
  try {
    const furnitureItems = await FurnitureItems.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!furnitureItems) {
      return res.status(404).json({ message: 'Furniture item not found' });
    }
    res.status(200).json(furnitureItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFurnitureItemById = async (req, res) => {
  try {
    const furnitureItems = await FurnitureItems.findByIdAndDelete(req.params.id);
    if (!furnitureItems) {
      return res.status(404).json({ message: 'Furniture item not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};