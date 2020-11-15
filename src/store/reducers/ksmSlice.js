import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getKsmApi } from "../../services/ksmApi";

const ksmSlice = createSlice({
  name: 'ksm',
  initialState: {
    headNumber: 0,
    bountyCount: 0,
    bounties: [],
    properties: {},
    descriptions: [],
    ksmLoading: false
  },
  reducers: {
    setHeadNumber(state, { payload }) {
      state.headNumber = payload
    },
    setBountyCount(state, { payload: count }) {
      state.bountyCount = count
    },
    setKsmBounties(state, { payload }) {
      state.bounties = payload
    },
    setKsmProperties(state, { payload }) {
      state.properties = payload
    },
    setKsmBountyDescriptions(state, { payload }) {
      state.descriptions = payload
    },
    setKsmLoading(state, { payload }) {
      state.ksmLoading = payload
    }
  }
});

export const {
  setHeadNumber: setKsmHeadNumber,
  setBountyCount,
  setKsmBounties,
  setKsmProperties,
  setKsmBountyDescriptions,
  setKsmLoading
} = ksmSlice.actions

export const fetchKsmBountyCount = () => async dispatch => {
  const api = getKsmApi()
  const count = await api.query.treasury.bountyCount()
  dispatch(setBountyCount(count.toNumber()))
}

export const fetchBounties = () => async dispatch => {
  const api = getKsmApi()
  dispatch(setKsmLoading(true))
  try {
    const entries = await api.query.treasury.bounties.entries()

    const bounties = entries.map(([key, value]) => {
      const index = key.args[0].toNumber()
      const detail = value.toJSON()
      return { index, detail }
    })
    bounties.sort((a, b) => b.index - a.index)
    dispatch(setKsmBounties(bounties))
    dispatch(setKsmLoading(false))
  } catch (e) {
    dispatch(setKsmLoading(false))
  }
}

export const fetchKsmProperties = () => async dispatch => {
  const properties = await getKsmApi().rpc.system.properties()

  dispatch(setKsmProperties(properties.toJSON()))
}

export const fetchKsmBountyDescriptions = () => async dispatch => {
  const api = getKsmApi()
  const entries = await api.query.treasury.bountyDescriptions.entries()

  const descriptions = entries.map(([key, value]) => {
    const index = key.args[0].toNumber()
    const description = value.toHuman()
    return { index, description }

  })
  dispatch(setKsmBountyDescriptions(descriptions))
}

export const ksmBountiesSelector = state => state.ksm.bounties
export const ksmDescriptionsSelector = state => state.ksm.descriptions
export const ksmHeadNumberSelector = state => state.ksm.headNumber
export const ksmLoadingSelector = state => state.ksm.ksmLoading

export const ksmNormalizedBountiesSelector = createSelector(
  ksmBountiesSelector,
  ksmDescriptionsSelector,
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

export const ksmPrecisionSelector = state => state.ksm.properties?.tokenDecimals || 12

export default ksmSlice.reducer
