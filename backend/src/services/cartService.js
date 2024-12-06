import db from "../models/index";
let cartByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                cart = await db.Cart_item.findOne({
                    where: { user_id: userId },
                    include: [
                      {
                        model: db.Product,
                        as: "productCartData",
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
        } catch (e) {
            reject(e);
        }
    })
}