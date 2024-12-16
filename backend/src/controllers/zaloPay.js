const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");

const createrZalopay = async (req, res, amount) => {
  const embed_data = {
    redirecturl: 'http://localhost:8000/intermediary',
  };

  // Sử dụng amount đã được chuyển đổi trước khi truyền vào
  console.log("Noah check amount: ", amount); // Để kiểm tra giá trị

  // APP INFO
  const config = {
    app_id: "2553",
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
    endpoint: "https://sb-openapi.zalopay.vn/v2/create",
  };

  const items = [{}];
  const transID = Math.floor(Math.random() * 1000000);
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format("YYMMDD")}_${transID}`,
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: amount, // Sử dụng giá trị đã chuyển đổi
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: "/product-view-all",
  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  try {
    const response = await axios.post(config.endpoint, null, { params: order });
    console.log("ZaloPay response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while creating ZaloPay order:", error);
    res.status(400).json(error);
  }
};

module.exports = {
  createrZalopay,
};
