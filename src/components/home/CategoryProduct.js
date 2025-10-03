import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import Product from "./Product";

const CategoryProduct = () => {
    const { categoryName } = useParams();
    const { products } = useContext(ProductContext);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [categoryName]);

    const filteredProducts = products.filter(
        (item) => item.category.toLowerCase() === categoryName.toLowerCase()
    );

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-semibold mb-10 text-center capitalize">
                {categoryName}
            </h1>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[30px]">
                    {filteredProducts.map((product) => (
                        <Product product={product} key={product.id} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No products found in this category.</p>
            )}
        </div>
    );
};

export default CategoryProduct;