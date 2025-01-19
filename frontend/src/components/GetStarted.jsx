import React, { useState, useContext } from "react";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Clock,
  Users,
  CheckCircle,
  Crown
} from 'lucide-react';
import axios from 'axios';
import { handleError, handleSuccess } from "../utils/errorHandler";
import { AuthContext } from "../context/authContext";

const GetStarted = () => {
  const { user } = useContext(AuthContext); // Access user data from AuthContext
  const [prompt, setPrompt] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [tempResult, setTempResult] = useState(null);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setMsg("Prompt cannot be empty.");
      return;
    }

    setLoading(true);
    setMsg("Generating your image...");
    setIsInputDisabled(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/generate`,
        { prompt }
      );

      if (response.data?.imageUrl) {
        setTempResult(response.data.imageUrl);
        setMsg("Image generated successfully!");
        handleSuccess("-1 credit");
        setShowActions(true);
      } else {
        setMsg("No valid image URL returned. Please try again.");
        handleError("Please try again");
      }
    } catch (error) {
      console.error(error);

      if (error.response?.status === 403) {
        setMsg("Authentication required. Please log in to access this feature.");
        handleError("Please Login");
      } else {
        setMsg(error.response?.data?.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
      setIsInputDisabled(false);
    }
  };

  const handleSave = () => {
    console.log("Saving result:", tempResult);
    setPrompt("");
    setMsg("Image saved successfully!");
    setShowActions(false);
    setTempResult(null);
  };

  const handleClear = () => {
    setPrompt("");
    setTempResult(null);
    setShowActions(false);
    setMsg("");
  };

  const availableCredits = user?.credits || 5; // Use user credits if signed in, otherwise default to 5

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 font-montserrat text-white">
      {/* Trial Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800/40 py-2.5">
        <div className="max-w-6xl mx-auto px-4 text-center flex items-center justify-center gap-3">
          <span className="bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full text-sm font-semibold text-indigo-300 mr-4">NEW</span>
          <span className="text-base text-slate-300">
            Try our enterprise plan free for 14 days
            <span className="inline-block ml-4 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer transition-colors">→</span>
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-4xl font-bold mt-24 mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Create Amazing Images in Seconds
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Transform your ideas into stunning visuals with our enterprise-grade AI image generator.
            Start creating now with 5 free credits.
          </p>
        </div>

        {/* Main Generation Section */}
        <div className="max-w-2xl mx-auto bg-slate-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm mb-28">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Describe your perfect image (e.g., 'A serene mountain landscape at sunset')..."
              value={prompt}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 text-sm text-white placeholder-slate-500 
                border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent ${loading || isInputDisabled ? "opacity-50" : ""}`}
              disabled={loading || isInputDisabled}
            />
            
            {!showActions ? (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 
                  bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                  text-white text-base font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Clock className="animate-spin w-4 h-4" />
                    Generating...
                  </span>
                ) : (
                  <>
                    Generate Image
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 
                    hover:from-emerald-700 hover:to-emerald-800 text-white font-medium rounded-lg 
                    transition flex items-center gap-2"
                >
                  Save to Library
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white 
                    font-medium rounded-lg transition"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>

          {/* Status Message */}
          {msg && (
            <div className={`mt-4 text-center font-medium ${
              msg.includes("success") ? "text-emerald-400" : "text-red-400"
            }`}>
              {msg}
            </div>
          )}

          {/* Results Display */}
          {tempResult && (
            <div className="mt-6 flex justify-center">
              <div className="bg-slate-900/50 rounded-lg p-4 max-w-md">
                <img
                  src={tempResult}
                  alt="Generated Image"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Enterprise Speed</h3>
            <p className="text-slate-400">Generate production-ready images in under 10 seconds with our optimized AI.</p>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Commercial License</h3>
            <p className="text-slate-400">Full ownership rights for business use. No attribution required.</p>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Team Features</h3>
            <p className="text-slate-400">Collaborate with unlimited team members. Share assets instantly.</p>
          </div>
        </div>

        {/* Credits Display */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-6 py-3">
            <span className="text-slate-400 text-sm">{availableCredits} credits remaining</span>
            <span className="text-slate-500">•</span>
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1">
              <Crown className="w-4 h-4" />
              Upgrade to Pro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
