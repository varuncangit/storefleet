import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async () => {
  return await ProductModel.find({});
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};

export const searchProductsRepo = async (query) => {
  const regex = new RegExp(query, 'i'); // 'i' for case insensitive

  return await ProductModel.find({
    $or: [
      { name: regex },
      { description: regex },
    ],
  });
};

// product.repository.js

export const filterProductsRepo = async (filters) => {
  let query = {};

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }

  if (filters.categories && filters.categories.length > 0) {
    query.category = { $in: filters.categories };
  }

  if (filters.minRating !== undefined || filters.maxRating !== undefined) {
    query.rating = {};
    if (filters.minRating !== undefined) {
      query.rating.$gte = filters.minRating;
    }
    if (filters.maxRating !== undefined) {
      query.rating.$lte = filters.maxRating;
    }
  }

  return await ProductModel.find(query);
};
