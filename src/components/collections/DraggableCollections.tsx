"use client";

import { useCollections } from "@/state/collections/context";
import { useRouter } from "next/navigation";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Collection } from "./Collection";

export function DraggableCollections() {
  const {
    state: { collections, selectedCollection },
    dispatch,
  } = useCollections();
  const router = useRouter();

  const handleCollectionClick = (collectionId: number) => {
    const collection = collections.find((c) => c.id === collectionId);
    if (collection) {
      if (selectedCollection?.id === collectionId) {
        dispatch({ type: "CLEAR_SELECTED_COLLECTION" });
        router.replace("/collections");
      } else {
        dispatch({ type: "SELECT_COLLECTION", payload: collection });
        router.replace(`/collections/${collectionId}`);
      }
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch({
      type: "REORDER_COLLECTIONS",
      payload: {
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      },
    });
  };

  const collectionsId = selectedCollection
    ? `collections-${selectedCollection.id}-${collections.map((c) => c.id).join("-")}`
    : `collections-${collections.map((c) => c.id).join("-")}`;
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={collectionsId}
        direction="vertical"
        isDropDisabled={false}
        isCombineEnabled={true}
        ignoreContainerClipping={false}
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-4"
          >
            {collections.map((collection, index) => (
              <Draggable
                key={collection.id}
                draggableId={`${collectionsId}-connection-${collection.id.toString()}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Collection
                      collection={collection}
                      isSelected={selectedCollection?.id === collection.id}
                      onClick={() => handleCollectionClick(collection.id)}
                    />  
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
