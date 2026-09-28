"use client";

import { useIsPresentationTool } from "next-sanity/hooks";
import { VisualEditing } from "next-sanity/visual-editing";

export default function PreviewTools() {
  const isPresentation = useIsPresentationTool();
  return <>
    <VisualEditing />
    {!isPresentation && <a className="library-preview-exit" href="/api/draft-mode/disable">Preview mode · Exit preview</a>}
  </>;
}
