const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const cron = require("node-cron");
const { User } = require("../../models/userModel");
const keyFilePath = "./serviceAccountKey.json";

// Get Firebase Access Token
async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
}

// Function to send a notification to a single device
async function sendNotification(title, body, token) {
  const accessToken = await getAccessToken();
  const message = {
    message: {
      token,
      notification: { title, body },
    },
  };

  try {
    const response = await axios.post(
      "https://fcm.googleapis.com/v1/projects/visionstore-ec03c/messages:send",
      message,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Notification sent successfully!");
    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error.response?.data || error.message);
    throw error;
  }
}

// Exported function to handle HTTP request for sending a notification
exports.pushNotification = async (req, res) => {
  const { title, body, token } = req.body;
  try {
    await sendNotification(title, body, token);
    res.status(200).send("Notification sent successfully!");
  } catch (error) {
    res.status(500).send(error.response?.data || error.message);
  }
};

// Function to send notification to all users
const sendNotificationToAllUsers = async () => {
  const title = "Thông báo tự động";
  const body = "Đây là thông báo gửi đến tất cả người dùng!";

  const users = await User.find({ device_token: { $ne: null } });
  const tokens = users.map(user => user.device_token).filter(Boolean);

  if (tokens.length > 0) {
    for (const token of tokens) {
      try {
        await sendNotification(title, body, token);
      } catch (error) {
        console.error("Error sending to token:", token, error.message);
      }
    }
    console.log("Đã gửi thông báo cho tất cả thiết bị đã đăng nhập!");
  } else {
    console.log("Không có thiết bị nào để gửi thông báo.");
  }
};

// Set interval to send notification every 2 minutes
// setInterval(() => {
//   console.log("Đang gửi thông báo tự động đến tất cả người dùng...");
//   sendNotificationToAllUsers();
// }, 5 * 1000); // 2 minutes

// Scheduled notification at 5 PM every day
cron.schedule("0 17 * * *", () => {
  console.log("Đang gửi thông báo vào lúc 5 giờ chiều");
  sendNotificationToAllUsers();
});
