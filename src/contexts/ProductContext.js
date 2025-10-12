import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProductById = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching product:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products/");
                const data = await response.json();
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, fetchProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;