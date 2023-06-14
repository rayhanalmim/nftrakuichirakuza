import React, { useState } from "react";
import { Layout } from "antd";
import MLMSidebar from "./MLMSidebar";
import MLMBody from './MLMBody'
import { Link } from "react-router-dom";
import DashboardBody from "./DashboardBody";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import MLMNavbar from "./MLMNavbar";
import Footer from '../../components/Footer/Footer'

const MLMDashboard = () => {
  const topics = ["Dashboard", "Level 1", "Level 2", "Level 3"];

  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = (

<MLMBody
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
     
    />
    
  );
  return (
    <>
   
    <Link to="/mlmdashboard">
    <div className="max-w-[1900px] w-full " >
       
    <MLMNavbar menu={Menu} />
    
       <Layout>
         <MLMSidebar menu={Menu}  />
         <Layout.Content className="content">
           {contentIndex == 0 ? <DashboardBody/> : ""}
           {contentIndex == 1 ? <Level1 /> : ""}
           {contentIndex == 2 ? <Level2/> : ""}
           {contentIndex == 3 ? <Level3 /> : ""}
           {console.log(contentIndex)}
         </Layout.Content>
       </Layout>
       <Footer/>
     
     </div>
    </Link>
      
    </>
  );
};

export default MLMDashboard;
