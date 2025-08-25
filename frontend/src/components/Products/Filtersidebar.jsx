import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Filtersidebar() {
  const [searchparams, setsearchparams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setfilters] = useState({
    category: "",
    // room: "",
    colors: "",
    material: [],
    brand: [],
    dimensions: "", // added dimension filter
    minprice: 0,
    maxprice: 100000,
  });

  const [pricerange, setpricerange] = useState([0, 100000]);

  const category = ["Sofa", "Bed", "Chair", "Table", "Wardrobe"];
  // const rooms = ["Living Room", "Bedroom", "Dining Room", "Office"];
  const colors = ["Brown", "Black", "White", "Gray", "Beige"];
  const materials = ["Wood", "Metal", "Plastic", "Glass", "Leather"];
  const brands = ["UrbanWood", "Godrej", "IKEA", "HomeTown", "Pepperfry"];
  const dimensions = ["2-Seater", "3-Seater", "4-Seater"]; // dimension options

  // Initialize filters from URL params
  useEffect(() => {
    const params = Object.fromEntries([...searchparams]);
    setfilters({
      category: params.category || "",
      // room: params.room || "",
      colors: params.colors || "",
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      dimensions: params.dimensions || "",
      minprice: parseInt(params.minprice) || 0,
      maxprice: parseInt(params.maxprice) || 100000,
    });
    setpricerange([
      parseInt(params.minprice) || 0,
      parseInt(params.maxprice) || 100000,
    ]);
  }, [searchparams]);

  // Handle filter changes
  const handlefilterchange = (e) => {
    const { name, value, checked, type } = e.target;
    let newfilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newfilters[name] = [...newfilters[name], value];
      } else {
        newfilters[name] = newfilters[name].filter((item) => item !== value);
      }
    } else {
      newfilters[name] = value;
    }

    if (name === "pricerange") {
      const newPrice = parseInt(value);
      newfilters.maxprice = newPrice;
      setpricerange([0, newPrice]);
    }

    setfilters(newfilters);
    updateurlparams(newfilters);
  };

  const updateurlparams = (newfilters) => {
    const params = new URLSearchParams();

    Object.keys(newfilters).forEach((key) => {
      const value = newfilters[key];
      if (Array.isArray(value) && value.length > 0) {
        params.append(key, value.join(","));
      } else if (!Array.isArray(value) && value !== "") {
        params.append(key, value);
      }
    });

    setsearchparams(params);
    navigate(`?${params.toString()}`);
  };

  const handlepricechange = (e) => {
    const newPrice = e.target.value;
    setpricerange([0, newPrice]);
    const newfilters = { ...filters, minprice: 0, maxprice: newPrice };
    setfilters(newfilters);
    updateurlparams(newfilters);
  };

  return (
    <div className="w-full md:w-64 p-4 border-r border-gray-300 max-h-[90vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Category</h3>
        {category.map((cat) => (
          <label key={cat} className="block">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filters.category === cat}
              onChange={handlefilterchange}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Room Filter */}
      {/* <div className="mb-4">
        <h3 className="font-semibold">Room</h3>
        {rooms.map((room) => (
          <label key={room} className="block">
            <input
              type="radio"
              name="room"
              value={room}
              checked={filters.room === room}
              onChange={handlefilterchange}
              className="mr-2"
            />
            {room}
          </label>
        ))}
      </div> */}

      {/* Dimension/Size Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Size</h3>
        {dimensions.map((dim) => (
          <label key={dim} className="block">
            <input
              type="radio"
              name="dimensions"
              value={dim}
              checked={filters.dimensions === dim}
              onChange={handlefilterchange}
              className="mr-2"
            />
            {dim}
          </label>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Color</h3>
        {colors.map((color) => (
          <label key={color} className="flex items-center space-x-2 mb-1">
            <input
              type="radio"
              name="colors"
              value={color}
              checked={filters.colors === color}
              onChange={handlefilterchange}
              className="mr-2"
            />
            <span
              className="w-4 h-4 rounded-full inline-block"
              style={{ backgroundColor: color.toLowerCase(), border: "1px solid #000" }}
            ></span>
            <span>{color}</span>
          </label>
        ))}
      </div>

      {/* Material Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Material</h3>
        {materials.map((material) => (
          <label key={material} className="block">
            <input
              type="checkbox"
              name="material"
              value={material}
              checked={filters.material.includes(material)}
              onChange={handlefilterchange}
              className="mr-2"
            />
            {material}
          </label>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Brand</h3>
        {brands.map((brand) => (
          <label key={brand} className="block">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filters.brand.includes(brand)}
              onChange={handlefilterchange}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h3 className="font-semibold">Price Range</h3>
        <input
          type="range"
          name="pricerange"
          min="0"
          max="100000"
          value={pricerange[1]}
          onChange={handlepricechange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>₹{pricerange[0]}</span>
          <span>₹{pricerange[1]}</span>
        </div>
      </div>
    </div>
  );
}

export default Filtersidebar;
