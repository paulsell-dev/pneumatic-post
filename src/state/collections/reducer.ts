import { CollectionsState, CollectionsAction } from "./types";

const initialCollections = [
  {
    id: 1,
    name: "Vintage Stamps",
    description: "A collection of rare vintage stamps",
    queryIds: ["1", "2"],
  },
  {
    id: 2,
    name: "First Day Covers",
    description: "Special edition first day covers",
    queryIds: ["3", "4"],
  },
];

export const initialState: CollectionsState = {
  collections: initialCollections,
  loading: false,
  error: null,
  selectedCollection: null,
  isCreating: false,
  newCollection: {
    name: "",
    description: "",
  },
};

export function collectionsReducer(
  state: CollectionsState,
  action: CollectionsAction,
): CollectionsState {
  switch (action.type) {
    case "FETCH_COLLECTIONS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_COLLECTIONS_SUCCESS":
      return {
        ...state,
        collections: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_COLLECTIONS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SELECT_COLLECTION":
      return {
        ...state,
        selectedCollection: action.payload,
      };
    case "CLEAR_SELECTED_COLLECTION":
      return {
        ...state,
        selectedCollection: null,
      };
    case "START_CREATING_COLLECTION":
      return {
        ...state,
        isCreating: true,
        newCollection: { name: "", description: "" },
      };
    case "CANCEL_CREATING_COLLECTION":
      return {
        ...state,
        isCreating: false,
        newCollection: { name: "", description: "" },
      };
    case "UPDATE_NEW_COLLECTION":
      return {
        ...state,
        newCollection: action.payload,
      };
    case "CREATE_COLLECTION":
      return {
        ...state,
        collections: [...state.collections, action.payload],
        isCreating: false,
        newCollection: { name: "", description: "" },
      };
    case "REORDER_COLLECTIONS":
      const { sourceIndex, destinationIndex } = action.payload;
      const collections = [...state.collections];
      const [removed] = collections.splice(sourceIndex, 1);
      collections.splice(destinationIndex, 0, removed);
      return {
        ...state,
        collections,
      };
    case "ADD_QUERY_TO_COLLECTION":
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection.id === action.payload.collectionId
            ? {
                ...collection,
                queryIds: [...collection.queryIds, action.payload.queryId],
              }
            : collection,
        ),
      };
    case "REMOVE_QUERY_FROM_COLLECTION":
      return {
        ...state,
        collections: state.collections.map((collection) =>
          collection.id === action.payload.collectionId
            ? {
                ...collection,
                queryIds: collection.queryIds.filter(
                  (id) => id !== action.payload.queryId,
                ),
              }
            : collection,
        ),
      };
    default:
      return state;
  }
}
