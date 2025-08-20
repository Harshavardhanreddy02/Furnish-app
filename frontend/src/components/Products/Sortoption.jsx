import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SortOption() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sort = e.target.value;

    if (sort) {
      searchParams.set("sort", sort);
    } else {
      searchParams.delete("sort");
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="my-4 flex items-center justify-end">
      <label htmlFor="sort" className="mr-2 font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={searchParams.get("sort") || ""}
        onChange={handleSortChange}
        className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      >
        <option value="">Default</option>
        <option value="priceasc">Price: Low to High</option>
        <option value="pricedesc">Price: High to Low</option>
        <option value="popularity">Most Popular</option>
      </select>
    </div>
  );
}

export default SortOption;
