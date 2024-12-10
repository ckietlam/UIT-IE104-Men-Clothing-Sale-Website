import cartService from "../services/cartService";
let handleGetCartByUserId = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameter",
        cart: [],
      });
    }
    let cart = await cartService.getCartByUserId(req.query.user_id);
    return res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};
let handleAddCart = async (req, res) => {
  try {
    let response = await cartService.addCart(req.body);
    const referrer = req.get('referer') || '/'; // Default to home if no referrer
    return res.redirect(referrer);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};
let handleUpdateCart = async (req, res) => {
  try {
    let response = await cartService.updateCart(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

let handleDeleteCart = async (req, res) => {
  try {
    if (!req.body.pd_id || !req.body.user_id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let response = await cartService.deleteCart(
      req.body.pd_id,
      req.body.user_id
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

let handleClearCart = async (req, res) => {
  try {
    if (!req.body.user_id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let response = await cartService.clearCart(req.body.user_id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};

const handleCheckEmptyCart = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let response = await cartService.checkEmptyCart(req.query.user_id);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server!",
    });
  }
};
module.exports = {
  handleAddCart,
  handleGetCartByUserId,
  handleUpdateCart,
  handleDeleteCart,
  handleClearCart,
  handleCheckEmptyCart
};