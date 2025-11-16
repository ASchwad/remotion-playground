export const textRotation = {
  id: "text-rotation",
  name: "Text Rotation",
  description: "Animated text with rotating words that dissolve and crossfade",
  durationInFrames: 240,
  fps: 30,
  category: "Text" as const,
  code: `() => {
  const frame = Remotion.useCurrentFrame();

  // Colors
  const COLOR_TEXT = "#7b92c1";

  // Text
  const TITLE_PREFIX_TEXT = "Created for";
  const WORDS = [
    "Creators",
    "Marketers",
    "LinkedIn people",
    "Cat lovers",
    "Crypto bros",
    "Coffee nerds",
    "you and me"
  ];

  // Timing
  const PREFIX_FADE_IN = 22;
  const DYNAMIC_FADE_IN = 22;
  const DYNAMIC_IN_DELAY = 6;
  const POST_INTRO_HOLD = 20;
  const WORD_HOLD_DURATION = 32;
  const WORD_FLIP_DURATION = 18;
  const INTRO_BLUR = 6;
  const SLIDE_DISTANCE = 20;

  // Typography
  const PREFIX_FONT_SIZE = 80;
  const WORD_FONT_SIZE = 80;
  const PREFIX_WEIGHT = 300;
  const WORD_WEIGHT = 700;
  const WORD_GAP = 20;

  // Intro animations
  const prefixOpacity = Remotion.interpolate(
    frame,
    [0, PREFIX_FADE_IN],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const prefixY = Remotion.interpolate(
    frame,
    [0, PREFIX_FADE_IN],
    [SLIDE_DISTANCE, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const prefixBlur = Remotion.interpolate(
    frame,
    [0, PREFIX_FADE_IN],
    [INTRO_BLUR, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dynamicIntroStart = DYNAMIC_IN_DELAY;
  const dynamicIntroEnd = DYNAMIC_IN_DELAY + DYNAMIC_FADE_IN;

  const dynIntroOpacity = Remotion.interpolate(
    frame,
    [dynamicIntroStart, dynamicIntroEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dynIntroY = Remotion.interpolate(
    frame,
    [dynamicIntroStart, dynamicIntroEnd],
    [SLIDE_DISTANCE, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dynIntroBlur = Remotion.interpolate(
    frame,
    [dynamicIntroStart, dynamicIntroEnd],
    [INTRO_BLUR, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Transition scheduling
  const startTransitionsAt = dynamicIntroEnd + POST_INTRO_HOLD;
  const totalTransitions = WORDS.length - 1;
  const perStep = WORD_HOLD_DURATION + WORD_FLIP_DURATION;
  const t = frame - startTransitionsAt;

  let displayWordIndex = 0;
  let isFlipping = false;
  let outIndex = 0;
  let inIndex = 1;
  let flipProgress = 0;

  if (t >= 0) {
    const step = Math.min(Math.floor(t / perStep), totalTransitions);
    const phase = t - step * perStep;

    if (step >= totalTransitions) {
      displayWordIndex = totalTransitions;
    } else if (phase < WORD_HOLD_DURATION) {
      displayWordIndex = step;
    } else {
      isFlipping = true;
      outIndex = step;
      inIndex = step + 1;
      flipProgress = (phase - WORD_HOLD_DURATION) / WORD_FLIP_DURATION;
      if (flipProgress < 0) flipProgress = 0;
      if (flipProgress > 1) flipProgress = 1;
    }
  }

  const outOpacity = Remotion.interpolate(flipProgress, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const inOpacity = Remotion.interpolate(flipProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outBlur = Remotion.interpolate(flipProgress, [0, 1], [0, INTRO_BLUR], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const inBlur = Remotion.interpolate(flipProgress, [0, 1], [INTRO_BLUR, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const longestWord = WORDS.reduce((a, b) => (a.length >= b.length ? a : b), WORDS[0]);

  return (
    <Remotion.AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: WORD_GAP,
          whiteSpace: "nowrap",
          color: COLOR_TEXT,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Prefix */}
        <div
          style={{
            fontSize: PREFIX_FONT_SIZE,
            fontWeight: PREFIX_WEIGHT,
            opacity: prefixOpacity,
            transform: \`translateY(\${prefixY}px)\`,
            filter: \`blur(\${prefixBlur}px)\`,
          }}
        >
          {TITLE_PREFIX_TEXT}
        </div>

        {/* Dynamic word container */}
        <div
          style={{
            position: "relative",
            fontSize: WORD_FONT_SIZE,
            fontWeight: WORD_WEIGHT,
            lineHeight: 1.05,
            whiteSpace: "nowrap",
            color: COLOR_TEXT,
          }}
        >
          {/* Width keeper */}
          <div style={{ visibility: "hidden" }}>{longestWord}</div>

          {/* Static or intro state */}
          {!isFlipping && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: \`translateY(\${t < 0 ? dynIntroY : 0}px)\`,
                opacity: t < 0 ? dynIntroOpacity : 1,
                filter: \`blur(\${t < 0 ? dynIntroBlur : 0}px)\`,
              }}
            >
              {WORDS[displayWordIndex]}
            </div>
          )}

          {/* Dissolve state: outgoing */}
          {isFlipping && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                opacity: outOpacity,
                filter: \`blur(\${outBlur}px)\`,
              }}
            >
              {WORDS[outIndex]}
            </div>
          )}

          {/* Dissolve state: incoming */}
          {isFlipping && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                opacity: inOpacity,
                filter: \`blur(\${inBlur}px)\`,
              }}
            >
              {WORDS[inIndex]}
            </div>
          )}
        </div>
      </div>
    </Remotion.AbsoluteFill>
  );
}`,
};
