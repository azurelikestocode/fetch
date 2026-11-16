"use client";

import React, { useState, useMemo } from "react";
import { ComponentTemplate, getTemplateById } from "../../lib/templates";
import { ThemeTokens, generateThemeCss } from "../../lib/tokens";
import { copyToClipboard } from "../../lib/utils";
import { StudioHeader } from "./studio-header";
import { InspectorPanel } from "./inspector-panel";
import { PreviewViewport } from "./preview-viewport";
import { CodeExportModal } from "./code-export-modal";

interface StudioClientProps {
  templateId?: string;
  template?: ComponentTemplate;
}

export function StudioClient({ templateId, template: directTemplate }: StudioClientProps) {
  const template = directTemplate || (templateId ? getTemplateById(templateId) : undefined);

  if (!template) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex items-center justify-center p-6">
        <p className="text-sm font-mono text-zinc-400">Template not found.</p>
      </div>
    );
  }

  const [tokens, setTokens] = useState<ThemeTokens>({ ...template.defaultTokens });
  const [props, setProps] = useState<Record<string, any>>(() => {
    const initialProps: Record<string, any> = {};
    template.configurableProps.forEach((p) => {
      initialProps[p.key] = p.defaultValue;
    });
    return initialProps;
  });

  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const tailwindJsx = useMemo(() => {
    return template.generateJsx(props, tokens);
  }, [template, props, tokens]);

  const themeCss = useMemo(() => {
    return generateThemeCss(tokens);
  }, [tokens]);

  const handleTokenChange = (updated: Partial<ThemeTokens>) => {
    setTokens((prev) => ({ ...prev, ...updated }));
  };

  const handlePropChange = (key: string, value: any) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setTokens({ ...template.defaultTokens });
    const initialProps: Record<string, any> = {};
    template.configurableProps.forEach((p) => {
      initialProps[p.key] = p.defaultValue;
    });
    setProps(initialProps);
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-[#09090b] text-[#fafafa] selection:bg-zinc-800 selection:text-white">
      <StudioHeader
        template={template}
        activeViewport={viewport}
        onViewportChange={setViewport}
        onOpenCode={() => setIsCodeModalOpen(true)}
        copied={copied}
      />

      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        <InspectorPanel
          template={template}
          tokens={tokens}
          props={props}
          onTokenChange={handleTokenChange}
          onPropChange={handlePropChange}
          onReset={handleReset}
        />

        <PreviewViewport
          template={template}
          tokens={tokens}
          props={props}
          viewport={viewport}
        />
      </div>

      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        tailwindJsx={tailwindJsx}
        themeCss={themeCss}
      />
    </div>
  );
}
