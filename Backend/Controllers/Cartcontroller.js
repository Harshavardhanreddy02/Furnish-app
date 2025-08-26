const Cart = require('../models/Cart')
const Product = require('../models/Product')

// Helper function to normalize dimensions
const normalizeDimensions = (dimensions) => {
  if (!dimensions) return {};
  
  if (typeof dimensions === 'object') {
    return dimensions;
  }
  
  if (typeof dimensions === 'string') {
    try {
      return JSON.parse(dimensions);
    } catch (e) {
      // If it's not JSON, treat it as a simple value
      return { value: dimensions };
    }
  }
  
  return {};
};

// Helper function to compare dimensions
const areDimensionsEqual = (dim1, dim2) => {
  const normDim1 = normalizeDimensions(dim1);
  const normDim2 = normalizeDimensions(dim2);
  
  if (Object.keys(normDim1).length !== Object.keys(normDim2).length) {
    return false;
  }
  
  for (const key in normDim1) {
    if (normDim1[key] !== normDim2[key]) {
      return false;
    }
  }
  
  return true;
};

// Get cart by user or guest
const getcart = async (userid, guestid) => {
  if (userid) {
    return await Cart.findOne({ user: userid });
  } else if (guestid) {
    return await Cart.findOne({ guestid: guestid });
  }
  return null;
};

// Add item to cart
const additemtocart = async (req, res) => {
  let { productid, quantity, sizes, dimensions, colors, guestid, userid } = req.body;

  try {
    quantity = Number(quantity) || 1;

    const product = await Product.findById(productid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Normalize dimensions
    const dimensionObj = normalizeDimensions(dimensions);

    let cart = await getcart(userid, guestid);

    if (cart) {
      const productIndex = cart.products.findIndex(
        p =>
          p.productid.toString() === productid &&
          p.sizes === sizes &&
          p.colors === colors &&
          areDimensionsEqual(p.dimensions, dimensionObj)
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productid,
          name: product.name,
          images: product.images?.[0]?.url || "", // Changed from 'image' to 'images'
          price: Number(product.price),
          sizes,
          colors,
          quantity,
          dimensions: dimensionObj
        });
      }

      cart.totalprice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json({ message: "Item added to cart", cart });
    } else {
      const newcart = await Cart.create({
        user: userid || null,
        guestid: guestid || "guest_" + new Date().getTime(),
        products: [{
          productid,
          name: product.name,
          images: product.images?.[0]?.url || "", // Changed from 'image' to 'images'
          price: Number(product.price),
          sizes,
          colors,
          quantity,
          dimensions: dimensionObj
        }],
        totalprice: Number(product.price) * quantity
      });

      return res.status(200).json({ message: "New cart created", cart: newcart });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update cart item quantity
const updatecart = async (req, res) => {
  const { productid, quantity, sizes, dimensions, colors, guestid, userid } = req.body;

  try {
    let cart = await getcart(userid, guestid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const dimensionObj = normalizeDimensions(dimensions);

    const productIndex = cart.products.findIndex(
      p =>
        p.productid.toString() === productid &&
        p.sizes === sizes &&
        p.colors === colors
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products[productIndex].quantity = Number(quantity);

    cart.totalprice = cart.products.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    await cart.save();
    return res.status(200).json({ message: "Cart updated", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete cart item
const deletecart = async (req, res) => {
  const { productid, sizes, dimensions, colors, guestid, userid } = req.body;

  try {
    let cart = await getcart(userid, guestid);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const dimensionObj = normalizeDimensions(dimensions);

    const productIndex = cart.products.findIndex(
      p =>
        p.productid.toString() === productid &&
        p.sizes === sizes &&
        p.colors === colors
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.products.splice(productIndex, 1);

    cart.totalprice = cart.products.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    await cart.save();
    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get cart items
const getcartitems = async (req, res) => {
  const userid = req.body?.userid || req.query?.userid;
  const guestid = req.body?.guestid || req.query?.guestid;

  try {
    const cart = await getcart(userid, guestid);
    if (!cart) {
      // Return empty cart instead of 404
      return res.status(200).json({ 
        cart: {
          products: [],
          totalprice: 0,
          user: userid || null,
          guestid: guestid || null
        }
      });
    }
    return res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Merge guest cart into user cart
const mergecart = async (req, res) => {
  const { guestid } = req.body;

  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const guestcart = await Cart.findOne({ guestid });
    const usercart = await Cart.findOne({ user: req.user._id });

    if (!guestcart) {
      if (usercart) return res.status(200).json({ message: "User cart already exists", cart: usercart });
      return res.status(404).json({ message: "No cart found" });
    }

    if (guestcart.products.length === 0) {
      return res.status(200).json({ message: "No products in guest cart" });
    }

    if (usercart) {
      // Merge guest products into user cart
      guestcart.products.forEach(product => {
        const userProductIndex = usercart.products.findIndex(p =>
          p.productid.toString() === product.productid.toString() &&
          p.sizes === product.sizes &&
          p.colors === product.colors &&
          areDimensionsEqual(p.dimensions, product.dimensions)
        );

        if (userProductIndex !== -1) {
          usercart.products[userProductIndex].quantity += product.quantity;
        } else {
          usercart.products.push(product);
        }
      });

      usercart.totalprice = usercart.products.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
      );

      await usercart.save();
      await Cart.findOneAndDelete({ guestid });

      return res.status(200).json({ message: "Cart merged successfully", cart: usercart });
    } else {
      // Assign guest cart to user
      guestcart.user = req.user._id;
      guestcart.guestid = null;
      await guestcart.save();
      return res.status(200).json({ message: "Guest cart assigned to user", cart: guestcart });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { additemtocart, updatecart, deletecart, getcartitems, mergecart };