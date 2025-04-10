"use client";

import { useQuery } from "@/state/query";
import { useTabs } from "@/state/tabs";

export function QueryTabs() {
  const {
    state: { tabs, activeTabId },
    dispatch,
  } = useTabs();
  const {
    state: { queries },
  } = useQuery();

  const addTab = () => {
    const newId = Date.now().toString();
    dispatch({
      type: "ADD_TAB",
      payload: {
        id: newId,
        name: `Query ${newId}`,
        queryId: newId,
      },
    });
  };

  const removeTab = (id: string) => {
    if (tabs.length === 1) return;
    dispatch({ type: "REMOVE_TAB", payload: id });
  };

  const renameTab = (id: string, newName: string) => {
    dispatch({
      type: "UPDATE_TAB",
      payload: {
        id,
        changes: { name: newName },
      },
    });
  };

  return (
    <div className="border-b border-gray-700">
      <div className="flex items-center">
        {tabs.map((tab) => {
          const query = queries.find((q) => q.id === tab.queryId);
          const hasDraft = query?.draft !== null;

          return (
            <div
              key={tab.id}
              className={`flex items-center px-4 py-2 border-t border-l border-r border-gray-700 rounded-t-lg cursor-pointer ${
                activeTabId === tab.id
                  ? "bg-gray-800 border-b-0 text-white"
                  : "bg-gray-900 text-gray-300"
              }`}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE_TAB", payload: tab.id })
              }
            >
              {activeTabId === tab.id ? (
                <input
                  type="text"
                  value={tab.name}
                  className="bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => renameTab(tab.id, e.target.value)}
                />
              ) : (
                <span className="bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1">
                  {tab.name}
                </span>
              )}
              <button
                className="ml-2 text-gray-400 hover:text-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                {hasDraft ? "•" : "×"}
              </button>
            </div>
          );
        })}
        <button
          className="px-4 py-2 text-gray-400 hover:text-gray-200"
          onClick={addTab}
        >
          +
        </button>
      </div>
    </div>
  );
}
