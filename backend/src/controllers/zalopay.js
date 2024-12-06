// Node v10.15.3
const axios = require('axios').default; 
const CryptoJS = require('crypto-js'); 
const moment = require('moment'); 

const createrZalopay= async(req,res)=>{
  const {amount}= req.body
// APP INFO
const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};

const embed_data = {
};
const items = [{}];
const transID = Math.floor(Math.random() * 1000000);
const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`, 
    app_user: "user123",
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: 50000,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: "",
    callback_url:'locahost:8000/callback'
};

// appid|app_trans_id|appuser|amount|apptime|embeddata|item
const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
try {
    const respone = await axios.post(config.endpoint, null, { params: order })
    console.log(respone.data);
    
return res.status(200).json(respone.data)
} catch (error) {
    console.log(error)
    res.status(400).json(error)
}
}

module.exports={
    createrZalopay,
}