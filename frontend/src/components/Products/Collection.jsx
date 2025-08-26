import React from 'react';
import { Link } from 'react-router-dom';

import img2 from '../../images/img2.jpg';
import img3 from '../../images/img3.jpg';
import img4 from '../../images/img4.jpg';
import img5 from '../../images/img5.jpg';
import interior from '../../images/interior.jpg';
import img6 from '../../images/1.jpg';

const collections = [
  { name: "Living Room", image: img2, link: "/collections/all?collections=livingroom" },
  { name: "Bedroom", image: img3, link: "/collections/all?collections=Bedroom" },
  { name: "Dining Room", image: img4, link: "/collections/all?collections=Diningroom" },
  { name: "Office", image: img5, link: "/collections/all?collections=Office" },
  { name: "Kids Room", image: interior, link: "/collections/all?collections=Office" },
  { name: "Outdoor", image: img6, link: "/collections/all?collections=Wooden" },
];

function Collection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((item, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-md group">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h2>
              <Link
                to={item.link}
                className="text-gray-900 underline hover:text-black transition"
              >
                Shop now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Collection;
