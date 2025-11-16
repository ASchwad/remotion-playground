export const counterAnimation = {
  id: "counter-animation",
  name: "Counter Animation",
  description: "Animated counting numbers with multiple metrics",
  durationInFrames: 150,
  fps: 30,
  code: `() => {
  const frame = Remotion.useCurrentFrame();

  const counters = [
    { label: "Users", target: 12450, color: "#3b82f6", icon: "👥" },
    { label: "Revenue", target: 98750, prefix: "$", color: "#10b981", icon: "💰" },
    { label: "Projects", target: 342, color: "#f59e0b", icon: "📊" },
  ];

  // Title animation
  const titleOpacity = Remotion.interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <Remotion.AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      {/* Title */}
      <div style={{ opacity: titleOpacity, marginBottom: 100 }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            margin: 0,
            textAlign: "center",
            textShadow: "0 0 40px rgba(255, 255, 255, 0.3)",
          }}
        >
          2025 Stats
        </h1>
      </div>

      {/* Counters Grid */}
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {counters.map((counter, index) => {
          const delay = 30 + index * 10;

          // Card animation
          const cardOpacity = Remotion.interpolate(
            frame,
            [delay, delay + 15],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const cardScale = Remotion.interpolate(
            frame,
            [delay, delay + 15],
            [0.8, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Counter animation
          const counterStart = delay + 10;
          const counterDuration = 50;
          const currentValue = Remotion.interpolate(
            frame,
            [counterStart, counterStart + counterDuration],
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
                  padding: "50px 60px",
                  borderRadius: 24,
                  border: \`3px solid \${counter.color}\`,
                  boxShadow: \`0 20px 60px \${counter.color}40, 0 0 40px \${counter.color}20\`,
                  minWidth: 280,
                  textAlign: "center",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: 60,
                    marginBottom: 20,
                    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  {counter.icon}
                </div>

                {/* Counter Value */}
                <div
                  style={{
                    fontSize: 64,
                    fontWeight: "bold",
                    color: counter.color,
                    marginBottom: 10,
                    fontFamily: "system-ui",
                    textShadow: \`0 0 20px \${counter.color}80\`,
                  }}
                >
                  {counter.prefix || ""}
                  {Math.floor(currentValue).toLocaleString()}
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: 24,
                    color: "rgba(255, 255, 255, 0.7)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 2,
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
