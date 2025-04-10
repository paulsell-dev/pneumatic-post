"use client";

import { CollectionsList } from "../../../components/collections/CollectionsList";
import { QueryTabs } from "../../../components/query/QueryTabs";
import { QueryEditor } from "../../../components/query/QueryEditor";

export default function CollectionPage() {
  return (
    <div className="flex h-screen">
      {/* Left Column - Collections List */}
      <div className="w-1/3 max-w-md border-r p-4 overflow-y-auto">
        <CollectionsList />
      </div>

      {/* Right Column - Query Editor */}
      <div className="w-2/3 p-4">
        <QueryTabs />
        <div className="mt-4">
          <QueryEditor />
        </div>
      </div>
    </div>
  );
}
