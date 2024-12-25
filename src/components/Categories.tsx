export const Categories = () => {
  const categories = [
    {
      title: "Formal Woman",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      link: "#"
    },
    {
      title: "Casual Style",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      link: "#"
    },
    {
      title: "Formal Men",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      link: "#"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Shop by Category</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] hover-scale"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-6 left-6 text-white font-serif text-2xl">
                {category.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};