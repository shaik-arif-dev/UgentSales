import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  MapPin,
  BedDouble,
  Bath,
  User,
  CheckCircle2,
  ChevronLeft,
  ArrowRight,
  Zap,
  Star,
  Check,
  MessageSquare,
  Badge,
  Square,
  Building,
  Home,
  RefreshCw,
  HardHat,
  Key,
  ClipboardList,
  Loader2,
  Navigation,
  Video,
  Map,
  Ruler,
  Layout,
  Car,
  Compass,
  Wifi,
  Tv,
  Droplets,
  Fan,
  ParkingSquare,
  Armchair,
  Sofa,
  Fence,
  TreePine,
  Landmark,
  Warehouse,
  Factory,
  Store,
  ShieldCheck,
  Dumbbell,
  Waves,
  Utensils,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import FileUpload, { FileWithPreview } from "@/components/upload/file-upload";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OtpInput } from "@/components/ui/otp-input";
import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Updated schema with optional description
const propertySchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 10 characters" }),
  description: z.string().optional(),
  propertyType: z.string().min(1, { message: "Property type is required" }),
  propertyCategory: z
    .string()
    .min(1, { message: "Property category is required" }),
  transactionType: z
    .string()
    .min(1, { message: "Transaction type is required" }),
  availableFromMonth: z.string().optional(),
  availableFromYear: z.string().optional(),
  constructionAge: z.string().optional(),
  price: z.coerce
    .number()
    .min(100000, { message: "Minimum price is ₹1,00,000" }),
  pricePerUnit: z.coerce.number().optional(),
  totalPrice: z.coerce.number().optional(),
  isUrgentSale: z.boolean().default(false),
  location: z
    .string()
    .min(5, { message: "Location must be at least 5 characters" }),
  city: z.string().min(3, { message: "City is required" }),
  projectName: z.string().optional(),
  pincode: z.string().regex(/^[0-9]{6}$/, { message: "Invalid pincode" }),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  balconies: z.string().optional(),
  floorNo: z.string().optional(),
  totalFloors: z.string().optional(),
  floorsAllowedForConstruction: z.string().optional(),
  furnishedStatus: z.string().optional(),
  roadWidth: z.string().optional(),
  openSides: z.string().optional(),
  area: z.coerce.number().min(100, { message: "Minimum area is 100 sqft" }),
  areaUnit: z.enum([
    "sqft",
    "sqyd",
    "acres",
    "gunta",
    "hectare",
    "marla",
    "kanal",
  ]),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  contactPhone: z
    .string()
    .min(10, { message: "Valid 10-digit phone number required" }),
  whatsappEnabled: z.boolean().default(true),
  userType: z.enum(["owner", "agent", "builder"]),
  otp: z.string().optional(),
  parking: z.string().optional(),
  facing: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  possessionStatus: z.string().optional(),
  ownershipType: z.string().optional(),
  boundaryWall: z.string().optional(),
  electricityStatus: z.string().optional(),
  waterAvailability: z.string().optional(),
  flooringType: z.string().optional(),
  overlooking: z.string().optional(),
  preferredTenant: z.string().optional(),
  propertyAge: z.string().optional(),
  projectStatus: z.string().optional(),
  launchDate: z.string().optional(),
  reraRegistered: z.string().optional(),
  reraNumber: z.string().optional(),
  landmarks: z.string().optional(),
  brokerage: z.string().optional(),
  noBrokerResponses: z.boolean().default(false),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

// Utility function for ordinal suffixes
function getOrdinalSuffix(num: number) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

// Options for various form fields
const bedroomOptions = [
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4 Bedrooms" },
  { value: "5", label: "5 Bedrooms" },
  { value: "6", label: "6 Bedrooms" },
  { value: "7", label: "7 Bedrooms" },
  { value: "8", label: "8 Bedrooms" },
  { value: "9", label: "9 Bedrooms" },
  { value: "10+", label: "10+ Bedrooms" },
];

const bathroomOptions = [
  { value: "1", label: "1 Bathroom" },
  { value: "2", label: "2 Bathrooms" },
  { value: "3", label: "3 Bathrooms" },
  { value: "4", label: "4 Bathrooms" },
  { value: "5+", label: "5+ Bathrooms" },
];

const balconyOptions = [
  { value: "0", label: "No Balcony" },
  { value: "1", label: "1 Balcony" },
  { value: "2", label: "2 Balconies" },
  { value: "3", label: "3 Balconies" },
  { value: "4", label: "4 Balconies" },
  { value: "5+", label: "5+ Balconies" },
];

const floorOptions = [
  { value: "lower-basement", label: "Lower Basement" },
  { value: "upper-basement", label: "Upper Basement" },
  { value: "ground", label: "Ground Floor" },
  ...Array.from({ length: 20 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}${getOrdinalSuffix(i + 1)} Floor`,
  })),
  { value: "penthouse", label: "Penthouse" },
];

const roadWidthOptions = [
  { value: "10", label: "10 ft" },
  { value: "20", label: "20 ft" },
  { value: "30", label: "30 ft" },
  { value: "40", label: "40 ft" },
  { value: "50", label: "50 ft" },
  { value: "60", label: "60 ft" },
  { value: "70", label: "70 ft" },
  { value: "80", label: "80 ft" },
  { value: "90", label: "90 ft" },
  { value: "100+", label: "100+ ft" },
];

const openSidesOptions = [
  { value: "1", label: "1 Side" },
  { value: "2", label: "2 Sides" },
  { value: "3", label: "3 Sides" },
  { value: "4", label: "4 Sides" },
];

const constructionAgeOptions = [
  { value: "new", label: "New Construction" },
  { value: "less-than-5", label: "Less than 5 Years" },
  { value: "5-to-10", label: "5 to 10 Years" },
  { value: "greater-than-10", label: "Greater than 10 Years" },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() + i,
);

const furnishedStatusOptions = [
  { value: "furnished", label: "Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
];

const parkingOptions = [
  { value: "none", label: "No Parking" },
  { value: "open", label: "Open Parking" },
  { value: "covered", label: "Covered Parking" },
  { value: "basement", label: "Basement Parking" },
  { value: "multiple", label: "Multiple Parking" },
];

const facingOptions = [
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "north-east", label: "North-East" },
  { value: "north-west", label: "North-West" },
  { value: "south-east", label: "South-East" },
  { value: "south-west", label: "South-West" },
];

const amenitiesOptions = [
  {
    value: "power-backup",
    label: "Power Backup",
    icon: <Zap className="h-4 w-4" />,
  },
  { value: "lift", label: "Lift", icon: <Building className="h-4 w-4" /> },
  {
    value: "security",
    label: "24/7 Security",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    value: "water-supply",
    label: "24/7 Water Supply",
    icon: <Droplets className="h-4 w-4" />,
  },
  {
    value: "parking",
    label: "Parking",
    icon: <ParkingSquare className="h-4 w-4" />,
  },
  {
    value: "swimming-pool",
    label: "Swimming Pool",
    icon: <Waves className="h-4 w-4" />,
  },
  { value: "gym", label: "Gym", icon: <Dumbbell className="h-4 w-4" /> },
  {
    value: "club-house",
    label: "Club House",
    icon: <Landmark className="h-4 w-4" />,
  },
  {
    value: "play-area",
    label: "Play Area",
    icon: <Landmark className="h-4 w-4" />,
  },
  {
    value: "garden",
    label: "Garden/Park",
    icon: <TreePine className="h-4 w-4" />,
  },
  { value: "wifi", label: "Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
  {
    value: "modular-kitchen",
    label: "Modular Kitchen",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    value: "wardrobes",
    label: "Wardrobes",
    icon: <Armchair className="h-4 w-4" />,
  },
  {
    value: "furniture",
    label: "Furniture",
    icon: <Sofa className="h-4 w-4" />,
  },
];

const possessionStatusOptions = [
  { value: "ready-to-move", label: "Ready to Move" },
  { value: "under-construction", label: "Under Construction" },
  { value: "new-launch", label: "New Launch" },
];

const ownershipTypeOptions = [
  { value: "freehold", label: "Freehold" },
  { value: "leasehold", label: "Leasehold" },
  { value: "cooperative", label: "Cooperative Society" },
];

const boundaryWallOptions = [
  { value: "none", label: "No Boundary Wall" },
  { value: "partial", label: "Partial Boundary" },
  { value: "complete", label: "Complete Boundary" },
];

const electricityStatusOptions = [
  { value: "no-power", label: "No Power" },
  { value: "partial-power", label: "Partial Power" },
  { value: "full-power", label: "Full Power" },
];

const waterAvailabilityOptions = [
  { value: "no-water", label: "No Water" },
  { value: "borewell", label: "Borewell" },
  { value: "municipal", label: "Municipal Supply" },
  { value: "both", label: "Both Borewell & Municipal" },
];

const flooringTypeOptions = [
  { value: "marble", label: "Marble" },
  { value: "tiles", label: "Tiles" },
  { value: "wood", label: "Wooden" },
  { value: "granite", label: "Granite" },
  { value: "cement", label: "Cement" },
  { value: "other", label: "Other" },
];

const overlookingOptions = [
  {
    value: "garden",
    label: "Garden/Park",
    icon: <TreePine className="h-4 w-4" />,
  },
  { value: "main-road", label: "Main Road" },
  { value: "pool", label: "Swimming Pool" },
  { value: "lake", label: "Lake/River" },
  { value: "other", label: "Other" },
];

const preferredTenantOptions = [
  { value: "family", label: "Family" },
  { value: "bachelors", label: "Bachelors" },
  { value: "company", label: "Company" },
  { value: "any", label: "Anyone" },
];

const propertyAgeOptions = [
  { value: "0-1", label: "0-1 Years" },
  { value: "1-5", label: "1-5 Years" },
  { value: "5-10", label: "5-10 Years" },
  { value: "10+", label: "10+ Years" },
];

const projectStatusOptions = [
  { value: "planning", label: "Planning Stage" },
  { value: "under-construction", label: "Under Construction" },
  { value: "completed", label: "Completed" },
];

const brokerageOptions = [
  { value: "0", label: "No Brokerage" },
  { value: "0.25", label: "0.25%" },
  { value: "0.5", label: "0.5%" },
  { value: "0.75", label: "0.75%" },
  { value: "1", label: "1%" },
  { value: "1.5", label: "1.5%" },
  { value: "2", label: "2%" },
  { value: "3", label: "3%" },
  { value: "4", label: "4%" },
  { value: "5", label: "5%" },
];

// Property type options by category
const propertyTypeOptions = {
  residential: [
    {
      value: "flat-apartment",
      label: "Flat/Apartment",
      icon: <Building className="h-4 w-4" />,
    },
    {
      value: "residential-house",
      label: "Residential House",
      icon: <Home className="h-4 w-4" />,
    },
    { value: "villa", label: "Villa", icon: <Home className="h-4 w-4" /> },
    {
      value: "builder-floor",
      label: "Builder Floor Apartment",
      icon: <Building className="h-4 w-4" />,
    },
    {
      value: "residential-land",
      label: "Residential Land/Plot",
      icon: <Square className="h-4 w-4" />,
    },
    {
      value: "penthouse",
      label: "Penthouse",
      icon: <Building className="h-4 w-4" />,
    },
    {
      value: "studio-apartment",
      label: "Studio Apartment",
      icon: <Building className="h-4 w-4" />,
    },
  ],
  commercial: [
    {
      value: "commercial-office",
      label: "Commercial Office Space",
      icon: <Building className="h-4 w-4" />,
    },
    {
      value: "it-park-office",
      label: "Office in IT Park/SEZ",
      icon: <Building className="h-4 w-4" />,
    },
    {
      value: "commercial-shop",
      label: "Commercial Shop",
      icon: <Store className="h-4 w-4" />,
    },
    {
      value: "commercial-showroom",
      label: "Commercial Showroom",
      icon: <Store className="h-4 w-4" />,
    },
    {
      value: "commercial-land",
      label: "Commercial Land",
      icon: <Square className="h-4 w-4" />,
    },
    {
      value: "warehouse",
      label: "Warehouse/Godown",
      icon: <Warehouse className="h-4 w-4" />,
    },
    {
      value: "industrial-land",
      label: "Industrial Land",
      icon: <Square className="h-4 w-4" />,
    },
    {
      value: "industrial-building",
      label: "Industrial Building",
      icon: <Factory className="h-4 w-4" />,
    },
    {
      value: "industrial-shed",
      label: "Industrial Shed",
      icon: <Fence className="h-4 w-4" />,
    },
  ],
  agricultural: [
    {
      value: "agricultural-land",
      label: "Agricultural/Farm Land",
      icon: <Square className="h-4 w-4" />,
    },
    {
      value: "farm-house",
      label: "Farm House",
      icon: <Home className="h-4 w-4" />,
    },
  ],
};

// Transaction type options by user type and property type
const getTransactionTypeOptions = (userType: string, propertyType: string) => {
  const baseOptions = [
    { value: "new", label: "New Property", icon: <Home className="h-4 w-4" /> },
    {
      value: "resale",
      label: "Resale",
      icon: <RefreshCw className="h-4 w-4" />,
    },
  ];

  if (userType === "builder") {
    return [
      ...baseOptions,
      {
        value: "under-construction",
        label: "Under Construction",
        icon: <HardHat className="h-4 w-4" />,
      },
      {
        value: "ready-to-move",
        label: "Ready to Move",
        icon: <Key className="h-4 w-4" />,
      },
    ];
  }

  if (
    propertyType === "residential-land" ||
    propertyType === "commercial-land" ||
    propertyType === "agricultural-land"
  ) {
    return baseOptions.filter((opt) => opt.value !== "new");
  }

  return baseOptions;
};

// Area unit options by property type
const getAreaUnitOptions = (propertyType: string) => {
  const baseUnits = [
    { value: "sqft", label: "sq.ft" },
    { value: "sqyd", label: "sq.yd" },
  ];

  if (
    propertyType === "agricultural-land" ||
    propertyType === "residential-land" ||
    propertyType === "commercial-land"
  ) {
    return [
      ...baseUnits,
      { value: "acres", label: "acres" },
      { value: "gunta", label: "gunta" },
      { value: "hectare", label: "hectare" },
      { value: "marla", label: "marla" },
      { value: "kanal", label: "kanal" },
    ];
  }

  return baseUnits;
};

export default function PostPropertyFree() {
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [exteriorImages, setExteriorImages] = useState<FileWithPreview[]>([]);
  const [livingRoomImages, setLivingRoomImages] = useState<FileWithPreview[]>(
    [],
  );
  const [kitchenImages, setKitchenImages] = useState<FileWithPreview[]>([]);
  const [bedroomImages, setBedroomImages] = useState<FileWithPreview[]>([]);
  const [bathroomImages, setBathroomImages] = useState<FileWithPreview[]>([]);
  const [floorPlanImages, setFloorPlanImages] = useState<FileWithPreview[]>([]);
  const [masterPlanImages, setMasterPlanImages] = useState<FileWithPreview[]>(
    [],
  );
  const [locationMapImages, setLocationMapImages] = useState<FileWithPreview[]>(
    [],
  );
  const [otherImages, setOtherImages] = useState<FileWithPreview[]>([]);
  const [videoFiles, setVideoFiles] = useState<FileWithPreview[]>([]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState("exterior");
  const formTopRef = useRef<HTMLDivElement>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "",
      propertyCategory: "",
      transactionType: "",
      price: undefined,
      pricePerUnit: undefined,
      totalPrice: undefined,
      isUrgentSale: false,
      location: "",
      city: "",
      projectName: "",
      pincode: "",
      bedrooms: "",
      bathrooms: "",
      balconies: "",
      floorNo: "",
      totalFloors: "",
      floorsAllowedForConstruction: "",
      furnishedStatus: "",
      roadWidth: "",
      openSides: "",
      area: undefined,
      areaUnit: "sqft",
      contactName: user?.name || "",
      contactPhone: user?.phone || "",
      whatsappEnabled: true,
      userType: "owner",
      otp: "",
      parking: "",
      facing: "",
      amenities: [],
      possessionStatus: "",
      ownershipType: "",
      boundaryWall: "",
      electricityStatus: "",
      waterAvailability: "",
      flooringType: "",
      overlooking: "",
      preferredTenant: "",
      propertyAge: "",
      projectStatus: "",
      launchDate: "",
      reraRegistered: "",
      reraNumber: "",
      landmarks: "",
      brokerage: "0",
      noBrokerResponses: false,
    },
  });

  const userType = form.watch("userType");
  const propertyCategory = form.watch("propertyCategory");
  const propertyType = form.watch("propertyType");
  const transactionType = form.watch("transactionType");
  const area = form.watch("area");
  const price = form.watch("price");
  const pricePerUnit = form.watch("pricePerUnit");
  const totalPrice = form.watch("totalPrice");

  // Stable price calculation
  useEffect(() => {
    if (area && pricePerUnit) {
      const calculatedTotal = Math.round(pricePerUnit * area);
      form.setValue("totalPrice", calculatedTotal, { shouldValidate: true });
      form.setValue("price", calculatedTotal, { shouldValidate: true });
    }
  }, [area, pricePerUnit, form]);

  useEffect(() => {
    if (area && totalPrice) {
      const calculatedPerUnit = Math.round(totalPrice / area);
      form.setValue("pricePerUnit", calculatedPerUnit, {
        shouldValidate: true,
      });
      form.setValue("price", totalPrice, { shouldValidate: true });
    }
  }, [area, totalPrice, form]);

  // Reset property type when category changes
  useEffect(() => {
    if (propertyCategory) {
      form.setValue("propertyType", "");
    }
  }, [propertyCategory, form]);

  const sendOtp = async (phone: string) => {
    setIsSendingOtp(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "OTP Sent",
        description: `We've sent a 6-digit OTP to ${phone}`,
        variant: "default",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    // Simulate verification - in production, call your backend
    await new Promise((resolve) => setTimeout(resolve, 500));
    return otp === "123456"; // Demo only
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive",
      });
      return;
    }

    setIsDetectingLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      // Simulate reverse geocoding - in production, use a geocoding service
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get approximate address from coordinates
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
      );
      const data = await response.json();

      if (data.address) {
        const { city, town, village, county, state, postcode } = data.address;
        const detectedCity = city || town || village || county;
        const detectedLocation = [
          data.address.road,
          data.address.suburb,
          detectedCity,
        ]
          .filter(Boolean)
          .join(", ");

        form.setValue("city", detectedCity || "");
        form.setValue("location", detectedLocation || "");
        form.setValue("pincode", postcode || "");

        toast({
          title: "Location detected",
          description: `Your location has been set to ${detectedLocation}`,
          variant: "default",
        });
      } else {
        throw new Error("Could not determine address");
      }
    } catch (error) {
      toast({
        title: "Location detection failed",
        description:
          "Could not determine your location. Please enter manually.",
        variant: "destructive",
      });
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const { mutate: submitProperty, isLoading } = useMutation({
    mutationFn: async (formData: FormData) => {
      return apiRequest({
        url: "/api/properties",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Property listed successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries(["properties"]);
      navigate("/my-properties");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to list property",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    if (data.whatsappEnabled && !otpVerified) {
      const otpSent = await sendOtp(data.contactPhone);
      if (otpSent) {
        setShowOtpModal(true);
      }
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && key !== "otp") {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Add all images and videos to formData
      const allFiles = [
        ...exteriorImages,
        ...livingRoomImages,
        ...kitchenImages,
        ...bedroomImages,
        ...bathroomImages,
        ...floorPlanImages,
        ...masterPlanImages,
        ...locationMapImages,
        ...otherImages,
        ...videoFiles,
      ];

      allFiles.forEach((file) => {
        formData.append("media", file.file);
      });

      submitProperty(formData);
    } catch (error) {
      console.error("Error submitting property:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    const isValid = await verifyOtp(otp);
    if (isValid) {
      setOtpVerified(true);
      setShowOtpModal(false);
      form.handleSubmit(onSubmit)();
    } else {
      toast({
        title: "Invalid OTP",
        description: "The OTP you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Property Details
            </h2>

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">You Are*</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="owner" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" /> Owner
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="agent" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <Badge className="h-4 w-4" /> Agent
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="builder" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" /> Builder
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Property Category*
                  </FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="residential" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4" /> Residential
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="commercial" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4" /> Commercial
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="agricultural" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <div className="flex items-center gap-2">
                          <TreePine className="h-4 w-4" /> Agricultural
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />

            {propertyCategory && (
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Property Type*
                    </FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    >
                      {propertyTypeOptions[
                        propertyCategory as keyof typeof propertyTypeOptions
                      ]?.map((option) => (
                        <FormItem
                          key={option.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={option.value}
                            className="font-normal flex items-center gap-2"
                          >
                            {option.icon || <Square className="h-4 w-4" />}
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {propertyType && (
              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Transaction Type*
                    </FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {getTransactionTypeOptions(userType, propertyType).map(
                        (option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={option.value}
                                id={`transaction-${option.value}`}
                              />
                            </FormControl>
                            <FormLabel
                              htmlFor={`transaction-${option.value}`}
                              className="font-normal flex items-center gap-2"
                            >
                              {option.icon || <Square className="h-4 w-4" />}
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ),
                      )}
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {transactionType === "under-construction" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="availableFromMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Available From (Month)*
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month} value={month.toLowerCase()}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availableFromYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Available From (Year)*
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {transactionType === "ready-to-move" && (
              <FormField
                control={form.control}
                name="constructionAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Age of Construction*
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select age of construction" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {constructionAgeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Listing Title*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        propertyType === "flat-apartment"
                          ? "e.g. Beautiful 3BHK Apartment in Gachibowli"
                          : propertyType === "residential-land"
                            ? "e.g. Prime Residential Plot in Hitech City"
                            : propertyType === "commercial-office"
                              ? "e.g. Premium Office Space in Financial District"
                              : "e.g. Well-maintained property in prime location"
                      }
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be specific about location and key features
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Detailed Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        propertyType === "flat-apartment"
                          ? "Describe the apartment layout, amenities, society features, nearby facilities..."
                          : propertyType === "residential-land"
                            ? "Describe the plot dimensions, location advantages, nearby developments..."
                            : propertyType === "commercial-office"
                              ? "Describe the office space, facilities, parking, nearby business hubs..."
                              : "Describe your property in detail..."
                      }
                      rows={5}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Include amenities, nearby facilities, and unique features
                    (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dynamic fields based on property type */}
            {propertyCategory === "residential" &&
              !["residential-land", "studio-apartment"].includes(
                propertyType,
              ) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Bedrooms*
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select bedrooms" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bedroomOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Bathrooms*
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select bathrooms" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bathroomOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="balconies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Balconies
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select balconies" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {balconyOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

            {propertyCategory === "residential" &&
              propertyType === "studio-apartment" && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    Studio apartments typically have 1 bathroom and no separate
                    bedrooms.
                  </p>
                </div>
              )}

            {propertyCategory === "residential" &&
              !["residential-land", "studio-apartment"].includes(
                propertyType,
              ) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="floorNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Floor No.
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select floor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {floorOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalFloors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Total Floors
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select total floors" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map(
                              (num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} Floors
                                </SelectItem>
                              ),
                            )}
                            <SelectItem value="20+">20+ Floors</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="furnishedStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Furnished Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {furnishedStatusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

            {(propertyType === "residential-land" ||
              propertyType === "commercial-land" ||
              propertyType === "agricultural-land") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="roadWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Width of Road Facing the Plot
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select road width" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roadWidthOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="openSides"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Number of Open Sides
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select open sides" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {openSidesOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Additional fields for commercial properties */}
            {propertyCategory === "commercial" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="possessionStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Possession Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select possession status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {possessionStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Ownership Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select ownership type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ownershipTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Additional fields for agricultural properties */}
            {propertyCategory === "agricultural" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="boundaryWall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Boundary Wall
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select boundary wall status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {boundaryWallOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="electricityStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Electricity Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select electricity status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {electricityStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Area*</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 1500"
                          className="h-12 rounded-r-none"
                          {...field}
                        />
                      </FormControl>
                      <FormField
                        control={form.control}
                        name="areaUnit"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 w-[100px] rounded-l-none border-l-0">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getAreaUnitOptions(propertyType).map((unit) => (
                                <SelectItem key={unit.value} value={unit.value}>
                                  {unit.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pricePerUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Price per Sq-ft (₹)*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 5000"
                        className="h-12"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          if (area && value) {
                            form.setValue(
                              "totalPrice",
                              Math.round(parseFloat(value) * area),
                              { shouldValidate: true },
                            );
                            form.setValue(
                              "price",
                              Math.round(parseFloat(value) * area),
                              { shouldValidate: true },
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="totalPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Total Price (₹)*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 7500000"
                        className="h-12"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          if (area && value) {
                            form.setValue(
                              "pricePerUnit",
                              Math.round(parseFloat(value) / area),
                              { shouldValidate: true },
                            );
                            form.setValue("price", parseFloat(value), {
                              shouldValidate: true,
                            });
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Parking</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select parking type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parkingOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="facing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Facing Direction
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select facing direction" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {facingOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Compass className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Enhanced Amenities section with checkboxes */}
            <div className="space-y-4">
              <FormLabel className="text-gray-700">Amenities</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenitiesOptions.map((amenity) => (
                  <FormField
                    key={amenity.value}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(amenity.value)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value || []),
                                      amenity.value,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== amenity.value,
                                      ) ?? [],
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex items-center gap-2">
                            {amenity.icon || <Square className="h-4 w-4" />}
                            {amenity.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </div>

            {/* Brokerage section for agents */}
            {userType === "agent" && (
              <div className="space-y-4">
                <FormLabel className="text-gray-700">
                  Brokerage (Brokers only)
                </FormLabel>
                <RadioGroup
                  defaultValue="0"
                  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  onValueChange={(value) => form.setValue("brokerage", value)}
                >
                  {brokerageOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`brokerage-${option.value}`}
                      />
                      <label
                        htmlFor={`brokerage-${option.value}`}
                        className="text-sm font-medium leading-none"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
                <FormField
                  control={form.control}
                  name="noBrokerResponses"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-50">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          I am not interested in getting responses from brokers
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {user?.subscriptionLevel === "premium" && (
              <FormField
                control={form.control}
                name="isUrgentSale"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-blue-50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-semibold text-blue-800 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        Urgency Sale
                      </FormLabel>
                      <FormDescription className="text-blue-700">
                        List with a 25% discount to attract quick buyers. Your
                        property will be highlighted in search results.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                size="lg"
                onClick={() => {
                  form
                    .trigger([
                      "userType",
                      "propertyCategory",
                      "propertyType",
                      "transactionType",
                      "title",
                      "area",
                      "pricePerUnit",
                      "totalPrice",
                    ])
                    .then((isValid) => {
                      if (isValid) {
                        setCurrentStep(2);
                        formTopRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    });
                }}
              >
                Next: Location
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Location Details
            </h2>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">City*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city name"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userType === "builder" && (
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Project Name*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of your project"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the name of your housing project or development
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {userType !== "builder" && (
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Name of Project/Society
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name of Project/Society"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the name of your housing project, society, or
                      community
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Full Address*</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Textarea
                        placeholder={
                          userType === "builder"
                            ? "Project address, street, landmark..."
                            : "Building name, street, landmark..."
                        }
                        rows={3}
                        className="min-h-[100px] flex-1"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-[100px]"
                      onClick={detectLocation}
                      disabled={isDetectingLocation}
                    >
                      {isDetectingLocation ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Navigation className="h-4 w-4" />
                      )}
                      <span className="ml-2">Detect</span>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landmarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Nearby Landmarks
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Near Metro Station, Opposite Mall, etc."
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Help buyers locate your property easily
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Pincode*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 500032"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userType === "builder" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="projectStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Project Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select project status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectStatusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reraRegistered"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        RERA Registered
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Is project RERA registered?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {userType === "builder" &&
              form.watch("reraRegistered") === "yes" && (
                <FormField
                  control={form.control}
                  name="reraNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        RERA Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter RERA registration number"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setCurrentStep(1);
                  formTopRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                type="button"
                size="lg"
                onClick={() => {
                  form
                    .trigger(["city", "location", "pincode"])
                    .then((isValid) => {
                      if (isValid) {
                        setCurrentStep(3);
                        formTopRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    });
                }}
              >
                Next: Photos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Property Media</h2>

            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  85% of Buyers enquire on Properties with Photos
                </h3>
                <p className="text-gray-600">
                  Upload Photos & Get upto 10X more Enquiries
                </p>
              </div>

              <Tabs
                value={activeImageTab}
                onValueChange={setActiveImageTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 h-auto p-2 bg-gray-100">
                  <TabsTrigger value="exterior" className="py-2 text-xs h-auto">
                    <div className="flex flex-col items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>Exterior View</span>
                    </div>
                  </TabsTrigger>
                  {propertyCategory === "residential" &&
                    !["residential-land", "studio-apartment"].includes(
                      propertyType,
                    ) && (
                      <>
                        <TabsTrigger
                          value="livingRoom"
                          className="py-2 text-xs h-auto"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Home className="h-4 w-4" />
                            <span>Living Room</span>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger
                          value="bedrooms"
                          className="py-2 text-xs h-auto"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <BedDouble className="h-4 w-4" />
                            <span>Bedrooms</span>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger
                          value="bathrooms"
                          className="py-2 text-xs h-auto"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>Bathrooms</span>
                          </div>
                        </TabsTrigger>
                        <TabsTrigger
                          value="kitchen"
                          className="py-2 text-xs h-auto"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <Layout className="h-4 w-4" />
                            <span>Kitchen</span>
                          </div>
                        </TabsTrigger>
                      </>
                    )}
                  <TabsTrigger
                    value="floorPlan"
                    className="py-2 text-xs h-auto"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Ruler className="h-4 w-4" />
                      <span>Floor Plan</span>
                    </div>
                  </TabsTrigger>
                  {(propertyType === "residential-land" ||
                    propertyType === "commercial-land" ||
                    propertyType === "agricultural-land") && (
                    <TabsTrigger
                      value="masterPlan"
                      className="py-2 text-xs h-auto"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Map className="h-4 w-4" />
                        <span>Master Plan</span>
                      </div>
                    </TabsTrigger>
                  )}
                  <TabsTrigger
                    value="locationMap"
                    className="py-2 text-xs h-auto"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Location Map</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="other" className="py-2 text-xs h-auto">
                    <div className="flex flex-col items-center gap-1">
                      <Square className="h-4 w-4" />
                      <span>Others</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="py-2 text-xs h-auto">
                    <div className="flex flex-col items-center gap-1">
                      <Video className="h-4 w-4" />
                      <span>Videos</span>
                    </div>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="exterior">
                    <div>
                      <FormDescription className="mb-4">
                        Upload photos of the property exterior, facade, or front
                        view (Max 5 images)
                      </FormDescription>
                      <FileUpload
                        maxFiles={5}
                        maxSize={20 * 1024 * 1024}
                        accepts={["image/*"]}
                        onFilesSelected={(files) => setExteriorImages(files)}
                        onFileRemoved={(fileId) =>
                          setExteriorImages((prev) =>
                            prev.filter((file) => file.id !== fileId),
                          )
                        }
                        files={exteriorImages}
                      />
                    </div>
                  </TabsContent>

                  {propertyCategory === "residential" &&
                    !["residential-land", "studio-apartment"].includes(
                      propertyType,
                    ) && (
                      <>
                        <TabsContent value="livingRoom">
                          <div>
                            <FormDescription className="mb-4">
                              Upload photos of the living room and common areas
                              (Max 5 images)
                            </FormDescription>
                            <FileUpload
                              maxFiles={5}
                              maxSize={20 * 1024 * 1024}
                              accepts={["image/*"]}
                              onFilesSelected={(files) =>
                                setLivingRoomImages(files)
                              }
                              onFileRemoved={(fileId) =>
                                setLivingRoomImages((prev) =>
                                  prev.filter((file) => file.id !== fileId),
                                )
                              }
                              files={livingRoomImages}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="bedrooms">
                          <div>
                            <FormDescription className="mb-4">
                              Upload photos of each bedroom (Max 5 images per
                              bedroom)
                            </FormDescription>
                            <FileUpload
                              maxFiles={
                                5 * parseInt(form.watch("bedrooms") || "1")
                              }
                              maxSize={20 * 1024 * 1024}
                              accepts={["image/*"]}
                              onFilesSelected={(files) =>
                                setBedroomImages(files)
                              }
                              onFileRemoved={(fileId) =>
                                setBedroomImages((prev) =>
                                  prev.filter((file) => file.id !== fileId),
                                )
                              }
                              files={bedroomImages}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="bathrooms">
                          <div>
                            <FormDescription className="mb-4">
                              Upload photos of each bathroom (Max 3 images per
                              bathroom)
                            </FormDescription>
                            <FileUpload
                              maxFiles={
                                3 * parseInt(form.watch("bathrooms") || "1")
                              }
                              maxSize={20 * 1024 * 1024}
                              accepts={["image/*"]}
                              onFilesSelected={(files) =>
                                setBathroomImages(files)
                              }
                              onFileRemoved={(fileId) =>
                                setBathroomImages((prev) =>
                                  prev.filter((file) => file.id !== fileId),
                                )
                              }
                              files={bathroomImages}
                            />
                          </div>
                        </TabsContent>

                        <TabsContent value="kitchen">
                          <div>
                            <FormDescription className="mb-4">
                              Upload photos of the kitchen area (Max 5 images)
                            </FormDescription>
                            <FileUpload
                              maxFiles={5}
                              maxSize={20 * 1024 * 1024}
                              accepts={["image/*"]}
                              onFilesSelected={(files) =>
                                setKitchenImages(files)
                              }
                              onFileRemoved={(fileId) =>
                                setKitchenImages((prev) =>
                                  prev.filter((file) => file.id !== fileId),
                                )
                              }
                              files={kitchenImages}
                            />
                          </div>
                        </TabsContent>
                      </>
                    )}

                  <TabsContent value="floorPlan">
                    <div>
                      <FormDescription className="mb-4">
                        Upload floor plans or layout diagrams (Max 3 images)
                      </FormDescription>
                      <FileUpload
                        maxFiles={3}
                        maxSize={20 * 1024 * 1024}
                        accepts={["image/*"]}
                        onFilesSelected={(files) => setFloorPlanImages(files)}
                        onFileRemoved={(fileId) =>
                          setFloorPlanImages((prev) =>
                            prev.filter((file) => file.id !== fileId),
                          )
                        }
                        files={floorPlanImages}
                      />
                    </div>
                  </TabsContent>

                  {(propertyType === "residential-land" ||
                    propertyType === "commercial-land" ||
                    propertyType === "agricultural-land") && (
                    <TabsContent value="masterPlan">
                      <div>
                        <FormDescription className="mb-4">
                          Upload master plan or site layout if available (Max 3
                          images)
                        </FormDescription>
                        <FileUpload
                          maxFiles={3}
                          maxSize={20 * 1024 * 1024}
                          accepts={["image/*"]}
                          onFilesSelected={(files) =>
                            setMasterPlanImages(files)
                          }
                          onFileRemoved={(fileId) =>
                            setMasterPlanImages((prev) =>
                              prev.filter((file) => file.id !== fileId),
                            )
                          }
                          files={masterPlanImages}
                        />
                      </div>
                    </TabsContent>
                  )}

                  <TabsContent value="locationMap">
                    <div>
                      <FormDescription className="mb-4">
                        Upload location maps or nearby landmarks (Max 2 images)
                      </FormDescription>
                      <FileUpload
                        maxFiles={2}
                        maxSize={20 * 1024 * 1024}
                        accepts={["image/*"]}
                        onFilesSelected={(files) => setLocationMapImages(files)}
                        onFileRemoved={(fileId) =>
                          setLocationMapImages((prev) =>
                            prev.filter((file) => file.id !== fileId),
                          )
                        }
                        files={locationMapImages}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="other">
                    <div>
                      <FormDescription className="mb-4">
                        Upload any other relevant photos (Max 10 images)
                      </FormDescription>
                      <FileUpload
                        maxFiles={10}
                        maxSize={20 * 1024 * 1024}
                        accepts={["image/*"]}
                        onFilesSelected={(files) => setOtherImages(files)}
                        onFileRemoved={(fileId) =>
                          setOtherImages((prev) =>
                            prev.filter((file) => file.id !== fileId),
                          )
                        }
                        files={otherImages}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="videos">
                    <div>
                      <FormDescription className="mb-4">
                        Upload property walkthrough videos (max 30MB each, Max 2
                        videos)
                      </FormDescription>
                      <FileUpload
                        maxFiles={2}
                        maxSize={30 * 1024 * 1024}
                        accepts={["video/*"]}
                        onFilesSelected={(files) => setVideoFiles(files)}
                        onFileRemoved={(fileId) =>
                          setVideoFiles((prev) =>
                            prev.filter((file) => file.id !== fileId),
                          )
                        }
                        files={videoFiles}
                      />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>

              <div className="mt-6 text-xs text-gray-500">
                <p>Accepted formats are .jpg, .gif, .bmp & .png.</p>
                <p>
                  Maximum size allowed is 20 MB. Minimum dimension allowed
                  800*400 Pixel
                </p>
                <p className="mt-2">
                  You can also email them to us for uploading at
                  photos@magicbricks.com
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setCurrentStep(2);
                  formTopRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                type="button"
                size="lg"
                onClick={() => {
                  const totalImages = [
                    ...exteriorImages,
                    ...livingRoomImages,
                    ...bedroomImages,
                    ...bathroomImages,
                    ...kitchenImages,
                    ...floorPlanImages,
                    ...masterPlanImages,
                    ...locationMapImages,
                    ...otherImages,
                  ].length;

                  if (totalImages >= 1) {
                    setCurrentStep(4);
                    formTopRef.current?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    toast({
                      title: "Photos Required",
                      description:
                        "Please upload at least one photo of your property",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Next: Contact Info
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Contact Information
            </h2>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-md">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {user?.name || "Your Profile"}
                  </h3>
                  <p className="text-gray-600 mb-2">{user?.email}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Complete your profile information below to help buyers
                    contact you
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Your Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full name"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Phone Number*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="10-digit mobile number"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="whatsappEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-green-50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-semibold text-green-800 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                      Enable WhatsApp Contact
                    </FormLabel>
                    <FormDescription className="text-green-700">
                      Allow buyers to contact you directly via WhatsApp for
                      faster communication
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setCurrentStep(3);
                  formTopRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                type="submit"
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Property"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl" ref={formTopRef}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              List Your Property for Sale
            </h1>
            <p className="mt-2 text-gray-600">
              Connect directly with buyers - No brokerage fees!
            </p>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">New Property Listing</h2>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step < currentStep
                          ? "bg-white text-blue-600"
                          : step === currentStep
                            ? "bg-blue-400 text-white"
                            : "bg-blue-700 text-blue-200"
                      }`}
                    >
                      {step < currentStep ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {renderFormStep()}
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* OTP Verification Modal */}
          <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  WhatsApp OTP Verification
                </DialogTitle>
                <DialogDescription>
                  We've sent a 6-digit OTP to {form.watch("contactPhone")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <OtpInput
                  length={6}
                  onOtpSubmit={handleOtpSubmit}
                  disabled={isLoading}
                />
                <div className="text-center text-sm text-gray-500">
                  Didn't receive OTP?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:underline"
                    onClick={() => sendOtp(form.watch("contactPhone"))}
                    disabled={isSendingOtp}
                  >
                    {isSendingOtp ? "Sending..." : "Resend OTP"}
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Footer />
    </div>
  );
}
