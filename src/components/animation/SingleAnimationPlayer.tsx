import { Player } from "@remotion/player";
import { Loader2 } from "lucide-react";

interface SingleAnimationPlayerProps {
  Component: React.FC | null;
  isGenerating: boolean;
  durationInFrames: number;
  fps: number;
}

export const SingleAnimationPlayer: React.FC<SingleAnimationPlayerProps> = ({
  Component,
  isGenerating,
  durationInFrames,
  fps,
}) => {
  return (
    <div className="w-full flex justify-center">
      {isGenerating ? (
        <div
          className="flex flex-col items-center justify-center bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25"
          style={{
            width: "100%",
            maxWidth: "800px",
            aspectRatio: "16/9",
          }}
        >
          <Loader2 className="w-12 h-12 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-medium">
            Generating your animation...
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            This may take a few moments
          </p>
        </div>
      ) : Component ? (
        <Player
          component={Component}
          durationInFrames={durationInFrames}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={fps}
          style={{
            width: "100%",
            maxWidth: "800px",
            aspectRatio: "16/9",
          }}
          controls
          loop
          autoPlay
        />
      ) : null}
    </div>
  );
};
