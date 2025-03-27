import React from "react";
import { Building2, ChevronRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

export default function NewProjectsBanner() {
  const [, navigate] = useLocation();

  return (
    <div className="bg-white py-8 px-6 rounded-xl shadow-sm border border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header Section - Redesigned */}
          <div className="relative">
            {/* New Launch Banner - Shiny effect */}
            <div className="absolute -top-2 -left-2 z-10">
              <div className="px-4 py-1.5 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 text-white text-sm font-medium rounded-md shadow-sm border border-blue-300 animate-pulse">
                New Launch
              </div>
            </div>

            {/* MagicHomes Box - Wider and shorter */}
            <div className="w-full bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 p-4 pt-8 mt-4">
              <h2 className="text-2xl font-bold text-gray-900">
                UrgentProjects
              </h2>
              <p className="text-gray-500">Encyclopedia For All New Projects</p>
            </div>
          </div>

          {/* Interactive Boxes */}
          <div className="flex justify-center gap-6 my-4">
            {/* Projects Box */}
            <div
              className="w-48 h-48 bg-indigo-50 rounded-lg shadow-md border border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center"
              onClick={() => navigate("/projects")}
            >
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Building2 className="h-4 w-10 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Projects
              </h3>
              <p className="text-sm text-gray-600">
                View all our latest projects
              </p>
            </div>

            {/* Images Box */}
            <div
              className="w-48 h-48 bg-emerald-50 rounded-lg shadow-md border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-lg cursor-pointer flex flex-col items-center justify-center p-4 text-center"
              onClick={() => navigate("/project-gallery")}
            >
              <div className="bg-emerald-100 p-3 rounded-full mb-3">
                <Image className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Images
              </h3>
              <p className="text-sm text-gray-600">Browse project galleries</p>
            </div>
          </div>

          {/* View All Button - Repositioned */}
          <div className="flex justify-end">
            <Button
              onClick={() => navigate("/projects")}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              View All New Projects
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
