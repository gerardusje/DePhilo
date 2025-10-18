import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  location: [],
  priceRange: [0, 1000000],
  sortOption: "",
  search: "",
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const payload = action.payload || {};
      const {
        categories = [],
        location = [],
        priceRange = [0, 1000000],
        sortOption = "",
        search = "",
        resetPage,
      } = payload;

      state.categories = categories;
      state.location = location;
      state.priceRange = priceRange;
      state.sortOption = sortOption;
      state.search = search;

      // resetPage hanya jika dikirim true
      if (resetPage === true) {
        state.currentPage = 1;
      }
      // kalau resetPage = false → jangan ubah currentPage
      // kalau resetPage undefined → jangan ubah currentPage juga
    },

    setPage: (state, action) => {
      state.currentPage = action.payload ?? 1;
    },
  },
});

export const { setFilter, setPage } = filterSlice.actions;
export default filterSlice.reducer;
