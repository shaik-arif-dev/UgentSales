import React, { useEffect, useRef } from "react";

export default function ImageGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Optimized dummy images with reliable URLs
  const images = [
    // Luxury Homes
    {
      id: 1,
      url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Luxury Villa with Pool",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Modern Luxury Home",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Elegant Mansion",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Waterfront Property",
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Luxury Interior",
    },

    // Apartments
    {
      id: 6,
      url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Modern Apartment Building",
    },
    {
      id: 7,
      url: "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "High-Rise Apartment",
    },
    {
      id: 8,
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Studio Apartment",
    },
    {
      id: 9,
      url: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Apartment Interior",
    },
    {
      id: 10,
      url: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Luxury Condo",
    },

    // Commercial Properties
    {
      id: 11,
      url: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Modern Office Space",
    },
    {
      id: 12,
      url: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Co-working Space",
    },
    {
      id: 13,
      url: "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Retail Space",
    },
    {
      id: 14,
      url: "https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Commercial Building",
    },
    {
      id: 15,
      url: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Modern Mall",
    },

    // Vacation Properties
    {
      id: 16,
      url: "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Beach House",
    },
    {
      id: 17,
      url: "https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Mountain Cabin",
    },
    {
      id: 18,
      url: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Lakeside Cottage",
    },
    {
      id: 19,
      url: "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Island Villa",
    },
    {
      id: 20,
      url: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Vacation Rental",
    },

    // New Developments
    {
      id: 21,
      url: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "New Construction",
    },
    {
      id: 22,
      url: "https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Development Project",
    },
    {
      id: 23,
      url: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Residential Development",
    },
    {
      id: 24,
      url: "https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Upcoming Project",
    },
    {
      id: 25,
      url: "https://images.pexels.com/photos/2360569/pexels-photo-2360569.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      alt: "Architectural Model",
    },
  ];

  // Optimized smooth scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 1.5; // Pixels per frame - smoother speed

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPosition += scrollSpeed;

      // Reset when reaching the end to create seamless loop
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start the animation
    animationId = requestAnimationFrame(scroll);

    // Pause scrolling when user hovers over the container
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              New Launch Projects
            </h2>
            <p className="text-gray-500 mt-1">
              Discover our latest property developments and upcoming real estate
              projects launching soon. Be the first to explore these exclusive
              new opportunities.
            </p>
          </div>
        </div>

        {/* Scrolling gallery container */}
        <div
          ref={scrollRef}
          className="overflow-x-scroll scrollbar-hide whitespace-nowrap pb-4"
        >
          <div className="inline-flex gap-4">
            {/* Double the images to create a seamless loop effect */}
            {[...images, ...images].map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="inline-block w-72 h-48 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 relative"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index < 10 ? "eager" : "lazy"}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
