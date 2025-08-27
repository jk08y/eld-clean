import React from 'react';
import { Award, Leaf, Truck } from 'lucide-react';

const features = [
  {
    icon: <Award size={40} className="text-primary" />,
    title: 'Premium Quality',
    description: 'We source only the best ingredients for effective and reliable cleaning solutions.',
  },
  {
    icon: <Leaf size={40} className="text-primary" />,
    title: 'Eco-Friendly Options',
    description: 'A wide selection of green products that are safe for your family and the planet.',
  },
  {
    icon: <Truck size={40} className="text-primary" />,
    title: 'Fast Delivery in Kenya',
    description: 'Get your cleaning essentials delivered quickly to your doorstep, wherever you are.',
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-base-200 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Why Choose Eld Clean?</h2>
          <p className="text-lg text-neutral/70 mt-2">The clear choice for a cleaner space.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral mb-2">{feature.title}</h3>
              <p className="text-neutral/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
