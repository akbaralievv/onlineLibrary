import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import changePassword from "../../helpers/changePassword";

const initialState = {
  choiceUserBook: "favorite",
  dataFavotitesBook: [],
  preloader: true,
  checkedUser: false,
  dataEveryUser: {}, // {}
  readingNowBookUser: [],
  finishedBookUser: [],
  singlePassword: "",
  activeSortBtn: 1,
  stateFake: {
    img: "",
    name: "",
    password: "",
    email: "",
  },
};

export const sendRequestAllDataUser = createAsyncThunk(
  "sendRequestAllDataUser",
  async (state, { dispatch }) => {
    dispatch(changePreloader(true));
    try {
      const { data } = await axios({
        method: "GET",
        url: `https://kitepkana1.pythonanywhere.com/${state}/`,
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
      dispatch(toTakeDataFavotitesBook(data));
      // console.log(data, "rtyg");
      dispatch(changePreloader(false));
      // console.log(state);
    } catch (error) {
      console.log(error, "error sendRequestAllDataUser");
      dispatch(toTakeDataFavotitesBook([]));
      dispatch(changePreloader(false));
    }
  }
);
export const sendRequestDataEveryUser = createAsyncThunk(
  "sendRequestDataEveryUser",
  async (info, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://kitepkana1.pythonanywhere.com/auth/profile/",
        headers: {
          Authorization: `JWT ${info}`,
        },
      });
      localStorage.setItem("dataUser", JSON.stringify(data));
      dispatch(toTakeDataEveryUser(data));
      dispatch(toTakePassword(data.password));
      dispatch(changeReadingNowBookUser(data.reading));
      dispatch(changeFinishedBookUser(data.finish));
      // console.log(data);
    } catch (error) {
      console.log(error, "error sendRequestDataEveryUser");
      // localStorage.removeItem("access");
      // localStorage.removeItem("refresh");
      // localStorage.removeItem("dataUser");
      dispatch(changeCheckedUser(false));
      // console.log(info);
    }
  }
);
// export const deleteReadingNow = createAsyncThunk(
//   "deleteReadingNow",
//   async(info, {dispatch}) => {
//     try {
//       const data  = await axios.patch("https://kitepkana1.pythonanywhere.com/auth/profile/", {
//         "finish": "empty"
//       }, {
//         headers: {
//           Authorization: `JWT ${info}`,
//         }
//       })
//       console.log(data);
//     } catch {
//       console.log("eror");
//     }
//   }
// )
export const updateTokens = createAsyncThunk(
  "updateTokens",
  async (info, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: "https://kitepkana1.pythonanywhere.com/auth/jwt/refresh/",
        data: {
          refresh: localStorage.getItem("refresh"),
        },
      });
      // console.log(data.access);
      localStorage.setItem("access", data.access);
    } catch {
      console.log("error updateTokens");
    }
  }
);
// export const toTakeReadingNowBooks = createAsyncThunk(
//   "toTakeReadingNowBooks",
//   async (info, { dispatch }) => {
//     try {
//       const { data } = await axios({
//         method: "GET",
//         url: "https://kitepkana1.pythonanywhere.com/finish_bookmark/",
//         headers: {
//           Authorization: `JWT ${localStorage.getItem("access")}`,
//         },
//       });
//       dispatch(changeReadingNowBookUser(data));
//     } catch (error) {
//       console.log(error, "error toTakeReadingNowBooks");
//     }
//   }
// );
export const sendRequestdeleteBooks = createAsyncThunk(
  "sendRequestdeleteBooks",
  async (id, { dispatch }) => {
    try {
      const { data } = await axios({
        method: "DELETE",
        url: `https://kitepkana1.pythonanywhere.com/favorite/${id}/`,
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
        },
      });
    } catch (error) {
      console.log(error, "error sendRequestdeleteBooks");
    }
  }
);

const usersStateSlice = createSlice({
  name: "usersStateSlice",
  initialState,
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeChoiceUserBook: (state, action) => {
      state.choiceUserBook = action.payload;
    },
    toTakeDataFavotitesBook: (state, action) => {
      state.dataFavotitesBook = action.payload;
    },
    changeCheckedUser: (state, action) => {
      state.checkedUser = action.payload;
    },
    toTakeDataEveryUser: (state, action) => {
      state.dataEveryUser = action.payload;
    },
    changeReadingNowBookUser: (state, action) => {
      state.readingNowBookUser = action.payload;
    },
    changeFinishedBookUser: (state, action) => {
      state.finishedBookUser = action.payload;
    },
    toTakePassword: (state, action) => {
      state.singlePassword = changePassword(action.payload);
    },
    changeActiveSortBtn: (state, action) => {
      state.activeSortBtn = action.payload;
    },
    deleteBooksFavorites: (state, action) => {
      return {
        ...state,
        dataFavotitesBook: state.dataFavotitesBook.filter(
          (item) => item.id !== action.payload
        ),
      };
    },
    changeFakeData: (state, action) => {
      switch (action.payload.type) {
        case 1:
          return {
            ...state,
            stateFake: {
              ...state.stateFake,
              name: action.payload.name,
            },
          };
          break;
        case 3:
          return {
            ...state,
            stateFake: {
              ...state.stateFake,
              email: action.payload.email,
            },
          };
          break;
        case 4:
          return {
            ...state,
            stateFake: {
              ...state.stateFake,
              password: changePassword(action.payload.password),
            },
          };
          break;
        case 5:
          return {
            ...state,
            stateFake: {
              ...state.stateFake,
              img: action.payload.img,
            },
          };
          break;
        default:
          break;
      }
    },
  },
});

export const {
  changeChoiceUserBook,
  toTakeDataFavotitesBook,
  changePreloader,
  changeCheckedUser,
  toTakeDataEveryUser,
  changeReadingNowBookUser,
  changeFinishedBookUser,
  toTakePassword,
  deleteBooksFavorites,
  changeFakeData,
  changeActiveSortBtn,
} = usersStateSlice.actions;
export default usersStateSlice.reducer;
