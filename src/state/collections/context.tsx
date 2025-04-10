"use client";

import React, { createContext, useContext, useReducer } from "react";
import { CollectionsState, CollectionsAction } from "./types";
import { collectionsReducer, initialState } from "./reducer";

interface CollectionsContextType {
  state: CollectionsState;
  dispatch: React.Dispatch<CollectionsAction>;
}

const CollectionsContext = createContext<CollectionsContextType | undefined>(
  undefined,
);

export function CollectionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(collectionsReducer, initialState);

  return (
    <CollectionsContext.Provider value={{ state, dispatch }}>
      {children}
    </CollectionsContext.Provider>
  );
}

export function useCollections() {
  const context = useContext(CollectionsContext);
  if (context === undefined) {
    throw new Error("useCollections must be used within a CollectionsProvider");
  }
  return context;
}
