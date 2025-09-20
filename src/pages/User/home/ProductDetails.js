import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails({ cart, addToCart, removeFromCart }) {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        fetch("/data/products.json")
            .then(res => res.json())
            .then(data => {
                const found = data.find(p => p.id === parseInt(productId));
                setProduct(found);
            });
    }, [productId]);

    if (!product) {
        return <div>Loading product details...</div>;
    }

    // Check if this product is already in the cart
    const isInCart = cart.some(item => item.id === product.id);

    return (
        <div className="p-8">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <img
                    src={product.image}
                    alt={product.title}
                    className="rounded-lg w-full h-96 object-fill" />
                <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-600">{product.category}</p>
                <p className="text-2xl font-semibold mt-2">₹{product.price}</p>
                <p className="text-sm font-normal mt-2">
                    M.R.P.: <span className="line-through">₹{product.oldPrice}</span>
                </p>

                {isInCart ? (
                    <div className="mt-6 flex items-center justify-center space-x-6 border-2 border-blue-600 rounded-lg px-4 py-2 w-40">
                        {/* Remove button (Trash) */}
                        <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-black text-xl"
                        >
                            🗑
                        </button>

                        {/* Quantity */}
                        <span className="font-bold">{cart.find(item => item.id === product.id)?.quantity || 1}</span>

                        {/* Add button (+) */}
                        <button
                            onClick={() => addToCart(product)}
                            className="text-black text-xl"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => addToCart(product)}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;