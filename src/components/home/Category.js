import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";

const Category = () => {
    const { categories } = useContext(ProductContext);

    return (
        <div className="flex overflow-x-auto p-4 space-x-6 no-scrollbar mb-10">
            {categories.map((item, index) => (
                <Link
                    key={index}
                    to={`/category/${item}`}
                    className="flex-none bg-white shadow-md rounded-xl min-w-[200px] text-center group 
                                 transform transition duration-500 
                                 hover:-rotate-0 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                >
                    {/* Name */}
                    <div className="pb-4">
                        <h4 className="font-semibold text-lg">
                            {/* {item.toLowerCase()} */}
                            {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                        </h4>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Category;
