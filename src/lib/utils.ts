import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TemplateCategory } from "@/templates"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(category: TemplateCategory): {
  variant: "default" | "secondary" | "destructive" | "outline";
  className?: string;
} {
  switch (category) {
    case "Text":
      return { variant: "default", className: "bg-blue-500 hover:bg-blue-600" };
    case "Charts":
      return { variant: "default", className: "bg-emerald-500 hover:bg-emerald-600" };
    case "Other":
      return { variant: "default", className: "bg-violet-500 hover:bg-violet-600" };
    default:
      return { variant: "secondary" };
  }
}
