import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function CategoryComponents({ categories }) {

    const { t } = useTranslation();

    return (
        <section className="px-8 py-8">
            {/* Title */}
            <div className="flex items-center justify-between mb-6 animate-slideUp">
                <h3 className="text-2xl font-bold">{t("categories.title")}</h3>
            </div>

            {/* Scrollable Categories */}
            <div className="flex overflow-x-auto p-4 space-x-6 no-scrollbar">
                {categories.map((item, index) => (
                    <Link
                        key={index}
                        to={`/category/${item.name}`}
                        className="flex-none bg-white shadow-md rounded-xl min-w-[200px] text-center group 
                       transform transition duration-500 
                       hover:-rotate-1 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl animate-slideUp"
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-60 object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Name */}
                        <div className="pb-4">
                            <h4 className="font-semibold text-lg">{t(`categories.${item.name.toLowerCase()}`)}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

    );
}

export default CategoryComponents;