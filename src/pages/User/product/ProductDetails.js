import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { ProductContext } from "../../../contexts/ProductContext";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
    const { t } = useTranslation();
    const { productId } = useParams();
    const { addToCart, cart, increaseAmount, decreaseAmount } = useContext(CartContext);
    const { fetchProductById } = useContext(ProductContext);

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductData = async () => {
            if (productId) {
                setLoading(true);
                try {
                    const data = await fetchProductById(productId);
                    if (data && data.product) {
                        setProductData(data.product);
                    }
                } catch (error) {
                    console.error("Error fetching product data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProductData();

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [productId, fetchProductById]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <div className="mt-4">Loading...</div>
                </div>
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-500">Product not found</div>
            </div>
        );
    }

    const cartItem = cart.find((item) => item.id === productData.id);
    const isInCart = !!cartItem;

    return (
        <section className="py-8 md:py-16 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="flex-1 flex justify-center items-center">
                        <img
                            className="w-full max-w-[300px] lg:max-w-[400px] object-contain"
                            src={productData.image}
                            alt={productData.title}
                        />
                    </div>

                    {/* Product Info Section */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-2xl lg:text-3xl font-medium mb-4 leading-tight">
                            {productData.title}
                        </h1>
                        <div className="text-2xl lg:text-3xl text-red-500 font-medium mb-6">
                            ₹ {productData.price}
                        </div>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {productData.description}
                        </p>

                        {!isInCart ? (
                            <button
                                onClick={() => addToCart(productData, productData._id)}
                                className='bg-primary py-4 px-8 text-white rounded-md hover:bg-primary/80 transition font-medium'
                            >
                                {t("common.addToCart")}
                            </button>
                        ) : (
                            <div className="flex items-center gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => decreaseAmount(productData._id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition w-12"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold min-w-[40px] text-center">
                                    {cartItem.amount}
                                </span>
                                <button
                                    onClick={() => increaseAmount(productData._id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition w-12"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;