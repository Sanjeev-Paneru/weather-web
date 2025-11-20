"use client";

import React from "react";
import { Sun, Cloud, CloudRain, Moon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-t from-blue-600 via-blue-500 to-blue-400 py-12 ">
      {/* Floating background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sun
          size={60}
          className="absolute top-5 left-10 text-yellow-200 opacity-20 animate-float"
        />
        <Cloud
          size={80}
          className="absolute top-10 right-20 text-white opacity-10 animate-float-delayed"
        />
        <CloudRain
          size={50}
          className="absolute bottom-10 left-1/3 text-blue-200 opacity-10 animate-float"
        />
        <Moon
          size={60}
          className="absolute top-1/2 right-1/4 text-gray-100 opacity-15 animate-float-delayed"
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Footer content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <Sun size={32} className="text-yellow-300 animate-pulse" />
            <h2 className="text-2xl font-bold drop-shadow-lg">WeatherNow</h2>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium">
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Forecast
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-yellow-300 transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Bottom text */}
        <p className="text-center text-white/80 text-sm">
          &copy; {new Date().getFullYear()} WeatherNow. All rights reserved.
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-20px);}
        }
        @keyframes float-delayed {
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-15px);}
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}
