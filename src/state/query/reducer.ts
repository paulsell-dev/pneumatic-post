import { QueryState, QueryAction } from "./types";

const initialQueries = [
  {
    id: '1',
    name: '1840 Penny Black',
    content: 'SELECT * FROM stamps WHERE year = 1840;',
    saved: true,
    draft: null
  },
  {
    id: '2',
    name: '1856 British Guiana',
    content: 'SELECT * FROM stamps WHERE rarity = "ultra_rare";',
    saved: true,
    draft: null
  },
  {
    id: '3',
    name: 'Apollo 11 First Day Cover',
    content: 'SELECT * FROM covers WHERE event = "moon_landing";',
    saved: true,
    draft: null
  },
  {
    id: '4',
    name: 'Royal Wedding 1981',
    content: 'SELECT * FROM covers WHERE event = "royal_wedding";',
    saved: true,
    draft: null
  }
];

export const initialState: QueryState = {
  queries: initialQueries
};

export function queryReducer(
  state: QueryState,
  action: QueryAction,
): QueryState {
  switch (action.type) {
    case "ADD_QUERY":
      return {
        ...state,
        queries: [...state.queries, action.payload],
      };

    case "REMOVE_QUERY":
      return {
        ...state,
        queries: state.queries.filter((query) => query.id !== action.payload),
      };

    case "UPDATE_QUERY":
      return {
        ...state,
        queries: state.queries.map((query) =>
          query.id === action.payload.id
            ? { ...query, ...action.payload.changes }
            : query,
        ),
      };

    case "SET_SAVED":
      return {
        ...state,
        queries: state.queries.map((query) =>
          query.id === action.payload.id
            ? { ...query, saved: action.payload.saved }
            : query,
        ),
      };

    case "UPDATE_DRAFT":
      return {
        ...state,
        queries: state.queries.map((query) =>
          query.id === action.payload.id
            ? { ...query, draft: action.payload.draft }
            : query,
        ),
      };

    case "SAVE_DRAFT":
      return {
        ...state,
        queries: state.queries.map((query) =>
          query.id === action.payload.id && query.draft !== null
            ? {
                ...query,
                content: query.draft,
                draft: null,
                saved: true,
              }
            : query,
        ),
      };

    default:
      return state;
  }
}
