import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <div className="bgimg">
          <div className="max-w-[1500px] mx-auto flex flex-col text-[#fff] m-0 justify-center text-center h-[85vh] pb-[10vh] md:mt-[10px] mt-[400px] relative z-10 ">
            <h1 className="text-2xl font-bold">PROLOGUE </h1>
            <span className="text-5xl font-bold pt-4">
              Anime: the pride of Japan, <br></br>a cultural asset to the world.
            </span>
            <p className="text-lg pt-5 font-bold tracking-widest ">
              From anime and manga to video games and illustrations, Japanese
              culture covers it all.<br></br>The unique aesthetic sense,
              detailed expressions, and skilled techniques used to create the
              artistic worldviews of Japanese culture have fascinated people
              around the world. <br></br>Today, this culture is recognized
              worldwide for the exceptional value it provides.
            </p>
            <div className="flex justify-center mt-5">
              <p className="bg-[#fff] rounded-full p-[10px] border-2 border-[#CC0000] w-[260px]  font-bold ">
                <a className="text-[#CD0606] cursor-pointer">Learn more</a>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#000] text-[#fff] m-0 p-0">
          <div className="relative">
            <div className="max-w-[1400px] m-auto  px-[9px] md:px-[0] flex-col md:flex-row  flex justify-between">
              <div className="flex-1 pt-10">
                <h2 className="">
                  {" "}
                  <small className="font-bold text-xl">CONCEPT</small>
                  <div>
                    <span className="font-bold md:text-6xl text-sm">
                      Scenes from
                      <br /> Japanese anime,
                      <br />
                      are transformed
                      <br />
                      into NFTs.
                    </span>
                  </div>
                </h2>
              </div>
              <div className=" flex justify-center m-auto flex-1 pt-10 mb-10 w-full md:w-[250px] thridimg">
                <img
                  src={process.env.PUBLIC_URL + "assets/second.png"}
                  width="100%"
                />
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-between flex-col md:flex-row">
              <div className="flex-1">
                <img
                  src={process.env.PUBLIC_URL + "assets/fourth.jpg"}
                  width="100%"
                />
              </div>
              <div className="flex-1 flex justify-center m-auto ">
                <div className="flex-col px-8 md:px-0">
                  <div className="w-full md:w-[450px]">
                    <img
                      src={process.env.PUBLIC_URL + "assets/fifth.png"}
                      width="100%"
                    />
                  </div>
                  <div className="w-full md:w-[450px] pt-10">
                    <img
                      src={process.env.PUBLIC_URL + "assets/sixth.png"}
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bgparticle">
            <div className="max-w-[1400px] mx-auto p-[6rem] px-8 md:px-0">
              <div className="w-full md:w-[550px] flex justify-center m-auto">
                <img
                  src={process.env.PUBLIC_URL + "assets/seventh.png"}
                  width="100%"
                />
              </div>
              <div className="w-full md:w-[250px] flex justify-center m-auto mt-[5rem]">
                <img
                  src={process.env.PUBLIC_URL + "assets/nft1.png"}
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="main-section max-w-[1400px] mx-auto bg-[#f6f6f600] px-8 md:px-0">
          <div className="text-[#333] mt-[7rem] mb-[5rem] px-[9px]  md:px-[0]">
            <div className="text-2xl  font-black md:text-xl text-sm opacity-50  leading-3 tracking-widest">
              <h1>POINT</h1>
            </div>
            <div className="font-bold md:text-6xl text-sm mt-[3rem]">
              <span>
                Rakuichi rakuza is ushering <br></br>in a new cultural era{" "}
                <br></br> through NFTs.
              </span>
            </div>
          </div>
          <div className="">
            <ul className="flex gap-4 mb-5 flex-col px-8 md:flex-row px-0">
              <li className="bg-[#E3BF09] rounded-md basis-1/2">
                <div className="flex justify-center m-auto mt-5 w-[70px] p-[10px]">
                  {/* <AiOutlineCheck size="20px" color="white" /> */}
                  <img
                    src={process.env.PUBLIC_URL + "assets/check.png"}
                    width="100%"
                  />
                </div>
                <div className="text-center">
                  <h1 className="p-5 text-[#fff] font-bold text-3xl">
                    An NFT to own your own piece of Japanese culture
                  </h1>
                </div>
                <div className="bg-[#33333326] p-[2rem] ">
                  <span className=" text-[#fff] text-left font-bold md:text-xl text-sm">
                    All works exhibited on Rakuichi rakuza are secured by the
                    actual items displayed and managed under the strict
                    supervision of RAKUICHI, INC. Rakuichi rakuza ensures all
                    transactions between users are safe and secure.
                  </span>
                </div>
              </li>
              <li className="bg-[#6FB749] rounded-md basis-1/2">
                <div className="flex justify-center m-auto mt-5  w-[70px] p-[10px]">
                  <img
                    src={process.env.PUBLIC_URL + "assets/check.png"}
                    width="100%"
                  />
                </div>
                <div className="text-center">
                  <h1 className="p-5 text-[#fff] font-bold text-3xl">
                    Transactions backed by the actual artwork itself
                  </h1>
                </div>
                <div className="bg-[#33333326] p-[2rem] ">
                  <span className=" text-[#fff] text-left font-bold md:text-xl text-sm">
                    All works exhibited on Rakuichi rakuza are secured by the
                    actual items displayed and managed under the strict
                    supervision of RAKUICHI, INC. Rakuichi rakuza ensures all
                    transactions between users are safe and secure.
                  </span>
                </div>
              </li>
              <li className="bg-[#4EA3F8] rounded-md basis-1/2 ">
                <div className="flex justify-center m-auto mt-5  w-[70px] p-[10px]">
                  {/* <AiOutlineCheck size="20px" color="white" /> */}
                  <img
                    src={process.env.PUBLIC_URL + "assets/check.png"}
                    width="100%"
                  />
                </div>
                <div className="text-center">
                  <h1 className="p-5 text-[#fff] font-bold text-3xl">
                    All artwork includes a professional certificate
                  </h1>
                </div>
                <div className="bg-[#33333326] p-[2rem] mt-[1.7rem] ">
                  <span className=" text-[#fff] text-left font-bold md:text-xl text-sm">
                    Rakuichi rakuza only deals in officially-recognized artwork.
                    Original works include a certificate of authenticity, while
                    printed copies come with an official certificate of
                    recognition.
                  </span>
                </div>
              </li>
            </ul>
            <ul className="flex gap-4 mb-5 flex-col px-8 md:flex-row px-0">
              <li className="bg-[#7C94F8] basis-1/2 rounded-md">
                <div className="flex justify-center m-auto mt-5 w-[70px] p-[10px]">
                  {/* <AiOutlineCheck size="20px" color="white" /> */}
                  <img
                    src={process.env.PUBLIC_URL + "assets/check.png"}
                    width="100%"
                  />
                </div>
                <div className="text-center">
                  <h1 className="p-5 text-[#fff] font-bold text-3xl">
                    Giving back to the artist or copyright holder
                  </h1>
                </div>
                <div className="bg-[#33333326] p-[2rem] ">
                  <span className=" text-[#fff] text-left font-bold md:text-xl text-sm">
                    When swapping, users can give a donation for artwork with a
                    registered artist or copyright holder. We plan to introduce
                    a system that allows users to give back to the original
                    artists so that we can continue to support and protect
                    Japanese culture.
                  </span>
                </div>
              </li>
              <li className="bg-[#E24071] basis-1/2 rounded-md">
                <div className="flex  justify-center m-auto mt-5  w-[70px] p-[10px]">
                  <img
                    src={process.env.PUBLIC_URL + "assets/check.png"}
                    width="100%"
                  />
                </div>
                <div className="text-center">
                  <h1 className="p-5 text-[#fff] font-bold text-3xl">
                    Burn the NFTs you own
                  </h1>
                </div>
                <div className="bg-[#33333326] p-[2rem] mt-[5.5rem]">
                  <span className=" text-[#fff] text-left font-bold md:text-xl text-sm">
                    When a user burns the NFT they own for a piece of artwork,
                    the anime cel that has been kept and stored as a security
                    for the actual item will be delivered to the owner.
                  </span>
                </div>
              </li>
              <li className="bg-[#F03B3B] basis-1/2 rounded-md">
                <div className="flex justify-center m-auto mt-5  w-[70px] p-[10px]">
                  {/* <AiOutlineCheck size="20px" color="white" /> */}
                  <img
                    src={process.env.PUBLIC_URL + "assets/check.png"}
                    width="100%"
                  />
                </div>
                <div className="text-center">
                  <h1 className="p-5 text-[#fff] font-bold text-3xl">
                    No transaction fees
                  </h1>
                </div>
                <div className="bg-[#33333326] p-[2rem] mt-[7.5rem]  ">
                  <span className=" text-[#fff] text-left font-bold md:text-xl text-sm">
                    Standard NFT exchanges charge a set transaction fee for
                    swapping. Rakuichi rakuza, however, allows for free swapping
                    on all the items it carries.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto ">
          <div className="mt-[5rem] px-8 md:px-0">
            <div className=" font-black text-2xl opacity-50  leading-3 tracking-widest">
              <h1>COMMUNICATION ROAD MAP</h1>
            </div>
            <div className="font-bold md:text-6xl text-sm mt-[3rem] text-[#333] mb-[1rem]">
              <span>
                Rakuichi rakuza<br></br>
                never stops evolving.
              </span>
            </div>
          </div>
          <div className="market_place mb-5 px-8 md:px-0 ">
            <div className="box border-2 border-[#CC0000] rounded-md">
              <div>
                <img
                  src={process.env.PUBLIC_URL + "assets/roadopen.png"}
                  width="100%"
                />
              </div>
              <div className="body text-[#333] text-center mt-[5rem] font-bold">
                <p>
                  Thank you very much for your patience.
                  <br />
                  We would like to express our heartfelt gratitude to those who
                  have watched over Rakuichi rakuza until the grand opening.
                </p>
                <p className="pt-5">
                  Rakuichi rakuza will continue to evolve in the future.
                  <br />
                  Please stay tuned for further developments.
                </p>
                <p className="pt-5">
                  We will post more information on this site when it becomes
                  available.
                </p>
                <p className="pt-5">
                  Until then, please enjoy{" "}
                  <span className="text-[#CC0000]">
                    Rakuichi rakuza NTF MARKETPLACE VOL.01
                  </span>
                </p>
                <p className="link">
                  <div className="w-full md:max-w-[360px] flex justify-center mx-auto mt-[3rem]">
                    <a href="#">
                      <img
                        src={process.env.PUBLIC_URL + "assets/LOGO-02.png"}
                        width="100%"
                        alt="Rakuichi rakuza NFT MARKETPLACE"
                      />
                    </a>
                  </div>
                </p>
              </div>

              <div className="link_block flex  gap-4 p-5 flex-col md:flex-row">
                <a className=" flex justify-around items-center flex-1 border-2 border-[#ccc] rounded-md h-[6rem] cursor-pointer">
                  <span className="block font-bold text-[#333]">Guide</span>
                  <img
                    src={process.env.PUBLIC_URL + "assets/arrow.png"}
                    width="20px"
                  />
                </a>
                <a className=" flex justify-around items-center flex-1 border-2 border-[#ccc] rounded-md h-[6rem] cursor-pointer">
                  <span className="block font-bold text-[#333]">
                    Let's use the auction function.
                  </span>
                  <img
                    src={process.env.PUBLIC_URL + "assets/arrow.png"}
                    width="20px"
                  />
                </a>
                <a className=" flex justify-around items-center flex-1 border-2 border-[#ccc] rounded-md h-[6rem] cursor-pointer">
                  <span className="block font-bold text-[#333]">
                    Let's use the resale offer<br></br>and resale function.
                  </span>
                  <img
                    src={process.env.PUBLIC_URL + "assets/arrow.png"}
                    width="20px"
                  />
                </a>
              </div>
              <div className="flex justify-center mx-auto gap-4 text-[#333] font-bold mb-5">
                <span>FAQ</span>
                <span>Term of use</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
