import React from 'react'
import Swal from 'sweetalert2'


export default function WarningAlert({message}) {
 return   Swal.fire("Warning",message,"warning")
}
