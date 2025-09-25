// import { useState, useEffect } from 'react';
import FooterComponents from "../../../components/home/FooterComponents";
import { useEffect, useState } from "react";
import CategoryComponents from "../../../components/home/CategoryComponents";
import FeaturedProductComponents from "../../../components/home/FeaturedProductComponents";
import { useTranslation } from "react-i18next";

function HomeScreen({ cart, addToCart, removeFromCart }) {

    const { t } = useTranslation();

    const [categoryData, setCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Category Data Fetching
        fetch("./data/categories.json").then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        }).then(jsonData => {
            setCategoryData(jsonData);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        });

        // Product Data Fetching
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
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <h2 className="text-4xl md:text-6xl font-bold">{t("hero.title")}</h2>
                <p className="mt-4 text-lg md:text-xl">{t("hero.subtitle")}</p>
                <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg">
                    {t("hero.button")}
                </button>
            </section>

            {/* Categories */}
            <CategoryComponents categories={categoryData} />

            {/* Featured Products */}
            <FeaturedProductComponents
                products={productData}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
            />

            {/* Footer */}
            <FooterComponents />
        </div>
    );
}

export default HomeScreen;