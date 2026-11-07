import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { TEMPLATES, getTemplateById } from "../../../lib/templates";
import { StudioClient } from "../../../components/studio/studio-client";

interface StudioPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Object.keys(TEMPLATES).map((id) => ({
    id,
  }));
}

export default async function StudioPage({ params }: StudioPageProps) {
  const { id } = await params;
  const template = getTemplateById(id);

  if (!template) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-zinc-800 bg-zinc-950 p-8 rounded-xs text-center space-y-4">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-white">Template Not Found</h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-mono">
            No component registered with ID "{id}". Please select an active primitive from the directory.
          </p>
          <div className="pt-2">
            <Link
              href="/components"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#fafafa] text-[#09090b] text-xs font-mono font-medium rounded-xs hover:bg-zinc-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <StudioClient templateId={id} />;
}

