import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}

export function Container({
  children,
  className,
  as: Component = "div",
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1400px]",
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Container;
