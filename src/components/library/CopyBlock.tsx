"use client";

import { useRef, useState } from "react";

export default function CopyBlock({ text, title = "Prompt" }: { text: string; title?: string }) {
  const [status, setStatus] = useState("");
  const content = useRef<HTMLElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied to clipboard");
    } catch {
      const selection = window.getSelection();
      if (content.current && selection) {
        const range = document.createRange();
        range.selectNodeContents(content.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus("Text selected. Use your device’s copy command.");
    }
  }

  return (
    <section className="library-copy" aria-label={title}>
      <div className="library-copy-heading"><span>{title}</span><button type="button" onClick={copy}>Copy <span aria-hidden="true">↗</span></button></div>
      <pre><code ref={content}>{text}</code></pre>
      <p className="library-copy-status" role="status">{status}</p>
    </section>
  );
}
