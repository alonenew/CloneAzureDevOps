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
    },
    // Deploy: {
    //   name: "Deploy",
    //   items: []
    // }
  },
  search: null
}

export const getTask = createAsyncThunk(
  "task/getTask",
  async (thunkAPI) => {
    try {
      const id = localStorage.getItem("id");
      const name = await axios.post(BASE_URL + 'users/relogin?id=' + id)
        .then((res) => {
          return res.data.data;
        });
      const response = await axios.get(BASE_URL + 'tasks/gettask').then((res) => { return res.data; });
      return { response, name };
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const addTask = (data) => async (dispatch) => {
  try {
    axios.post(BASE_URL + 'tasks/addtask', data).then(response => {
      dispatch(add({ name: response.data.data.name, taskId: response.data.data.taskId }));
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const updateTask = (data) => async (dispatch) => {
  try {
    axios.patch(BASE_URL + "tasks/update", data)
  } catch (err) {
    throw new Error(err);
  }
};

export const updateDiscus = (data) => async (dispatch) => {
  try {

  } catch (err) {
    throw new Error(err);
  }
};

export const remove = (data) => async (dispatch) => {
  try {
    axios.delete(BASE_URL + "tasks/remove", data)
  } catch (err) {
    throw new Error(err);
  }
};

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
      // state.open = action.payload
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
export const { add, update, active, resolved, close, openModal, clear } = itemSlice.actions
export default itemSlice.reducer