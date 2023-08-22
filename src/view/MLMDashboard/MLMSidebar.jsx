import React from 'react'
import { Layout } from "antd";


const MLMSidebar = ({ menu }) => {
  return (
    <div className=' mx-auto shadow  text-white bg-[#001529]'>

<Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
        {menu}
    </Layout.Sider>



    </div>
    
  )
}

export default MLMSidebar