import React from 'react'
import { Pagination } from 'antd';
const PaginationSec = () => {
  return (
    <div className='float-right py-[2rem] px-5'>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  )
}

export default PaginationSec
