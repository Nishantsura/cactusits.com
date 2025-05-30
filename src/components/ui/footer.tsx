"use client";

import { useTheme } from "next-themes";

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Using Lucide icons as a replacement for DIcons
import { Sun, Moon, ArrowUp } from "lucide-react";

const Footer = () => {
  const { setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center py-6">
      <div className="flex items-center rounded-full border border-dotted p-1">
        <button
          onClick={() => setTheme("light")}
          className="bg-black mr-3 rounded-full p-2 text-white dark:bg-background dark:text-white"
        >
          <Sun className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">Light Theme</span>
        </button>

        <button type="button" onClick={handleScrollTop} className="p-2">
          <ArrowUp className="h-3 w-3" />
          <span className="sr-only">Top</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className="dark:bg-black ml-3 rounded-full p-2 text-black dark:text-white"
        >
          <Moon className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">Dark Theme</span>
        </button>
      </div>
    </div>
  );
};

export default Footer;
