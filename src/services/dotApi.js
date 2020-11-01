import { ApiPromise, WsProvider } from '@polkadot/api'

let dotApi = null;

export const initDotApi = async () => {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  dotApi = new ApiPromise({ provider: wsProvider, });

  await dotApi.isReady;
  return dotApi
};

export const getDotApi = () => {
  if (!dotApi) {
    throw new Error('Please init dotApi first');
  }

  return dotApi;
};
