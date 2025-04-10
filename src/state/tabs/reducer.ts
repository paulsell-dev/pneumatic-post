import { TabsState, TabsAction } from "./types";

export const initialState: TabsState = {
  tabs: [],
  activeTabId: null,
};

export function tabsReducer(state: TabsState, action: TabsAction): TabsState {
  switch (action.type) {
    case "ADD_TAB":
      const tabExists = state.tabs.some(tab => tab.id === action.payload.id);
      return {
        ...state,
        tabs: tabExists ? state.tabs : [...state.tabs, action.payload],
        activeTabId: action.payload.id,
      };

    case "REMOVE_TAB":
      const newTabs = state.tabs.filter((tab) => tab.id !== action.payload);
      return {
        ...state,
        tabs: newTabs,
        activeTabId: newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null,
      };

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTabId: action.payload,
      };

    case "UPDATE_TAB":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, ...action.payload.changes }
            : tab,
        ),
      };

    case "SET_SAVED":
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.id
            ? { ...tab, saved: action.payload.saved }
            : tab,
        ),
      };

    default:
      return state;
  }
}
