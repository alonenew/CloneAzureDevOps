import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL } from '../../Const';

const initialState = {
  Relation: {
    Child: {
      linkType: "Child",
      valueToLink: []
    },
    Parent: {
      linkType: "Parent",
      valueToLink: null
    },
    Duplicate: {
      linkType: "Duplicate",
      valueToLink: []
    },
    relationShip: []
  },
}

export const relationSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {
    addParent: (state, actions) => {
      state.Relation.Parent.valueToLink = actions.payload;
    },
    addChild: (state, actions) => {
      state.Relation.Child.valueToLink.push(actions.payload);
    },
    addDuplicate: (state, actions) => {
      state.Relation.Duplicate.valueToLink.push(actions.payload);
    },
    addRelation: (state, actions) => {
      state.Relation.relationShip.push(actions.payload);
    },
    clearRelation: (state) => {
      state.Relation = {
        Child: {
          linkType: "Child",
          valueToLink: []
        },
        Parent: {
          linkType: "Parent",
          valueToLink: null
        },
        Duplicate: {
          linkType: "Duplicate",
          valueToLink: []
        },
        relationShip: []
      }
    }
  }
})

export const addRelataion = (data) => async (dispatch) => {
  try {
    if (data.addRelate) {
      dispatch(addRelation(data.addRelate))
    }
    if (data.linkType === 1) {
      dispatch(addParent(data.valueToLink))
    } else if (data.linkType === 2) {
      dispatch(addChild(data.valueToLink))
    } else {
      dispatch(addDuplicate(data.valueToLink))
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const selectRelation = (state) => state.relation.Relation
export const { addChild, addParent, addDuplicate, addRelation, clearRelation } = relationSlice.actions

export default relationSlice.reducer