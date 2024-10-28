import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const FooterData = [
    // {
    //   title: t("About"),
    //   links: [
    //     { name: t("product"), link: "product" },
    //     { name: t("About Us"), link: "about" },

    //     {
    //       name: t("resource"),
    //       link: "resource",
    //     },

    //     // {
    //     //   link: "FAQ",
    //     // },
    //   ],
    // },
    {
      title: t("company"),
      links: [
        { name: t("Company Information"), link: "companyinfo" },
        { name: t("Our Team"), link: "team" },

        ,
        { name: t("terms & conditions"), link: "terms&conditions" },
        {
          name: t("privacy policy"),
          link: "privacypolicy",
        },
        // {
        //   name: t("features"),
        //   link: "features",
        // },
      ],
    },
  ];
  return (
    <div className="max-w-[1500px] mx-auto w-full px-[40px] ">
      <footer className="text-center lg:text-left ">
        <div className="mx-6 pt-10 text-center md:text-left">
          <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mb-4">
              <img
                src={process.env.PUBLIC_URL + "/assets/logo.png"}
                className="mx-auto md:mx-0 mt-[-16px]"
              />
            </div>
            {FooterData.map((item, index) => (
              <>
                <FooterLinks data={item} key={index} />
              </>
            ))}

            <div className="">
              <h6 className="capitalize  font-bold mb-4 flex justify-center text-xl  md:justify-start">
                {t("Contact")}
              </h6>

              <p className="mb-4">
                <a href="#!" className="text-[#AFAFAF] break-all ">
                  info@aqua.sh
                </a>
              </p>
              <p className="mb-4">
                {/* <div className="flex gap-5 md:justify-start justify-center  items-center">
                  <a href="#!" className="text-[#AFAFAF] ">
                    <AiFillYoutube size={30} />
                  </a>
                  <a href="#!" className="text-[#AFAFAF] ">
                    <BsDiscord size={30} />
                  </a>
                  <a href="#!" className="text-[#AFAFAF] ">
                    <AiOutlineInstagram size={30} />
                  </a>
                </div> */}
              </p>
            </div>
          </div>
        </div>
        <div className="text-center p-6 ">
          <a href="#" className="text-[#AFAFAF] text-lg">
            Copyrighted By
            <span className="text-[#BF6654] font-black">
              &nbsp;AQUA Co., Ltd.&nbsp;
            </span>
            | All Right Reserved!
          </a>
        </div>
      </footer>
    </div>
  );
};

const FooterLinks = ({ data }) => {
  return (
    <>
      <div className="">
        <h6 className="capitalize  font-bold mb-4  text-xl flex justify-center md:justify-start">
          {data.title}
        </h6>

        {data.links.map((link, key) => (
          <>
            {" "}
            <p className="mb-4" key={key}>
              <Link to={link.link} className="text-[#AFAFAF] capitalize ">
                {link.name}
              </Link>
            </p>
          </>
        ))}
      </div>
    </>
  );
};

export default Footer;
