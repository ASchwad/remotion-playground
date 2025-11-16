import { useCallback } from "react";
import { transform } from "@babel/standalone";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";
import * as React from "react";

export const useCodeCompiler = () => {
  const compileCode = useCallback((sourceCode: string) => {
    try {
      // Transpile JSX to JavaScript
      const result = transform(sourceCode, {
        presets: ["react", "typescript"],
        filename: "dynamic.tsx",
      });

      if (!result.code) {
        throw new Error("Transpilation failed");
      }

      // Create Remotion object with all APIs
      const Remotion = {
        AbsoluteFill,
        interpolate,
        useCurrentFrame,
        useVideoConfig,
        spring,
        Sequence,
      };

      // Create a function that has access to Remotion APIs
      // The code can be either an arrow function or define a component
      const componentFactory = new Function(
        "React",
        "Remotion",
        "AbsoluteFill",
        "interpolate",
        "useCurrentFrame",
        "useVideoConfig",
        "spring",
        "Sequence",
        `
        // Execute the transpiled code
        var __component;
        var DynamicAnimation;

        // Wrap in eval to execute the code
        __component = eval(${JSON.stringify(result.code)});

        // If DynamicAnimation was defined, use it; otherwise use the eval result
        return DynamicAnimation || __component;
        `
      );

      // Execute the function with Remotion APIs
      const DynamicComponent = componentFactory(
        React,
        Remotion,
        AbsoluteFill,
        interpolate,
        useCurrentFrame,
        useVideoConfig,
        spring,
        Sequence
      );

      return { component: DynamicComponent, error: null };
    } catch (err) {
      return {
        component: null,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }, []);

  return { compileCode };
};
