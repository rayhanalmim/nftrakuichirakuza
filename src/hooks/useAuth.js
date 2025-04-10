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
    window.location.href =
      "https://metamask.app.link/dapp/nftrakuichirakuza.io/";
  };

  const loadBlockchainData = async () => {
    try {
      if (!window.web3) {
        console.error("Web3 not found");
        return false;
      }

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.net.getId();

      if (accounts && accounts.length > 0) {
        localStorage.setItem(
          "walletConnect",
          JSON.stringify({
            isConnect: true,
            account: accounts[0],
            chainId: chainId,
          })
        );
        return true;
      } else {
        console.error("No accounts found");
        return false;
      }
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      return false;
    }
  };

  const login = async () => {
    console.log("Login attempt - device:", isMobile() ? "mobile" : "desktop");

    try {
      if (isMobile()) {
        console.log("Mobile login path");

        if (window.ethereum) {
          console.log("Mobile has ethereum provider");

          try {
            // Request accounts explicitly for mobile
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });

            console.log("Mobile accounts:", accounts);

            // Activate the injected connector
            await activate(connectors.injected);

            // Wait briefly to ensure the account is available
            setTimeout(async () => {
              // Get the account after activation
              const currentAccount = await window.ethereum.request({
                method: "eth_accounts",
              });

              console.log("Current account after activation:", currentAccount);

              localStorage.setItem(
                "walletConnect",
                JSON.stringify({
                  isConnect: true,
                  account: currentAccount[0],
                  chainId: window.ethereum.chainId,
                })
              );
            }, 500);
          } catch (error) {
            console.error("Mobile wallet connection error:", error);
          }
        } else {
          console.log("Mobile does not have ethereum, redirecting");
          redirectToMetamaskMobile();
        }
      } else {
        console.log("Desktop login path");

        if (window.ethereum) {
          try {
            // Request accounts explicitly
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            console.log("Desktop accounts:", accounts);

            await activate(connectors.injected);

            localStorage.setItem(
              "walletConnect",
              JSON.stringify({
                isConnect: true,
                account: accounts[0],
                chainId: window.ethereum.chainId,
              })
            );
          } catch (error) {
            console.error("Desktop wallet connection error:", error);
          }
        } else {
          console.error("No ethereum provider found");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      localStorage.setItem(
        "walletConnect",
        JSON.stringify({ isConnect: false })
      );
      localStorage.setItem("loggedIn", "false");
      deactivate();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { login, logout };
};

export default useAuth;
