const Product = require('../models/Product')

const createproduct = async (req, res) => {
  try {
    const {
      name, description, price, discountPrice, countInStock, sku,
      category, brand, sizes, colors, collections, material, images,
      isFeatured, isPublished, rating, numReviews, tags,
      metaTitle, metaDescription, metaKeywords, dimensions
    } = req.body;

    const product = new Product({
      name, description, price, discountPrice, countInStock, sku,
      category, brand, sizes, colors, collections, material, images,
      isFeatured, isPublished, rating, numReviews, tags,
      metaTitle, metaDescription, metaKeywords, dimensions,
      user: req.user._id
    });

    const create_product = await product.save();
    res.status(201).json(create_product);
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};

const updateproduct = async (req, res) => {
  try {
    const {
      name, description, price, discountPrice, countInStock, sku,
      category, brand, sizes, colors, collections, material, images,
      isFeatured, isPublished, rating, numReviews, tags,
      metaTitle, metaDescription, metaKeywords, dimensions
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.sku = sku || product.sku;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.images = images || product.images;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
    product.rating = rating !== undefined ? rating : product.rating;
    product.numReviews = numReviews !== undefined ? numReviews : product.numReviews;
    product.tags = tags || product.tags;
    product.metaTitle = metaTitle || product.metaTitle;
    product.metaDescription = metaDescription || product.metaDescription;
    product.metaKeywords = metaKeywords || product.metaKeywords;
    product.dimensions = dimensions || product.dimensions;

    const updatedproduct = await product.save();
    res.status(200).json(updatedproduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
};

const deleteproduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send('server error');
  }
};

const getproducts = async (req, res) => {
  try {
    const {
      collections, colors, sizes, minprice, maxprice, sortby, search,
      category, material, brand, room, limit
    } = req.query;

    let query = {};
    let sort = {};

    if (collections && collections.toLowerCase() !== "all") query.collections = collections;
    if (category && category.toLowerCase() !== "all") query.category = category;
    if (brand) query.brand = { $in: brand.split(",") };
    if (material) query.material = { $in: material.split(",") };
    if (room && room.toLowerCase() !== "all") query.room = room;
    if (colors) query.colors = { $in: colors.split(",") };
    if (sizes) query.sizes = { $in: sizes.split(",") };

    if (minprice || maxprice) {
      query.price = {};
      if (minprice) query.price.$gte = Number(minprice);
      if (maxprice) query.price.$lte = Number(maxprice);
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { name: { $regex: regex } },
        { brand: { $regex: regex } },
        { colors: { $in: [regex] } },
        { sizes: { $in: [regex] } },
      ];
    }

    // Sorting
    
    if (sortby) {
      switch (sortby) {
        case "priceasc":
          sort = { price: 1 };
          break;
        case "pricedesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          sort = {};
          break;
      }
    }

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 30);

    res.json(products);

  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};



const getsimilarproduct = async (req,res) =>
{
    try{
      const {id} = req.params;
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const similarProducts = await Product.find({
        _id: { $ne: product._id },
        category: product.category
      }).limit(4);

      res.json(similarProducts);

    }catch(err)
    {
      console.error(err);
      res.status(500).send('server error');
    }
}



const getbestproduct  = async (req,res) =>
{
  try{
    const bestseller = await Product.findOne().sort({rating:-1})
    if(bestseller)
    {
      res.json(bestseller)
    }
    else{
      res.status(404).json({
        message:"no best seller found"
      })
    }

  }catch(err)
  {
      console.error(err)
      res.status(500).send('server error')
  }
}

const latestuploadedproduct = async (req,res) =>
{
  try{
    const newarrivals =   await Product.find().sort({createdAt:-1}).limit(8)
    res.json(newarrivals)
  }catch(err)
  {
    console.error(err)
    res.status(500).json({
      meassage:"server errror"
    })

  }
}

module.exports = {
  createproduct,
  updateproduct,
  deleteproduct,
  getproducts,
  getproduct,
  getsimilarproduct,
  getbestproduct,
  latestuploadedproduct
};
