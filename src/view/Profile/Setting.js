import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { signIn } from "../../graphql/queries/signIn";
import { useWeb3React } from "@web3-react/core";
import NotConnectedPage from "../Home/components/NotConnectedPage";
import { refInfo } from "../../graphql/queries/getReffralInfo";
import { truncateAddress } from "../../utils";
import CopyToClipboard from "react-copy-to-clipboard";
import { useMutation } from "@apollo/client";
import { updateUser } from "../../graphql/mutations/updateUser";
import PleaseLogin from "../Home/components/PleaseLogin";
import useStorage from "../../hooks/useStorage";
import Swal from "sweetalert2";
import CreateLoading from "../../CreateLoading/CreateLoading";
import { getUserData } from "../../graphql/queries/getUser";
import { useTranslation } from "react-i18next";
const Setting = () => {
  const { account, active } = useWeb3React();
  const { t } = useTranslation();
  const { uploadOnIpfs } = useStorage();
  const [CreateLoadingShow, setCreateLoading] = useState(false);

  const [copied, setCopied] = useState(false);
  const result2 = useQuery(refInfo, {
    variables: {
      skip: !account,
      variables: {
        wallet: account,
      },
    },
  });

  console.log(result2);
  const { loading, error, data } = useQuery(signIn, {
    skip: !account,
    variables: { wallet: account },
  });

  console.log(data)
  const [displayname, setDisplayname] = useState(data.signIn.displayName);
  const [username, setUsername] = useState(data.signIn.username);
  const [about_details, setBio] = useState(data.signIn.about_details);
  const [profileimage, setProfileImage] = useState(false);
  const [coverimage, setCoverimage] = useState(false);
  const [updateProfile] = useMutation(updateUser);
  console.log(about_details)

  if (!active) {
    return <NotConnectedPage />;
  } else if (CreateLoadingShow) {
    return <CreateLoading />;
  }
  return (
    <div>
      {data?.signIn ? (
        <div className="max-w-[1100px] mx-auto w-full py-5 px-[40px]">
          <h2 className="capitalize font-bold text-2xl ">
            {t("profile settings")}{" "}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let NoImageData = {
                displayName: displayname,
                username: username,
                about_details: about_details,
                websiteUrl: e.target[5].value,
                wallet: account,
              };
              console.log("========================================");
              console.log(NoImageData);

              setCreateLoading(true);
              if (e.target[0].value) {
                uploadOnIpfs(e.target[0].files[0])
                  .then(async (uri) => {
                    uploadOnIpfs(e.target[1].files[0]).then(async (dp) => {
                      let data = {
                        bgImage: uri,
                        avatarUrl: dp,
                        displayName: displayname,
                        username: username,
                        about_details: about_details,
                        websiteUrl: e.target[5].value,
                        wallet: account,
                      };
                      updateProfile({
                        variables: data,
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
                          setCreateLoading(false);
                        })
                        .catch((err) => {
                          Swal.fire("Error", "Oops Something Wrong !", "error");
                          console.log(err);
                        });
                      console.log("data", data);
                    });
                  })
                  .catch((err) => {
                    Swal.fire("Please Enter All Values");
                  });
              } else {
                if (e.target[1].value) {
                  uploadOnIpfs(e.target[1].files[0]).then(async (dp) => {
                    let data = {
                      avatarUrl: dp,
                      displayName: displayname,
                      username: username,
                      about_details: about_details,
                      websiteUrl: e.target[5].value,
                      wallet: account,
                    };
                    updateProfile({
                      variables: data,
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
                        setCreateLoading(false);
                      })
                      .catch((err) => {
                        Swal.fire("Error", "Oops Something Wrong !", "error");
                        console.log(err);
                      });
                  });
                } else {
                  updateProfile({
                    variables: NoImageData,
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
                      setCreateLoading(false);
                    })
                    .catch((err) => {
                      Swal.fire("Error", "Oops Something Wrong !", "error");
                      console.log(err);
                    });
                }

                // Swal.fire("Failure !", "Kindly Try Again", "error");
              }
            }}
          >
            <div className="flex  flex-col lg:flex-row  justify-center   gap-[30px]   pt-10">
              <div>
                <h4 className="text-capitalize text-xl font-bold capitalize ">
                  {t("account")}
                </h4>
              </div>
              <div>
                <div className="relative  ">
                  <img
                    src={
                      data?.signIn?.bg_image?.includes("ipfs")
                        ? data?.signIn?.bg_image?.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                          )
                        : data?.signIn?.bg_image
                    }
                    className=" relative w-full mx-auto "
                  />
                  <label
                    class="custom-file-upload absolute md:right-[5%]  right-[5%] top-[5%] mx-auto  md:w-[170px]  w-[35%] px-5  rounded-full"
                    style={{
                      width: "35px",
                      border: "1px solid #ccc",
                      display: "inline-block",
                      padding: "6px 12px",
                      cursor: "pointer",
                      background: "black",
                      color: " white",
                    }}
                  >
                    <input
                      type="file"
                      style={{
                        display: "none",
                      }}
                    />
                    +
                  </label>
                  <img
                    src={
                      data?.signIn?.avatar_url?.includes("ipfs")
                        ? data?.signIn?.avatar_url?.replace(
                            "ipfs://",
                            "https://gateway.ipfscdn.io/ipfs/"
                          )
                        : data?.signIn?.avatar_url
                    }
                    className=" absolute md:left-[10px]  left-[35px] bottom-[-7%] mx-auto  md:w-[170px]  w-[35%] px-5  rounded-full"
                  />
                  <label
                    class="custom-file-upload absolute md:left-[75px]  left-[44px] bottom-[-9%] mx-auto  md:w-[170px]  w-[35%] px-5  rounded-full"
                    style={{
                      width: "35px",
                      border: "1px solid #ccc",
                      display: "inline-block",
                      padding: "6px 12px",
                      cursor: "pointer",
                      background: "black",
                      color: " white",
                    }}
                  >
                    <input
                      type="file"
                      style={{
                        display: "none",
                      }}
                    />
                    +
                  </label>

                  <div className="absolute right-[10%] mt-[20px]">
                    <h1>{t("Recommended Size")}</h1>
                    <h1>
                      {t("Header image")}: {t("Height")} <b>168px</b>{" "}
                      {t("Width")} <b>300px</b>
                    </h1>
                    <h1>
                      {t("Icon")}: {t("Height")} <b>200px</b> {t("Width")}{" "}
                      <b>315px</b>
                    </h1>
                  </div>
                </div>
                <br></br>
                <br></br>
                <div className="flex flex-col-reverse md:flex-row gap-[40px] md:gap-[100px] justify-center  py-9  mt-[40px]">
                  <div className="flex-1">
                    <div className="pt-5 pb-5">
                      <h2 className="font-bold capitalize text-xl ">
                        {t("Enter Name")}
                      </h2>
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="inline-full-name"
                        type="text"
                        placeholder={
                          loading ? "Demo" : data?.signIn?.displayName
                        }
                        onChange={(e) => setDisplayname(e.target.value)}
                        // required
                      />
                    </div>
                    <div className="pt-5 pb-5">
                      <h2 className="font-bold capitalize text-xl ">
                        {t("username")}
                      </h2>
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="inline-full-name"
                        type="text"
                        placeholder={`@${
                          loading ? "Demo" : data?.signIn?.username
                        }`}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        // required
                      />

                      {/* shortbio and website url code */}

                      <div className="pt-5 pb-5">
                        <h2 className="font-bold capitalize text-xl ">
                          {t("short bio")}
                        </h2>
                        {/* <input
                         
                        /> */}
                        <textarea
 className="bg-gray-200 h-[105px] appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
 id="inline-full-name"
 type="text"
 placeholder={`${
   loading ? "Demo" : data?.signIn?.about_details
 }`}
 onChange={(e) => {
   setBio(e.target.value);
   
 }}
                        />
                      </div>

                      {/* <p className="text-grey capitalize mt-2 ">
                        {t(
                          "Your profile will be available on team478.com/[username]"
                        )}
                      </p> */}
                    </div>

                    {/* shortbio and website url code */}
                    {/* <div className="pt-5 pb-5">
                      <h2 className="font-bold capitalize text-xl ">
                        {t("short bio")}
                      </h2>
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="inline-full-name"
                        type="text"
                        placeholder={` ${
                          loading ? "Demo" : data?.signIn?.about_details
                        }`
                      }
                      />
                    </div>

                    <div className="pt-5 pb-5">
                      <h2 className="font-bold capitalize text-xl ">
                        {t("Website URL")}
                      </h2>

                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="inline-full-name"
                        type="text"
                        placeholder="https://"
                      />
                    </div> */}

                    <button className="text-white bg-black rounded-lg p-2 px-5 capitalize text-lg">
                      {t("save settings")}
                    </button>
                  </div>

                  <div>
                    <div className="shadow p-4 bg-white rounded-lg max-w-[350px] w-full mx-auto  ">
                      <img
                        src={process.env.PUBLIC_URL + "./assets/Frame.png"}
                        alt=""
                        className="w-full mx-auto"
                      />
                      <div className="py-3">
                        <h5 className="text-sm text-center font-bold capitalize">
                          {t("Share Referral URL")}
                        </h5>
                        <p className="text-center">
                          {data?.signIn?.referral_url
                            ? truncateAddress(data?.signIn?.referral_url)
                            : null}
                        </p>
                        <div className="text-center">
                          <CopyToClipboard
                            text={`https://${window.location.hostname}/login/${data?.signIn?.referral_url}`}
                          >
                            <button
                              onClick={(e) => {e.preventDefault(); setCopied(!copied)}}
                              className="capitalize text-sm border bg-white p-3 rounded-lg px-5"
                            >
                              {t("Share URL")}
                            </button>
                          </CopyToClipboard>
                          {copied ? (
                            <p className="text-[red]">{t("Copied")}!!</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <PleaseLogin />
      )}
    </div>
  );
};

export default Setting;
