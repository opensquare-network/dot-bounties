import { ApiPromise, WsProvider } from '@polkadot/api'

let ksmApi = null;

export const initKsmApi = async () => {
  const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
  ksmApi = new ApiPromise({ provider: wsProvider, });

  await ksmApi.isReady;
  return ksmApi
};

export const getKsmApi = () => {
  if (!ksmApi) {
    throw new Error('Please init ksmApi first');
  }

  return ksmApi;
};
