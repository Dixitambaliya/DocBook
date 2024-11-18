import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll text-slate-200'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-slate-600 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-slate-700 group-hover:bg-slate-600 transition-all duration-500' src={item.image} alt="" />
            <div className='p-4 bg-slate-800'>
              <p className='text-slate-200 text-lg font-medium'>{item.name}</p>
              <p className='text-slate-400 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} className='text-slate-300' />
                <p className='text-slate-200'>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
