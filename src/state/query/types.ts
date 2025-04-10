export interface Query {
  id: string;
  name: string;
  content: string;
  saved: boolean;
  draft: string | null;
}

export interface QueryState {
  queries: Query[];
}

export type QueryAction =
  | { type: "ADD_QUERY"; payload: Query }
  | { type: "REMOVE_QUERY"; payload: string }
  | { type: "UPDATE_QUERY"; payload: { id: string; changes: Partial<Query> } }
  | { type: "SET_SAVED"; payload: { id: string; saved: boolean } }
  | { type: "UPDATE_DRAFT"; payload: { id: string; draft: string } }
  | { type: "SAVE_DRAFT"; payload: { id: string } };
