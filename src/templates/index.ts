import { progressBar } from "./components/progress-bar";
import { counterAnimation } from "./components/counter-animation";
import { histogram } from "./components/histogram";
import { donutChart } from "./components/donut-chart";
import { textRotation } from "./components/text-rotation";
import { chatMessages } from "./components/chat-messages";
import { typewriterHighlight } from "./components/typewriter-highlight";

export type TemplateCategory = "Text" | "Charts" | "Other";

export interface RemotionTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  durationInFrames: number;
  fps: number;
  category: TemplateCategory;
}

export const templates: RemotionTemplate[] = [
  typewriterHighlight,
  chatMessages,
  textRotation,
  counterAnimation,
  histogram,
  donutChart,
  progressBar,
];
