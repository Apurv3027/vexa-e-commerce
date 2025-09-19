function CategoryComponents() {
    return (
        <section className="px-8 py-12">
            <h3 className="text-2xl font-bold mb-6">Shop by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
                {["Chair", "Bed", "Sofa", "Accessories"].map((cat) => (
                    <div
                        key={cat}
                        className="bg-white shadow-md rounded-lg p-6 text-center hover:scale-105 transform transition"
                    >
                        <h4 className="text-xl font-semibold">{cat}</h4>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoryComponents;