export const typewriterHighlight = {
  id: "typewriter-highlight",
  name: "Typewriter with Highlight",
  description: "Typewriter effect with animated highlight on specific word",
  durationInFrames: 200,
  fps: 30,
  code: `() => {
  const frame = Remotion.useCurrentFrame();
  const { fps } = Remotion.useVideoConfig();

  // Colors
  const COLOR_TEXT = "#000000";
  const COLOR_HIGHLIGHT = "#A7C7E7";

  // Text
  const FULL_TEXT = "From prompt to motion graphics. This is Remotion.";
  const HIGHLIGHT_WORD = "Remotion";
  const CARET_SYMBOL = "▌";
  const SPLIT_AFTER = " This is Remotion.";

  // Typography
  const FONT_SIZE = 72;
  const FONT_WEIGHT = 700;

  // Timing
  const START_DELAY = 0;
  const CHAR_FRAMES = 2;
  const CURSOR_BLINK_FRAMES = 16;
  const HIGHLIGHT_DELAY = 6;
  const HIGHLIGHT_WIPE_DURATION = 18;
  const CROSSFADE_DURATION = 8;
  const WAIT_AFTER_PRE_SECONDS = 1;

  const WAIT_AFTER_PRE_FRAMES = Math.round(fps * WAIT_AFTER_PRE_SECONDS);

  const splitIndex = FULL_TEXT.indexOf(SPLIT_AFTER);
  const preLen = splitIndex >= 0 ? splitIndex : FULL_TEXT.length;
  const postLen = FULL_TEXT.length - preLen;

  const phase = frame - START_DELAY;
  let typedChars = 0;

  if (phase <= 0) {
    typedChars = 0;
  } else if (phase < preLen * CHAR_FRAMES) {
    typedChars = Math.max(0, Math.min(preLen, Math.floor(phase / CHAR_FRAMES)));
  } else if (phase < preLen * CHAR_FRAMES + WAIT_AFTER_PRE_FRAMES) {
    typedChars = preLen;
  } else {
    const postPhase = phase - preLen * CHAR_FRAMES - WAIT_AFTER_PRE_FRAMES;
    const postTyped = Math.floor(postPhase / CHAR_FRAMES);
    typedChars = Math.max(0, Math.min(FULL_TEXT.length, preLen + postTyped));
  }

  const typedText = FULL_TEXT.slice(0, typedChars);
  const typingDone = typedChars >= FULL_TEXT.length;

  const caretPhase = frame % CURSOR_BLINK_FRAMES;
  const caretOpacity = !typingDone
    ? Remotion.interpolate(
        caretPhase,
        [0, CURSOR_BLINK_FRAMES / 2, CURSOR_BLINK_FRAMES],
        [1, 0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 0;

  const highlightIndex = FULL_TEXT.indexOf(HIGHLIGHT_WORD);
  const hasHighlight = highlightIndex >= 0;
  const preText = hasHighlight ? FULL_TEXT.slice(0, highlightIndex) : FULL_TEXT;
  const postText = hasHighlight
    ? FULL_TEXT.slice(highlightIndex + HIGHLIGHT_WORD.length)
    : "";

  const typeEnd = START_DELAY + preLen * CHAR_FRAMES + WAIT_AFTER_PRE_FRAMES + postLen * CHAR_FRAMES;
  const highlightStart = typeEnd + HIGHLIGHT_DELAY;

  const typedOpacity = Remotion.interpolate(
    frame,
    [highlightStart - CROSSFADE_DURATION, highlightStart + CROSSFADE_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const finalOpacity = Remotion.interpolate(
    frame,
    [highlightStart - CROSSFADE_DURATION / 2, highlightStart + CROSSFADE_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const entrance = Remotion.spring({
    fps,
    frame: frame - START_DELAY,
    config: { damping: 200, stiffness: 120 },
  });

  const containerScale = Remotion.interpolate(entrance, [0, 1], [0.98, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const highlightProgress = Remotion.spring({
    fps,
    frame: frame - highlightStart,
    config: { damping: 200, stiffness: 180 },
  });

  const highlightScaleX = Math.max(0, Math.min(1, highlightProgress));

  return (
    <Remotion.AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: \`scale(\${containerScale})\`,
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Typing layer */}
        <div
          style={{
            color: COLOR_TEXT,
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            lineHeight: 1.15,
            whiteSpace: "pre-wrap",
            opacity: typedOpacity,
          }}
        >
          <span>{typedText}</span>
          <span style={{ opacity: caretOpacity }}>{CARET_SYMBOL}</span>
        </div>

        {/* Final layer with highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: COLOR_TEXT,
            fontSize: FONT_SIZE,
            fontWeight: FONT_WEIGHT,
            lineHeight: 1.15,
            whiteSpace: "pre-wrap",
            opacity: finalOpacity,
          }}
        >
          {hasHighlight ? (
            <>
              <span>{preText}</span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "50%",
                    height: "1.05em",
                    transform: \`translateY(-50%) scaleX(\${highlightScaleX})\`,
                    transformOrigin: "left center",
                    backgroundColor: COLOR_HIGHLIGHT,
                    borderRadius: "0.18em",
                    zIndex: 0,
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>{HIGHLIGHT_WORD}</span>
              </span>
              <span>{postText}</span>
            </>
          ) : (
            <span>{FULL_TEXT}</span>
          )}
        </div>
      </div>
    </Remotion.AbsoluteFill>
  );
}`,
};
