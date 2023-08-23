import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataNoveltyWork: [],
  recommedationBookInfo: [],
  dataBestWork: [],
  kyrgyzWriters: [],
  coordinatesSlider: [],
  preloader: true,
  dataDetailedPage: {},
  ifSendRequestError: true,
};

export const requestNovetlyWorks = createAsyncThunk(
  "requestNovetlyWorks",
  async (dataNoveltyWork, { dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://kitepkana1.pythonanywhere.com/recommended_books/"
      );
      dispatch(changeDateNoveltyWork(data));
      dispatch(changePreloader(false));
      // console.log(data);
    } catch {
      console.log("error requestNovetlyWorks");
    }
  }
);

export const requestRecomBook = createAsyncThunk(
  "requestRecomBook",
  async (recommedationBookInfo, { dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://kitepkana1.pythonanywhere.com/recommended_books/"
      );
      dispatch(changeRecommedationBookInfo(data));
      // console.log(data, "da");
    } catch {
      console.log("error requestRecomBook");
    }
  }
);

export const requestKyrgyzWriters = createAsyncThunk(
  "requestKyrgyzWriters",
  async (kyrgyzWriters, { dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://kitepkana1.pythonanywhere.com/authors/"
      );
      dispatch(changeDatekyrgyzWriters(data));
      // console.log(data, "writers");
    } catch {
      console.log("error requestKyrgyzWriters");
    }
  }
);

export const requestBestWorks = createAsyncThunk(
  "requestBestWorks",
  async (dataBestWork, { dispatch }) => {
    try {
      const { data } = await axios.get(
        "https://kitepkana1.pythonanywhere.com/recommended_books/"
      );
      dispatch(changeDateBestWork(data));
      // console.log(data, "bestWork");
    } catch {
      console.log("error requestBestWorks");
    }
  }
);

export const detailedData = createAsyncThunk(
  "detailedData",
  async (id, { dispatch }) => {
    dispatch(changePreloader(true));
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://kitepkana1.pythonanywhere.com/books/${id}`,
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
      dispatch(toTakeDataDetailedPage(data));
      dispatch(changePreloader(false));
      dispatch(changeSendRequestError(true));
    } catch (error) {
      if (error.message.includes("Request failed with status code 401")) {
        dispatch(changeSendRequestError(false));
      } else {
        dispatch(changeSendRequestError(true))
      }
      console.log("error detailedData", error);
      dispatch(changePreloader(false));
    }
  }
);

const sendRequestMainPageSlice = createSlice({
  name: "sendRequestMainPageSlice",
  initialState,
  reducers: {
    changeDateNoveltyWork: (state, action) => {
      state.dataNoveltyWork = action.payload;
    },
    changeRecommedationBookInfo: (state, action) => {
      state.recommedationBookInfo = action.payload;
    },
    changeDatekyrgyzWriters: (state, action) => {
      state.kyrgyzWriters = action.payload;
    },
    changeDateBestWork: (state, action) => {
      state.dataBestWork = action.payload;
    },
    addCoordinatesSlider: (state, action) => {
      state.coordinatesSlider.push(action.payload);
    },
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    toTakeDataDetailedPage: (state, action) => {
      state.dataDetailedPage = action.payload;
    },
    changeSendRequestError: (state, action) => {
      state.ifSendRequestError = action.payload;
    },
  },
});
export const {
  changeDateNoveltyWork,
  changeRecommedationBookInfo,
  changeDatekyrgyzWriters,
  changeDateBestWork,
  addCoordinatesSlider,
  changePreloader,
  toTakeDataDetailedPage,
  changeSendRequestError,
} = sendRequestMainPageSlice.actions;
export default sendRequestMainPageSlice.reducer;
