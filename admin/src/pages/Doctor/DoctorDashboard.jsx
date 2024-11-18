import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5 text-slate-200'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-slate-800 p-4 min-w-52 rounded border border-slate-600 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-slate-200'>{currency} {dashData.earnings}</p>
            <p className='text-slate-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-slate-800 p-4 min-w-52 rounded border border-slate-600 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-slate-200'>{dashData.appointments}</p>
            <p className='text-slate-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-slate-800 p-4 min-w-52 rounded border border-slate-600 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-slate-200'>{dashData.patients}</p>
            <p className='text-slate-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-slate-800 mt-10 rounded'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-slate-600'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold text-slate-200'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0 border-slate-600'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-slate-700' key={index}>
              <img className='rounded-full w-10' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-slate-200 font-medium'>{item.userData.name}</p>
                <p className='text-slate-400'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
