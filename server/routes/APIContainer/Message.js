const Conversation = require("../../models/conversationModel")
const Message = require("../../models/messageModel");

exports.sendMessage = async (req, res) => {
  const { idClient, content } = req.body;

  try {
    const conversation = await Conversation.findOne({
      participants: { $all: [idClient] },
      status: "active", 
    });
    let newMessage;
    if (conversation) {
      newMessage = new Message({
        idClient,
        content,
        conversationId: conversation._id,
        status: "active", 
      });
    } else {
      newMessage = new Message({
        idClient,
        content,
        status: "pending", 
      });
    }
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptMessage = async (req, res) => {
  const { messageId, adminId } = req.body;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const conversation = new Conversation({
      participants: [message.idClient, adminId],
      status: "active", 
    });

    await conversation.save();
    message.status = "active";
    message.conversationId = conversation._id;
    await message.save();

    res.status(200).json({ message: "Message accepted, conversation started", conversation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessagesByConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 }) 
      .populate("idClient", "username email");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllActiveConversations = async (req, res) => {
  const adminId = req.user.id; 

  try {
    const conversations = await Conversation.find({
      participants: adminId,
      status: "active",
    }).populate("participants", "username email");

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ message: "No active conversations found" });
    }

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
