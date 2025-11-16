export const counterAnimation = {
  id: "counter-animation",
  name: "Counter Animation",
  description: "Animated counting numbers with multiple metrics",
  durationInFrames: 150,
  fps: 30,
  category: "Charts" as const,
  code: `() => {
  const frame = Remotion.useCurrentFrame();

  // Colors
  const COLOR_BACKGROUND = "#0f172a";
  const COLOR_TEXT = "white";
  const COLOR_SECONDARY = "rgba(255, 255, 255, 0.7)";

  // Text
  const TITLE_TEXT = "2025 Stats";

  // Data
  const counters = [
    { label: "Users", target: 12450, color: "#3b82f6", icon: "👥" },
    { label: "Revenue", target: 98750, prefix: "$", color: "#10b981", icon: "💰" },
    { label: "Projects", target: 342, color: "#f59e0b", icon: "📊" },
  ];

  // Timing
  const TITLE_FADE_DURATION = 20;
  const CARD_FADE_DURATION = 15;
  const COUNTER_DURATION = 50;
  const CARD_DELAY_BASE = 30;
  const CARD_STAGGER = 10;
  const COUNTER_START_OFFSET = 10;

  // Typography
  const TITLE_FONT_SIZE = 72;
  const VALUE_FONT_SIZE = 64;
  const LABEL_FONT_SIZE = 24;
  const ICON_FONT_SIZE = 60;

  // Layout
  const CONTAINER_PADDING = 100;
  const TITLE_MARGIN_BOTTOM = 100;
  const COUNTERS_GAP = 60;
  const CARD_PADDING_Y = 50;
  const CARD_PADDING_X = 60;
  const CARD_BORDER_WIDTH = 3;
  const CARD_BORDER_RADIUS = 24;
  const CARD_MIN_WIDTH = 380;
  const ICON_MARGIN_BOTTOM = 20;
  const VALUE_MARGIN_BOTTOM = 10;
  const LABEL_LETTER_SPACING = 2;

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
            textShadow: "0 0 40px rgba(255, 255, 255, 0.3)",
          }}
        >
          {TITLE_TEXT}
        </h1>
      </div>

      {/* Counters Grid */}
      <div
        style={{
          display: "flex",
          gap: COUNTERS_GAP,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {counters.map((counter, index) => {
          const delay = CARD_DELAY_BASE + index * CARD_STAGGER;

          // Card animation
          const cardOpacity = Remotion.interpolate(
            frame,
            [delay, delay + CARD_FADE_DURATION],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const cardScale = Remotion.interpolate(
            frame,
            [delay, delay + CARD_FADE_DURATION],
            [0.8, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Counter animation
          const counterStart = delay + COUNTER_START_OFFSET;
          const currentValue = Remotion.interpolate(
            frame,
            [counterStart, counterStart + COUNTER_DURATION],
            [0, counter.target],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={index}
              style={{
                opacity: cardOpacity,
                transform: \`scale(\${cardScale})\`,
              }}
            >
              <div
                style={{
                  backgroundColor: "#1e293b",
                  padding: \`\${CARD_PADDING_Y}px \${CARD_PADDING_X}px\`,
                  borderRadius: CARD_BORDER_RADIUS,
                  border: \`\${CARD_BORDER_WIDTH}px solid \${counter.color}\`,
                  boxShadow: \`0 20px 60px \${counter.color}40, 0 0 40px \${counter.color}20\`,
                  minWidth: CARD_MIN_WIDTH,
                  textAlign: "center",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: ICON_FONT_SIZE,
                    marginBottom: ICON_MARGIN_BOTTOM,
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                    minWidth: CARD_MIN_WIDTH,
                  }}
                >
                  {counter.icon}
                </div>

                {/* Counter Value */}
                <div
                  style={{
                    fontSize: VALUE_FONT_SIZE,
                    fontWeight: "bold",
                    color: counter.color,
                    marginBottom: VALUE_MARGIN_BOTTOM,
                    minWidth: CARD_MIN_WIDTH,
                    fontFamily: "monospace",
                    textShadow: \`0 0 20px \${counter.color}80\`,
                  }}
                >
                  {counter.prefix || ""}
                  {Math.floor(currentValue).toLocaleString()}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: LABEL_FONT_SIZE,
                    color: COLOR_SECONDARY,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: LABEL_LETTER_SPACING,
                  }}
                >
                  {counter.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Remotion.AbsoluteFill>
  );
}`,
};
