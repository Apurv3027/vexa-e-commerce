import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Category = () => {
    const { t } = useTranslation();

    const { categories } = useContext(CategoryContext);

    const getCategoryTranslationKey = (category) => {
        const mapping = {
            "Men’s Clothing": "mensClothing",
            "Jewelry": "jewelry",
            "Electronics": "electronics",
            "Women’s Clothing": "womensClothing",
        };
        return mapping[category] || category;
    };

    return (
        <div className="flex overflow-x-auto p-4 space-x-6 no-scrollbar mb-10">
            {categories.map((item, index) => (
                <Link
                    key={item._id || index}
                    to={`/category/${item._id}`}
                    className="flex-none bg-white shadow-md rounded-xl min-w-[200px] text-center group 
                                 transform transition duration-500 
                                 hover:-rotate-0 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                >
                    {/* Name */}
                    <div className="pb-4">
                        <h4 className="font-semibold text-lg">
                            {/* {t(`categories.${item.name}`)} */}
                            {/* {t(`categories.${item.name.replace(/\s+/g, '').replace(/’/g, '').toLowerCase()}`)} */}
                            {t(`categories.${getCategoryTranslationKey(item.name)}`)}
                        </h4>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Category;
