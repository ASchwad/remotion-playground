import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TemplateSelector } from "./TemplateSelector";
import { SingleAnimationPlayer } from "./animation/SingleAnimationPlayer";
import { templates, type RemotionTemplate } from "@/templates";
import { useAnimationState } from "@/hooks/useAnimationState";
import Editor from "@monaco-editor/react";

export const RemotionPlayground: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<RemotionTemplate | null>(null);
  const [code, setCode] = useState("");
  const [durationInFrames, setDurationInFrames] = useState(150);
  const [fps, setFps] = useState(30);
  const [isEditorOpen, setIsEditorOpen] = useState(true);

  const animationState = useAnimationState("");

  // Load template when selected
  useEffect(() => {
    if (selectedTemplate) {
      setCode(selectedTemplate.code);
      setDurationInFrames(selectedTemplate.durationInFrames);
      setFps(selectedTemplate.fps);
      animationState.setCode(selectedTemplate.code);
    }
  }, [selectedTemplate]);

  // Recompile when code changes
  useEffect(() => {
    if (code) {
      const timer = setTimeout(() => {
        animationState.setCode(code);
      }, 500); // Debounce for 500ms

      return () => clearTimeout(timer);
    }
  }, [code]);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Template Selector */}
      <div className="w-80 border-r flex flex-col bg-background">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Remotion Playground</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Choose a template to get started
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
        </div>
      </div>

      {/* Center - Preview */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedTemplate ? (
          <>
            {/* Preview Header */}
            <div className="p-4 border-b bg-background flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {selectedTemplate.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.description}
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Label htmlFor="duration">Duration:</Label>
                  <input
                    id="duration"
                    type="number"
                    value={durationInFrames}
                    onChange={(e) =>
                      setDurationInFrames(Number(e.target.value))
                    }
                    className="w-20 px-2 py-1 border rounded"
                    min="1"
                  />
                  <span className="text-muted-foreground">frames</span>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="fps">FPS:</Label>
                  <input
                    id="fps"
                    type="number"
                    value={fps}
                    onChange={(e) => setFps(Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                    min="1"
                    max="60"
                  />
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center bg-muted/20">
              {animationState.error ? (
                <div className="max-w-2xl w-full p-6 bg-destructive/10 border border-destructive rounded-lg">
                  <p className="text-sm font-semibold text-destructive mb-2">
                    Error:
                  </p>
                  <pre className="text-xs text-destructive whitespace-pre-wrap font-mono">
                    {animationState.error}
                  </pre>
                </div>
              ) : (
                <SingleAnimationPlayer
                  Component={animationState.Component}
                  isGenerating={false}
                  durationInFrames={durationInFrames}
                  fps={fps}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg">
                Select a template from the sidebar to get started
              </p>
              <p className="text-sm mt-2">
                Choose from {templates.length} animation templates
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Code Editor */}
      {isEditorOpen && selectedTemplate && (
        <div className="w-[600px] border-l flex flex-col">
          <div className="p-4 border-b bg-card flex items-center justify-between">
            <h3 className="font-semibold">Code Editor</h3>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditorOpen(false)}
            >
              <ChevronRight className="h-4 w-4" />
              Hide
            </Button> */}
          </div>

          {/* Read-only imports header */}
          <div className="bg-[#1e1e1e] px-4 py-3 border-b border-gray-700 font-mono text-sm">
            <div className="text-gray-500 mb-1">
              // Available Remotion imports:
            </div>
            <div className="text-[#9cdcfe]">
              <span className="text-[#c586c0]">const</span>{" "}
              <span className="text-white">Remotion</span> ={" "}
              <span className="text-gray-400">{"{"}</span>
            </div>
            <div className="text-[#9cdcfe] ml-4">
              AbsoluteFill, interpolate, useCurrentFrame,
            </div>
            <div className="text-[#9cdcfe] ml-4">
              useVideoConfig, spring, Sequence
            </div>
            <div className="text-gray-400">{"}"}</div>
            <div className="text-gray-500 mt-2">
              // Editable Component code:
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
              }}
              beforeMount={(monaco) => {
                monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                  {
                    noSemanticValidation: false,
                    noSyntaxValidation: false,
                  }
                );

                monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
                  {
                    target: monaco.languages.typescript.ScriptTarget.ESNext,
                    allowNonTsExtensions: true,
                    moduleResolution:
                      monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                    module: monaco.languages.typescript.ModuleKind.CommonJS,
                    noEmit: true,
                    esModuleInterop: true,
                    jsx: monaco.languages.typescript.JsxEmit.React,
                    allowJs: true,
                    checkJs: false,
                  }
                );
              }}
            />
          </div>
        </div>
      )}

      {/* Toggle Editor Button */}
      {!isEditorOpen && selectedTemplate && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditorOpen(true)}
          className="fixed right-4 top-4 z-10"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Show Code Editor
        </Button>
      )}
    </div>
  );
};
