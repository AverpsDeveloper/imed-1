import moment from 'moment'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Modal from '../inventory/Modal'
import api from '@/http'

const BookAppointModal = ({ isVisibale, onClose, selectedPatiantId }) => {
  const [appointment, setAppointment] = useState({})
  const [bookingDate, setBookingDate] = useState()
  const [doctor, setDoctor] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState()
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'))
  const [selectedType, setSelectedType] = useState()
  const { data: session } = useSession();
  const isDoctorLogin = session?.user?.role === "DOCTOR"

  console.log('appointment', appointment)
  console.log('bookingDate', bookingDate)

  useEffect(() => {
    if (isDoctorLogin) {
      setSelectedDoctor(session.user)
    }
  }, [session?.user])

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorInfo = await api.get('/users-admin', {
        params: {
          role: "DOCTOR",
        }
      })
      console.log('doctor', doctor)
      setDoctor(doctorInfo.data.result.data)
    }
    if (isVisibale) {
      fetchDoctor()
    }
  }, [isVisibale, isDoctorLogin])

  useEffect(() => {
    if (selectedDoctor) {
      const doctorId = async () => {
        const dId = await api.get(`/doctors-appoint/${selectedDoctor._id}`)
        setAppointment(dId.data?.result?.data)
      }
      doctorId()
    }
  }, [selectedDoctor])

  const CheackAvaibility = async () => {
    const result = await api.get(`/doctors-appoint/${selectedDoctor._id}`, {
      params: {
        date: selectedDate
      }
    })

    console.log('cAvaibility', result)
    setAppointment(result.data?.result?.data)
  }

  const handleCancel = () => {
    setAppointment({})
    onClose()
  };

  const handleOk = async () => {
    if (bookingDate) {
      const createAppointment = async () => {
        const cAppointment = await api.post('/appoint', {
          doctor: selectedDoctor._id,
          user: selectedPatiantId,
          date: bookingDate,
          meetingType: selectedType ?? 'offline'
        })

        console.log(cAppointment)
      }
      await createAppointment()
      setAppointment({})
      onClose()
    }
  };

  return (
    <div>
      <Modal isVisibale={isVisibale} onClose={onClose} >
        <div className="overflow-x-auto p-5">

          {
            !isDoctorLogin ? <div>

              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Doctor</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSelectedDoctor(() => doctor.find(d => d._id == e.target.value))}>
                <option>Select Doctor</option>
                {
                  doctor.map((doc) => (
                    <option value={doc._id}>{doc.username}</option>
                  ))
                }

              </select>
            </div> : ''
          }
          <h1>Doctor: {selectedDoctor?.username}   {selectedDoctor?.firstName}   {selectedDoctor?.lastName}</h1>
          <br />
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            defaultValue={selectedType}
            onChange={e => setSelectedType(e.target.value)} >
            <option selected value={''}>--MeetingType--</option>
            <option value={'offline'}>Offline</option>
            <option value={'online'}>Online</option>
          </select>
          <br />
          <br />
          <div>
            <input type='date' className='border p-2 rounded-xl ' min={moment().format('YYYY-MM-DD')} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            <button className="ml-4 inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-10 leading-4 cursor-pointer" onClick={CheackAvaibility}>
              Cheack Avaibility
            </button>
          </div>
          <br />
          <div className='flex justify-space-between'>
            <p className='font-bold'>Appointment -</p>
            <p>{appointment?.apointDate}</p>
          </div>
          <div>
            {
              appointment?.apointments?.map((appo) => (
                <div key={appo.apointDate}>
                  <div className='flex justify-between'>
                    <p>Start- {moment(appo.start).format("LT")}</p>
                    <p>End- {moment(appo.end).format("LT")}</p>
                  </div>
                  <br />
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {appo?.slots?.map((appoin) => (

                      appoin?.isAvailable ?
                        <div className="flex items-center gap-2" key={appoin?.time}>
                          <input id={appoin?.time} type="radio" name={'date'} value={appoin?.time} onChange={(e) => setBookingDate(e.target.value)} className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded-full" />
                          <label htmlFor={appoin.time} className='cursor-pointer'>{moment(appoin?.time).format('LT')}</label>
                        </div>
                        :
                        <div className="flex items-center gap-2 cu" key={appoin?.time}>
                          <input id={appoin?.time} type="radio" checked disabled className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            name={moment(appoin?.time).format("LT")} />
                          <label htmlFor={appoin?.time} className="text-gray-100 cursor-not-allowed">{moment(appoin?.time).format('LT')}</label>
                        </div>
                    ))}
                  </div>
                </div>
              ))
            }

          </div>
          <div className="flex justify-end gap-3">
            <button className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-10 leading-4 cursor-pointer" autoFocus onClick={handleCancel}> Cancel </button>
            <button className="inline-flex items-center justify-center gap-0.5 rounded-full bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-10 leading-4 cursor-pointer
        disabled:bg-opacity-40
        " onClick={handleOk}
              disabled={!selectedDoctor?._id || !bookingDate}
            >Book Appointment</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default BookAppointModal