import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Button/Primary";

export const AboutSection = ({ heading }) => {
  const { t } = useTranslation();
  return (
    <div>
      <section className="about-sec pt-[3rem]  ">
        <div className=" max-w-[400px] w-full mx-auto text-center  pb-5">
          <h2 className="capitalize text-3xl  text-black font-black text-center pb-2 ">
            {t("About")}
          </h2>
          <p
            className="text-lg
           text-violet"
          >
            {heading}
          </p>
        </div>
        <div className=" bg-[url('/assets/aboutbg.png')] bg-no-repeat bg-cover ">
          <div className="max-w-[1200px] mx-auto w-full px-[40px] py-[3rem]">
            <div className="flex flex-col md:flex-row justify-center items-center  gap-[30px]">
              <div className="flex-1 pb-5">
                <img
                  src={process.env.PUBLIC_URL + "./assets/about.png"}
                  className="max-w-[450px] w-full rounded-lg md:mx-0  mx-auto"
                />
              </div>
              <div className="flex-1 pb-5">
                <h4 className="text-2xl font-black text-black capitalize pb-5">
                  {t("Get Popular NFT")}
                </h4>
                <p className="pb-5 leading-8 text-[#57466B] text-lg">
                  {t(
                    "Let's start NFT NFT (Non-Fungible Token) not only increases the value of digital content, but also creates new income opportunities for creators. And we can leave the content that is sleeping in the culture of history to the future by turning it into a digital asset. Rakuichi Rakuza will provide various opportunities to preserve the culture of Japan and the world for the future."
                  )}
                  <br />
                  {t("An NFT to own your own piece of Japanese culture")}
                </p>

                {/* <Button title={t("Show More")} linkURL={"/about"}></Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
