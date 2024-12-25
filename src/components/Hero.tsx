import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen pt-16 bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Summer Collection 2024
            </span>
            <h1 className="hero-title text-[2.75rem] md:text-[3.5rem] leading-tight">
              Discover Your <br />
              <span className="text-primary">Perfect Style</span>
            </h1>
            <p className="text-lg text-foreground/80 max-w-md">
              Shop the latest trends at unbeatable prices. New arrivals every day with free shipping on orders over $49.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary flex items-center gap-2 group bg-primary hover:bg-primary/90">
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary border border-primary/20 hover:border-primary/40">
                View Lookbook
              </button>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <img
              src="/lovable-uploads/12953fea-e1c3-468e-8ac0-1e6850517d9c.png"
              alt="Fashion Model"
              className="w-full h-[600px] object-cover rounded-lg hover-scale"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
              <p className="text-white text-xl font-medium">Up to 60% Off</p>
              <p className="text-white/80">Limited time offer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};