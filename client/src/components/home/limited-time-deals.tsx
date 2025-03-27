import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle } from "lucide-react";

// Type for property deals
interface LimitedTimeDeal {
  id: number;
  title: string;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  imageUrl: string;
  endTime: Date; // When the deal expires
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

export default function LimitedTimeDeals() {
  const [, navigate] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    [key: number]: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    };
  }>({});

  // Updated deals with more varied end times
  const deals: LimitedTimeDeal[] = [
    // Andhra Pradesh Properties
    {
      id: 1,
      title: "Luxury Villa in Amaravati",
      location: "Amaravati, Andhra Pradesh",
      originalPrice: 8500000,
      discountedPrice: 7225000,
      discountPercentage: 15,
      imageUrl:
        "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      endTime: new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000,
      ), // 1 day and 7 hours
      propertyType: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
    },
    {
      id: 2,
      title: "Beachfront Property in Visakhapatnam",
      location: "Visakhapatnam, Andhra Pradesh",
      originalPrice: 12000000,
      discountedPrice: 9600000,
      discountPercentage: 20,
      imageUrl:
        "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      endTime: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000,
      ), // 3 days and 2 hours
      propertyType: "Villa",
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
    },
    {
      id: 3,
      title: "Modern Apartment in Vijayawada",
      location: "Vijayawada, Andhra Pradesh",
      originalPrice: 5500000,
      discountedPrice: 4675000,
      discountPercentage: 15,
      imageUrl:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
      propertyType: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
    },
    {
      id: 4,
      title: "Riverside Bungalow in Rajahmundry",
      location: "Rajahmundry, Andhra Pradesh",
      originalPrice: 7500000,
      discountedPrice: 6000000,
      discountPercentage: 20,
      imageUrl:
        "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      endTime: new Date(
        Date.now() + 4 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000,
      ), // 4 days and 5 hours
      propertyType: "House",
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
    },
    {
      id: 5,
      title: "Hillview Villa in Tirupati",
      location: "Tirupati, Andhra Pradesh",
      originalPrice: 9000000,
      discountedPrice: 7650000,
      discountPercentage: 15,
      imageUrl:
        "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      endTime: new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000,
      ), // 2 days and 9 hours
      propertyType: "Villa",
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
    },
    // ... other properties with varied end times
    {
      id: 6,
      title: "Commercial Space in Nellore",
      location: "Nellore, Andhra Pradesh",
      originalPrice: 15000000,
      discountedPrice: 12750000,
      discountPercentage: 15,
      imageUrl:
        "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      endTime: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000,
      ), // 5 days and 3 hours
      propertyType: "Commercial",
      area: 5000,
    },
    {
      id: 7,
      title: "Luxury Apartment in Guntur",
      location: "Guntur, Andhra Pradesh",
      originalPrice: 6500000,
      discountedPrice: 5200000,
      discountPercentage: 20,
      imageUrl:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
      endTime: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours
      propertyType: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: 1700,
    },
    // ... remaining properties with varied end times
  ];

  // Calculate time left for each deal with days included
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft: {
        [key: number]: {
          days: number;
          hours: number;
          minutes: number;
          seconds: number;
        };
      } = {};

      deals.forEach((deal) => {
        const difference = deal.endTime.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60),
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          newTimeLeft[deal.id] = { days, hours, minutes, seconds };
        } else {
          newTimeLeft[deal.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Completely revised smooth scrolling implementation using requestAnimationFrame
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollContent = scrollContentRef.current;

    if (!scrollContainer || !scrollContent) return;

    // Calculate total width and visible width
    const calculateDimensions = () => {
      if (!scrollContainer || !scrollContent)
        return { totalWidth: 0, visibleWidth: 0 };

      const totalWidth = scrollContent.scrollWidth;
      const visibleWidth = scrollContainer.clientWidth;

      return { totalWidth, visibleWidth };
    };

    let { totalWidth, visibleWidth } = calculateDimensions();

    // Set up variables for smooth scrolling
    let scrollPosition = 0;
    let lastTimestamp = 0;
    let isResetting = false;
    let resetStartPosition = 0;
    let resetProgress = 0;

    // Calculate scroll speed based on screen size
    const getScrollSpeed = () => {
      const baseSpeed = 0.6; // Slightly reduced for smoother motion
      const screenWidth = window.innerWidth;

      // Slower on mobile, faster on desktop, but keep it smooth
      if (screenWidth < 640) return baseSpeed * 0.5;
      if (screenWidth < 1024) return baseSpeed * 0.7;
      return baseSpeed;
    };

    let scrollSpeed = getScrollSpeed();

    // Animation function using requestAnimationFrame for smooth scrolling
    const animate = (timestamp: number) => {
      if (!scrollContainer || !scrollContent) return;

      // First frame initialization
      if (!lastTimestamp) lastTimestamp = timestamp;

      // Calculate delta time for frame-rate independent animation
      const deltaTime = Math.min(timestamp - lastTimestamp, 50); // Cap delta time to prevent jumps after tab switch
      lastTimestamp = timestamp;

      if (isResetting) {
        // Handle smooth reset animation
        resetProgress += 0.05; // Control reset speed

        if (resetProgress >= 1) {
          // Reset complete
          scrollPosition = 0;
          isResetting = false;
          resetProgress = 0;
        } else {
          // Smooth transition using easeOutCubic
          const t = 1 - Math.pow(1 - resetProgress, 3);
          scrollPosition = resetStartPosition * (1 - t);
        }
      } else {
        // Normal scrolling
        scrollPosition += (scrollSpeed * deltaTime) / 16.67; // normalize to 60fps

        // Check if we need to reset
        const oneThirdPoint = totalWidth / 3;

        if (scrollPosition >= oneThirdPoint) {
          // Start reset animation
          isResetting = true;
          resetStartPosition = scrollPosition;
          resetProgress = 0;
        }
      }

      // Apply the scroll position with transform for better performance
      scrollContent.style.transform = `translateX(-${scrollPosition}px)`;

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Pause animation on hover or touch
    const pauseAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    // Resume animation
    const resumeAnimation = () => {
      if (!animationRef.current) {
        lastTimestamp = 0; // Reset timestamp for smooth restart
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Handle window resize
    const handleResize = () => {
      // Recalculate dimensions
      const dimensions = calculateDimensions();
      totalWidth = dimensions.totalWidth;
      visibleWidth = dimensions.visibleWidth;

      // Update scroll speed based on new screen size
      scrollSpeed = getScrollSpeed();

      // Reset position if needed
      if (scrollPosition > totalWidth / 3) {
        scrollPosition = 0;
        isResetting = false;
      }
    };

    // Add event listeners
    scrollContainer.addEventListener("mouseenter", pauseAnimation);
    scrollContainer.addEventListener("mouseleave", resumeAnimation);
    scrollContainer.addEventListener("touchstart", pauseAnimation, {
      passive: true,
    });
    scrollContainer.addEventListener("touchend", resumeAnimation);
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      scrollContainer.removeEventListener("mouseenter", pauseAnimation);
      scrollContainer.removeEventListener("mouseleave", resumeAnimation);
      scrollContainer.removeEventListener("touchstart", pauseAnimation);
      scrollContainer.removeEventListener("touchend", resumeAnimation);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Format price to Indian currency format
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format time left for display
  const formatTimeLeft = (id: number) => {
    const time = timeLeft[id];
    if (!time) return "Offer expired";

    if (time.days > 0) {
      return `${time.days}d ${time.hours}h left`;
    } else if (time.hours > 0) {
      return `${time.hours}h ${time.minutes}m left`;
    } else {
      return `${time.minutes}m ${time.seconds}s left`;
    }
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-red-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              🚨 Limited-Time Deals – Act Fast!
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Buy properties at exclusive discounts in Andhra Pradesh and
            Telangana before time runs out! These special offers are available
            for a very limited time only.
          </p>
        </div>

        {/* Improved scrolling container with transform-based animation */}
        <div
          ref={scrollRef}
          className="overflow-hidden relative pb-4"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            ref={scrollContentRef}
            className="flex gap-2 md:gap-3" // Reduced gap from gap-3 md:gap-4 to gap-2 md:gap-3
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Triple the deals to ensure seamless looping */}
            {[...deals, ...deals, ...deals].map((deal, index) => (
              <div
                key={`${deal.id}-${index}`}
                className="flex-shrink-0 w-56 sm:w-64 h-[340px] sm:h-[380px] rounded-lg overflow-hidden shadow-md border border-gray-200 transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                // Reduced from w-64 sm:w-72 h-[380px] sm:h-[420px] to w-56 sm:w-64 h-[340px] sm:h-[380px]
                onClick={() => navigate(`/properties/${deal.id}`)}
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Property Image with Countdown Overlay */}
                <div className="relative">
                  <img
                    src={deal.imageUrl}
                    alt={deal.title}
                    className="w-full h-36 sm:h-40 object-cover" // Reduced from h-40 sm:h-48 to h-36 sm:h-40
                    loading={index < 20 ? "eager" : "lazy"}
                    decoding="async"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-0 left-0 bg-red-600 text-white px-2 sm:px-3 py-1 rounded-br-lg font-bold text-xs sm:text-sm">
                    {deal.discountPercentage}% OFF
                  </div>

                  {/* Countdown Timer */}
                  {timeLeft[deal.id] && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs sm:text-sm">
                      <Clock className="h-3 w-3" />
                      <span>
                        {timeLeft[deal.id].days > 0
                          ? `${timeLeft[deal.id].days}d:${String(timeLeft[deal.id].hours).padStart(2, "0")}h`
                          : `${String(timeLeft[deal.id].hours).padStart(2, "0")}:${String(timeLeft[deal.id].minutes).padStart(2, "0")}:${String(timeLeft[deal.id].seconds).padStart(2, "0")}`}
                      </span>
                    </div>
                  )}

                  {/* Flash Sale Badge */}
                  <div className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white px-2 sm:px-3 py-1 rounded-tl-lg font-medium text-xs sm:text-sm">
                    Urgent Deal
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-2 sm:p-3">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 line-clamp-1">
                    {deal.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1 sm:mb-2 flex items-center">
                    <span className="line-clamp-1">{deal.location}</span>
                  </p>

                  {/* Property Specs */}
                  <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 mb-1 sm:mb-2">
                    <span>{deal.propertyType}</span>
                    {deal.bedrooms && <span>• {deal.bedrooms} Beds</span>}
                    {deal.bathrooms && <span>• {deal.bathrooms} Baths</span>}
                    {deal.area && <span>• {deal.area} sq.ft</span>}
                  </div>

                  {/* Price with Countdown */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-bold text-primary">
                        {formatPrice(deal.discountedPrice)}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 line-through">
                        {formatPrice(deal.originalPrice)}
                      </span>
                    </div>

                    {/* Countdown Label with more varied display */}
                    <div className="mt-1 text-xs font-medium text-red-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeLeft(deal.id)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <Button
            onClick={() => navigate("/limited-deals")}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 sm:px-6 py-2 rounded-md font-medium flex items-center gap-2 text-sm sm:text-base"
          >
            Grab the Best Deals Now
            <AlertTriangle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
