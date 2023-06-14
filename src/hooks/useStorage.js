import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage();

function useStorage() {
  const uploadOnIpfs = async (metadata) => {
    const uri = await storage.upload(metadata);
    return uri;
  };
  const downloadJSONOnIpfs = async (uri) => {
    const data = await storage.downloadJSON(uri);
    return data;
  };
  return {
    uploadOnIpfs,
    downloadJSONOnIpfs,
  };
}

export default useStorage;
