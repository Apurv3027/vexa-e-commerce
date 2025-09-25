import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoryDetail() {
    const { categoryId } = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleProductCardClick = (productID) => {
        navigate(`/products/${productID}`);
    };

    useEffect(() => {
         // Scroll to top
        window.scrollTo(0, 0);

        fetch("/data/products.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch category data");
                }
                return res.json();
            })
            .then((data) => {
                // Filter products matching categoryId
                const productsInCategory = data.filter(
                    (item) => item.category === categoryId
                );

                if (productsInCategory.length > 0) {
                    setCategoryData({
                        name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
                        description: `All ${categoryId} products available here.`,
                        products: productsInCategory,
                    });
                } else {
                    setCategoryData(null);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [categoryId]);

    if (loading) {
        return <div className="p-4 text-center">Loading category details...</div>;
    }

    if (!categoryData) {
        return (
            <div className="p-4 text-center text-red-500">Category not found.</div>
        );
    }

    if (!categoryData.products || categoryData.products.length === 0) {
        return (
            <div className="p-4 text-center text-red-500">Products not found.</div>
        );
    }



    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
                    {categoryData.name}
                </h1>
                <p className="text-lg text-gray-600 mb-6">{categoryData.description}</p>

                <h2 className="text-2xl font-bold mb-3 text-gray-700">
                    Products in this Category:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryData.products.map((productItem) => {
                        return (
                            <div
                                key={productItem.id}
                                className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition cursor-pointer"
                            >
                                <img
                                    src={`${productItem.image}`}
                                    alt={`Product ${productItem.id}`}
                                    className="rounded-lg h-48 w-full object-fill"
                                    onClick={() => handleProductCardClick(productItem.id)}
                                />
                                <h4 className="mt-4 font-bold">{productItem.title}</h4>
                                <p className="text-black-600 mt-1">Price: ₹{productItem.price}</p>
                                <h6 className="text-black-600 mt-1">{productItem.description}</h6>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CategoryDetail;