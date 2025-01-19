import React from "react";
import { Check, X, Crown, Sparkles, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      credits: "10 credits/month",
      features: [
        "Access to basic image generation",
        "Standard response time",
        "Community support",
        "Basic resolution options"
      ],
      unavailable: [
        "Commercial license",
        "Priority processing",
        "Team collaboration"
      ],
      icon: <Sparkles className="text-blue-400 w-6 h-6" />,
      className: "border-slate-700/50"
    },
    {
      name: "Pro",
      price: "$29",
      credits: "100 credits/month",
      features: [
        "Commercial license included",
        "Priority processing",
        "Email support",
        "High resolution options",
        "Advanced editing tools"
      ],
      unavailable: ["Team collaboration"],
      icon: <Zap className="text-indigo-400 w-6 h-6" />,
      className: "border-indigo-500/30",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      credits: "Unlimited credits",
      features: [
        "All Pro features",
        "Team collaboration",
        "Custom API access",
        "24/7 Priority support",
        "Custom model training"
      ],
      unavailable: [],
      icon: <Crown className="text-yellow-400 w-6 h-6" />,
      className: "border-yellow-500/30"
    },
  ];

  return (
    <div id="pricing" className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent font-montserrat">
            Choose Your Plan
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto font-montserrat">
            Get started with 5 free credits. Upgrade anytime to unlock more features and credits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-montserrat">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800/30 backdrop-blur-sm rounded-2xl border ${plan.className} p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500/10 border border-indigo-500/20 px-4 py-1 rounded-full text-sm font-semibold text-indigo-300">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-slate-800/50`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-slate-400">/month</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-sm text-slate-400">{plan.credits}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow text-lg">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-slate-300">
                    <Check className="text-emerald-400 mr-3 w-5 h-5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.unavailable.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-slate-500">
                    <X className="text-slate-600 mr-3 w-5 h-5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full px-6 py-3 rounded-lg font-medium transition
                  ${plan.popular 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    : "bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600"
                  }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;