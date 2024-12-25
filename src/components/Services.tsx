import { Truck, Shield, Clock, CreditCard } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Dedicated support"
    },
    {
      icon: CreditCard,
      title: "Easy Returns",
      description: "30 days return policy"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center space-y-4 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif font-medium text-lg">{service.title}</h3>
              <p className="text-foreground/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};