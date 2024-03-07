import React from 'react'
import { useNavigate } from 'react-router-dom'
const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
  return (
   <div className='card m-2' style={{ cursor: "pointer"}} onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className='card-header'>
            Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className='card-body'>
            <p>
                <b>Specializimi</b> {doctor.specialization}
            </p>
            <p>
                <b>Eksperienca</b> {doctor.experience}
            </p>
            <p>
                <b>Pagesa per vizite</b> {doctor.feesPerCunsaltation}
            </p>
            <p>
                <b>Orari</b> {doctor.timings[0]}- {doctor.timings[1]}
            </p> 
        </div>
   </div>
  )
}

export default DoctorList
