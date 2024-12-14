const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");

const createrZalopay = async (req, res) => {
  const embed_data = {
    redirecturl: 'https://fef6-222-253-42-125.ngrok-free.app/product-view-all',
  };
  let amount = req.query.total;
  console.log("Noah check amount: ", amount);
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
    amount: amount, // Cái này là giá lúc chuyển api sang trang thanh toán
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url: "/product-view-all",

  };

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    "|" +
    order.app_trans_id +
    "|" +
    order.app_user +
    "|" +
    order.amount +
    "|" +
    order.app_time +
    "|" +
    order.embed_data +
    "|" +
    order.item;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
  try {
    const response = await axios.post(config.endpoint, null, { params: order });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


module.exports = {
  createrZalopay,
};
