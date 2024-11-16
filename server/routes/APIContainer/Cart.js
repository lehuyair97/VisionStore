const Cart = require("../../models/cartModel");
const Product = require("../../models/productModel");

async function addToCart(req, res) {
  const { customerId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ customerId });

    if (!cart) {
      cart = new Cart({
        customerId,
        carts: [],
        totalBill: 0,
      });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Sản phẩm không tồn tại" });

    const totalPrice = product.price * quantity;
    const existingProductIndex = cart.carts.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.carts[existingProductIndex].quantity += quantity;
      cart.totalBill += totalPrice;
    } else {
      cart.carts.push({
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity,
        image: product.image,
      });
      cart.totalBill += totalPrice;
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Không thể thêm sản phẩm vào giỏ hàng" });
  }
}

async function updateQuantity(req, res) {
  const { customerId, productId, action, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ customerId });
    if (!cart) return res.status(404).json({ error: "Giỏ hàng không tồn tại" });

    const productIndex = cart.carts.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) return res.status(404).json({ error: "Sản phẩm không có trong giỏ hàng" });
    const product = cart.carts[productIndex];
    if (action === "increase") {
      product.quantity += quantity;
      cart.totalBill += product.price * quantity;
    } else if (action === "decrease") {
      const newQuantity = product.quantity - quantity;
      if (newQuantity <= 0) {
        cart.totalBill -= product.price * product.quantity;
        cart.carts.splice(productIndex, 1);
      } else {
        product.quantity = newQuantity;
        cart.totalBill -= product.price * quantity;
      }
    }
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Không thể cập nhật giỏ hàng" });
  }
}

async function removeFromCart(req, res) {
  const { customerId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ customerId });
    if (!cart) return res.status(404).json({ error: "Giỏ hàng không tồn tại" });

    const productIndex = cart.carts.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) return res.status(404).json({ error: "Sản phẩm không có trong giỏ hàng" });

    const product = cart.carts[productIndex];
    cart.totalBill -= product.price * product.quantity;

    cart.carts.splice(productIndex, 1);
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Không thể xóa sản phẩm khỏi giỏ hàng" });
  }
}

async function getCart(req, res) {
  const { customerId } = req.params;

  try {
    const cart = await Cart.findOne({ customerId });
    if (!cart) return res.status(404).json({ error: "Giỏ hàng không tồn tại" });

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Không thể lấy giỏ hàng" });
  }
}

module.exports = {
  addToCart,
  updateQuantity,
  removeFromCart,
  getCart,
};
