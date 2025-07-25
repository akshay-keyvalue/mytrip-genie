import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plane, 
  Hotel, 
  Car, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star,
  Download,
  Share2,
  ArrowLeft,
  Coffee,
  Camera,
  Utensils,
  Check,
  Clock,
  Users,
  ExternalLink,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TripResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const tripData = location.state;

  // Flight options with detailed information
  const flightOptions = [
    {
      id: "economy",
      airline: "SkyConnect Airlines",
      type: "Economy Class",
      route: "Your City → Bali",
      duration: "14h 30m (1 stop)",
      cost: Math.floor((tripData?.budget || 2000) * 0.35),
      departure: "08:30 AM",
      arrival: "11:00 PM (+1 day)",
      stopover: "Singapore (2h 30m)",
      aircraft: "Boeing 787-9",
      baggage: "23kg checked, 7kg carry-on",
      meals: "2 meals included",
      entertainment: "Personal screen with 1000+ movies",
      bookingLink: "https://skyconnect.com/book/flight123"
    },
    {
      id: "premium",
      airline: "Premium Airways",
      type: "Premium Economy",
      route: "Your City → Bali",
      duration: "12h 45m (Direct)",
      cost: Math.floor((tripData?.budget || 2000) * 0.45),
      departure: "10:15 AM",
      arrival: "11:00 PM (same day)",
      stopover: "Direct flight",
      aircraft: "Airbus A350-900",
      baggage: "32kg checked, 10kg carry-on",
      meals: "3 premium meals + snacks",
      entertainment: "Large personal screen, noise-canceling headphones",
      bookingLink: "https://premiumairways.com/book/flight456"
    },
    {
      id: "business",
      airline: "Luxury Airlines",
      type: "Business Class",
      route: "Your City → Bali",
      duration: "11h 20m (Direct)",
      cost: Math.floor((tripData?.budget || 2000) * 0.6),
      departure: "09:45 AM",
      arrival: "09:05 PM (same day)",
      stopover: "Direct flight",
      aircraft: "Boeing 777-300ER",
      baggage: "40kg checked, 14kg carry-on",
      meals: "Gourmet dining, premium beverages",
      entertainment: "Lie-flat seats, premium entertainment system",
      bookingLink: "https://luxuryairlines.com/book/flight789"
    }
  ];

  // Accommodation options
  const accommodationOptions = [
    {
      id: "budget",
      name: "Cozy Beach Hostel",
      type: "3-star boutique hostel",
      cost: Math.floor((tripData?.budget || 2000) * 0.25),
      amenities: ["Pool", "Free WiFi", "Beach Access"]
    },
    {
      id: "standard",
      name: "Tropical Paradise Resort",
      type: "4-star beachfront resort",
      cost: Math.floor((tripData?.budget || 2000) * 0.35),
      amenities: ["Pool", "Spa", "Beach Access", "Free WiFi"]
    },
    {
      id: "luxury",
      name: "Royal Ocean Villa",
      type: "5-star luxury villa",
      cost: Math.floor((tripData?.budget || 2000) * 0.5),
      amenities: ["Private Pool", "Spa", "Butler Service", "Beach Access", "Free WiFi", "Restaurant"]
    }
  ];

  // State for selected options and dialog
  const [selectedFlight, setSelectedFlight] = useState("economy");
  const [selectedAccommodation, setSelectedAccommodation] = useState("standard");
  const [flightDialogOpen, setFlightDialogOpen] = useState(false);
  const [selectedFlightDetails, setSelectedFlightDetails] = useState(null);

  // Calculate dynamic costs with safety checks
  const selectedFlightOption = flightOptions.find(f => f.id === selectedFlight) || flightOptions[0];
  const selectedAccommodationOption = accommodationOptions.find(a => a.id === selectedAccommodation) || accommodationOptions[1];
  
  const staticCosts = {
    transport: Math.floor((tripData?.budget || 2000) * 0.1),
    activities: [
      { day: 1, title: "Arrival & Ubud Rice Terraces", cost: 50, type: "culture" },
      { day: 2, title: "Tanah Lot Temple & Sunset", cost: 30, type: "sightseeing" },
      { day: 3, title: "Snorkeling at Nusa Penida", cost: 80, type: "adventure" },
      { day: 4, title: "Traditional Cooking Class", cost: 45, type: "culture" },
      { day: 5, title: "Mount Batur Sunrise Hike", cost: 60, type: "adventure" },
      { day: 6, title: "Beach Day & Spa Treatment", cost: 70, type: "relaxation" },
      { day: 7, title: "Souvenir Shopping & Departure", cost: 40, type: "shopping" }
    ]
  };

  const totalActivitiesCost = staticCosts.activities.reduce((sum, act) => sum + act.cost, 0);
  
  const totalCost = useMemo(() => {
    return (selectedFlightOption?.cost || 0) + 
           (selectedAccommodationOption?.cost || 0) + 
           staticCosts.transport + 
           totalActivitiesCost;
  }, [selectedFlightOption, selectedAccommodationOption, staticCosts.transport, totalActivitiesCost]);

  const generatedTrip = {
    destination: tripData?.destination === "AI will suggest best destinations" ? "Bali, Indonesia" : (tripData?.destination || "Bali, Indonesia"),
    duration: tripData?.duration || "7-10",
    travelers: tripData?.travelers || "2"
  };

  const handleShare = () => {
    toast({
      title: "Trip Shared!",
      description: "Your trip plan has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Downloaded!",
      description: "Your trip plan has been saved as PDF.",
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "culture": return <Camera className="h-4 w-4" />;
      case "adventure": return <MapPin className="h-4 w-4" />;
      case "relaxation": return <Coffee className="h-4 w-4" />;
      case "sightseeing": return <Star className="h-4 w-4" />;
      case "shopping": return <Utensils className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const handleFlightDetails = (flight) => {
    setSelectedFlightDetails(flight);
    setFlightDialogOpen(true);
  };

  const handleBookFlight = (bookingLink) => {
    window.open(bookingLink, '_blank');
    toast({
      title: "Redirecting to booking...",
      description: "Opening airline website in a new tab.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/planner")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Plan Another Trip
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="secondary" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Trip Overview */}
        <Card className="mb-8 shadow-travel">
          <CardHeader className="bg-gradient-sky text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">{generatedTrip.destination}</CardTitle>
                <CardDescription className="text-white/90 text-lg">
                  Your Personalized Trip Plan
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">${totalCost.toLocaleString()}</div>
                <div className="text-white/90">Total Budget</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-secondary" />
                <div>
                  <div className="font-semibold">{generatedTrip.duration} days</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold">{generatedTrip.travelers} travelers</div>
                  <div className="text-sm text-muted-foreground">Group Size</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">Premium</div>
                  <div className="text-sm text-muted-foreground">Experience Level</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Transportation & Accommodation */}
          <div className="space-y-6">
            {/* Flights */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-primary" />
                  Flight Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedFlight} onValueChange={setSelectedFlight}>
                  {flightOptions.map((option) => (
                    <div key={option.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-smooth">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-sm">{option.airline}</div>
                              <div className="text-xs text-muted-foreground">{option.type}</div>
                              <div className="text-xs text-muted-foreground">{option.duration}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={selectedFlight === option.id ? "default" : "outline"}>
                                ${option.cost}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleFlightDetails(option);
                                }}
                                className="p-1 h-6 w-6"
                              >
                                <Info className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Accommodation */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hotel className="h-5 w-5 text-accent" />
                  Accommodation Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedAccommodation} onValueChange={setSelectedAccommodation}>
                  {accommodationOptions.map((option) => (
                    <div key={option.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-smooth">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`acc-${option.id}`} />
                        <Label htmlFor={`acc-${option.id}`} className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-semibold text-sm">{option.name}</div>
                              <div className="text-xs text-muted-foreground">{option.type}</div>
                            </div>
                            <Badge variant={selectedAccommodation === option.id ? "default" : "outline"}>
                              ${option.cost}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {option.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Transportation */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-secondary" />
                  Local Transport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-semibold">Private car + scooter rental</div>
                  <div className="flex items-center justify-between">
                    <span>Total Transport Cost</span>
                    <Badge variant="secondary">${staticCosts.transport}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Daily Itinerary */}
          <div className="lg:col-span-2">
            <Card className="shadow-travel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Daily Itinerary
                </CardTitle>
                <CardDescription>
                  Your personalized day-by-day activities and experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {staticCosts.activities.map((activity, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-soft transition-smooth">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <div className="font-semibold">Day {activity.day}</div>
                          <div className="text-sm text-muted-foreground capitalize">{activity.type}</div>
                        </div>
                      </div>
                      <Badge variant="outline">${activity.cost}</Badge>
                    </div>
                    <div className="ml-11">
                      <h4 className="font-medium">{activity.title}</h4>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Budget Breakdown */}
        <Card className="mt-8 shadow-travel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-secondary" />
              Budget Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">${selectedFlightOption?.cost || 0}</div>
                <div className="text-sm text-muted-foreground">Flights</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent">${selectedAccommodationOption?.cost || 0}</div>
                <div className="text-sm text-muted-foreground">Accommodation</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">${totalActivitiesCost}</div>
                <div className="text-sm text-muted-foreground">Activities</div>
              </div>
              <div className="text-center p-4 bg-gradient-sky text-white rounded-lg">
                <div className="text-2xl font-bold">${totalCost}</div>
                <div className="text-sm text-white/90">Total Cost</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flight Details Dialog */}
      <Dialog open={flightDialogOpen} onOpenChange={setFlightDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              Flight Details - {selectedFlightDetails?.airline}
            </DialogTitle>
          </DialogHeader>
          
          {selectedFlightDetails && (
            <div className="space-y-6">
              {/* Flight Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Flight Class</div>
                  <div className="font-semibold">{selectedFlightDetails.type}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Aircraft</div>
                  <div className="font-semibold">{selectedFlightDetails.aircraft}</div>
                </div>
              </div>

              <Separator />

              {/* Schedule */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Flight Schedule
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Departure</div>
                    <div className="font-semibold">{selectedFlightDetails.departure}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Arrival</div>
                    <div className="font-semibold">{selectedFlightDetails.arrival}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Duration & Stops</div>
                  <div className="font-semibold">{selectedFlightDetails.duration}</div>
                  <div className="text-sm text-muted-foreground">{selectedFlightDetails.stopover}</div>
                </div>
              </div>

              <Separator />

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="font-semibold">Included Amenities</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">Baggage</Badge>
                    <span className="text-sm">{selectedFlightDetails.baggage}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">Meals</Badge>
                    <span className="text-sm">{selectedFlightDetails.meals}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">Entertainment</Badge>
                    <span className="text-sm">{selectedFlightDetails.entertainment}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pricing & Booking */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-primary">${selectedFlightDetails.cost}</div>
                  <div className="text-sm text-muted-foreground">Per person</div>
                </div>
                <Button 
                  variant="travel" 
                  onClick={() => handleBookFlight(selectedFlightDetails.bookingLink)}
                  className="flex items-center gap-2"
                >
                  Book Flight <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripResults;
