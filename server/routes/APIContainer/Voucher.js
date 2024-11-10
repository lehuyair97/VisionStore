const Voucher = require("./../../models/voucherModel");
const { handleEvent } = require("./../../config/websocket");

exports.createVoucher = async (req, res) => {
  console.log(req.body);
  try {
    const { discount, expiration_date, type, title, description } = req.body;

    const code = generateRandomCode();
    const newVoucher = new Voucher({
      discount,
      expiration_date,
      type,
      title,
      description,
      code,
    });
    await newVoucher.save();
    const vouchers = await Voucher.find({ status: "active" });
    handleEvent("voucher", vouchers);
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
    if (voucher.usedBy.some((entry) => entry.userID.toString() === userID)) {
      return res
        .status(400)
        .json({ message: "You have already used this voucher" });
    }

    voucher.usedBy.push({ userID });
    await voucher.save();

    const vouchers = await Voucher.find({ status: "active" });
    handleEvent("voucher", vouchers);
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

function generateRandomCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  const timestampPart = Date.now().toString(36).toUpperCase();
  for (let i = 0; i < length - timestampPart.length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${timestampPart}${code}`;
}
