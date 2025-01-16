import React, { useState } from "react";
import axios from "axios";

const GetStarted = () => {
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

      // Handle the response
      if (response.data?.data?.url) {
        setTempResult([response.data.data.url]); // Adjusted for response format
        setMsg("Image generated successfully!");
        setShowActions(true);
      } else {
        setMsg("No image URL returned. Please try again.");
      }
    } catch (error) {
      setMsg(
        error.response?.data?.error || "An error occurred. Please try again."
      );
      console.error(error);
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

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-slate-900 to-black font-montserrat text-white">
      <div className="max-w-3xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-6">Get Started</h1>
        <p className="text-lg text-gray-300 text-center mb-8">
          Enter a creative prompt and let your imagination take flight!
        </p>

        {/* Input & Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-40">
          <input
            type="text"
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={handleInputChange}
            className={`flex-1 px-4 py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 ${
              loading || isInputDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading || isInputDisabled}
          />
          {!showActions && (
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-50 ${
                loading ? "cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Generating..." : "Send"}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              Save Result
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Clear
            </button>
          </div>
        )}

        {/* Message Display */}
        {msg && (
          <p
            className={`text-center font-semibold ${
              msg.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {msg}
          </p>
        )}

        {/* Image Results Display */}
        {tempResult && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tempResult.map((imageUrl, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800 rounded-lg overflow-hidden"
              >
                <img
                  src={imageUrl}
                  alt={`Generated Image ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ))}
          </div>
        )}

        {/* Instructions Section */}
        <div className="text-center text-gray-300 mt-24">
          <h3 className="text-2xl font-bold text-blue-400 mb-4">How to Use</h3>
          <p className="text-lg">
            1. Enter a creative prompt.<br />
            2. Click "Send" to generate visuals.<br />
            3. Save or clear your results.<br />
            4. Repeat and enjoy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
