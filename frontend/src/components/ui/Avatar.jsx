import React from "react";

export function Avatar({ 
  src, 
  alt = "Avatar", 
  fallback = "U", 
  size = "md", 
  className = "" 
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };

  const baseStyles = "relative flex shrink-0 overflow-hidden rounded-full";
  const fallbackStyles = "flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold border-2 border-white shadow-sm";

  return (
    <div className={`${baseStyles} ${sizes[size]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className={fallbackStyles}>
          {fallback.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}
