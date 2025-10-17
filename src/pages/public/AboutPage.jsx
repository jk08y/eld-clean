import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      {/* Used a lighter primary shade for the background */}
      <div className="bg-primary/5 py-20 sm:py-28 rounded-b-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-neutral tracking-tight">
            We believe in a cleaner, brighter world.
          </h1>
          <p className="mt-6 text-lg text-neutral/80 max-w-3xl mx-auto">
            Cleaning Products was born from a simple idea: to make premium, effective, and safe cleaning products accessible to every household and business in Kenya.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Our Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-neutral/80 mb-4 text-base leading-relaxed">
                Founded in the heart of Kenya, we noticed a gap in the market for high-quality supplies that you can trust. We decided to fill it, starting a journey driven by a passion for cleanliness and a dedication to our community.
              </p>
              <p className="text-neutral/80 text-base leading-relaxed">
                From our humble beginnings, we've grown into a leading supplier, committed to excellence and your complete satisfaction.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://placehold.co/600x450/06B6D4/FFFFFF?text=Our+Workspace" 
                alt="Cleaning Products Workspace" 
                className="rounded-xl shadow-xl aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Our Values Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Our Core Values</h2>
              <p className="mt-3 text-neutral/70">The principles that guide everything we do.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-base-200">
                <h3 className="text-xl font-semibold text-neutral mb-2">Quality & Trust</h3>
                <p className="text-neutral/80 leading-relaxed">Every product is rigorously tested to ensure it meets the highest standards of performance and safety.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-base-200">
                <h3 className="text-xl font-semibold text-neutral mb-2">Customer Focus</h3>
                <p className="text-neutral/80 leading-relaxed">Your satisfaction is our priority. We are dedicated to providing excellent service and support.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-base-200">
                <h3 className="text-xl font-semibold text-neutral mb-2">Sustainability</h3>
                <p className="text-neutral/80 leading-relaxed">We are committed to offering eco-friendly options that are kind to both your family and our planet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
