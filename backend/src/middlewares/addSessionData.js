import db from '../models/index.js';

const addSessionData = async (req, res, next) => {
    res.locals.isAuthenticated = req.session.authenticated || false;
    res.locals.user = req.session.user || null;
    res.locals.user_id = req.session.user_id || null;

    if (res.locals.isAuthenticated && res.locals.user_id) {
        try {
            // Fetch cart items from the database for the logged-in user
            const cartItems = await db.Cart_item.findAll({
                where: { user_id: res.locals.user_id },
                include: [
                    {
                        model: db.Product,
                        include: [
                            {
                                model: db.Image,
                                as: 'productImageData',
                                attributes: ['image_id', 'image']
                            }
                        ],
                        as: 'productCartData',
                        attributes: ['price', 'name', 'id']
                    }
                ],
                raw: false
            });

            // Transform cart items to a format suitable for frontend
            const transformedCartItems = cartItems.map(item => ({
                id: item.productCartData.id,
                name: item.productCartData.name,
                price: item.productCartData.price,
                quantity: item.quantity,
                image: item.productCartData.productImageData[0]?.image || null
            }));

            // Set cart in session and locals
            req.session.cart = transformedCartItems;
            res.locals.cart = transformedCartItems;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            
            // Fallback to empty cart if there's an error
            req.session.cart = [];
            res.locals.cart = [];
        }
    } else {
        // For non-authenticated users, use existing cart or initialize empty
        res.locals.cart = req.session.cart || [];
    }

    next();
};

export default addSessionData;
  