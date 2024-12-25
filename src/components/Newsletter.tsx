export const Newsletter = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="section-title text-white">Join Our Newsletter</h2>
          <p className="text-white/80">
            Subscribe to our newsletter and get 10% off your first purchase
          </p>
          
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button type="submit" className="btn-secondary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};