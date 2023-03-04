import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';

const useAlchemyProvider = () => {
  const [settings, setSettings] = useState({
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: localStorage.getItem('network') ||  Network.ETH_MAINNET,
  });

  const alchemyProvider = new Alchemy(settings);

  const setNetwork = (network) => {
    localStorage.setItem('network', network);
    setSettings({
      ...settings,
      network,
    });
  };

  return { setNetwork,  alchemyProvider};
};

export default useAlchemyProvider;
