import type { Store, UnknownAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/rootReducer";

export type AppStore = Store<RootState, UnknownAction>;

let storeRef: AppStore | undefined;

export function setStoreInstance(store: AppStore) {
  storeRef = store;
}

export function getStore() {
  return storeRef;
}
