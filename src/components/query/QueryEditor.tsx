"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useQuery } from "@/state/query";
import { useTabs } from "@/state/tabs";

type Props = {
  height?: string;
};

export function QueryEditor({ height = "500px" }: Props) {
  const { state: { queries }, dispatch: queryDispatch } = useQuery();
  const { state: { activeTabId } } = useTabs();

  const activeTab = activeTabId ? queries.find(q => q.id === activeTabId) : null;
  const editorValue = activeTab?.draft ?? activeTab?.content ?? "";


  const handleEditorChange = (value: string | undefined) => {
    if (!activeTabId) return;
    queryDispatch({
      type: "UPDATE_DRAFT",
      payload: { id: activeTabId, draft: value || "" }
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (activeTabId) {
          queryDispatch({ type: "SAVE_DRAFT", payload: { id: activeTabId } });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTabId, queryDispatch]);

  return (
    <div className="border rounded overflow-hidden">
      <Editor
        height={height}
        defaultLanguage="sql"
        value={editorValue}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          theme: "vs-dark",
          automaticLayout: true,
          wordWrap: "on",
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}
