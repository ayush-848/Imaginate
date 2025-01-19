import React from 'react';
import { 
  Zap, 
  Shield, 
  Users, 
  Sparkles, 
  Cpu, 
  Layers, 
  Download, 
  Clock, 
  Palette 
} from 'lucide-react';

const FeatureCard = ({ icon, title, description, subFeatures, gradientFrom, gradientTo }) => (
  <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-400 mb-4">{description}</p>
    <ul className="space-y-2">
      {subFeatures.map((feature, index) => (
        <li key={index} className="flex items-start space-x-2 text-sm text-slate-400">
          <Sparkles className="w-3.5 h-3.5 mt-1 text-slate-500 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: "Enterprise Speed & Quality",
      description: "Lightning-fast generation with professional-grade output quality.",
      gradientFrom: "from-blue-500/20",
      gradientTo: "to-blue-600/20",
      subFeatures: [
        "10-second average generation time",
        "4K resolution support",
        "Multiple aspect ratios available",
        "Real-time preview capabilities"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: "Commercial Licensing",
      description: "Complete ownership rights for all your business needs.",
      gradientFrom: "from-emerald-500/20",
      gradientTo: "to-emerald-600/20",
      subFeatures: [
        "Unlimited commercial usage",
        "No attribution required",
        "Print & digital rights included",
        "Lifetime license validity"
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Advanced Team Tools",
      description: "Seamless collaboration features for creative teams.",
      gradientFrom: "from-purple-500/20",
      gradientTo: "to-purple-600/20",
      subFeatures: [
        "Unlimited team members",
        "Real-time asset sharing",
        "Custom team workspaces",
        "Activity tracking & analytics"
      ]
    }
  ];

  return (
    <div id="features" className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
        <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Professional Features for Creative Teams
        </span>
      </h2>
      <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
        Everything you need to create, manage, and scale your AI-powered image generation workflow.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;