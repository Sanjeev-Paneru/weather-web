"use client";

import React from "react";
import { Sun } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden py-12 mt-12"
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary), var(--bg-panel))',
        borderTop: '3px solid #8a8680',
      }}
    >
      {/* Leather strip with rivets (mirror of header) */}
      <div
        className="absolute bottom-0 inset-x-0 h-4"
        style={{
          background: 'linear-gradient(180deg, #4a2a1a, #2a1a0a)',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 -2px 4px rgba(0,0,0,0.8)',
        }}
      >
        {/* Rivets */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #ffd700, #b8860b)',
              left: `${(i / 11) * 100}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              boxShadow: 'inset -0.5px -0.5px 1px rgba(0,0,0,0.8)',
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <Sun size={32} className="text-yellow-400 opacity-70" />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-light)',
                fontSize: '1.5rem',
              }}
              className="font-bold"
            >
              WEATHER STATION
            </h2>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm font-medium">
            {['Documentation', 'API', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-light)',
                }}
                className="hover:text-yellow-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t my-6"
          style={{
            borderColor: 'rgba(200, 168, 75, 0.2)',
          }}
        />

        {/* Bottom text */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(240, 232, 216, 0.6)',
          }}
          className="text-center text-sm"
        >
          &copy; {new Date().getFullYear()} Skeuomorphic Weather Station. All instruments calibrated.
        </p>
      </div>

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
