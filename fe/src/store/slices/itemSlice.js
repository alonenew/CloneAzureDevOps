import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../Const';


const initialState = {
  stories: {
    New: {
      name: "New",
      items: []
    },
    Active: {
      name: "Active",
      items: []
    },
    Resolved: {
      name: "Resolved",
      items: []
    },
    Closed: {
      name: "Closed",
      items: []
    }
  },
  search: null
}

export const getTask = createAsyncThunk(
  "task/getTask",
  async ( thunkAPI ) => {
    try {
      const id = localStorage.getItem("id");
      const name = await axios.post(BASE_URL +'users/relogin?id='+id)
      .then((res) => { return res.data.data; 
        });
      const response = await axios.get(BASE_URL +'tasks/gettask').then((res) => { return res.data; });
      return {response , name};
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    add: (state, action) => {
      state.stories.New.items.push(action.payload)
    },
    update: (state, action) => {
      state.stories = (action.payload)
    },
    active: (state, action) => {
      state.stories.Active.items.push(action.payload)
    },
    resolved: (state, action) => {
      state.stories.Resolved.items.push(action.payload)
    },
    close: (state, action) => {
      state.stories.Closed.items.push(action.payload)
    },
    openModal: (state, action) => { 
      state.search = action.payload
    },
    clear: (state) => {
      state.stories = {
        New: {
          name: "New",
          items: []
        },
        Active: {
          name: "Active",
          items: []
        },
        Resolved: {
          name: "Resolved",
          items: []
        },
        Closed: {
          name: "Closed",
          items: []
        }
      }
    },
  },
})




export const selectItemStories = (state) => state.selectItem.stories;
export const selectSearch = (state) => state.selectItem.search;
export const { add, update ,active,resolved,close ,openModal,clear} = itemSlice.actions
export default itemSlice.reducer