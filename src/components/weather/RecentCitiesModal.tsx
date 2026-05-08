"use client";

import React, { useEffect, useId, useRef } from "react";
import { CityResult } from "@/src/types/DataType";

function getFocusable(container: HTMLElement) {
  const nodes = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  return Array.from(nodes).filter(
    (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
  );
}

export default function RecentCitiesModal({
  open,
  onClose,
  cities,
  onSelectCity,
}: {
  open: boolean;
  onClose: () => void;
  cities: CityResult[];
  onSelectCity: (city: CityResult) => void;
}) {
  const titleId = useId();

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Prevent background scroll while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Focus management + escape + restore focus on close.
  useEffect(() => {
    if (!open) return;

    prevFocusRef.current = document.activeElement as HTMLElement | null;

    const raf = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      prevFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50"
    >
      <style>{`
        @keyframes rcmBackdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rcmDrawerIn { from { transform: translateX(18px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .rcm-backdrop-in { animation: rcmBackdropIn 180ms ease-out forwards; }
        .rcm-drawer-in { animation: rcmDrawerIn 220ms cubic-bezier(.2,.8,.2,1) forwards; }
      `}</style>

      {/* Backdrop */}
      <button
        aria-label="Close recent cities"
        onClick={onClose}
        className="absolute inset-0 w-full h-full rcm-backdrop-in"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "none",
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full sm:w-[420px] panel-shadow rcm-drawer-in"
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const container = drawerRef.current;
          if (!container) return;
          const focusables = getFocusable(container);
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }}
        style={{
          background:
            "linear-gradient(135deg, rgba(61,43,31,0.96), rgba(44,31,20,0.98))",
          borderLeft: "1px solid rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="leather-strip"
          style={{
            height: 54,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <div>
            <div className="engraved-label">Recent Searches</div>
            <div
              id={titleId}
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-light)",
                fontSize: "1.3rem",
                textShadow: "0 2px 6px rgba(0,0,0,0.65)",
              }}
            >
              Recent Cities
            </div>
          </div>

          <div className="ml-auto">
            <button
              ref={closeBtnRef}
              className="pressable"
              onClick={onClose}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                fontFamily: "var(--font-body)",
                color: "rgba(26,15,0,0.9)",
                background: "linear-gradient(145deg,#c0b090,#8a7060)",
                border: "1px solid rgba(0,0,0,0.35)",
              }}
            >
              Close
            </button>
          </div>
        </div>

        <div style={{ padding: 16 }}>
          {cities.length === 0 ? (
            <div className="lcd-recess" style={{ padding: 14 }}>
              <div className="lcd-glow-amber" style={{ fontSize: "1rem" }}>
                No recent cities yet.
              </div>
              <div
                className="engraved-label"
                style={{ marginTop: 8, color: "rgba(240,232,216,0.6)" }}
              >
                Search for a city to store it here.
              </div>
            </div>
          ) : (
            <ul
              className="space-y-3"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {cities.map((city) => (
                <li key={city.id}>
                  <button
                    onClick={() => {
                      onSelectCity(city);
                      onClose();
                    }}
                    className="w-full text-left hover-lift"
                    style={{
                      borderRadius: 12,
                      padding: 14,
                      background: "rgba(200, 168, 75, 0.12)",
                      border: "1px solid rgba(200, 168, 75, 0.32)",
                      boxShadow:
                        "inset 0 1px 3px rgba(0,0,0,0.35), 0 10px 18px rgba(0,0,0,0.35)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        color: "var(--text-light)",
                      }}
                    >
                      {city.name}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        color: "rgba(240,232,216,0.72)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {city.country}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
