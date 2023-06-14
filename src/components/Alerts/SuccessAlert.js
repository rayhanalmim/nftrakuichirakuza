import React from 'react'
import Swal from 'sweetalert2'


export default function SuccessAlert({message}) {
 return   Swal.fire("Success",message,"success")
}
