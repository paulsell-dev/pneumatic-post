export interface Tab {
  id: string;
  name: string;
  queryId: string;
}

export interface TabsState {
  tabs: Tab[];
  activeTabId: string | null;
}

export type TabsAction =
  | { type: "ADD_TAB"; payload: Tab }
  | { type: "REMOVE_TAB"; payload: string }
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "UPDATE_TAB"; payload: { id: string; changes: Partial<Tab> } }
  | { type: "SET_SAVED"; payload: { id: string; saved: boolean } };
