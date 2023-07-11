import { useMutation, useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { refInfo } from "../../graphql/queries/getReffralInfo";
import { signIn } from "../../graphql/queries/signIn";
import { truncateAddress } from "../../utils";
import PleaseLogin from "../Home/components/PleaseLogin";
import useWeb3 from "../../hooks/useWeb3";
import Web3 from "web3";
import useNFT from "../../hooks/useNFT";
import Reward from "../../components/Reward/Reward";
import { updateReward } from "../../graphql/mutations/updateReward";
import { getUserData } from "../../graphql/queries/getUser";
import { useTranslation } from "react-i18next";
const DashboardPage = ({ level1Data }) => {
  const { account, active } = useWeb3React();
  const [withdraw, setWithdraw] = useState(false);
  const { withdrawReward } = useWeb3();
  const { rewardClaim } = useNFT();

  const { data, loading, error } = useQuery(refInfo, {
    skip: !account,
    variables: {
      wallet: account,
    },
  });
  const [updateRewardUser] = useMutation(updateReward);
  console.log(loading ? data : data);
  const userData = !error && data?.getRefInformation?.parentRef;
  let ownData = !error && data?.getRefInformation?.user;
  const userReward = !error && data?.getRefInformation?.user?.referral_reward;
  const { t } = useTranslation();
  console.log(userData);
  const TableData = [
    {
      id: 1,
      imgUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: " Molly Sanders",
      useramount: " 000004",
      amount: " $20,000",
      date: "Sept 28, 2019",

      status: "Success",
    },
    {
      id: 2,
      imgUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: "Michael Roberts",
      useramount: " 000004",
      amount: " $20,000",
      date: " Sept 28, 2019",

      status: "Success",
    },
    {
      id: 3,
      imgUrl:
        "https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: " Devin Childs",
      useramount: " 000004",
      amount: " $20,000",
      date: " Sept 28, 2019",

      status: "Success",
    },
    {
      id: 4,
      imgUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: " Molly Sanders",
      useramount: " 000004",
      amount: " $20,000",
      date: " Sept 28, 2019",

      status: "Success",
    },
    {
      id: 5,
      imgUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: "Michael Roberts",
      useramount: " 000004",
      amount: " $20,000",
      date: " Sept 28, 2019",

      status: "Success",
    },
    {
      id: 5,
      imgUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: "Michael Roberts",
      useramount: " 000004",
      amount: " $20,000",
      date: " Sept 28, 2019",

      status: "Success",
    },
    {
      id: 5,
      imgUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: "Michael Roberts",
      useramount: " 000004",
      amount: " $20,000",
      date: " Sept 28, 2019",

      status: "Success",
    },
  ];
  const dataList = [
    {
      id: 1,
      question: "loreum ipsum?",
      answer: "loreum ipsum",
    },
    {
      id: 2,
      question: "loreum ipsum?",
      answer: "loreum ipsum",
    },
    {
      id: 3,
      question: "loreum ipsum?",
      answer: "loreum ipsum",
    },
    {
      id: 4,
      question: "loreum ipsum?",
      answer: "loreum ipsum",
    },
  ];
  const Data = [
    {
      id: 1,
      name: "Parent",
      amount: "$89866437",
      imgUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: " Molly Sanders",
    },
    {
      id: 2,
      name: "Grand Parent",
      amount: "$89866437",
      imgUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: "Michael Roberts",
      useramount: " 000004",
    },
    {
      id: 3,
      name: "For Parent",
      amount: "$89866437",
      imgUrl:
        "https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
      username: " Molly Sanders",
      useramount: " 000004",
    },
    {
      id: 4,
      name: "My Earnings",
      button: "claim button ",
      amount: "$89866437",
      icon: "/assets/icon.png",
    },
  ];


  const dateConvert = (refdate) =>{
    console.log(refdate)
    var Rdate = new Date(refdate*1);

    console.log(Rdate)
    const day = Rdate.getDate(); 
    const month = Rdate.getMonth() + 1; 
    const year = Rdate.getFullYear(); 
    const formattedDate = `${day}-${month}-${year}`;

    console.log(formattedDate)

    return formattedDate;
  }


  return (
    <div>
      {withdraw ? (
        <Reward />
      ) : (
        <>
          <div className="bg-cyan"> 
            <div className="mx-auto max-w-[1500px] w-full px-2 ">
              <div className="py-[50px]">
                <h3 className="text-2xl font-bold">
                  {t("Hello")} {ownData?.username}
                </h3>
                <div className="flex  flex-col lg:flex-row gap-[30px] ">
                  <>
                    {userData &&
                    // here array slicing was 0,3 , Harsh Changed it From 0,3 to 0,1 for hiding Parent Node.
                      userData.slice(0, 1).map((item, key) => {
                        return (
                          <div className="px-5 py-[2rem] max-w-[400px] mx-auto w-full rounded rup shadow text-white ">
                            <h3 className="text-2xl font-semibold text-white">
                              {key == 0
                                ? t("Parent")
                                : key == 1
                                ? t("Grand Parent")
                                : t("For Parent")}
                            </h3>
                            <div className="flex gap-10">
                              <img
                                className="w-[80px] h-[80px] rounded-full"
                                src={item.avatar_url.includes("ipfs") ? item.avatar_url.replace(
                                  "ipfs://",
                                  "https://gateway.ipfscdn.io/ipfs/"
                                ):item.avatar_url
                              }
                                alt=""
                              />



                              <div>
                                <h3 className="text-2xl font-semibold text-white">
                                  {item.displayName == null
                                    ? "NO Name"
                                    : item.displayName}
                                </h3>

                                <p className="text-white whitespace-no-wrap text-lg">
                                  {truncateAddress(item.referral_url)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>

                  <div className="px-5 py-[2rem] max-w-[400px] mx-auto w-full rounded rup shadow text-white ">
                    <h3 className="text-2xl font-semibold text-white">
                      {t("Earnings")}
                    </h3>
                    <div className="flex gap-5  items-center">
                      <div>
                        <BiWallet size={80} />
                      </div>
                      <div>
                        <p className="text-white whitespace-no-wrap text-2xl">
                          {userReward && userReward.toFixed(8)} OVE
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-blue p-3"
                      onClick={() => {
                        if (userReward == 0) {
                          Swal.fire(
                            "Insufficient Amount",
                            "There is nothing to withdrawal",
                            "warning"
                          );
                        } else {
                          setWithdraw(true);
                          withdrawReward(
                            account,
                            new Web3().utils.toWei(
                              userReward.toString(),
                              "ether"
                            ),
                            parseInt(Date.now() / 1000).toString()
                          )
                            .then((res) => {
                              console.log(res);
                              console.log([
                                res.user,
                                res.amount,
                                res.time,
                                res.signer,
                              ]);
                              rewardClaim([
                                res.user,
                                res.amount,
                                res.time,
                                res.signer,
                              ])
                                .then((res) => {
                                  console.log(res);
                                  setWithdraw(false);

                                  updateRewardUser({
                                    variables: {
                                      wallet: account,
                                      referralReward: 0,
                                    },
                                    refetchQueries: [
                                      {
                                        query: refInfo,
                                        variables: {
                                          wallet: account,
                                        },
                                      },
                                      {
                                        query: getUserData,
                                        variables: {
                                          wallet: account,
                                        },
                                      },
                                      {
                                        query: signIn,
                                        variables: {
                                          wallet: account,
                                        },
                                      },
                                      {
                                        query: getUserData,
                                      },
                                    ],
                                  })
                                    .then((res) => {
                                      console.log(res);
                                      Swal.fire(
                                        "Success",
                                        "Profile Updated Successfully",
                                        "success"
                                      );
                                    })
                                    .catch((err) => {
                                      Swal.fire(
                                        "Error",
                                        "Oops Something Wrong !",
                                        "error"
                                      );
                                      console.log(err);
                                    });
                                  Swal.fire(
                                    "Success",
                                    "Reward Withdrawal Successfull",
                                    "success"
                                  );
                                })
                                .catch((err) => {
                                  console.log(err);
                                  setWithdraw(false);
                                });
                            })
                            .catch((err) => {
                              console.log(err);
                              setWithdraw(false);
                              Swal.fire(
                                "Error",
                                "Transaction Declined",
                                "error"
                              );
                            });
                        }
                      }}
                    >
                      {t("Claim Reward")}
                    </button>
                  </div>
                </div>

                <div className="">
                  <div className="my-[3rem]">
                    <h4 className="text-3xl text-black font-bold">
                      {t("Top Earners")}
                    </h4>
                    <div className="bg-cyan">
                      <div className="mx-auto max-w-[1500px] w-full  ">
                        <div className="px-4  pb-[3rem]">
                          <div className="mt-5">
                            <div className="overflow-x-auto">
                              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">   
                                  <thead>
                                    <tr>
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                        {t("Referral Name")}
                                      </th>
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                        {t("Referral URL")}
                                      </th>
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                        {t("Referral Date")}
                                      </th>
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                                        {t("Status")}
                                      </th>
                                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {level1Data != undefined &&
                                      level1Data?.map((item, index) => {
                                        return (
                                          <>
                                            <tr>
                                              <td
                                                className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                                                href
                                              >
                                                <div className="flex">
                                                  <div className="flex-shrink-0 w-10 h-10">
                                                    <a href="/users/userpage">
                                                      <img
                                                        className="w-full h-full rounded-full"
                                                        src={item?.avatar_url}
                                                        alt
                                                      />
                                                    </a>
                                                  </div>
                                                  <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap ">
                                                      {" "}
                                                      {item?.displayName}
                                                    </p>
                                                  </div>
                                                </div>
                                              </td>

                                          
                                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                  {truncateAddress(
                                                    item?.referral_url
                                                  )}
                                                </p>
                                              </td>


                                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                  { 
                                                  dateConvert(item?.createdAt)
                                                  }
                                                </p>
                                              </td>

                                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                  <span
                                                    aria-hidden="true"
                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                  />
                                                  <span className="relative">
                                                    Success
                                                  </span>
                                                </span>
                                              </td>
                                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right" />
                                            </tr>
                                          </>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div />
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
