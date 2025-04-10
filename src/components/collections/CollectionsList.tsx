"use client";

import { useCollections } from "@/state/collections/context";
import { DraggableCollections } from "./DraggableCollections";

export function CollectionsList() {
  const {
    state: { collections, isCreating, newCollection },
    dispatch,
  } = useCollections();

  const handleCreateCollection = () => {
    if (newCollection.name.trim()) {
      const newId = Math.max(...collections.map((c) => c.id), 0) + 1;
      dispatch({
        type: "CREATE_COLLECTION",
        payload: {
          id: newId,
          name: newCollection.name,
          description: newCollection.description,
          queryIds: [],
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* New Collection Button/Form */}
      {isCreating ? (
        <div className="p-4 border rounded">
          <input
            type="text"
            placeholder="Collection Name"
            value={newCollection.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_NEW_COLLECTION",
                payload: { ...newCollection, name: e.target.value },
              })
            }
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={newCollection.description}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_NEW_COLLECTION",
                payload: { ...newCollection, description: e.target.value },
              })
            }
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateCollection}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
            <button
              onClick={() => dispatch({ type: "CANCEL_CREATING_COLLECTION" })}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => dispatch({ type: "START_CREATING_COLLECTION" })}
          className="p-4 border rounded hover:bg-gray-50 cursor-pointer flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      )}

      {/* Collections List */}
      <DraggableCollections />
    </div>
  );
}
