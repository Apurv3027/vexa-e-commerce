import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("../data/products.json");
            const data = await response.json();
            setProducts(data);

            // extract categories
            const uniqueCategories = [...new Set(data.map(item => item.category))];
            setCategories(uniqueCategories);
        };
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, categories }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;