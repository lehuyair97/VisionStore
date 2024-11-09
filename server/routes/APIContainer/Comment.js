const Comment = require("./../../models/commentModel");
const { broadcast, handleEvent } = require("./../../config/websocket");

exports.addComment = async (req, res) => {
  const { productID, userID, text, images } = req.body;
  try {
    const newComment = new Comment({ productID, userID, text, images });
    await newComment.save();
    // broadcast({
    //   type: "NEW_COMMENT", // Thông báo loại sự kiện
    //   data: newComment, // Dữ liệu cần gửi đi (comment mới)
    // });
    handleEvent("comment", newComment);

    // Trả về comment mới tạo với mã trạng thái 201
    res.status(201).json(newComment);
  } catch (error) {
    // Xử lý lỗi và trả về mã lỗi 500
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByProductID = async (req, res) => {
  const { productID } = req.params;
  try {
    // Lấy danh sách comment theo productID và populate thông tin user
    const comments = await Comment.find({ productID }).populate(
      "userID",
      "email"
    );

    // Trả về danh sách comment
    res.status(200).json(comments);
  } catch (error) {
    // Xử lý lỗi và trả về mã lỗi 500
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    // Tìm comment theo ID
    const comment = await Comment.findById(id);
    if (!comment) {
      // Nếu không tìm thấy comment, trả về lỗi 404
      return res.status(404).json({ message: "Comment not found" });
    }

    // Trả về comment tìm thấy
    res.status(200).json(comment);
  } catch (error) {
    // Xử lý lỗi và trả về mã lỗi 500
    res.status(500).json({ message: error.message });
  }
};
