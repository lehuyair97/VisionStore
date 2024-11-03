const Comment = require("./../../models/commentModel");
const { broadcast } = require("./../../config/websocket");

exports.addComment = async (req, res) => {
  const { productID, userID, text, images } = req.body;
  try {
    const newComment = new Comment({ productID, userID, text, images });
    await newComment.save();
    // Gửi thông báo tới tất cả client rằng đã có comment mới
    broadcast("comment", { type: "NEW_COMMENT", comment: newComment });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByProductID = async (req, res) => {
  const { productID } = req.params;
  try {
    const comments = await Comment.find({ productID }).populate(
      "userID",
      "email"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
