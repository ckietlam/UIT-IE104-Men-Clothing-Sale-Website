import productService from "../services/productService";

let getProductViewAll = async (req, res) => {
  try {
    let shirtsData = await productService.getAllShirts();
    let pantsData = await productService.getAllPants();
    let shoesData = await productService.getAllShoes();
    let accessoriesData = await productService.getAllAccessories();
    console.log("Noah check shirts Data: ", shirtsData);
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
module.exports = {
  getProductViewAll,
};
