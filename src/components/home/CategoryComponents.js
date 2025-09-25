import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function CategoryComponents({ categories }) {

    const { t } = useTranslation();

    return (
        <section className="px-8 py-12">
            <h3 className="text-2xl font-bold mb-6">{t("categories.title")}</h3>
            <div className="flex overflow-x-auto p-4 space-x-4 cursor-pointer no-scrollbar">
                {/* <div className="flex justify-center overflow-x-auto p-4 space-x-4 cursor-pointer no-scrollbar"> */}
                {categories.map((item, index) => (
                    <Link
                        key={index}
                        to={`/category/${item.name}`}
                        className="flex-none bg-white shadow-md p-6 rounded-lg min-w-[200px] text-center hover:scale-105 transform transition">
                        {/* {item.name.charAt(0).toUpperCase() + item.name.slice(1)} */}
                        {t(`categories.${item.name.toLowerCase()}`)}
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CategoryComponents;