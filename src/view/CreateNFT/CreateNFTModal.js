import React,{useEffect} from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

const CreateNFTModal = () => {
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    /**Top EarnersParentParentEarnings
    * @param info
    */
    onChange(info) {
      // If the file is being uploaded
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      // if the file is done or error
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      // If the file upload failed.
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  return (
    <div>
      <h2 className="text-white">Collection ERC-721</h2>
      <div className="flex justify-center gap-5 ">
        <img src={process.env.PUBLIC_URL + "./assets/linear.svg"} alt="" />
        <div>
          <h5>At least 300x300 pixels, max. size 5MB, GIF, JPEG or PNG</h5>
          <Upload {...props}>
            <button
              className="border p-2 mt-3 bg-grey rounded-lg"
              type="file"
              icon={<UploadOutlined />}
            >
              choose file
            </button>
          </Upload>
        </div>
      </div>
      <div className="pt-3 pb-3">
        <h2 className="font-bold capitalize text-md ">
          Display name (required)
        </h2>
        <input
          className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="inline-full-name"
          type="text"
          placeholder="Enter collection name"
        />
        <p>Token name cannot be changed in future</p>
      </div>
      <div className="pt-3 pb-3">
        <h2 className="font-bold capitalize text-md ">Symbol(required)</h2>
        <input
          className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="inline-full-name"
          type="text"
          placeholder="Enter token symbol"
        />
      </div>
      <div className="pt-3 pb-3">
        <h2 className="font-bold capitalize text-md ">
          Description (optional)
        </h2>
        <input
          className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="inline-full-name"
          type="text"
          placeholder="Spread some words about your token collection"
        />
      </div>
      <div className="pt-3 pb-3">
        <h2 className="font-bold capitalize text-md ">short url</h2>
        <input
          className="bg-gray-200 appearance-none border-2 placeholder-grey-50 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="inline-full-name"
          type="text"
          placeholder="www.com"
        />
      </div>
     {/* <Button title="create modal"></Button> */}
     <button className="px-3  p-2 py-2 bg-button-img bg-cover text-white bg-no-repeat w-[32%]">create modal</button>
    </div>
  );
};

export default CreateNFTModal;
