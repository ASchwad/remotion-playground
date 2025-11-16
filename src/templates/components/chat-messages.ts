export const chatMessages = {
  id: "chat-messages",
  name: "Chat Messages",
  description: "WhatsApp-style animated chat messages with bouncy entrance",
  durationInFrames: 180,
  fps: 30,
  code: `() => {
  const frame = Remotion.useCurrentFrame();
  const { fps, width, height } = Remotion.useVideoConfig();

  // Colors
  const COLOR_BACKGROUND = "#0b141a";
  const COLOR_PRIMARY = "#1f8a70";
  const COLOR_SECONDARY = "#202c33";
  const COLOR_TEXT = "#e9edef";

  // Messages
  const MSG_1_TEXT = "Hey, how was the conference?";
  const MSG_2_TEXT = "Super sick! Met great people and the food was amazing.";
  const MSG_3_TEXT = "Awww sounds amazing. I should've gone!";
  const READ_TICKS_TEXT = "✓✓";

  // Timing
  const FADE_IN_DURATION = 18;
  const SLIDE_DISTANCE = 40;
  const TYPING_DURATION = 22;
  const STAGGER_BETWEEN_MESSAGES = 38;

  // Spring settings
  const BOUNCE_DAMPING = 12;
  const BOUNCE_MASS = 0.6;
  const BOUNCE_STIFFNESS = 170;

  // Typography
  const MESSAGE_FONT_SIZE = 44;
  const ROW_GAP = 22;
  const BUBBLE_RADIUS = 18;
  const BUBBLE_PADDING_X = 24;
  const BUBBLE_PADDING_Y = 18;
  const BUBBLE_MAX_WIDTH_PERCENT = 72;

  // Timeline
  const MSG1_START = 0;
  const MSG2_START = MSG1_START + TYPING_DURATION + STAGGER_BETWEEN_MESSAGES;
  const MSG3_START = MSG2_START + TYPING_DURATION + STAGGER_BETWEEN_MESSAGES;

  const MessageRow = ({ text, align, start, showTicks }) => {
    const local = frame - start;

    const appearProgress = Remotion.interpolate(
      local,
      [TYPING_DURATION, TYPING_DURATION + FADE_IN_DURATION],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const bubbleOpacity = appearProgress;

    const xFrom = align === "right" ? SLIDE_DISTANCE : -SLIDE_DISTANCE;
    const tx = Remotion.interpolate(appearProgress, [0, 1], [xFrom, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const ty = Remotion.interpolate(appearProgress, [0, 1], [8, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const bounce = Remotion.spring({
      frame: Math.max(0, local - TYPING_DURATION),
      fps,
      config: {
        damping: BOUNCE_DAMPING,
        mass: BOUNCE_MASS,
        stiffness: BOUNCE_STIFFNESS,
      },
    });

    const scale = Remotion.interpolate(bounce, [0, 1], [0.98, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    const bubbleBg = align === "right" ? COLOR_PRIMARY : COLOR_SECONDARY;
    const rowJustify = align === "right" ? "flex-end" : "flex-start";
    const rightRadius = \`\${BUBBLE_RADIUS}px \${BUBBLE_RADIUS}px \${BUBBLE_RADIUS}px \${Math.max(4, BUBBLE_RADIUS - 10)}px\`;
    const leftRadius = \`\${BUBBLE_RADIUS}px \${BUBBLE_RADIUS}px \${Math.max(4, BUBBLE_RADIUS - 10)}px \${BUBBLE_RADIUS}px\`;
    const radius = align === "right" ? rightRadius : leftRadius;

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: rowJustify,
          marginTop: ROW_GAP,
        }}
      >
        <div style={{ position: "relative", maxWidth: \`\${BUBBLE_MAX_WIDTH_PERCENT}%\` }}>
          <div
            style={{
              backgroundColor: bubbleBg,
              color: COLOR_TEXT,
              padding: \`\${BUBBLE_PADDING_Y}px \${BUBBLE_PADDING_X}px\`,
              borderRadius: radius,
              fontSize: MESSAGE_FONT_SIZE,
              lineHeight: 1.2,
              whiteSpace: "pre-wrap",
              opacity: bubbleOpacity,
              transform: \`translate(\${tx}px, \${ty}px) scale(\${scale})\`,
              transformOrigin: align === "right" ? "100% 100%" : "0% 100%",
              position: "relative",
            }}
          >
            {text}
            {showTicks && (
              <div
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 8,
                  fontSize: Math.max(16, Math.round(MESSAGE_FONT_SIZE * 0.36)),
                  opacity: 0.75,
                  color: COLOR_TEXT,
                }}
              >
                {READ_TICKS_TEXT}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Remotion.AbsoluteFill
      style={{
        backgroundColor: COLOR_BACKGROUND,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: Math.max(36, Math.round(width * 0.04)),
      }}
    >
      <div style={{ flex: 1 }} />
      <MessageRow text={MSG_1_TEXT} align="left" start={MSG1_START} showTicks={false} />
      <MessageRow text={MSG_2_TEXT} align="right" start={MSG2_START} showTicks={true} />
      <MessageRow text={MSG_3_TEXT} align="left" start={MSG3_START} showTicks={false} />
      <div style={{ height: Math.max(20, Math.round(height * 0.02)) }} />
    </Remotion.AbsoluteFill>
  );
}`,
};
