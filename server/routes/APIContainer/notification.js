const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const cron = require("node-cron");
const { User } = require("../../models/userModel");
const keyFilePath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "./serviceAccountKey.json"; // Use environment variable

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
    console.log(`[${new Date().toISOString()}] Notification sent to ${token}`);
    return response.data;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending notification to ${token}:`, {
      message: error.response?.data?.error?.message,
      code: error.response?.data?.error?.code,
      details: error.response?.data?.error?.details,
      originalMessage: error.message,
    });
    throw error;
  }
}

// Exported function to handle HTTP request for sending a notification
exports.pushNotification = async (req, res) => {
  const { title, body, token } = req.body;
  if (!token) {
    return res.status(400).send("Device token is required.");
  }
  
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
  const body = "Thảo Béo Sừng dài 1 mét";

  const users = await User.find({ device_token: { $ne: null } });
  const tokens = users.map(user => user.device_token).filter(Boolean);

  if (tokens.length > 0) {
    console.log(`[${new Date().toISOString()}] Sending notification to ${tokens.length} devices...`);
    
    const promises = tokens.map(token => sendNotification(title, body, token));
    await Promise.all(promises)
      .catch(error => console.error("Error during batch notification:", error.message));

    console.log("Đã gửi thông báo cho tất cả thiết bị đã đăng nhập!");
  } else {
    console.log("Không có thiết bị nào để gửi thông báo.");
  }
};

// Set interval to send notification every 15 seconds (for testing, adjust as needed)
// setInterval(() => {
//   console.log(`[${new Date().toISOString()}] Đang gửi thông báo tự động đến tất cả người dùng...`);
//   sendNotificationToAllUsers();
// }, 6 * 1000); // 15 seconds for testing

// Scheduled notification at 5 PM every day
cron.schedule("0 17 * * *", () => {
  console.log(`[${new Date().toISOString()}] Đang gửi thông báo vào lúc 5 giờ chiều`);
  sendNotificationToAllUsers();
});
