"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { queryReducer, initialState } from "./reducer";
import { QueryState, QueryAction } from "./types";

type QueryContextType = {
  state: QueryState;
  dispatch: React.Dispatch<QueryAction>;
};

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export function QueryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(queryReducer, initialState);

  return (
    <QueryContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error("useQuery must be used within a QueryProvider");
  }
  return context;
}
