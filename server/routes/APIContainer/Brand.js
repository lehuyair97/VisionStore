const Brands = require("./../../models/brandModel");

exports.getAllBrands = async (req, res) => {
  try {
    const brand = await Brands.find();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brands.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brands not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const brandData = req.body;
    const logoPath = brandData.logo
      ? `${req.protocol}://${req.get("host")}/api/images/brands/${
          brandData.logo
        }`
      : null;

    const newBrand = await Brands.create({
      ...brandData,
      logo: logoPath,
    });
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createBrandNoUpload = async (req, res) => {
  try {
    const brandData = req.body;
    const newBrand = await Brands.create(brandData);
    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateBrandNoUpload = async (req, res) => {
  try {
    const brandId = req.params.id;
    const updatedData = req.body;
    const updatedBrand = await Brands.findByIdAndUpdate(brandId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (req.file) {
    const baseLogo = `${req.protocol}://${req.get("host")}/api/uploads/brands/${
      req.file.filename
    }`;
    updates.logo = baseLogo;
  }

  try {
    const updatedBrand = await Brands.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBrandById = async (req, res) => {
  try {
    const brand = await Brands.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brands not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
