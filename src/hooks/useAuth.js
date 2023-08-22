import { useWeb3React } from "@web3-react/core";

import { connectors, injected } from "../utils/connectors";
import Web3 from "web3";
import useWeb3 from "./useWeb3";

export const useAuth = () => {
  const { activate, deactivate, account, chainId } = useWeb3React();
  const { switchNetwork } = useWeb3();

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };
  
  const redirectToMetamaskMobile = () => {
    window.location.href = "https://metamask.app.link/dapp/nftrakuichirakuza.io/";
    // window.location.href = "https://metamask.app.link/dapp/wonderful-bombolone-ca2aff.netlify.app";
  };
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.net.getId();
    localStorage.setItem(
      "walletConnect",
      JSON.stringify({
        isConnect: true,
        account: accounts[0],
        chainId: chainId,
      })
    );
  };

  const login = async () => {
    console.log(connectors.walletConnect);

    if (isMobile()) {
      if (window.ethereum) {
        activate(connectors.injected);
        localStorage.setItem(
          "walletConnect",
          JSON.stringify({ isConnect: true, account: account, chainId: chainId })
        );
      }
        else{
          redirectToMetamaskMobile();
         }

    } else {
     if (window.ethereum) {
      activate(connectors.injected);
      localStorage.setItem(
        "walletConnect",
        JSON.stringify({ isConnect: true, account: account, chainId: chainId })
      );
    } else {
      activate(connectors.injected);
      localStorage.setItem(
        "walletConnect",
        JSON.stringify({ isConnect: true, account: account, chainId: chainId })
      );
    }
    }


  };
  const logout = async () => {
    localStorage.setItem("walletConnect", JSON.stringify({ isConnect: false }));
    localStorage.setItem("loggedIn", false);
    deactivate();
  };
  return { login, logout };
};

export default useAuth;
