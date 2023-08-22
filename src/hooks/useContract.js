import { useWeb3React } from "@web3-react/core";
import {
  getMarketplaceContract,
  getErc720Contract,
  getErc721Contract,
  getErc20Contract,
} from "../utils/contractHelper";

function useContract() {
  const { library } = useWeb3React();

  const useERC721 = (address) => {
    return getErc721Contract(address, library.provider);
  };
  const useERC720 = (address) => {
    return getErc720Contract(address, library.provider);
  };
  const useERC20 = (address) => {
    return getErc20Contract(address, library.provider);
  };
  const useMarketplace = (address) => {
    return getMarketplaceContract(address, library.provider);
  };

  return {
    useERC721,
    useERC720,
    useERC20,
    useMarketplace,
  };
}

export default useContract;
