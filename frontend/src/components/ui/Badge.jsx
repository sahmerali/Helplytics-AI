import React from "react";

export function Badge({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-teal-50 text-teal-700",
    secondary: "bg-teal-50 text-teal-700",
    outline: "border border-gray-200 text-gray-600 bg-transparent",
    danger: "bg-red-50 text-red-600",
    warning: "bg-yellow-50 text-yellow-700",
    success: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
