import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen pt-16 flex items-center bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              New Collection 2024
            </span>
            <h1 className="hero-title">
              Discover the Art of Dressing Up
            </h1>
            <p className="text-lg text-foreground/80 max-w-md">
              Elevate your style with our curated collection of timeless pieces designed for the modern individual.
            </p>
            <button className="btn-primary flex items-center gap-2 group">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="relative animate-fade-in">
            <img
              src="/lovable-uploads/12953fea-e1c3-468e-8ac0-1e6850517d9c.png"
              alt="Fashion Model"
              className="w-full h-[600px] object-cover rounded-lg hover-scale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};