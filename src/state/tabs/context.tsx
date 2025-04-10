"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { tabsReducer, initialState } from "./reducer";
import { TabsState, TabsAction } from "./types";

type TabsContextType = {
  state: TabsState;
  dispatch: React.Dispatch<TabsAction>;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tabsReducer, initialState);

  return (
    <TabsContext.Provider value={{ state, dispatch }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
}
