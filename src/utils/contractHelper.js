import Web3 from "web3";
import {
  ERC1155ABI,
  ERC20ABI,
  ERC720ABI,
  ERC721ABI,
  MARKETPLACE_ABI,
  REWARDABI,
} from "../config/Abi";
const getContract = (abi, address, provider) => {
  const web3 = new Web3(provider);
  return new web3.eth.Contract(abi, address);
};

export const getErc720Contract = (address, provider) => {
  return getContract(ERC720ABI, address, provider);
};
export const getErc20Contract = (address, provider) => {
  return getContract(ERC20ABI, address, provider);
};
export const getErc721Contract = (address, provider) => {
  return getContract(ERC721ABI, address, provider);
};
export const getMarketplaceContract = (address, provider) => {
  return getContract(MARKETPLACE_ABI, address, provider);
};
export const rewardContract = (address, provider) => {
  return getContract(REWARDABI, address, provider);
};
