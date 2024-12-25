export const FeaturedProducts = () => {
  const products = [
    {
      name: "Classic White Dress",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
    },
    {
      name: "Navy Blue Suit",
      price: "$499.99",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
    },
    {
      name: "Silk Evening Gown",
      price: "$399.99",
      image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632"
    },
    {
      name: "Casual Blazer",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Featured Products</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="card overflow-hidden group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute bottom-4 left-4 right-4 btn-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Quick View
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-primary font-semibold mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};