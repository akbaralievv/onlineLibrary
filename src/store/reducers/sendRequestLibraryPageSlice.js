import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allData: [],
  allsortBtn: [
    {
      id: -1,
      genre_name: "Все",
      extra_name: "",
    },
  ],
  preloader: true,
  search: "",
  sortBtn: "",
  filteredBtn: "",
  stateBtn: false,
  sortState: -1,
  filterBookState: 1,
  searchState: "",
};
export const requestSortBtn = createAsyncThunk(
  "requestSortBtn",
  async (info, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://kitepkana1.pythonanywhere.com/genres/",
      });
      dispatch(toTakeAllsortBtn(data));
      // console.log(data);
    } catch (error) {
      console.log(error, requestSortBtn);
    }
  }
);
const api = "https://kitepkana1.pythonanywhere.com/";

export const requestAllData = createAsyncThunk(
  "requestAllData",
  async (allData, { dispatch }) => {
    // setTimeout(() => {
    //   allData.search = "";
    // }, 1000);
    // console.log(allData.sortBtn);
    // dispatch(changePreloader(true));
    try {
      const { data } = await axios({
        method: "GET",
        url: `${
          allData.filteredBtn === "" && allData.sortBtn === ""
            ? `${
                allData.stateInput
                  ? `${api}search_filter/?q=${allData.search}`
                  : `${api}books/`
              }`
            : allData.filteredBtn || allData.sortBtn
        }`,
      });
      dispatch(toTakeAllData(data));
      // console.log(allData);
      dispatch(changePreloader(false));
    } catch (error) {
      console.log(error, "error requestAllData");
    }
  }
);

const sendRequestLibraryPageSlice = createSlice({
  name: "sendRequestLibraryPageSlice",
  initialState,
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    toTakeAllData: (state, action) => {
      state.allData = action.payload;
    },
    // toTakeAllsortBtn: (state, action) => {
    //   return {
    //     ...state,
    //     allsortBtn: [...state.allsortBtn, ...action.payload],
    //   };
    //   // state.allsortBtn = action.payload;
    //   // console.log(state.allsortBtn);
    // },
    toTakeAllsortBtn: (state, action) => {
      state.allsortBtn = [
        ...state.allsortBtn,
        ...action.payload.filter((item) => {
          return !state.allsortBtn.some(
            (existingItem) => existingItem.id === item.id
          );
        }),
      ];
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
      console.log(state.search);
    },
    changeSortBtn: (state, action) => {
      state.sortBtn = action.payload;
    },
    changeFilteredBtn: (state, action) => {
      state.filteredBtn = action.payload;
    },
    changeStateBtns: (state, action) => {
      state.stateBtn = action.payload;
    },
    //////////////для сброса состояния при нажатии на другой вид поиска(сортировки)/////////////////
    changeSortState: (state, action) => {
      state.sortState = action.payload;
    },
    changeFilterBookState: (state, action) => {
      state.filterBookState = action.payload;
    },
    changeSearchState: (state, action) => {
      state.searchState = action.payload;
    },
  },
});

export const {
  changePreloader,
  changeFilteredBtn,
  toTakeAllData,
  toTakeAllsortBtn,
  changeSortBtn,
  changeSearch,
  changeStateBtns,
  changeSortState,
  changeFilterBookState,
  changeSearchState,
} = sendRequestLibraryPageSlice.actions;
export default sendRequestLibraryPageSlice.reducer;
