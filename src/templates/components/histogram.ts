export const histogram = {
  id: "histogram",
  name: "Histogram Chart",
  description: "Animated bar chart with data visualization",
  durationInFrames: 120,
  fps: 30,
  code: `() => {
  const frame = Remotion.useCurrentFrame();

  const data = [
    { label: "Jan", value: 45, color: "#3b82f6" },
    { label: "Feb", value: 62, color: "#8b5cf6" },
    { label: "Mar", value: 38, color: "#ec4899" },
    { label: "Apr", value: 75, color: "#f59e0b" },
    { label: "May", value: 58, color: "#10b981" },
    { label: "Jun", value: 90, color: "#06b6d4" },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

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
      <div style={{ opacity: titleOpacity, marginBottom: 80 }}>
        <h1
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            margin: 0,
            textAlign: "center",
          }}
        >
          Monthly Sales
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "rgba(255, 255, 255, 0.6)",
            margin: "10px 0 0 0",
            textAlign: "center",
          }}
        >
          2025 Performance
        </p>
      </div>

      {/* Chart Container */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 40,
          height: 500,
          width: "100%",
          maxWidth: 1200,
        }}
      >
        {data.map((item, index) => {
          const delay = 25 + index * 8;

          // Bar height animation
          const barHeight = Remotion.interpolate(
            frame,
            [delay, delay + 20],
            [0, (item.value / maxValue) * 100],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Bar opacity
          const barOpacity = Remotion.interpolate(
            frame,
            [delay, delay + 10],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Value label animation
          const valueLabelOpacity = Remotion.interpolate(
            frame,
            [delay + 15, delay + 25],
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
                minWidth: 120,
              }}
            >
              {/* Value Label */}
              <div style={{ opacity: valueLabelOpacity, marginBottom: 15 }}>
                <div
                  style={{
                    fontSize: 36,
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
                  marginTop: 20,
                  fontSize: 32,
                  fontWeight: 600,
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
