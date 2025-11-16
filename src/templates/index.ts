import { progressBar } from "./components/progress-bar";
import { counterAnimation } from "./components/counter-animation";
import { histogram } from "./components/histogram";
import { donutChart } from "./components/donut-chart";
import { textRotation } from "./components/text-rotation";
import { chatMessages } from "./components/chat-messages";
import { typewriterHighlight } from "./components/typewriter-highlight";

export interface RemotionTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  durationInFrames: number;
  fps: number;
}

export const templates: RemotionTemplate[] = [
  progressBar,
  counterAnimation,
  histogram,
  donutChart,
  textRotation,
  chatMessages,
  typewriterHighlight,
];
