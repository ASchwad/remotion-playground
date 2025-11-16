export const progressBar = {
  id: "progress-bar",
  name: "Progress Bar",
  description: "Animated progress bar with percentage",
  durationInFrames: 300,
  fps: 30,
  code: `() => {
  const frame = Remotion.useCurrentFrame();

  // Progress from 0 to 100%
  const progress = Remotion.interpolate(frame, [0, 300], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <Remotion.AbsoluteFill
      style={{
        backgroundColor: "#0d1b2a",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div style={{ width: "100%", maxWidth: 600 }}>
        <h2
          style={{
            color: "#e0e1dd",
            fontSize: 32,
            marginBottom: 20,
            fontFamily: "system-ui",
          }}
        >
          Loading...
        </h2>

        {/* Progress bar background */}
        <div
          style={{
            width: "100%",
            height: 40,
            backgroundColor: "#1b263b",
            borderRadius: 20,
            overflow: "hidden",
            border: "2px solid #415a77",
          }}
        >
          {/* Progress bar fill */}
          <div
            style={{
              width: \`\${progress}%\`,
              height: "100%",
              backgroundColor: "#4cc9f0",
              transition: "width 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 15,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
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
