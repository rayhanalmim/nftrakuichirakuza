import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { useStorageUpload } from "@thirdweb-dev/react";

const storage = new ThirdwebStorage({
  clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID,
});

function useStorage() {
  const { mutateAsync: upload } = useStorageUpload();
  const uploadOnIpfs = async (metadata) => {
    var dataarray = [];
    dataarray.push(metadata);
    const uris = await upload({ data: dataarray });
    return uris[0];
  };
  const downloadJSONOnIpfs = async (uri) => {
    console.log("===== uri print>", uri);
    const data = await storage.downloadJSON(uri);
    console.log(data, "from hook second function");
    return data;
  };
  return {
    uploadOnIpfs,
    downloadJSONOnIpfs,
  };
}

export default useStorage;
