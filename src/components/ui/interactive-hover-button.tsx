import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full p-2 text-center font-semibold transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md",
        className,
      )}
      {...props}
    >
      <span className="inline-flex items-center transition-all duration-300 mr-0 group-hover:mr-2">
        {text}
      </span>
      <span className="inline-flex transform scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        <ArrowRight size={18} />
      </span>
      <div className="absolute inset-0 -z-10 bg-green-500 opacity-0 transition-all duration-300 group-hover:opacity-10 rounded-full"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
