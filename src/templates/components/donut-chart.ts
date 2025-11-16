export const donutChart = {
  id: "donut-chart",
  name: "Donut Chart",
  description: "Animated donut chart with data distribution visualization",
  durationInFrames: 180,
  fps: 30,
  code: `() => {
  const frame = Remotion.useCurrentFrame();
  const { width, height, fps } = Remotion.useVideoConfig();

  // Colors
  const COLOR_BACKGROUND = "#0c0f1a";
  const COLOR_PRIMARY = "#ff8a00";
  const COLOR_SECONDARY = "#ffffff";
  const COLOR_ACCENT = "#ffffff";

  const ORANGE_SHADES = [
    "#ffb366", "#ffa447", "#ff9633", "#ff8a00", "#e67c00",
    "#cc6e00", "#b36000", "#995200", "#804400", "#663600",
  ];

  // Text
  const TITLE_TEXT = "Monthly Budget Distribution";

  // Data
  const categories = [
    { label: "Housing", shareText: "30%", value: 30 },
    { label: "Food", shareText: "20%", value: 20 },
    { label: "Transportation", shareText: "15%", value: 15 },
    { label: "Entertainment", shareText: "12%", value: 12 },
    { label: "Utilities", shareText: "10%", value: 10 },
    { label: "Healthcare", shareText: "8%", value: 8 },
    { label: "Savings", shareText: "5%", value: 5 },
  ];

  const sum = categories.reduce((a, c) => a + c.value, 0);
  const normalized = categories.map((c) => ({ ...c, fraction: c.value / sum }));

  // Timing
  const TITLE_DELAY = 6;
  const FADE_IN_DURATION = 18;
  const CHART_DELAY = 12;
  const CHART_APPEAR_DURATION = 22;
  const SLICE_DRAW_DURATION = 18;
  const SLICE_STAGGER = 5;
  const LABEL_STAGGER = 3;
  const LABEL_FADE_DURATION = 12;
  const SLOW_ROTATION = 12;
  const GAP_ANGLE_DEG = 0.7;

  // Layout
  const centerX = width / 2;
  const centerY = height / 2 + 20;
  const radius = Math.min(width, height) * 0.28;
  const thickness = radius * 0.25;

  // Animations
  const titleOpacity = Remotion.interpolate(
    frame,
    [TITLE_DELAY, TITLE_DELAY + FADE_IN_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const chartSpring = Remotion.spring({
    frame: Math.max(0, frame - CHART_DELAY),
    fps,
    config: { damping: 200, stiffness: 120 },
  });

  const chartScale = Remotion.interpolate(chartSpring, [0, 1], [0.86, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chartRotation = Remotion.interpolate(
    frame,
    [CHART_DELAY, CHART_DELAY + CHART_APPEAR_DURATION],
    [SLOW_ROTATION, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glowOpacity = Remotion.interpolate(
    frame,
    [CHART_DELAY, CHART_DELAY + CHART_APPEAR_DURATION],
    [0, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Helpers
  const degToRad = (deg) => (Math.PI / 180) * deg;
  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const a = degToRad(angleDeg - 90);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const arcPath = (cx, cy, r, startDeg, endDeg) => {
    const start = polarToCartesian(cx, cy, r, startDeg);
    const end = polarToCartesian(cx, cy, r, endDeg);
    const largeArcFlag = endDeg - startDeg <= 180 ? "0" : "1";
    return \`M \${start.x} \${start.y} A \${r} \${r} 0 \${largeArcFlag} 1 \${end.x} \${end.y}\`;
  };

  let currentAngle = 0;
  const startOffsetDeg = -90;

  const slices = [];
  const labels = [];

  normalized.forEach((cat, i) => {
    const rawSweep = cat.fraction * 360;
    const sweep = Math.max(0.001, rawSweep - GAP_ANGLE_DEG);
    const startDeg = startOffsetDeg + currentAngle;
    const endDeg = startDeg + sweep;
    const midDeg = (startDeg + endDeg) / 2;

    const arcD = arcPath(centerX, centerY, radius, startDeg, endDeg);
    const arcLength = Math.PI * 2 * radius * (sweep / 360);

    const sliceStart = CHART_DELAY + i * SLICE_STAGGER;
    const sliceProgress = Remotion.interpolate(
      frame,
      [sliceStart, sliceStart + SLICE_DRAW_DURATION],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const dashOffset = Remotion.interpolate(sliceProgress, [0, 1], [arcLength, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const sliceOpacity = Remotion.interpolate(sliceProgress, [0, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    slices.push(
      <g key={\`slice-\${i}\`}>
        <path
          d={arcD}
          fill="none"
          stroke={ORANGE_SHADES[i]}
          strokeWidth={thickness}
          strokeLinecap="butt"
          strokeDasharray={\`\${arcLength} \${arcLength}\`}
          strokeDashoffset={dashOffset}
          style={{
            opacity: sliceOpacity,
            transformOrigin: \`\${centerX}px \${centerY}px\`,
            transform: \`rotate(\${chartRotation}deg) scale(\${chartScale})\`,
          }}
        />
      </g>
    );

    const leaderStart = polarToCartesian(centerX, centerY, radius + thickness * 0.5, midDeg);
    const outer = polarToCartesian(centerX, centerY, radius + thickness * 0.9, midDeg);
    const labelX = outer.x + (Math.cos(degToRad(midDeg - 90)) >= 0 ? 24 : -24);
    const labelY = outer.y;

    const labelFrom = CHART_DELAY + i * LABEL_STAGGER + Math.max(4, SLICE_DRAW_DURATION * 0.4);
    const labelOpacity = Remotion.interpolate(
      frame,
      [labelFrom, labelFrom + LABEL_FADE_DURATION],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const labelSlide = Remotion.interpolate(
      frame,
      [labelFrom, labelFrom + LABEL_FADE_DURATION],
      [8, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const anchor = labelX > centerX ? "start" : "end";

    labels.push(
      <g key={\`label-\${i}\`} style={{ opacity: labelOpacity }}>
        <polyline
          points={\`\${leaderStart.x},\${leaderStart.y} \${outer.x},\${outer.y} \${labelX},\${labelY}\`}
          fill="none"
          stroke={COLOR_SECONDARY}
          strokeWidth={2}
          strokeLinecap="round"
          style={{
            transformOrigin: \`\${centerX}px \${centerY}px\`,
            transform: \`rotate(\${chartRotation}deg) scale(\${chartScale})\`,
          }}
        />
        <circle
          cx={leaderStart.x}
          cy={leaderStart.y}
          r={3}
          fill={COLOR_SECONDARY}
          style={{
            transformOrigin: \`\${centerX}px \${centerY}px\`,
            transform: \`rotate(\${chartRotation}deg) scale(\${chartScale})\`,
          }}
        />
        <text
          x={labelX + (anchor === "start" ? 6 : -6)}
          y={labelY + 4}
          textAnchor={anchor}
          style={{
            fill: COLOR_ACCENT,
            fontFamily: "Inter, sans-serif",
            fontSize: 16,
            transform: \`translateY(\${labelSlide}px)\`,
          }}
        >
          {cat.label} — {cat.shareText}
        </text>
      </g>
    );

    currentAngle += rawSweep;
  });

  const CENTER_GLOW_SIZE = Math.min(width, height) * 0.9;

  return (
    <Remotion.AbsoluteFill style={{ backgroundColor: COLOR_BACKGROUND }}>
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          left: centerX - CENTER_GLOW_SIZE / 2,
          top: centerY - CENTER_GLOW_SIZE / 2,
          width: CENTER_GLOW_SIZE,
          height: CENTER_GLOW_SIZE,
          borderRadius: "50%",
          backgroundColor: COLOR_PRIMARY,
          filter: "blur(120px)",
          opacity: glowOpacity * 0.6,
          transform: \`scale(\${chartScale})\`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          color: COLOR_ACCENT,
          fontFamily: "Inter, sans-serif",
          fontSize: 44,
          fontWeight: 700,
          opacity: titleOpacity,
        }}
      >
        {TITLE_TEXT}
      </div>

      {/* Chart */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={COLOR_ACCENT}
          strokeWidth={thickness}
          style={{
            opacity: 0.08,
            transformOrigin: \`\${centerX}px \${centerY}px\`,
            transform: \`rotate(\${chartRotation}deg) scale(\${chartScale})\`,
          }}
        />
        {slices}
        {labels}
      </svg>

      {/* Rotating halo */}
      <div
        style={{
          position: "absolute",
          left: centerX - radius * 1.25,
          top: centerY - radius * 1.25,
          width: radius * 2.5,
          height: radius * 2.5,
          borderRadius: "50%",
          border: \`1px solid \${COLOR_SECONDARY}\`,
          opacity: 0.08,
          transformOrigin: "center",
          transform: \`rotate(\${chartRotation * 1.4}deg) scale(\${chartScale})\`,
        }}
      />
    </Remotion.AbsoluteFill>
  );
}`,
};
