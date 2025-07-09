import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  default: "bg-neon-blue text-white hover:bg-blue-500",
  outline: "border border-gray-600 text-gray-200 hover:bg-gray-800",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  ghost: "hover:bg-gray-700 text-white",
};

const sizeClasses = {
  sm: "px-2.5 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-blue disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
