# Remotion Playground

Remotion Playground is an interactive browser-based development environment for creating and experimenting with [Remotion](https://www.remotion.dev/) animations. It provides a live code editor with instant preview capabilities, allowing you to write React-based animations and see them render in real-time without any build step. The playground comes with a curated collection of pre-built animation templates including text effects, charts, progress bars, and interactive components that serve as starting points for your own creations.

## How React In-Browser Dynamic Rendering Works

The playground leverages Babel Standalone to transpile JSX and TypeScript code directly in the browser at runtime. When you edit code in the Monaco editor, it's automatically transpiled using `@babel/standalone` and then dynamically evaluated using JavaScript's Function constructor. The compilation process injects all necessary Remotion APIs (like `useCurrentFrame`, `interpolate`, `spring`, etc.) into the execution context, allowing the code to access Remotion's animation primitives without explicit imports. The resulting React component is then passed to Remotion's Player component, which handles frame-by-frame rendering based on the configured FPS and duration settings.

## How to Get Started

```bash
  yarn
  yarn dev
```
