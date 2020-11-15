import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getDotApi } from "../../services/dotApi";
import { setKsmBounties } from "./ksmSlice";

const dotSlice = createSlice({
  name: 'dot',
  initialState: {
    headNumber: 0,
    bountyCount: 0,
    bounties: [],
    properties: {},
    descriptions: [],
    dotLoading: false
  },
  reducers: {
    setHeadNumber(state, { payload }) {
      state.headNumber = payload
    },
    setBountyCount(state, { payload: count }) {
      state.bountyCount = count
    },
    setBounties(state, { payload }) {
      state.bounties = payload
    },
    setProperties(state, { payload }) {
      state.properties = payload
    },
    setBountyDescriptions(state, { payload }) {
      state.descriptions = payload
    },
    setDotLoading(state, { payload }) {
      state.dotLoading = payload
    }
  }
})

export const {
  setHeadNumber: setDotHeadNumber,
  setBountyCount: setDotBountyCount,
  setBounties: setDotBounties,
  setProperties: setDotProperties,
  setBountyDescriptions: setDotBountyDescriptions,
  setDotLoading
} = dotSlice.actions

export const fetchDotBountyCount = () => async dispatch => {
  const api = getDotApi()
  const count = await api.query.treasury.bountyCount()
  dispatch(setDotBountyCount(count.toNumber()))
}

export const fetchDotBounties = () => async dispatch => {
  const api = getDotApi()
  dispatch(setDotLoading(true))
  try {
    const entries = await api.query.treasury.bounties.entries()

    const bounties = entries.map(([key, value]) => {
      const index = key.args[0].toNumber()
      const detail = value.toJSON()
      return { index, detail }
    })
    bounties.sort((a, b) => b.index - a.index)
    dispatch(setKsmBounties(bounties))

    dispatch(setDotLoading(false))
  } catch (e) {
    dispatch(setDotLoading(false))
  }
}

export const fetchDotProperties = () => async dispatch => {
  const properties = await getDotApi().rpc.system.properties()

  dispatch(setDotProperties(properties.toJSON()))
}

export const fetchDotBountyDescriptions = () => async dispatch => {
  const api = getDotApi()
  const entries = await api.query.treasury.bountyDescriptions.entries()

  const descriptions = entries.map(([key, value]) => {
    const index = key.args[0].toNumber()
    const description = value.toHuman()
    return { index, description }

  })
  dispatch(setDotBountyDescriptions(descriptions))
}

export const dotHeadNumberSelector = state => state.dot.headNumber
export const dotPrecisionSelector = state => state.dot.properties?.tokenDecimals || 12
export const dotBountiesSelector = state => state.dot.bounties
export const dotDescriptionsSelector = state => state.dot.descriptions
export const dotLoadingSelector = state => state.dot.dotLoading

export const dotNormalizedBountiesSelector = createSelector(
  dotBountiesSelector,
  dotDescriptionsSelector,
  (bounties, descriptions) => {
    return bounties.map(bounty => {
      const status = Object.keys(bounty.detail.status)[0]

      const desc = descriptions.find(desc => desc.index === bounty.index)
      return {
        ...bounty,
        description: desc?.description || '',
        status
      }
    })
  })


export default dotSlice.reducer
