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
    let giayData = await productService.getAllGiay();
    let depData = await productService.getAllDep();

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
    let aoThunData = await productService.getAllAoThun();
    let aoNiData = await productService.getAllAoNi();
    let aoSoMiData = await productService.getAllAoSoMi();
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

module.exports = {
  getProductViewAll,
  getProductViewAllGiayDep,
  getProductViewAllAo
};
