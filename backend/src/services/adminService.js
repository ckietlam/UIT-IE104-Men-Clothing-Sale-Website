import db from "../models/index";

const getAllUsers = async (role) => {
    try {
        if (!role) {
            throw new Error("Role is required.");
        }
        const userCount = await db.User.count({ where: { role } });
        return userCount;
    } catch (error) {
        console.error("Error fetching users:", error.message);
        throw error;
    }
};

const getTotalOrders = async () => {
    try {
        const Status = "Delivered";
        const orderCount = await db.Order.count({ where: { Status } });
        return orderCount;
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw error;
    }
}

const getTotalRevenue = async () => {
    try {
    const Status = "Delivered";
      const revenue = await db.Order.sum('cost', {
        where: { status: Status }, 
      });
      return revenue;
    } catch (error) {
      console.error("Error fetching revenue:", error.message);
      throw error;
    }
  };
const getTotalProduct = async () => {
    try {
        const productCount = await db.Product.count();
        return productCount;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw error;
    }
}
module.exports ={ 
getAllUsers,
getTotalOrders,
getTotalRevenue,
getTotalProduct
};
