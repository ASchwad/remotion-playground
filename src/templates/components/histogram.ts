export const histogram = {
  id: "histogram",
  name: "Histogram Chart",
  description: "Animated bar chart with data visualization",
  durationInFrames: 120,
  fps: 30,
  category: "Charts" as const,
  code: `() => {
  const frame = Remotion.useCurrentFrame();

  // Colors
  const COLOR_BACKGROUND = "#0f172a";
  const COLOR_TEXT = "white";
  const COLOR_SUBTITLE = "rgba(255, 255, 255, 0.6)";

  // Text
  const TITLE_TEXT = "Monthly Sales";
  const SUBTITLE_TEXT = "2025 Performance";

  // Data
  const data = [
    { label: "Jan", value: 45, color: "#3b82f6" },
    { label: "Feb", value: 62, color: "#8b5cf6" },
    { label: "Mar", value: 38, color: "#ec4899" },
    { label: "Apr", value: 75, color: "#f59e0b" },
    { label: "May", value: 58, color: "#10b981" },
    { label: "Jun", value: 90, color: "#06b6d4" },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  // Timing
  const TITLE_FADE_DURATION = 20;
  const BAR_DELAY_BASE = 25;
  const BAR_STAGGER = 8;
  const BAR_GROW_DURATION = 20;
  const BAR_FADE_DURATION = 10;
  const VALUE_LABEL_DELAY = 15;
  const VALUE_LABEL_FADE_DURATION = 10;

  // Typography
  const TITLE_FONT_SIZE = 72;
  const SUBTITLE_FONT_SIZE = 32;
  const VALUE_FONT_SIZE = 36;
  const LABEL_FONT_SIZE = 32;
  const LABEL_FONT_WEIGHT = 600;

  // Layout
  const CONTAINER_PADDING = 100;
  const TITLE_MARGIN_BOTTOM = 80;
  const SUBTITLE_MARGIN_TOP = 10;
  const CHART_HEIGHT = 500;
  const CHART_MAX_WIDTH = 1200;
  const BARS_GAP = 40;
  const BAR_MIN_WIDTH = 120;
  const VALUE_MARGIN_BOTTOM = 15;
  const LABEL_MARGIN_TOP = 20;

  // Title animation
  const titleOpacity = Remotion.interpolate(frame, [0, TITLE_FADE_DURATION], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Remotion.AbsoluteFill
      style={{
        backgroundColor: COLOR_BACKGROUND,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: CONTAINER_PADDING,
      }}
    >
      {/* Title */}
      <div style={{ opacity: titleOpacity, marginBottom: TITLE_MARGIN_BOTTOM }}>
        <h1
          style={{
            fontSize: TITLE_FONT_SIZE,
            fontWeight: "bold",
            color: COLOR_TEXT,
            margin: 0,
            textAlign: "center",
          }}
        >
          {TITLE_TEXT}
        </h1>
        <p
          style={{
            fontSize: SUBTITLE_FONT_SIZE,
            color: COLOR_SUBTITLE,
            margin: \`\${SUBTITLE_MARGIN_TOP}px 0 0 0\`,
            textAlign: "center",
          }}
        >
          {SUBTITLE_TEXT}
        </p>
      </div>

      {/* Chart Container */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: BARS_GAP,
          height: CHART_HEIGHT,
          width: "100%",
          maxWidth: CHART_MAX_WIDTH,
        }}
      >
        {data.map((item, index) => {
          const delay = BAR_DELAY_BASE + index * BAR_STAGGER;

          // Bar height animation
          const barHeight = Remotion.interpolate(
            frame,
            [delay, delay + BAR_GROW_DURATION],
            [0, (item.value / maxValue) * 100],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Bar opacity
          const barOpacity = Remotion.interpolate(
            frame,
            [delay, delay + BAR_FADE_DURATION],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Value label animation
          const valueLabelOpacity = Remotion.interpolate(
            frame,
            [delay + VALUE_LABEL_DELAY, delay + VALUE_LABEL_DELAY + VALUE_LABEL_FADE_DURATION],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
                minWidth: BAR_MIN_WIDTH,
              }}
            >
              {/* Value Label */}
              <div style={{ opacity: valueLabelOpacity, marginBottom: VALUE_MARGIN_BOTTOM }}>
                <div
                  style={{
                    fontSize: VALUE_FONT_SIZE,
                    fontWeight: "bold",
                    color: item.color,
                    textShadow: \`0 0 20px \${item.color}80\`,
                  }}
                >
                  {item.value}
                </div>
              </div>

              {/* Bar */}
              <div
                style={{
                  width: "100%",
                  height: \`\${barHeight}%\`,
                  backgroundColor: item.color,
                  borderRadius: "12px 12px 0 0",
                  opacity: barOpacity,
                  boxShadow: \`0 0 30px \${item.color}60\`,
                }}
              />

              {/* Month Label */}
              <div
                style={{
                  marginTop: LABEL_MARGIN_TOP,
                  fontSize: LABEL_FONT_SIZE,
                  fontWeight: LABEL_FONT_WEIGHT,
                  color: "rgba(255, 255, 255, 0.8)",
                  opacity: barOpacity,
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </Remotion.AbsoluteFill>
  );
}`,
};
