// Type definitions for Remotion animations
// No API calls needed for template-based editor

export interface EditableProperty {
  type: string; // "color", "number", "text"
  value: string | number;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface EditableElement {
  id: string;
  label: string;
  properties: Record<string, EditableProperty>;
}

export interface AnimationSchema {
  elements: EditableElement[];
}
