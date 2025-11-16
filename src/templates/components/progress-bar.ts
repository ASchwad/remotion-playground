export const progressBar = {
  id: "progress-bar",
  name: "Progress Bar",
  description: "Animated progress bar with percentage",
  durationInFrames: 300,
  fps: 30,
  category: "Other" as const,
  code: `() => {
  const frame = Remotion.useCurrentFrame();

  // Colors
  const COLOR_BACKGROUND = "#0d1b2a";
  const COLOR_TEXT = "#e0e1dd";
  const COLOR_BAR_BACKGROUND = "#1b263b";
  const COLOR_BAR_BORDER = "#415a77";
  const COLOR_BAR_FILL = "#4cc9f0";
  const COLOR_PERCENTAGE = "#fff";

  // Text
  const TITLE_TEXT = "Loading...";

  // Timing
  const ANIMATION_DURATION = 300;

  // Typography
  const TITLE_FONT_SIZE = 32;
  const PERCENTAGE_FONT_SIZE = 18;

  // Layout
  const CONTAINER_PADDING = 60;
  const MAX_WIDTH = 600;
  const TITLE_MARGIN_BOTTOM = 20;
  const BAR_HEIGHT = 40;
  const BAR_BORDER_RADIUS = 20;
  const BAR_BORDER_WIDTH = 2;
  const PERCENTAGE_PADDING_RIGHT = 15;

  // Progress from 0 to 100%
  const progress = Remotion.interpolate(frame, [0, ANIMATION_DURATION], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <Remotion.AbsoluteFill
      style={{
        backgroundColor: COLOR_BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
        padding: CONTAINER_PADDING,
      }}
    >
      <div style={{ width: "100%", maxWidth: MAX_WIDTH }}>
        <h2
          style={{
            color: COLOR_TEXT,
            fontSize: TITLE_FONT_SIZE,
            marginBottom: TITLE_MARGIN_BOTTOM,
            fontFamily: "system-ui",
          }}
        >
          {TITLE_TEXT}
        </h2>

        {/* Progress bar background */}
        <div
          style={{
            width: "100%",
            height: BAR_HEIGHT,
            backgroundColor: COLOR_BAR_BACKGROUND,
            borderRadius: BAR_BORDER_RADIUS,
            overflow: "hidden",
            border: \`\${BAR_BORDER_WIDTH}px solid \${COLOR_BAR_BORDER}\`,
          }}
        >
          {/* Progress bar fill */}
          <div
            style={{
              width: \`\${progress}%\`,
              height: "100%",
              backgroundColor: COLOR_BAR_FILL,
              transition: "width 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: PERCENTAGE_PADDING_RIGHT,
            }}
          >
            <span
              style={{
                color: COLOR_PERCENTAGE,
                fontWeight: "bold",
                fontSize: PERCENTAGE_FONT_SIZE,
                fontFamily: "system-ui",
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </Remotion.AbsoluteFill>
  );
}`,
};
