import { Query } from "../query";

export interface Collection {
  id: number;
  name: string;
  description: string;
  queryIds: string[];
}

export interface CollectionsState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
  selectedCollection: Collection | null;
  isCreating: boolean;
  newCollection: {
    name: string;
    description: string;
  };
}

export type CollectionsAction =
  | { type: "FETCH_COLLECTIONS_START" }
  | { type: "FETCH_COLLECTIONS_SUCCESS"; payload: Collection[] }
  | { type: "FETCH_COLLECTIONS_ERROR"; payload: string }
  | { type: "SELECT_COLLECTION"; payload: Collection }
  | { type: "CLEAR_SELECTED_COLLECTION" }
  | { type: "START_CREATING_COLLECTION" }
  | { type: "CANCEL_CREATING_COLLECTION" }
  | {
      type: "UPDATE_NEW_COLLECTION";
      payload: { name: string; description: string };
    }
  | { type: "CREATE_COLLECTION"; payload: Collection }
  | {
      type: "REORDER_COLLECTIONS";
      payload: { sourceIndex: number; destinationIndex: number };
    }
  | { type: "ADD_QUERY_TO_COLLECTION"; payload: { collectionId: number; queryId: string } }
  | { type: "REMOVE_QUERY_FROM_COLLECTION"; payload: { collectionId: number; queryId: string } };
