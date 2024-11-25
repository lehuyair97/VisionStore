import CryptoJS from 'crypto-js';

export const createVNPayUrl = (amount, orderId, returnUrl) => {
  const baseUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // URL sandbox
  const tmnCode = "R3QVVZ6E";
  const secretKey = "HVFEHLTI9C7T4SHKV9JTUCUAAZILO2E8";

  // Hàm tạo thời gian theo định dạng yyyyMMddHHmmss
  const generateDates = () => {
    const now = new Date();
    const gmt7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000); // Thời gian GMT+7

    const formatDate = (date) => {
      const pad = (n) => (n < 10 ? "0" + n : n); // Đảm bảo 2 chữ số cho các đơn vị thời gian
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      return `${year}${month}${day}${hours}${minutes}${seconds}`;
    };

    const vnpCreateDate = formatDate(gmt7Time);
    const expireDate = new Date(gmt7Time.getTime() + 15 * 60 * 1000); // Cộng thêm 15 phút
    const vnpExpireDate = formatDate(expireDate);

    return { vnpCreateDate, vnpExpireDate };
  };

  // Lấy thời gian tạo và hết hạn
  const { vnpCreateDate, vnpExpireDate } = generateDates();

  const getIpAddr = () => {
    return '127.0.0.1';
  }

  const params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: amount * 100, 
    vnp_BankCode: "VNBANK", 
    vnp_CurrCode: "VND",
    vnp_IpAddr: getIpAddr(), 
    vnp_Locale: "vn",
    vnp_OrderInfo: "Thanh toan don hang", 
    vnp_OrderType: "billpayment",
    vnp_ReturnUrl: returnUrl,
    vnp_CreateDate: vnpCreateDate, 
    vnp_ExpireDate: vnpExpireDate,
  };

  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");

  // Tạo mã `vnp_SecureHash`
  const secureHash = CryptoJS.HmacSHA512(sortedParams, secretKey).toString(CryptoJS.enc.Hex);


  // Gắn chữ ký vào URL
  const vnpUrl = `${baseUrl}?${sortedParams}&vnp_SecureHash=${secureHash}`;
  return vnpUrl;
};
