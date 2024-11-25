import categoryService from "../services/categoryService";
let getAdmin = async (req, res) => {
  return res.render("pages/admin", {
    message: null,
  });
};
let getCategoryManagementPage = async (req, res) => {
  try {
    let data = await categoryService.getAllCategories("ALL");
    return res.render("pages/category-management", {
      dataTable: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getEditCategoryPage = async (req, res) => {
  try {
    let categoryId = req.query.pd_id;
    if (categoryId) {
      let data = await categoryService.getAllCategories(categoryId);
      let categoriesData = await categoryService.getAllCategories();
      let imagesData = await categoryService.getAllImagesById(categoryId);
      let images = "";
      if (imagesData.data) {
        images = imagesData.data.map((item, index) => ({
          image_id: item.image_id,
          image: Buffer.from(item.image, "base64").toString("binary"),
        }));
      }
      return res.render("pages/edit-category", {
        categoryData: data,
        categoriesData: categoriesData.data,
        imagesData: images,
      });
    } else {
      return res.send("Category not found!");
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAddCategoryPage = async (req, res) => {
  try {
    let categoriesData = await categoryService.getAllCategories();
    return res.render("pages/add-category", {
      categoriesData: categoriesData.data,
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
  getAdmin,
  getCategoryManagementPage,
  getEditCategoryPage,
  getAddCategoryPage,
};
