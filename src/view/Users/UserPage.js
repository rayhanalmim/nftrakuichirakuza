import React, { useState, useRef } from "react";
import NFTCard from "../../components/Cards/NFTCard/NFTCard";
import { SearchComponent } from "../../components/Header/Header";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { useQuery } from "@apollo/client";
import { allUsersData } from "../../graphql/queries/getAllUsers";
import { useParams } from "react-router-dom";
import { getUserData } from "../../graphql/queries/getUser";
import PageLoading from "../../components/PageLoading/PageLoading";
import { truncateAddress } from "../../utils";
const UserPage = () => {
  const { wallet } = useParams();
  console.log(wallet);
  const { data, loading, error } = useQuery(getUserData, {
    skip: !wallet,
    variables: {
      wallet: wallet,
    },
  });

  const userInfo = !loading && !error && data?.getUser;
  console.log(data);
  const items = [
    {
      //   label: "Event",
    },
  ];
  const [copyText, setCopyText] = useState("");
  if (loading) {
    return <PageLoading />;
  }

  const FakeData = [
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE2NjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzU0MDIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzY3ODMuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzQ5NDQuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE0LmdpZg==",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzE1MzEuZ2lm",
    },
    {
      url: "https://assets.raribleuserdata.com/prod/v1/image/t_gif_preview/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2dvYmJsZXJzLmFydGdvYmJsZXJzLmNvbS9naWZzLzUzNjIuZ2lm",
    },
  ];
  return (
    <div>
      <div className="max-w-[1500px] mx-auto py-5  ">
        <div className="relative  md:px-[40px] px-[20px]">
          <img
            src={userInfo.bg_image}
            className=" relative w-full h-[400px] mx-auto "
          />
          <img
            src={userInfo.avatar_url}
            className="absolute left-[50px] bottom-[-14%] mx-auto  md:w-auto  w-[14%] px-5"
          />
        </div>

        <div className="flex justify-between items-center flex-col md:flex-row gap-5 pt-14  md:px-[40px] px-[20px] ">
          <div className="flex-1 md:max-w-[800px] px-2  w-full ">
            <div className="flex items-center gap-4 ">
              <h1 className="capitalize text-2xl text-black ">
                {userInfo.displayName}
              </h1>
            </div>

            <p>{userInfo.about_details}</p>
            <div className="flex items-center gap-5 md:flex-nowrap   justify-start  flex-wrap ">
              <button className="capitalize bg-black  px-[30px] py-2 text-white rounded-lg text-md">
                + follow
              </button>

              {/* <button className="text-grey  mx-2 my-2  px-[30px] py-2 capitalize rounded-lg bg-cyan">
                message
              </button> */}

              {/* <div className="p-3 bg-cyan rounded-lg">
                <img
                  src={process.env.PUBLIC_URL + "./assets/download.png"}
                  className="w-full mx-auto"
                />
              </div> */}
              {/* <div className="p-3 bg-cyan rounded-lg">
                <img
                  src={process.env.PUBLIC_URL + "./assets/dots.png"}
                  className="w-full mx-auto "
                />
              </div> */}
            </div>
          </div>

          <div className="  border p-5 rounded-lg justify-between  px-5 w-full md:w-auto ">
            <div className="flex gap-[40px] justify-between items-center pt-5">
              <h4 className="capitalize text-grey text-sm">Address</h4>
              <h4 className="text-sm  font-bold uppercase">
                {truncateAddress(userInfo.wallet)}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex max-w-[1500px] p-2 flex-col md:flex-row  mx-auto justify-center gap-[20px] md:max-h-[700px] h-auto w-full   md:px-[40px] px-[20px] ">
          <div className="sticky md:h-screen h-auto md:top-[120px] top-0 z-[100] bg-white  max-h-[700px] ">
            <div className="border-b-2 pb-4">
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className=" px-3 py-3">
                    <h4 className="capitalize font-bold text-lg p-0 m-0">
                      status
                    </h4>

                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <div className="flex gap-5  pt-5 pb-3">
                <button className="bg-black rounded-lg px-4 py-3 text-white capitalize">
                  all
                </button>
              </div>
            </div>
            <div className="border-b-2 pb-4">
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space className=" px-3 py-3">
                    <h4 className="capitalize font-bold text-lg p-0 m-0">
                      Blockchain
                    </h4>

                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <div className="flex gap-5  items-center pt-5 pb-3">
                <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                  Polygon
                </button>

                <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                  Binance
                </button>
                <button className="bg-cyan rounded-lg px-4 py-3 text-grey font-bold capitalize">
                  Etherum
                </button>
              </div>
              <button className="bg-cyan rounded-lg px-4 py-3 text-black font-bold capitalize w-auto  md:w-full ">
                Apply
              </button>
            </div>
          </div>
          <div className="max-h-[700px] overflow-y-scroll w-full">
            <div className="grid  grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
              {FakeData.map((item, key) => (
                <NFTCard key={key} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
