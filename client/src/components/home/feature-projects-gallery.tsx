import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function FeatureProjectsGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  // Optimized dummy featured project images with reliable sources
  const projects = [
    // Luxury Projects
    {
      id: 1,
      url: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Parkview Residences",
      name: "Parkview Residences",
      location: "Bangalore",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "The Grand Towers",
      name: "The Grand Towers",
      location: "Mumbai",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Horizon Villas",
      name: "Horizon Villas",
      location: "Goa",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Emerald Heights",
      name: "Emerald Heights",
      location: "Delhi",
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Lakeside Apartments",
      name: "Lakeside Apartments",
      location: "Pune",
    },

    // Modern Developments
    {
      id: 6,
      url: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Urban Square",
      name: "Urban Square",
      location: "Hyderabad",
    },
    {
      id: 7,
      url: "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Metro Heights",
      name: "Metro Heights",
      location: "Chennai",
    },
    {
      id: 8,
      url: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Skyline Residences",
      name: "Skyline Residences",
      location: "Kolkata",
    },
    {
      id: 9,
      url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Green Valley",
      name: "Green Valley",
      location: "Ahmedabad",
    },
    {
      id: 10,
      url: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Sunset Boulevard",
      name: "Sunset Boulevard",
      location: "Jaipur",
    },

    // Eco-friendly Projects
    {
      id: 11,
      url: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Eco Gardens",
      name: "Eco Gardens",
      location: "Mysore",
    },
    {
      id: 12,
      url: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Green Terraces",
      name: "Green Terraces",
      location: "Kochi",
    },
    {
      id: 13,
      url: "https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Nature's Haven",
      name: "Nature's Haven",
      location: "Chandigarh",
    },
    {
      id: 14,
      url: "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Sustainable Living",
      name: "Sustainable Living",
      location: "Indore",
    },
    {
      id: 15,
      url: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Eco Homes",
      name: "Eco Homes",
      location: "Bhopal",
    },

    // Smart Home Projects
    {
      id: 16,
      url: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Smart City",
      name: "Smart City",
      location: "Surat",
    },
    {
      id: 17,
      url: "https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Tech Homes",
      name: "Tech Homes",
      location: "Nagpur",
    },
    {
      id: 18,
      url: "https://images.pexels.com/photos/2360569/pexels-photo-2360569.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Digital Living",
      name: "Digital Living",
      location: "Lucknow",
    },
    {
      id: 19,
      url: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Future Residences",
      name: "Future Residences",
      location: "Coimbatore",
    },
    {
      id: 20,
      url: "https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Connected Homes",
      name: "Connected Homes",
      location: "Visakhapatnam",
    },

    // Luxury Villas
    {
      id: 21,
      url: "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Royal Villas",
      name: "Royal Villas",
      location: "Gurgaon",
    },
    {
      id: 22,
      url: "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Elite Estates",
      name: "Elite Estates",
      location: "Noida",
    },
    {
      id: 23,
      url: "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Premium Homes",
      name: "Premium Homes",
      location: "Thane",
    },
    {
      id: 24,
      url: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Luxury Living",
      name: "Luxury Living",
      location: "Faridabad",
    },
    {
      id: 25,
      url: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=600&h=350",
      alt: "Prestige Villas",
      name: "Prestige Villas",
      location: "Vadodara",
    },
  ];

  // Optimized smooth scroll effect - LEFT TO RIGHT direction
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollSpeed = 2; // Pixels per frame

    const scroll = () => {
      if (!scrollContainer) return;

      scrollPosition -= scrollSpeed;

      // Reset when reaching the beginning to create seamless loop
      if (scrollPosition <= 0) {
        scrollPosition =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Projects
            </h2>
            <p className="text-gray-500 mt-1">
              Explore our most prestigious and sought-after real estate
              developments
            </p>
          </div>
          <Button
            onClick={() => navigate("/projects")}
            variant="outline"
            className="flex items-center gap-2"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrolling gallery container - reversed direction */}
        <div
          ref={scrollRef}
          className="overflow-x-scroll scrollbar-hide whitespace-nowrap pb-4"
        >
          <div className="inline-flex gap-4">
            {/* Double the projects to create a seamless loop effect */}
            {[...projects, ...projects].map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="inline-block w-72 h-48 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 relative group cursor-pointer"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <img
                  src={project.url}
                  alt={project.alt}
                  className="w-full h-full object-cover"
                  loading={index < 10 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm text-gray-200">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
