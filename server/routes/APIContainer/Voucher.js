const Voucher = require("./../../models/voucherModel");
const { broadcast } = require("./../../config/websocket");

exports.createVoucher = async (req, res) => {
  try {
    const { code, discount, expiration_date } = req.body;

    const newVoucher = new Voucher({ code, discount, expiration_date });
    await newVoucher.save();

    // Gửi thông báo tới tất cả client về voucher mới được tạo
    broadcast("voucher", { type: "NEW_VOUCHER", voucher: newVoucher });

    res.status(201).json(newVoucher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.useVoucher = async (req, res) => {
  const { code, userID } = req.body;
  try {
    const voucher = await Voucher.findOne({ code });
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    if (voucher.status === "inactive") {
      return res.status(400).json({ message: "Voucher is inactive" });
    }
    if (voucher.usedBy.some(entry => entry.userID.toString() === userID)) {
      return res.status(400).json({ message: "You have already used this voucher" });
    }
    
    voucher.usedBy.push({ userID });
    await voucher.save();

    // Gửi thông báo tới tất cả client rằng voucher đã được sử dụng
    broadcast("voucher", { type: "VOUCHER_USED", voucher });

    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllActiveVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find({ status: "active" });
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.status(200).json(vouchers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVoucherByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const voucher = await Voucher.findOne({ code });
    if (!voucher) {
      return res.status(404).json({ message: "Voucher not found" });
    }
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
