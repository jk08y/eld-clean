// src/components/Home/WhyChooseUs.jsx
import React from 'react';
import { ShieldCheck, Leaf, Zap } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck size={40} className="text-primary" />,
    title: 'Laboratory Certified Strength',
    description: 'Our formulations are rigorously tested, delivering industrial-grade cleaning power that’s safe for your home.',
  },
  {
    icon: <Leaf size={40} className="text-primary" />,
    title: 'Planet & Family Safe',
    description: 'We prioritize non-toxic, biodegradable ingredients, protecting your loved ones and the environment with every use.',
  },
  {
    icon: <Zap size={40} className="text-primary" />,
    title: 'Effortless Cleaning Guarantee',
    description: 'Spend less time scrubbing and more time enjoying a spotless space, thanks to our fast-acting, high-performance agents.',
  },
];

const WhyChooseUs = () => {
  return (
    <div className="bg-base-200 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral">Why Choose Our Cleaning Products?</h2>
          <p className="text-lg text-neutral/70 mt-2">The clear choice for a powerful, safe, and modern clean.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.02] border border-base-200">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-neutral mb-2">{feature.title}</h3>
              <p className="text-neutral/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
