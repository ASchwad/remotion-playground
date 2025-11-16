import { useState, useEffect } from "react";
import type { AnimationSchema } from "@/lib/api";
import { useCodeCompiler } from "./useCodeCompiler";

export const useAnimationState = (defaultCode: string) => {
  const [code, setCode] = useState(defaultCode);
  const [Component, setComponent] = useState<React.FC | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [schema, setSchema] = useState<AnimationSchema | null>(null);
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [activeHistoryEntryId, setActiveHistoryEntryId] = useState<string | null>(null);

  const { compileCode } = useCodeCompiler();

  // Auto-compile when code changes
  useEffect(() => {
    if (code) {
      const { component, error: compileError } = compileCode(code);
      setComponent(() => component);
      setError(compileError);
    }
  }, [code, compileCode]);

  const handleCodeGenerated = (
    generatedCode: string,
    newSchema?: AnimationSchema,
    generationPrompt?: string,
    entryId?: string
  ) => {
    setCode(generatedCode);
    setSchema(newSchema || null);
    setActiveHistoryEntryId(entryId || null);
    if (generationPrompt) {
      setOriginalPrompt(generationPrompt);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setComponent(null);
  };

  const manualCompile = () => {
    const { component, error: compileError } = compileCode(code);
    setComponent(() => component);
    setError(compileError);
  };

  return {
    // State
    code,
    Component,
    error,
    schema,
    originalPrompt,
    activeHistoryEntryId,
    // Setters
    setCode,
    setComponent,
    setError,
    setSchema,
    setOriginalPrompt,
    setActiveHistoryEntryId,
    // Handlers
    handleCodeGenerated,
    handleError,
    compileCode: manualCompile,
  };
};
