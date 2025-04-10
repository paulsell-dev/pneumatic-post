"use client";

import { Collection as CollectionType } from "@/state/collections/types";
import { Query, useQuery } from "@/state/query";
import { useTabs } from "@/state/tabs";

type Props = {
  collection: CollectionType;
  isSelected: boolean;
  onClick: () => void;
};

export function Collection({ collection, isSelected, onClick }: Props) {
  const {
    state: { queries },
  } = useQuery();
  const { dispatch: tabsDispatch } = useTabs();
  const collectionQueries = queries.filter((q) =>
    collection.queryIds.includes(q.id),
  );

  const handleQueryClick = (e: React.MouseEvent, query: Query) => {
    e.stopPropagation();
    tabsDispatch({
      type: "ADD_TAB",
      payload: {
        id: query.id,
        name: query.name,
        queryId: query.id,
      },
    });
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded cursor-pointer ${
        isSelected ? "bg-gray-100" : "hover:bg-gray-50"
      }`}
    >
      <h3 className="font-medium">{collection.name}</h3>
      <p className="text-sm text-gray-600">{collection.description}</p>
      {isSelected && collectionQueries.length > 0 && (
        <div className="mt-2 space-y-2">
          {collectionQueries.map((query) => (
            <div
              key={query.id}
              className="pl-4 border-l hover:bg-gray-200"
              onClick={(e) => handleQueryClick(e, query)}
            >
              <h4 className="text-sm font-medium">{query.name}</h4>
              <p className="text-xs text-gray-500">
                {query.content.substring(0, 50)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
