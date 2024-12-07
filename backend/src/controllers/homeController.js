import productService from "../services/productService";

let getProductViewAll = async (req, res) => {
  try {
    let shirtsData = await productService.getAllShirts(5);
    let pantsData = await productService.getAllPants(5);
    let shoesData = await productService.getAllShoes(5);
    let accessoriesData = await productService.getAllAccessories(5);
    return res.render("pages/product-view-all", {
      shirtsData: shirtsData,
      pantsData: pantsData,
      shoesData: shoesData,
      accessoriesData: accessoriesData,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllGiayDep = async (req, res) => {
  try {
    let giayData = await productService.getAllProductsByType("Sneakers");
    let depData = await productService.getAllProductsByType("Sandals");
    return res.render("pages/product-view-all-giaydep", {
      giayData: giayData,
      depData: depData
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllAo = async (req, res) => {
  try {
    let aoThunData = await productService.getAllProductsByType("Tees");
    let aoNiData = await productService.getAllProductsByType("Sweats");
    let aoSoMiData = await productService.getAllProductsByType("Shirts");
    return res.render("pages/product-view-all-ao", {
      aoThunData: aoThunData,
      aoNiData: aoNiData,
      aoSoMiData: aoSoMiData
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllQuan = async (req, res) => {
  try {
    let jeansData = await productService.getAllProductsByType("Jeans");
    let shortsData = await productService.getAllProductsByType("Shorts");
    return res.render("pages/product-view-all-quan", {
      jeansData: jeansData,
      shortsData: shortsData,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getProductViewAllPhuKien = async (req, res) => {
  try {
    let boxersData = await productService.getAllProductsByType("Boxers");
    let socksData = await productService.getAllProductsByType("Socks");
    let hatsData = await productService.getAllProductsByType("Hats");
    return res.render("pages/product-view-all-phukien", {
      boxersData: boxersData,
      socksData: socksData,
      hatsData: hatsData
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getProductViewAll,
  getProductViewAllGiayDep,
  getProductViewAllAo,
  getProductViewAllQuan,
  getProductViewAllPhuKien
};
