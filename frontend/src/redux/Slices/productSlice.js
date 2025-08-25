import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch products by filters
export const fetchproductbyfilters = createAsyncThunk(
  "products/fetchproductbyfilters",
  async ({
    collections,
    sizes,
    colors,
    minprice,
    maxprice,
    sortby,
    search,
    category,
    material,
    brand,
    dimensions,
    limit,
  }) => {
    const query = new URLSearchParams();

    if (collections) query.append("collections", collections);
    if (sizes) query.append("sizes", sizes);
    if (colors) query.append("colors", colors);
    if (category) query.append("category", category);
    if (dimensions) query.append("dimension", dimensions);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (search) query.append("search", search);
    if (sortby) query.append("sortby", sortby);
    if (minprice != null) query.append("minprice", minprice);
    if (maxprice != null) query.append("maxprice", maxprice);
    if (limit) query.append("limit", limit);

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`;
    const response = await axios.get(url);
    return response.data;
  }
);

// Fetch single product details
export const fetchproductdetails = createAsyncThunk(
  "products/fetchproductdetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

// Fetch similar products
export const fetchsimilarproducts = createAsyncThunk(
  "products/fetchsimilarproducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

// Update product
export const updateproduct = createAsyncThunk(
  "products/updateproduct",
  async ({ id, productdata }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productdata,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      }
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedproduct: null,
    similarproducts: [],
    loading: false,
    error: null,
    filters: {
      collections: "",
      sizes: "",
      colors: "",
      minprice: "",
      maxprice: "",
      sortby: "",
      search: "",
      category: "",
      material: "",
      brand: "",
      dimensions: "",
    },
  },
  reducers: {
    setfilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearfilters: (state) => {
      state.filters = {
        collections: "",
        sizes: "",
        colors: "",
        minprice: "",
        maxprice: "",
        sortby: "",
        search: "",
        category: "",
        material: "",
        brand: "",
        dimensions: "",
      };
    },
  },
  extraReducers: (builder) => {
    // fetchproductbyfilters
    builder
      .addCase(fetchproductbyfilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductbyfilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchproductbyfilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // fetchproductdetails
    builder
      .addCase(fetchproductdetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchproductdetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedproduct = action.payload;
      })
      .addCase(fetchproductdetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // fetchsimilarproducts
    builder
      .addCase(fetchsimilarproducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchsimilarproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarproducts = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchsimilarproducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // updateproduct
    builder
      .addCase(updateproduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateproduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) state.products[index] = updatedProduct;
      })
      .addCase(updateproduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setfilters, clearfilters } = productSlice.actions;
export default productSlice.reducer;
