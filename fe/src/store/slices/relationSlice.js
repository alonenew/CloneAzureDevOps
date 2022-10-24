import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../Const';

const initialState = {
  Relation: {
    Child: {
      linkType: "Child",
      valueToLink: null
    },
    Parent: {
      linkType: "Parent",
      valueToLink: null
    },
    Duplicate: {
      linkType: "Duplicate",
      valueToLink: null
    }
  },
}

export const relationSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {
    addChild: (state, actions) => {
      state.Relation.Child.valueToLink = actions.payload;
    },
    addParent: (state, actions) => {
      state.Relation.Parent.valueToLink = actions.payload;
    },
    addDuplicate: (state, actions) => {
      state.Relation.Duplicate.valueToLink = actions.payload;
    },
    clearRelation: (state , actions) => {
      state.Relation = {
        Child: {
          linkType: "Child",
          valueToLink: null
        },
        Parent: {
          linkType: "Parent",
          valueToLink: null
        },
        Duplicate: {
          linkType: "Duplicate",
          valueToLink: null
        }
      }
    }
  }
})

export const addRelataion = (data) => async (dispatch) => {
  try {
    console.log(data);
    if (data.linkType === "Child") {
      dispatch(addChild(data.valueToLink))
    }else if (data.linkType === "Parent") {
      dispatch(addParent(data.valueToLink))
    }else{
      dispatch(addDuplicate(data.valueToLink))
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const selectRelation = (state) => state.relation.Relation
export const { addChild, addParent , addDuplicate, clearRelation} = relationSlice.actions

export default relationSlice.reducer