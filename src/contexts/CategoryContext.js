import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategoryById = async (categoryId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching category:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/categories/");
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, fetchCategoryById }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryProvider;