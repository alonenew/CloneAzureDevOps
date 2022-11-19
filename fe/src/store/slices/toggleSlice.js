import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openLogoHeader: true,
  openNewStories: true,
  openClosedStories: true,
}

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleLogo: (state) => {
      state.openLogoHeader = !state.openLogoHeader
    },
    toggleNewStories: (state) => {
      state.openNewStories = !state.openNewStories
    },
    toggleClosedStories: (state) => {
      state.openClosedStories = !state.openClosedStories
    },
  },
})

export const selectOpenLogo = (state) => state.toggle.openLogoHeader
export const selectOpenNew = (state) => state.toggle.openNewStories
export const selectOpenClosed = (state) => state.toggle.openClosedStories
export const { toggleLogo, toggleNewStories, toggleClosedStories } = toggleSlice.actions

export default toggleSlice.reducer