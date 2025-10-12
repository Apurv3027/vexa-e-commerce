import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";
import CategoryProduct from "../../../components/home/CategoryProduct";
import Category from "../../../components/home/Category";

const CategoryProductScreen = () => {
    const { categoryId } = useParams();
    const { fetchCategoryById } = useContext(CategoryContext);

    const [categoryData, setCategoryData] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchCategoryData = async () => {
            if (categoryId) {
                setLoading(true);
                try {
                    const data = await fetchCategoryById(categoryId);
                    if (data && data.category) {
                        setCategoryData(data.category);
                        setCategoryProducts(data.products || []);
                    }
                } catch (error) {
                    console.error("Error fetching category data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchCategoryData();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [categoryId, fetchCategoryById]);

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!categoryData) {
        return (
            <div className="container mx-auto py-10">
                <div className="text-center text-red-500">Category not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-semibold mb-10 text-center capitalize">
                {categoryData.name}
            </h1>

            {categoryData.description && (
                <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                    {categoryData.description}
                </p>
            )}

            {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
                    {categoryProducts.map((product) => (
                        <CategoryProduct product={product} key={product._id} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">
                    No products found in this category.
                </p>
            )}
            <h1 className="text-3xl font-semibold mb-10 mt-16 text-center">Categories</h1>
            <Category />
        </div>
    );
};

export default CategoryProductScreen;