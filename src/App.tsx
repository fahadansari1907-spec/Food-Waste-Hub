/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trash2, 
  HeartPulse, 
  Calculator, 
  HandHelping, 
  PawPrint, 
  BarChart3, 
  ChevronRight, 
  Camera, 
  AlertCircle,
  CheckCircle2,
  Users,
  Droplets,
  Leaf,
  Share2,
  Truck,
  Activity,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  Clock,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  analyzeFoodWasteImpact, 
  analyzeProductHealth, 
  calculatePortions, 
  analyzeDonationSafety, 
  suggestAnimalFeeding 
} from './services/geminiService';

// Types
type Section = 'impact' | 'health' | 'portions' | 'donation' | 'animals' | 'pulse';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('impact');
  
  // Dynamic Stats
  const [stats, setStats] = useState({
    foodSaved: 0,
    peopleFed: 0,
    donationsMade: 0
  });

  const [stories, setStories] = useState([
    {
      id: 1,
      user: "Sarah J.",
      type: "donation",
      content: "Just shared 5kg of surplus rice and lentils from our community event. A local NGO picked it up within 20 minutes! So glad it didn't go to waste.",
      location: "Downtown Area",
      time: "2h ago",
      likes: 24,
      impact: "15 meals provided"
    },
    {
      id: 2,
      user: "Mike R.",
      type: "health",
      content: "Used the Health Analyzer on some older spinach. Found out it was still great for a smoothie! Saved me from throwing away perfectly good nutrients.",
      location: "Westside",
      time: "5h ago",
      likes: 12,
      impact: "Zero Waste Win"
    },
    {
      id: 3,
      user: "Green NGO",
      type: "feedback",
      content: "Big thanks to the gig workers in the North District. We've collected over 50kg of food today thanks to your quick sharing on the Hub!",
      location: "North District",
      time: "1d ago",
      likes: 56,
      impact: "Community Hero"
    },
    {
      id: 4,
      user: "Priya K.",
      type: "portion",
      content: "The Portion Calculator is a game changer. I used to cook way too much pasta, but today I made exactly what we needed. No leftovers, no waste!",
      location: "East Heights",
      time: "1d ago",
      likes: 18,
      impact: "Smart Cooking"
    }
  ]);

  const addStory = (content: string, type: string, impact: string, location: string = "Current Location") => {
    const story = {
      id: Date.now(),
      user: "You",
      type,
      content,
      location,
      time: "Just now",
      likes: 0,
      impact
    };
    setStories(prev => [story, ...prev]);
  };

  const updateStats = (fn: (prev: typeof stats) => typeof stats) => {
    setStats(prev => fn(prev));
  };

  // UI Components
  const SectionButton = ({ id, icon: Icon, label }: { id: Section, icon: any, label: string }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        activeSection === id 
          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
          : 'bg-white text-slate-600 hover:bg-emerald-50'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Leaf className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight text-emerald-900 leading-none">Food Waste Hub</h1>
              <p className="text-[10px] font-medium text-emerald-600 mt-1 uppercase tracking-wider">Small actions, big impact. Save food, feed lives.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              <Users size={16} />
              <span>Community Driven</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
              <Trash2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Food Saved Today</p>
              <p className="text-2xl font-bold text-slate-900">{stats.foodSaved} kg</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">People Potentially Fed</p>
              <p className="text-2xl font-bold text-slate-900">{stats.peopleFed}</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <HandHelping size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Donations Made</p>
              <p className="text-2xl font-bold text-slate-900">{stats.donationsMade}</p>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs - Desktop */}
        <div className="hidden md:flex gap-2 mb-8 overflow-x-auto pb-2">
          <SectionButton id="impact" icon={BarChart3} label="Impact Analyzer" />
          <SectionButton id="health" icon={HeartPulse} label="Health Analyzer" />
          <SectionButton id="portions" icon={Calculator} label="Portion Calculator" />
          <SectionButton id="donation" icon={HandHelping} label="Donation System" />
          <SectionButton id="animals" icon={PawPrint} label="Animal Feeding" />
          <SectionButton id="pulse" icon={Activity} label="Community Pulse" />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeSection === 'impact' && <ImpactAnalyzer key="impact" onUpdateStats={updateStats} />}
            {activeSection === 'health' && <HealthAnalyzer key="health" onAddStory={addStory} />}
            {activeSection === 'portions' && <PortionCalculator key="portions" />}
            {activeSection === 'donation' && <DonationSystem key="donation" onUpdateStats={updateStats} onAddStory={addStory} />}
            {activeSection === 'animals' && <AnimalFeeding key="animals" onUpdateStats={updateStats} onAddStory={addStory} />}
            {activeSection === 'pulse' && <CommunityPulse key="pulse" stories={stories} setStories={setStories} />}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 flex justify-between items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <MobileNavButton id="impact" icon={BarChart3} active={activeSection === 'impact'} onClick={() => setActiveSection('impact')} />
        <MobileNavButton id="health" icon={HeartPulse} active={activeSection === 'health'} onClick={() => setActiveSection('health')} />
        <MobileNavButton id="portions" icon={Calculator} active={activeSection === 'portions'} onClick={() => setActiveSection('portions')} />
        <MobileNavButton id="donation" icon={HandHelping} active={activeSection === 'donation'} onClick={() => setActiveSection('donation')} />
        <MobileNavButton id="animals" icon={PawPrint} active={activeSection === 'animals'} onClick={() => setActiveSection('animals')} />
        <MobileNavButton id="pulse" icon={Activity} active={activeSection === 'pulse'} onClick={() => setActiveSection('pulse')} />
      </nav>
    </div>
  );
}

function MobileNavButton({ id, icon: Icon, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-2 rounded-xl transition-colors ${active ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
    >
      <Icon size={24} />
    </button>
  );
}

// --- Feature Components ---

function ImpactAnalyzer({ onUpdateStats }: any) {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!foodType || !quantity) return;
    setLoading(true);
    try {
      const data = await analyzeFoodWasteImpact(foodType, quantity);
      setResult(data);
      
      // Update stats dynamically
      const weightMatch = quantity.match(/(\d+(\.\d+)?)/);
      const weight = weightMatch ? parseFloat(weightMatch[0]) : 1;
      onUpdateStats((prev: any) => ({
        ...prev,
        foodSaved: Math.round((prev.foodSaved + weight) * 10) / 10,
        peopleFed: prev.peopleFed + (data.peopleFed || 0)
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Food Waste Impact Analyzer</h2>
          <p className="text-slate-500">Understand the hidden cost of wasting food and how many lives it could touch.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Food Type</label>
              <input 
                type="text" 
                placeholder="e.g. Rice, Bread, Apples"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
              <input 
                type="text" 
                placeholder="e.g. 2 kg, 5 loaves"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : <>Analyze Impact <ChevronRight size={20} /></>}
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg text-emerald-600 shadow-sm">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Potential Reach</p>
                    <p className="text-lg font-bold text-slate-900">Could feed {result.peopleFed} people</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg text-blue-600 shadow-sm">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Water Footprint</p>
                    <p className="text-lg font-bold text-slate-900">{result.waterSaved} of water used</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-slate-700 mb-1">Environmental Cost</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{result.environmentalImpact}</p>
                </div>
                <div className="flex items-center gap-3 text-emerald-700 italic">
                  <HeartPulse size={18} />
                  <p className="text-sm font-medium">{result.emotionalMessage}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function HealthAnalyzer({ onAddStory }: any) {
  const [productName, setProductName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleShare = () => {
    if (!result) return;
    const message = `I checked ${result.productName} on Food Waste Hub. It has a Health Score of ${result.healthScore}/100 and is rated as ${result.healthStatus}!`;
    onAddStory(message, 'health', result.healthStatus, location || "Local Area");
    
    if (navigator.share) {
      navigator.share({
        title: 'Health Impact Check',
        text: message,
        url: window.location.href
      });
    } else {
      alert("Shared to Community Pulse! Message also copied to clipboard: " + message);
      navigator.clipboard.writeText(message);
    }
  };

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
          setIsDetecting(false);
        }
      );
    } else {
      setIsDetecting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!productName && !image) return;
    setLoading(true);
    try {
      const data = await analyzeProductHealth(productName, image || undefined, location);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Healthy Product Analyzer</h2>
          <p className="text-slate-500">Scan or search products to see their nutritional value and healthier alternatives.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Potato Chips, Greek Yogurt"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your Location (Optional)</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="For local alternatives"
                  className="w-full pl-4 pr-24 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg hover:bg-emerald-200 transition-all disabled:opacity-50"
                >
                  {isDetecting ? "DETECTING..." : "DETECT"}
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
                id="food-image" 
              />
              <label 
                htmlFor="food-image"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all"
              >
                {image ? (
                  <img src={image} alt="Preview" className="h-full w-full object-cover rounded-2xl" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Camera size={32} />
                    <span className="text-sm font-medium">Upload or take a photo</span>
                  </div>
                )}
              </label>
            </div>

          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Analyzing Product...' : <>Check Health Impact <ChevronRight size={20} /></>}
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{result.productName}</h3>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                    result.healthStatus === 'Healthy' ? 'bg-emerald-100 text-emerald-700' :
                    result.healthStatus === 'Moderately Healthy' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {result.healthStatus === 'Healthy' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {result.healthStatus}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-600">{result.healthScore}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Health Score</div>
                  <div className="mt-2 flex flex-col gap-0.5">
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">80-100: Healthy</span>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">50-79: Moderate</span>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">0-49: Unhealthy</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-sm font-bold text-red-800 mb-3">Harmful Ingredients</p>
                  <ul className="space-y-2">
                    {result.harmfulIngredients.map((ing: string, i: number) => (
                      <li key={i} className="text-xs text-red-700 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-400 rounded-full" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-sm font-bold text-emerald-800 mb-3">Healthier Alternatives</p>
                  <ul className="space-y-2">
                    {result.alternatives.map((alt: string, i: number) => (
                      <li key={i} className="text-xs text-emerald-700 flex items-center gap-2">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                <p className="text-sm font-bold text-slate-800 mb-2">Possible Health Effects</p>
                <p className="text-sm text-slate-600 leading-relaxed">{result.healthEffects}</p>
              </div>

              <button 
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
              >
                <Share2 size={20} /> Share to Community Pulse
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PortionCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('moderate');
  const [location, setLocation] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
          setIsDetecting(false);
        }
      );
    } else {
      setIsDetecting(false);
    }
  };

  const handleCalculate = async () => {
    if (!age || !weight) return;
    setLoading(true);
    try {
      const data = await calculatePortions(Number(age), Number(weight), activity, location);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Smart Portion Calculator</h2>
          <p className="text-slate-500">Get personalized calorie needs and portion advice to maintain a healthy lifestyle.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Weight (kg)</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Activity Level</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Location (Optional)</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="For local meals"
                  className="w-full pl-4 pr-24 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg hover:bg-emerald-200 transition-all disabled:opacity-50"
                >
                  {isDetecting ? "DETECTING..." : "DETECT"}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Calculating...' : <>Calculate Portions <ChevronRight size={20} /></>}
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="p-6 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Daily Calorie Needs</p>
                  <p className="text-3xl font-black">{result.calories} kcal</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl flex-1">
                  <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-1">What this looks like:</p>
                  <p className="text-sm font-medium">{result.dailyIntakeDescription}</p>
                </div>
                <Calculator size={40} className="opacity-20 hidden sm:block" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                  <p className="text-sm font-bold text-slate-800 mb-3">Suggested Portions</p>
                  <ul className="space-y-3">
                    {result.portionSuggestions.map((sug: string, i: number) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                        {sug}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl">
                  <p className="text-sm font-bold text-orange-800 mb-2">Health Advice</p>
                  <p className="text-sm text-orange-700 leading-relaxed">{result.healthAdvice}</p>
                  <div className="mt-4 pt-4 border-t border-orange-200">
                    <p className="text-xs font-bold text-orange-800 italic">"{result.encouragement}"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DonationSystem({ onUpdateStats, onAddStory }: any) {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('Fresh');
  const [location, setLocation] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pickupRequested, setPickupRequested] = useState(false);

  const handleShare = () => {
    const message = `I'm donating ${quantity} of ${foodType} (${condition}) through Food Waste Hub! It could feed ${result.peopleFed} people. #FoodWasteHub`;
    onUpdateStats((prev: any) => ({ ...prev, donationsMade: prev.donationsMade + 1 }));
    onAddStory(message, 'donation', `${result.peopleFed} meals`, location || "Local Area");
    
    if (navigator.share) {
      navigator.share({
        title: 'Food Donation',
        text: message,
        url: window.location.href
      });
    } else {
      alert("Shared to Community Pulse! Message also copied to clipboard: " + message);
      navigator.clipboard.writeText(message);
    }
  };

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
          setIsDetecting(false);
          alert("Could not detect location. Please type it manually.");
        }
      );
    } else {
      setIsDetecting(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleCheck = async () => {
    if (!foodType || !quantity) return;
    setLoading(true);
    try {
      const data = await analyzeDonationSafety(foodType, quantity, condition);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Leftover Food Donation System</h2>
          <p className="text-slate-500">Donate your surplus food safely. We'll help you check if it's safe and arrange pickup.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Food Type</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Condition</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Fresh">Fresh</option>
                <option value="Cooked">Cooked</option>
                <option value="Packaged">Packaged</option>
              </select>
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="City or Area"
                  className="w-full pl-4 pr-24 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg hover:bg-emerald-200 transition-all disabled:opacity-50"
                >
                  {isDetecting ? "DETECTING..." : "DETECT"}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleCheck}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Checking Safety...' : <>Check Donation Safety <ChevronRight size={20} /></>}
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <div className={`p-6 rounded-2xl border flex items-center gap-4 ${
                result.isSafe ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
              }`}>
                {result.isSafe ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                <div>
                  <p className="font-bold text-lg">{result.isSafe ? 'Safe for Donation' : 'Not Recommended for Humans'}</p>
                  <p className="text-sm opacity-80">{result.safetyMessage}</p>
                </div>
              </div>

              {result.isSafe && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Impact</p>
                      <p className="text-lg font-bold text-slate-900">Could feed {result.peopleFed} people</p>
                    </div>
                    <div className="p-5 bg-white border border-slate-200 rounded-2xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Precautions</p>
                      <ul className="space-y-1">
                        {result.precautions.map((p: string, i: number) => (
                          <li key={i} className="text-xs text-slate-600">• {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => {
                        setPickupRequested(true);
                        onUpdateStats((prev: any) => ({ ...prev, donationsMade: prev.donationsMade + 1 }));
                      }}
                      className="flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 font-bold py-4 rounded-xl hover:bg-emerald-200 transition-all"
                    >
                      <Truck size={20} /> Request Pickup
                    </button>
                    <button 
                      onClick={handleShare}
                      className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
                    >
                      <Share2 size={20} /> Share Donation
                    </button>
                  </div>

                  {pickupRequested && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-emerald-600 text-white rounded-2xl shadow-xl"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-white/20 p-2 rounded-lg">
                          <Truck size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-1">Pickup Requested!</p>
                          <p className="text-sm text-emerald-50 leading-relaxed">
                            A nearby verified gig worker will collect the food, check its condition, and deliver it to people in need.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AnimalFeeding({ onUpdateStats, onAddStory }: any) {
  const [foodType, setFoodType] = useState('');
  const [location, setLocation] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [pickupRequested, setPickupRequested] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
          setIsDetecting(false);
        },
        (error) => {
          console.error("Error detecting location:", error);
          setIsDetecting(false);
          alert("Could not detect location. Please type it manually.");
        }
      );
    } else {
      setIsDetecting(false);
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSuggest = async () => {
    if (!foodType) return;
    setLoading(true);
    try {
      const data = await suggestAnimalFeeding(foodType);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const message = `I have surplus food (${foodType}) available for animal feeding through Food Waste Hub. Pickup can be arranged for animal institutions. Location: ${location}`;
    onUpdateStats((prev: any) => ({ ...prev, donationsMade: prev.donationsMade + 1 }));
    onAddStory(message, 'animal', 'Animal Help', location || "Local Area");
    
    if (navigator.share) {
      navigator.share({
        title: 'Animal Food Donation',
        text: message,
        url: window.location.href
      });
    } else {
      alert("Shared to Community Pulse! Message also copied to clipboard: " + message);
      navigator.clipboard.writeText(message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Animal Feeding Suggestion</h2>
          <p className="text-slate-500">If food isn't suitable for humans, it might still be a treat for our animal friends.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">What food do you have?</label>
              <input 
                type="text" 
                placeholder="e.g. Vegetable peels, Stale bread"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Location (for donation)</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="City or Area"
                  className="w-full pl-4 pr-24 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg hover:bg-emerald-200 transition-all disabled:opacity-50"
                >
                  {isDetecting ? "DETECTING..." : "DETECT"}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSuggest}
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Analyzing Suggestions...' : <>Get Feeding Suggestions <ChevronRight size={20} /></>}
          </button>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {result.suitableAnimals.length === 0 ? (
                <div className="p-8 bg-red-50 rounded-3xl border-2 border-dashed border-red-200 text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Dangerous for Animals</h3>
                  <p className="text-red-700 leading-relaxed max-w-md mx-auto">
                    {result.generalAdvice || "This food is toxic or dangerous for animals and should be disposed of safely (e.g., composting or waste bin)."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.suitableAnimals.map((item: any, i: number) => (
                      <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-200 transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <PawPrint size={20} />
                          </div>
                          <h4 className="font-bold text-slate-900">{item.animal}</h4>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          <span className="font-bold text-orange-600">Precaution:</span> {item.precaution}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-800 leading-relaxed">{result.generalAdvice}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Donate for Animal Institutions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button 
                        onClick={() => {
                          setPickupRequested(true);
                          onUpdateStats((prev: any) => ({ ...prev, donationsMade: prev.donationsMade + 1 }));
                        }}
                        className="flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 font-bold py-4 rounded-xl hover:bg-emerald-200 transition-all"
                      >
                        <Truck size={20} /> Request Pickup
                      </button>
                      <button 
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
                      >
                        <Share2 size={20} /> Share Donation
                      </button>
                    </div>

                    {pickupRequested && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-6 bg-emerald-600 text-white rounded-2xl shadow-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className="bg-white/20 p-2 rounded-lg">
                            <Truck size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-lg mb-1">Pickup Requested!</p>
                            <p className="text-sm text-emerald-50 leading-relaxed">
                              A nearby verified gig worker will collect the food and deliver it to local animal shelters or institutions where it can be safely used.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CommunityPulse({ stories, setStories }: any) {
  const [newStory, setNewStory] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = () => {
    if (!newStory.trim()) return;
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      const story = {
        id: Date.now(),
        user: "You",
        type: "feedback",
        content: newStory,
        location: "Current Location",
        time: "Just now",
        likes: 0,
        impact: "New Story"
      };
      setStories((prev: any) => [story, ...prev]);
      setNewStory('');
      setIsPosting(false);
    }, 800);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'donation': return <HandHelping className="text-emerald-600" size={18} />;
      case 'health': return <HeartPulse className="text-rose-600" size={18} />;
      case 'portion': return <Calculator className="text-blue-600" size={18} />;
      case 'animal': return <PawPrint className="text-orange-600" size={18} />;
      default: return <MessageSquare className="text-amber-600" size={18} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Community Pulse</h2>
          <p className="text-slate-500">See the real-time impact of your community and share your own journey.</p>
        </div>

        {/* Post Input */}
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 mb-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shrink-0">
              Y
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="Share a donation update, a health win, or feedback..."
                className="w-full bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-emerald-300 resize-none h-20"
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
              />
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-100">
                <div className="flex gap-2">
                  <button className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors">
                    <Camera size={20} />
                  </button>
                  <button className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors">
                    <MapPin size={20} />
                  </button>
                </div>
                <button 
                  onClick={handlePost}
                  disabled={isPosting || !newStory.trim()}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isPosting ? 'Posting...' : 'Post Story'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {stories.map((story) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {story.user[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{story.user}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock size={12} />
                      <span>{story.time}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                  {getIcon(story.type)}
                  <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">{story.type}</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                {story.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 transition-colors">
                    <ThumbsUp size={18} />
                    <span className="text-sm font-medium">{story.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 transition-colors">
                    <MessageSquare size={18} />
                    <span className="text-sm font-medium">Reply</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <Activity size={14} />
                  <span className="text-xs font-bold">{story.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
