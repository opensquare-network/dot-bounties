import { createSlice } from '@reduxjs/toolkit'

const dotSlice = createSlice({
  name: 'dot',
  initialState: {
    headNumber: 0,
  },
  reducers: {
    setHeadNumber(state, { payload }) {
      state.headNumber = payload
    },
  }
})

export const {
  setHeadNumber: setDotHeadNumber
} = dotSlice.actions

export const dotHeadNumberSelector = state => state.dot.headNumber

export default dotSlice.reducer
