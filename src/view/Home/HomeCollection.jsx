import React, { useEffect, useState } from "react";
import { getAllCollections } from "../../graphql/queries/getAllCollections";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const HomeCollection = () => {
    const number = 5;
    const { t } = useTranslation();
    let { data, loding, error } = useQuery(getAllCollections);
   
    const [isMobile, setIsMobile] = useState(false);
    
    const ovrflwhid = {overflow:"hidden"}

    useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
      };
  
      checkIsMobile();
  
      // Add an event listener to recheck if the user changes the viewport
      window.addEventListener('resize', checkIsMobile);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', checkIsMobile);
      };
    }, []);
  return (
    // <div className='max-w-[1500px] flex w-full mx-auto  rounded-lg' style={{ gap:"10%"}}>
    //         <div style={{width:"50%", border:"1px solid gray"}}>
    //             <table style={{width:"100%", textAlign:"center"}}>
    //                 <thead>
    //                 <tr>
    //                     <th>name</th>
    //                     <th>name</th>
    //                     <th>name</th>
    //                     <th>name</th>
    //                 </tr>
    //                 </thead>
                    
    //                 <tbody>
    //                 {data?.getAllCollection.map((data, index)=>{
                        
    //                     return(
    //                         <tr>
    //                     <Link
    //                     to={`/collection/collectiondetails/${data.blockchain}/${data.collectionAddress}`}
    //                   >
    //                     {/* <td><img src={process.env.PUBLIC_URL + data.collectImg} alt="" /></td> */}
    //                     <td> 
    //                               {data.collectionName}
    //                             </td>
    //                     <td>  
    //                               {data.blockchain}
    //                             </td>
                       

    //                     </Link>
    //                 </tr>  
    //                     )
    //                 })}
    //                 </tbody>
                   
    //             </table>
    //         </div>
    //         <div style={{width:"50%", border:"1px solid gray"}}></div>
    // </div>


    

<div className='max-w-[1500px] flex w-full mx-auto  rounded-lg' style={{ gap:"5%" ,overflow:"hidden"}} >
    <div>
      {data?.getAllCollection?.length > 0 ? (
        <div className=" pt-5 md:pt-[2rem] px-5" style={ovrflwhid}>
          <div className="flex flex-row-reverse justify-between pt-5  pb-5 gap-[20px] md:gap-[100px] md:px-2 px-2">
            
            <h4 className="text-grey  font-bold capitalize md:w-[100px]">
              {t("Collection")}
            </h4>
            <h4 className="text-grey md:flex hidden font-bold capitalize">
              {t("Blockchain")}
            </h4>
            <h4 className="text-gre md:flex hidden y font-bold capitalize">
              {t("Token Standard")}
            </h4>
            <h4 className="text-grey  font-bold capitalize">
              {t("Collection Logo")}
            </h4>
           
          </div>
          <div className=" md:px-0 px-2">
            <div className=" border rounded-lg " style={{ padding: "30px" }}>
              { data?.getAllCollection
                    ?.slice(0, 4)
                    .reverse()
                    .map((data, index) => {
                      return (
                        <>
                          <Link
                            to={`/collection/collectiondetails/${data.blockchain}/${data.collectionAddress}`}
                          >
                            <div className="flex flex-row-reverse flex-wrap text-justify justify-between   md:flex-nowrap items-center gap-[20px] md:gap-[10px] my-3 md:my-2  hover:bg-cyan hover:rounded-lg hover:px-0">
                           
                              <div className="justify-center">
                                {/* <img
                                  src={process.env.PUBLIC_URL + data.collectImg}
                                  alt=""
                                /> */}
                                <h2 className="font-bold capitalize w-[100px]  text-sm">
                                  {data.collectionName}
                                </h2>
                              </div>
                              <div className="md:flex hidden gap-2 w-[50px] items-center  justify-center">
                                <h2 className="font-bold text-right  capitalize text-sm">
                                  {data.blockchain}
                                </h2>
                              </div>
                              <div className="flex gap-2 items-center w-[50px]  justify-center">
                                <h2 className="font-bold capitalize text-sm">
                                  {data.tokenStandard}
                                </h2>
                              </div>
                             
                              {/* <img
                      src={process.env.PUBLIC_URL + data.collectImg2}
                      className=""
                    /> */}
                              <div className="flex flex-wrap gap-2">
                                <img
                                  src={
                                    data.logo.includes("ipfs")
                                      ? data.logo.replace(
                                          "ipfs://",
                                          "https://gateway.ipfscdn.io/ipfs/"
                                        )
                                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                                  }
                                  className="max-w-[80px] w-full mx-auto"
                                />
                              </div>
                              
                            </div>
                          </Link>
                        </>
                      );
                    })
                }
            </div>
          </div>
        </div>
      ) : (
        ""
        /* A div that is displayed when there is no collection found. */
        // <div className="flex flex-col justify-center p-5 mt-5 bg-[url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/05/Collage-Maker-29-May-2022-0114-PM.jpg')] bg-contain items-center h-[60vh]">
        //   <div className="bg-white p-3 opacity-[0.9] rounded-lg">
        //     <p className="md:text-3xl text-sm text-black">
        //       {t("No Collection Found")}
        //     </p>
        //     <p className="md:text-3xl text-sm text-black">
        //       {t("Having Trouble?")}
        //     </p>
        //     <p>
        //       <Link to="/create">{t("Create One")}</Link>
        //     </p>
        //   </div>
        // </div>
      )}
    </div>

    {!isMobile &&
    <div >
      {data?.getAllCollection?.length > 0 ? (
        <div className="max-w-[1500px] mx-auto pt-5 md:pt-[2rem] px-5" style={ovrflwhid}>
          <div className="flex flex-row-reverse justify-between pt-5  pb-5 gap-[20px] md:gap-[100px] md:px-2 px-2">
            
            <h4 className="text-grey  font-bold capitalize md:w-[100px]">
              {t("Collection")}
            </h4>
            <h4 className="text-grey md:flex hidden font-bold capitalize">
              {t("Blockchain")}
            </h4>
            <h4 className="text-gre md:flex hidden y font-bold capitalize">
              {t("Token Standard")}
            </h4>
            <h4 className="text-grey  font-bold capitalize">
              {t("Collection Logo")}
            </h4>
            
          </div>
          <div className=" md:px-0 px-2">
            <div className=" border rounded-lg " style={{ padding: "30px 15px",overflow:"hidden" }}>
              { data?.getAllCollection
                    ?.slice(4, 8)
                    .reverse()
                    .map((data, index) => {
                      return (
                        <>
                          <Link
                            to={`/collection/collectiondetails/${data.blockchain}/${data.collectionAddress}`}
                          >
                            <div className="flex flex-row-reverse flex-wrap text-justify justify-between   md:flex-nowrap items-center gap-[20px] md:gap-[10px] my-3 md:my-2  hover:bg-cyan hover:rounded-lg hover:px-0">
                           
                              <div className="justify-center">
                                <img
                                  src={process.env.PUBLIC_URL + data.collectImg}
                                  alt=""
                                />
                                <h2 className="font-bold capitalize w-[100px]  text-sm">
                                  {data.collectionName}
                                </h2>
                              </div>
                              <div className="md:flex hidden gap-2 w-[50px] items-center  justify-center">
                                <h2 className="font-bold text-right  capitalize text-sm">
                                  {data.blockchain}
                                </h2>
                              </div>
                              <div className="flex gap-2 items-center w-[50px]  justify-center">
                                <h2 className="font-bold capitalize text-sm">
                                  {data.tokenStandard}
                                </h2>
                              </div>
                             
                              {/* <img
                      src={process.env.PUBLIC_URL + data.collectImg2}
                      className=""
                    /> */}
                              <div className="flex flex-wrap gap-2">
                                <img
                                  src={
                                    data.logo.includes("ipfs")
                                      ? data.logo.replace(
                                          "ipfs://",
                                          "https://gateway.ipfscdn.io/ipfs/"
                                        )
                                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                                  }
                                  className="max-w-[80px] w-full mx-auto"
                                />
                              </div>
                              
                            </div>
                          </Link>
                        </>
                      );
                    })
                }
            </div>
          </div>
        </div>
      ) : (
        ""
        /* A div that is displayed when there is no collection found. */
        // <div className="flex flex-col justify-center p-5 mt-5 bg-[url('https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/05/Collage-Maker-29-May-2022-0114-PM.jpg')] bg-contain items-center h-[60vh]">
        //   <div className="bg-white p-3 opacity-[0.9] rounded-lg">
        //     <p className="md:text-3xl text-sm text-black">
        //       {t("No Collection Found")}
        //     </p>
        //     <p className="md:text-3xl text-sm text-black">
        //       {t("Having Trouble?")}
        //     </p>
        //     <p>
        //       <Link to="/create">{t("Create One")}</Link>
        //     </p>
        //   </div>
        // </div>
      )}
    </div>
}
</div>

  )                      
}

export default HomeCollection