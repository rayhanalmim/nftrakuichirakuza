import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../Login/context/Auth.context";

const ChoosePage = () => {
  const { state: ContextState, login } = useContext(AuthContext);
  const { isLoginPending, isLoggedIn, loginError } = ContextState;
  console.log(isLoggedIn);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useTranslation();
  return (
    <div>
      <div className="max-w-[1200px] w-full mx-auto px-3 py-5 my-5">
        <div>
          <h2 className="text-4xl font-bold ">{t("Choose Type")}</h2>
          <p className="text-lg text-grey capitalize">
            {t(
              "Choose “Single” for one of a kind if you want to sell one collectible multiple times"
            )}{" "}
          </p>
        </div>
        <div className="flex flex-wrap  items-center lg:justify-start justify-center   md:gap-[50px]  gap-5 py-5 mt-5">
          <Link to="/createpage">
            <div className="border rounded-lg py-5 px-5 w-full">
              <img
                src={
                  "https://nftevening.com/wp-content/uploads/2022/04/akuma-1.jpg"
                }
                alt=""
                className=" object-cover w-full max-w-[150px] h-[150px]  mx-auto rounded-lg "
              />

              <h3 className="text-center  mt-5 text-2xl ">
                {t("Create NFT In Rakuichi Rakuza Collection")}
              </h3>
              <p className="text-md text-grey capitalize">
                {t(
                  "If you want to highlight the uniqueness and individuality of your item"
                )}
              </p>
            </div>
          </Link>
          <Link to="/CreateCollection">
            <div className="border rounded-lg py-5 px-5">
              <img
                src={
                  "https://cryptopotato.com/wp-content/uploads/2022/04/img1_azuki.jpg"
                }
                alt=""
                className="w-full object-cover max-w-[150px] h-[150px]  mx-auto rounded-lg "
              />
              <h3 className="text-center  mt-5 text-2xl">
                {" "}
                {t("Create New Collection")}
              </h3>
              <p className="text-md text-grey capitalize">
                {t(
                  "If you want to highlight the uniqueness and individuality of your item"
                )}
              </p>
            </div>
          </Link>

          <Link to="/createmynft">
            <div className="border rounded-lg py-5 px-5 w-full">
              <img
                src={
                  "https://assets.entrepreneur.com/content/3x2/2000/1645789440-shen132.png"
                }
                alt=""
                className="w-full object-cover max-w-[150px] h-[150px]  mx-auto rounded-lg "
              />

              <h3 className="text-center  mt-5 text-2xl ">
                {" "}
                {t("Create NFT In Your Collection")}
              </h3>
              <p className="text-md text-grey capitalize">
                {t(
                  "If you want to highlight the uniqueness and individuality of your item"
                )}
              </p>
            </div>
          </Link>
          <Link to="/import">
            <div className="border rounded-lg py-5 px-5">
              <img
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5DdJq9C5IuWRBfQP1xzuRMC9ayhflmI52cdiT-Sbvgene88wYSyoyrJXU9uYmDkz-Dsk&usqp=CAU"
                }
                alt=""
                className="w-full object-cover max-w-[150px] h-[150px]  mx-auto rounded-lg "
              />
              <h3 className="text-center  mt-5 text-2xl">
                {t("Import Collection")}
              </h3>
              <p className="text-md text-grey capitalize">
                {t(
                  "If you want to highlight the uniqueness and individuality of your item"
                )}
              </p>
            </div>
          </Link>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePage;
