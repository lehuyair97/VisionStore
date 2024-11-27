const Comment = require("./../../models/commentModel");
const { broadcast, handleEvent } = require("./../../config/websocket");

async function getCommentsData(productID) {
  const comments = await Comment.find({ productID }).populate(
    "userID",
    "email userName avatar"
  );

  const count = comments.length;
  const totalRating = comments.reduce(
    (sum, comment) => sum + comment.rating,
    0
  );
  const averageRating = count > 0 ? totalRating / count : 0;

  return { comments, count, averageRating };
}
exports.likeComment = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(403).json({ message: "commentID is required" });
  }
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "comment is not found" });
    }
    comment.likes += 1;
    await comment.save();
    res.status(201).json({ isSuccess: true, data: comment });
  } catch (error) {
    res
      .status(500)
      .json({
        isSuccess: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

exports.getCommentsByProductID = async (req, res) => {
  const { productID } = req.params;
  try {
    const commentsData = await getCommentsData(productID);
    res.status(200).json(commentsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getCommentsDataByUser(userID) {
  const comments = await Comment.find({ userID }).populate(
    "productID",
    "name price image"
  );

  const count = comments.length;
  const totalRating = comments.reduce(
    (sum, comment) => sum + comment.rating,
    0
  );
  const averageRating = count > 0 ? totalRating / count : 0;

  return { comments, count, averageRating };
}

exports.getCommentsByUserID = async (req, res) => {
  const { userID } = req.params;
  try {
    const commentsData = await getCommentsDataByUser(userID);
    res.status(200).json(commentsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { productID, userID, text, rating } = req.body;
  try {
    const imageUrls = req.files
      ? req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/api/uploads/reviews/${
              file.filename
            }`
        )
      : [];
    const newComment = new Comment({
      productID,
      userID,
      text,
      rating: parseInt(rating),
      images: imageUrls,
    });

    await newComment.save();
    const commentsData = await getCommentsData(productID);
    handleEvent("comment", commentsData);
    res.status(201).json({ isSuccess: true, data: commentsData });
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
