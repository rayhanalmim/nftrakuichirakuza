import { Button } from "../../../components/Button/Primary";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import SliderHero from "../../../components/Slider/Slider";
export const HeroSection = ({ heading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = (lang) => {
    i18next.changeLanguage(lang);
  };

  return (
    <div>
      <section className="hero-sec bg-hero-img bg-no-repeat bg-cover w-full mx-auto py-[2rem] px-[40px] cover ">
        <div className="max-w-[1500px] w-full mx-auto">
          <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
            <div className="flex-1 ">
              <div className=" max-w-[500px] w-full">
                <h1 className="text-black font-bold text-4xl leading-[3rem]">
                  {t("Create, Sell & Collect Your Own  Creative NFT")}

                  {/*  */}
                </h1>
                <p className="text-violet pt-2 text-lg">{heading}</p>
              </div>

              <div className="flex gap-5  pt-5  ">
                <Button title={t("Explore")} linkURL={"/explore"} />
                <Button title={t("Create NFT")} linkURL={"/create"} />
              </div>
              {/* <div className="flex flex-row md:gap-[70px] gap-[40px] pt-5 mt-5 justify-center items-center md:justify-start md:items-start ">
                <div className="">
                  <h4 className="text-black font-bold text-xl  ">10+</h4>
                  <p className="capitalize text-lightgrey text-lg">
                    {t("Artwork")}
                  </p>
                </div>
                <div className="">
                  <h4 className="text-black font-bold text-xl ">5+</h4>
                  <p className="capitalize text-lightgrey  text-lg">
                    {t("Artists")}
                  </p>
                </div>
              </div> */}
            </div>

            {/* <SliderHero /> */}
          </div>
        </div>
      </section>
    </div>
  );
};
