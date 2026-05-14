import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemePreference = "light" | "dark" | "system";

export type UiState = {
  themePreference: ThemePreference;
  isSearchPaletteOpen: boolean;
  globalBanner: { tone: "success" | "error" | "info"; message: string } | null;
};

const initialState: UiState = {
  themePreference: "system",
  isSearchPaletteOpen: false,
  globalBanner: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setThemePreference(state, action: PayloadAction<ThemePreference>) {
      state.themePreference = action.payload;
    },
    setSearchPaletteOpen(state, action: PayloadAction<boolean>) {
      state.isSearchPaletteOpen = action.payload;
    },
    showBanner(
      state,
      action: PayloadAction<{
        tone: "success" | "error" | "info";
        message: string;
      }>,
    ) {
      state.globalBanner = action.payload;
    },
    clearBanner(state) {
      state.globalBanner = null;
    },
  },
});

export const {
  setThemePreference,
  setSearchPaletteOpen,
  showBanner,
  clearBanner,
} = uiSlice.actions;

export default uiSlice.reducer;
