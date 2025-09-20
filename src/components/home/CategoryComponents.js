function CategoryComponents({ categories }) {
    return (
        <section className="px-8 py-12">
            <h3 className="text-2xl font-bold mb-6">Shop by Category</h3>
            <div className="flex overflow-x-auto p-4 space-x-4 cursor-pointer no-scrollbar">
                {categories.map((item, index) => (
                    <div key={index} className="flex-none bg-white shadow-md p-6 rounded-lg min-w-[200px] text-center hover:scale-105 transform transition">
                        {item.name}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoryComponents;