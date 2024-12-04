import db from "../models/index";
let getAllProducts = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = "";
      if (productId === "ALL") {
        products = await db.Product.findAll({
          include: [
            {
              model: db.Category,
              as: "categoryData",
              attributes: ["name"],
              raw: false,
            },
          ],
          raw: false,
          nest: true,
        });
      }
      if (productId && productId !== "ALL") {
        products = await db.Product.findOne({
          where: { pd_id: productId },
          include: [
            {
              model: db.Category,
              as: "categoryData",
              attributes: ["name"],
            },
            {
              model: db.Image,
              as: "productImageData",
              attributes: ["image_id", "image"],
            },
          ],
          raw: false,
          nest: true,
        });
      }
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};
let createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.price) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      } else {
        let product = await db.Product.create({
          name: data.name,
          price: data.price,
          type_of_clothes: data.type_of_clothes,
          description: data.description,
          cat_id: data.cat_id,
          size: data.size,
        });
        if (data.images) {
          let images = JSON.parse(data.images);
          await Promise.all(
            images.map((item, index) =>
              db.Image.create({
                pd_id: product.pd_id,
                image: item,
              })
            )
          );
        }
      }
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    let images = await db.Image.findOne({
      where: { pd_id: productId },
      raw: false,
    });
    if (images) {
      await db.Image.destroy({
        where: { pd_id: productId },
      });
    }
    let product = await db.Product.findOne({
      where: { pd_id: productId },
      raw: false,
    });
    if (!product) {
      resolve({
        errCode: 2,
        errMessage: `The product isn't exist`,
      });
    } else {
      await db.Product.destroy({
        where: { pd_id: productId },
      });
    }

    resolve({
      errCode: 0,
      message: `The product is deleted`,
    });
  });
};
let updateProductData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.pd_id ||
        !data.name ||
        !data.price ||
        !data.type_of_clothes ||
        !data.description ||
        !data.size ||
        !data.cat_id
      ) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let product = await db.Product.findOne({
        where: { pd_id: data.pd_id },
        raw: false,
      });
      if (product) {
        product.name = data.name;
        product.price = data.price;
        product.type_of_clothes = data.type_of_clothes;
        product.description = data.description;
        product.cat_id = data.cat_id;
        product.size = data.size;
        await product.save();
        resolve({
          errCode: 0,
          message: `Update the product succeeds!`,
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `Product's not found!`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.Category.findAll({
        raw: true,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      resolve({
        errCode: 0,
        data: categories,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllImagesById = (pd_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!pd_id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let data = await db.Image.findAll({
          where: { pd_id: pd_id },
          attributes: { exclude: ["createdAt", "updatedAt", "pd_id"] },
          raw: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteImage = (imageId) => {
  return new Promise(async (resolve, reject) => {
    let images = await db.Image.findOne({
      where: { image_id: imageId },
      raw: false,
    });
    if (images) {
      await db.Image.destroy({
        where: { image_id: imageId },
      });
    }
    resolve({
      errCode: 0,
      message: `The product is deleted`,
    });
  });
};
module.exports = {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  updateProductData,
  getAllCategories,
  getAllImagesById,
  deleteImage,
};