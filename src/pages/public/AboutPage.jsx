import React from 'react';
import { Leaf, ShieldCheck, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-base-100">
      <div className="text-center pt-16 pb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral">About Eld Clean</h1>
        <p className="text-lg text-neutral/70 mt-4 max-w-3xl mx-auto">
          Your trusted partner in creating cleaner, healthier, and brighter spaces across Kenya.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white p-8 sm:p-12 rounded-lg shadow-md border border-base-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-neutral/80 mb-4">
                Founded in the heart of Kenya, Eld Clean was born from a simple idea: to make premium, effective, and safe cleaning products accessible to every household and business. We noticed a gap in the market for high-quality supplies that you can trust, and we decided to fill it.
              </p>
              <p className="text-neutral/80">
                From our humble beginnings, we've grown into a leading supplier, committed to excellence and customer satisfaction. Our journey is driven by a passion for cleanliness and a dedication to our community.
              </p>
            </div>
            <div>
              <img 
                src="https://placehold.co/600x400/0D9488/FFFFFF?text=Our+Team" 
                alt="Eld Clean Team" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <hr className="my-12 border-base-200" />

          <div>
            <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <ShieldCheck size={48} className="text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-neutral mb-2">Quality & Trust</h3>
                <p className="text-neutral/80">Every product is rigorously tested to ensure it meets the highest standards of performance and safety.</p>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Users size={48} className="text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-neutral mb-2">Customer Focus</h3>
                <p className="text-neutral/80">Your satisfaction is our priority. We are dedicated to providing excellent service and support.</p>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Leaf size={48} className="text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-neutral mb-2">Sustainability</h3>
                <p className="text-neutral/80">We are committed to offering eco-friendly options that are kind to our planet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
