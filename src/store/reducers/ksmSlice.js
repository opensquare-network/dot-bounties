import { createSlice } from '@reduxjs/toolkit'
import { getKsmApi } from "../../services/ksmApi";

const ksmSlice = createSlice({
  name: 'ksm',
  initialState: {
    bountyCount: 0,
    bounties: [],
    properties: {},
    descriptions: []
  },
  reducers: {
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
    }
  }
});

export const { setBountyCount, setKsmBounties, setKsmProperties, setKsmBountyDescriptions } = ksmSlice.actions

export const fetchKsmBountyCount = () => async dispatch => {
  const api = getKsmApi()
  const count = await api.query.treasury.bountyCount()
  dispatch(setBountyCount(count.toNumber()))
}

export const fetchBounties = () => async dispatch => {
  const api = getKsmApi()
  const entries = await api.query.treasury.bounties.entries()

  const bounties = entries.map(([key, value]) => {
    const index = key.args[0].toNumber()
    const detail = value.toJSON()
    return { index, detail }
  })
  bounties.sort((a, b) => b.index - a.index)
  dispatch(setKsmBounties(bounties))
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

export default ksmSlice.reducer
