// import { useState, useEffect } from 'react';
import HeaderComponents from "../../components/HeaderComponents";
import FooterComponents from "../../components/FooterComponents";
import { useEffect, useState } from "react";

function HomeScreen() {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("./data/products.json").then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(jsonData => {
            setProductData(jsonData);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <HeaderComponents />

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <h2 className="text-4xl md:text-6xl font-bold">Discover Your Style</h2>
                <p className="mt-4 text-lg md:text-xl">Shop the latest trends at unbeatable prices</p>
                <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg">
                    Shop Now
                </button>
            </section>

            {/* Categories */}
            {/* <section className="px-8 py-12">
                <h3 className="text-2xl font-bold mb-6">Shop by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {["Men", "Women", "Kids", "Accessories"].map((cat) => (
                        <div
                            key={cat}
                            className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transform transition"
                        >
                            <h4 className="text-xl font-semibold">{cat}</h4>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Featured Products */}
            <section className="px-8 py-12 bg-gray-100">
                <h3 className="text-2xl font-bold mb-6">Featured Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {/* {[1, 2, 3, 4].map((id) => (
                        <div
                            key={id}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
                        >
                            <img
                                src={`https://via.placeholder.com/300x200?text=Product+${id}`}
                                alt={`Product ${id}`}
                                className="rounded-lg"
                            />
                            <h4 className="mt-4 font-semibold">Product {id}</h4>
                            <p className="text-gray-600">₹99.00</p>
                            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                                Add to Cart
                            </button>
                        </div>
                    ))} */}

                    {productData.map(productItem => (
                        <div key={productItem.id}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition">
                            <img src={`${productItem.thumbnail}`}
                                alt={`Product ${productItem.id}`}
                                className="rounded-lg" />
                            <h4 className="mt-4 font-bold">{productItem.title}</h4>
                            <h6>{productItem.category}</h6>
                            <p className="text-gray-600">₹{productItem.price}</p>
                            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <FooterComponents />
        </div>
    );
}

export default HomeScreen;