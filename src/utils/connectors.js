import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;
export const injected = new InjectedConnector({
  supportedChainIds: [1, 97, 5, 56, 80001],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    80001: "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78",
  },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});
export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  // coinbaseWallet: walletlink,
};
