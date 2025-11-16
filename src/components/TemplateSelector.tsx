import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { templates, type RemotionTemplate } from "@/templates";
import { Sparkles } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: RemotionTemplate | null;
  onSelectTemplate: (template: RemotionTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Choose a Template</h2>
      </div>

      <div className="space-y-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate?.id === template.id
                ? "ring-2 ring-primary bg-accent/50"
                : "hover:bg-accent/30"
            }`}
            onClick={() => onSelectTemplate(template)}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm">{template.name}</h3>
              <Badge variant="secondary" className="text-xs shrink-0">
                {template.category}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {template.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
