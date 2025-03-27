import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Home, Search, PlusCircle, Heart, ListFilter } from "lucide-react";

export default function MobileNav() {
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFavoritesClick = () => {
    if (user) {
      navigate("/dashboard?tab=saved");
    } else {
      toast({
        title: "Authentication Required",
        description: "Please log in to view your saved properties",
        variant: "default",
      });
      navigate("/auth?redirect=/dashboard?tab=saved");
    }
  };

  const navItems = [
    {
      name: "Home",
      icon: <Home className="h-5 w-5" />,
      path: "/",
      action: () => navigate("/"),
    },
    {
      name: "Search",
      icon: <Search className="h-5 w-5" />,
      path: "/properties",
      action: () => navigate("/properties"),
    },
    {
      name: "Post",
      icon: <PlusCircle className="h-6 w-6" />,
      path: "/post-property-free",
      action: () => navigate("/post-property-free"),
      highlight: true,
    },
    {
      name: "Favorites",
      icon: <Heart className="h-5 w-5" />,
      path: "/dashboard?tab=saved",
      action: handleFavoritesClick,
    },
    {
      name: "Top List",
      icon: <ListFilter className="h-5 w-5" />,
      path: "/top-properties",
      action: () => navigate("/top-properties"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={item.action}
            className={`flex flex-col items-center justify-center w-full h-full ${
              location === item.path ? "text-primary" : "text-gray-500"
            } ${item.highlight ? "relative -mt-5" : ""}`}
          >
            {item.highlight ? (
              <div className="absolute -top-5 bg-primary text-white p-3 rounded-full shadow-lg">
                {item.icon}
              </div>
            ) : (
              item.icon
            )}
            <span className={`text-xs mt-1 ${item.highlight ? "mt-6" : ""}`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
      {/* Add safe area padding for iOS devices */}
      <div className="h-safe-area-bottom bg-white" />
    </div>
  );
}
