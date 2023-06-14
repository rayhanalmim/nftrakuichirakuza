import React from "react";
import { Disclosure } from "@headlessui/react";
import { Button } from "../../components/Button/Primary";
import { Link, useNavigate } from "react-router-dom";

// import { Button } from '../../components/Button/Primary';

const DashboardBody = () => {
  const navigate = useNavigate();
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
  ];
  const data = [
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
  return (
    <div className="max-w-[1500px] w-full mx-auto h-full px-5 py-[3rem]">
      <div className="flex  flex-col lg:flex-row gap-[30px] ">
        {Data.map((data, index) => {
          if (data.icon) {
            return (
              <div className="px-5 py-[2rem] max-w-[400px] mx-auto w-full rounded  rup shadow text-white ">
                <>
             
                  <div className="flex items-start gap-3">
                 <Link to="/users/userpage">
                 <img
                      className="max-w-[50px]"
                      src={process.env.PUBLIC_URL + data.icon}
                     
                    />
                 </Link>
                   
                   
<div>

<h3 className="text-2xl font-semibold text-white">{data.name}</h3>
                    <p className="text-white whitespace-no-wrap text-lg ">{data.amount}</p>
</div>
                  
                  </div>
              
                </>

              
                {data.imgUrl && (
                  <div className="flex mt-5">
                  
                    <div className="flex-shrink-0 w-10 h-10">
               <Link to="/users/userpage">
                      <img
                        className="w-full h-full rounded-full"
                        src={data.imgUrl}
                      
                        alt=""
                      />
                  </Link>
                     
                    </div>
                 
                    <div className="ml-3">
                      <p className="text-white text-lg whitespace-no-wrap">
                        {data.username}
                      </p>
                    </div>
                  </div>
                )}

                <>
                  {data.button && (
                    <>
                      <button className="capitalize p-2 px-5 bg-white rounded font-bold  text-black text-lg mt-5">
                        {data.button}
                      </button>

                      {/* <div className="my-4">
                    <Button title="Claim button"/>
                 
                    </div>
                    */}
                    </>
                  )}
                </>
              </div>
            );
          } else {
            return (
              <>
                <div className="px-5 py-[2rem] max-w-[400px] mx-auto w-full rounded  rup shadow text-white ">
                 <h3 className="text-2xl font-semibold text-white">{data.name}</h3>
               <p className="text-white whitespace-no-wrap text-lg">{data.amount}</p>
                  {data.imgUrl && (
                    <div className="flex mt-5">
                      <div className="flex-shrink-0 w-10 h-10">
                      <Link to="/users/userpage">
                        <img
                          className="w-full h-full rounded-full"
                          src={data.imgUrl}
                          alt=""
                        />
                   </Link> 
                      </div>
                      <div className="ml-3">
                        <p className="text-white text-lg whitespace-no-wrap">
                          {data.username}
                        </p>
                        <p className="text-white whitespace-no-wrap text-lg">{data.amount}</p>
                      </div>
                    </div>
                  )}

                  <>
                    {data.button && (
                      <>
                        <button className="capitalize p-2 px-5 bg-white rounded font-bold  text-black text-lg mt-5">
                          {data.button}
                        </button>
                      </>
                    )}
                  </>
                </div>
              </>
            );
          }
        })}
      </div>
      {/*=========================================================== table =========================================================*/}
      <div className="">
        <div className="my-[3rem]">
          <h4 className="text-3xl text-black font-bold">Top 5 Earners</h4>
          <div className="mt-5">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                        Refferal Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                        Refferal Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ">
                        Status
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {TableData.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex">
                                <div className="flex-shrink-0 w-10 h-10">
                                <Link to="/users/userpage">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src={data.imgUrl}
                                    alt=""
                                  />
                                  </Link>
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {data.username}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    {data.useramount}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.amount}
                              </p>
                              <p className="text-gray-600 whitespace-no-wrap">
                                USD
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.date}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                ></span>
                                <span className="relative">{data.status}</span>
                              </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              {/* <button
                            type="button"
                            className="inline-block text-gray-500 hover:text-gray-700"
                          >
                            <svg
                              className="inline-block h-6 w-6 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                            </svg>
                          </button> */}
                            </td>
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
      </div>
    </div>
  );
};

export default DashboardBody;
