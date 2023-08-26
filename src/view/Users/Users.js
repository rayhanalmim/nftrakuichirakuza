import React from "react";
import { SearchComponent } from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { allUsersData } from "../../graphql/queries/getAllUsers";
import { truncateAddress } from "../../utils";
import PageLoading from "../../components/PageLoading/PageLoading";
const Users = () => {
  const { data, loading, error } = useQuery(allUsersData);

  const userData = !loading && !error && data.getAllUsers;
  console.log(userData);
  const dataList = [
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
    {
      imgUrl: "/assets/users.png",
      title: "YFI Fan",
      para: "26k followers",
    },
  ];
  if (loading) {
    return <PageLoading />;
  }
  return (
    <div>
      {userData?.length > 0 ? (
        <>
          <div className="max-w-[1500px] mx-auto pt-2 md:pt-[2rem]">
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-5 px-2 justify-center items-center  mt-10">
              {userData?.map((data, index) => {
                return (
                  <>
                    <div className="border rounded-lg p-3 max-w-[400px] mx-auto ">
                      <div>
                        <img
                          src={
                            data?.avatar_url?.includes("ipfs")
                              ? data?.avatar_url?.replace(
                                  "ipfs://",
                                  "https://0a7fb2c625dc7ba2c0696fc825ec1c78.ipfscdn.io/ipfs/"
                                )
                              : data?.avatar_url
                          }
                          className="w-full h-[200px]"
                        />
                      </div>
                      <div className="px-2 pt-4 flex gap-[50px]  justify-between  items-center ">
                        <div>
                          <h3 className="text-lg text-black">
                            {data.displayName}
                          </h3>
                          <h4 className="text-sm text-black">
                            {truncateAddress(data.wallet)}
                          </h4>
                          <p className="text-grey capitalize text-lg">
                            {data.about_details.slice(0, 30) + "...."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <p className="md:text-3xl text-sm">No User Found</p>
          <p className="md:text-3xl text-sm">Having Trouble?</p>
          <p>
            <Link to="/login">Create User</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;
