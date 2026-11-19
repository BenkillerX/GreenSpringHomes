export const SERVICE_PROVIDER_SKILLS = {
  "Building, Construction & Engineering": [
    "Building contractors",
    "Civil engineers",
    "Structural engineers",
    "Architects",
    "Quantity surveyors",
    "Building technicians",
    "Welders",
    "Tilers",
    "Roofers",
    "POP installers",
    "Aluminium fabricators",
  ],

  "Home Repairs & Maintenance": [
    "Plumbers",
    "Electricians",
    "AC installation and repair technicians",
    "Generator technicians",
    "Painters",
    "Carpenters",
    "Locksmiths",
    "CCTV installers",
    "Solar system installers",
    "Pest control professionals",
  ],

  "Interior Design & Decoration": [
    "Interior designers",
    "Furniture makers",
    "Upholsterers",
    "Curtain and blinds installers",
    "Wallpaper installers",
    "Home decorators",
    "Lighting specialists",
    "Kitchen designers",
    "Space planners",
  ],

  "Cleaning & Facility Management": [
    "Residential cleaners",
    "Office cleaners",
    "Post-construction cleaners",
    "Fumigation services",
    "Waste management companies",
    "Facility managers",
    "Swimming pool maintenance",
    "Gardening and landscaping",
  ],

  "Creative, Media & Entertainment": [
    "Video editors",
    "Videographers",
    "Photographers",
    "Graphic designers",
    "Animators",
    "Motion graphics designers",
    "Content creators",
    "Drone operators",
    "Scriptwriters",
    "Voice-over artists",
  ],

  "Technology & Software": [
    "Website developers",
    "Software programmers",
    "Mobile app developers",
    "UI/UX designers",
    "WordPress developers",
    "IT consultants",
    "Cybersecurity professionals",
    "Data analysts",
    "Computer repair technicians",
    "Network engineers",
  ],

  "Digital Marketing & Advertising": [
    "Digital marketers",
    "Social media managers",
    "SEO specialists",
    "Facebook and Google Ads specialists",
    "Email marketers",
    "Brand strategists",
    "Copywriters",
    "Marketing consultants",
    "Public relations professionals",
  ],

  "Real Estate Professionals": [
    "Real estate consultants",
    "Property valuers",
    "Estate surveyors",
    "Property managers",
    "Real estate agents",
    "Property lawyers",
    "Land surveyors",
    "Property inspection professionals",
    "Mortgage consultants",
  ],

  "Legal & Professional Services": [
    "Lawyers",
    "Legal consultants",
    "Accountants",
    "Tax consultants",
    "Business consultants",
    "Company registration consultants",
    "Insurance brokers",
    "Financial consultants",
  ],

  "Moving, Logistics & Transportation": [
    "Moving companies",
    "Furniture movers",
    "Truck and van rentals",
    "Delivery services",
    "Logistics companies",
    "Relocation consultants",
    "Storage and warehousing providers",
  ],

  "Events & Hospitality": [
    "Event planners",
    "Caterers",
    "Decorators",
    "Rental furniture providers",
    "Sound and lighting technicians",
    "DJs",
    "MCs",
    "Event photographers",
    "Short-let apartment managers",
    "Hospitality consultants",
  ],

  "Education & Training": [
    "Private tutors",
    "Computer trainers",
    "Vocational instructors",
    "Real estate trainers",
    "Business coaches",
    "Professional development consultants",
    "Online course providers",
  ],

  "Security Services": [
    "Security companies",
    "Private security personnel",
    "CCTV operators and installers",
    "Access control specialists",
    "Alarm system installers",
    "Security consultants",
  ],

  "Lifestyle & Personal Services": [
    "Laundry and dry-cleaning services",
    "Professional gardeners",
    "Home care providers",
    "Personal chefs",
    "Personal fitness trainers",
    "Beauty professionals",
    "Pet care providers",
  ],

  "Business & Administrative Services": [
    "Virtual assistants",
    "Data entry professionals",
    "Customer support specialists",
    "Business plan writers",
    "Recruitment agencies",
    "Human resource consultants",
    "Procurement consultants",
    "Office support services",
  ],
};

export const SERVICE_PROVIDER_CATEGORIES = Object.keys(
  SERVICE_PROVIDER_SKILLS
);

export const ALL_SERVICE_PROVIDER_SKILLS = [
  ...new Set(Object.values(SERVICE_PROVIDER_SKILLS).flat()),
];
