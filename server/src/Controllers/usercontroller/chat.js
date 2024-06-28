const chatmodel = require("../../Models/chat");

module.exports = {
  createChat: async (req, res) => {
    const { firstId, SecondId } = req.body;
    try {
      const chat = await chatmodel.findOne({
        members: { $all: [firstId, SecondId] }
      });
      if (chat) return res.status(200).json(chat);

      const newChat = new chatmodel({
        member: [firstId, SecondId]
      });

      const response = await newChat.save();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  findUserChats: async (req, res) => {
    const userId = req.params.userId;
    try {
      const chats = await chatmodel.find({
        members: { $in: [userId] }
      });
      res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  findChat: async (req, res) => {
    const [firstId, SecondId] = req.params;
    try {
      const chat = await chatmodel.find({
        members: { $all: [firstId, SecondId] }
      });
      res.status(200).json(chat);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
