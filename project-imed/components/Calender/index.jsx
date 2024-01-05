"use client"
import Pagination from "@/iComponents/Pagination";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import usePaginate from "@/hooks/usePaginate";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import axios from "axios";
import moment from "moment";
import api from "@/http";
import { useSession } from "next-auth/react";

const Calendar = () => {
  const { page, limit, search, searchHandler, setSearchParmas, date, order, meetingType } = usePaginate();
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 10 });
  const [doctor, setDoctor] = useState([]);
  const { data: session, status } = useSession();

  console.log('doctor', doctor)

  useEffect(() => {
    fetchAppointment()
  }, [page, limit, date, order, meetingType, session?.user])
  
  const fetchAppointment = async () => {
    const doctorDetail = await api.get('/appoint', {
      params: {
        page, limit, date, order, meetingType, doctor: session?.user.role == 'DOCTOR' ? session.user._id : "",
      }
    })
    console.log('doctoterDetail', doctorDetail)
    setDoctor(doctorDetail.data.result.data)
    setMeta(doctorDetail.data.result.meta)
  }

  const cancelAppointment = async (id) => {
    await api.post(`/appoint/${id}/cancel`);
    fetchAppointment();
  }

  return (
    <>
      <Breadcrumb pageName="Appointments" />
      <div className="p-4">
        <div className="flex justify-between mb-4 ">
          <h1 className="text-2xl font-bold"></h1>
          <div className="flex items-center space-x-2">
            <select defaultValue={meetingType} onChange={e => setSearchParmas('meetingType', e.target.value)}>
              <option selected  value={''}>--select--</option>
              <option value={"online"} >Online</option>
              <option value={"offline"}>Offline</option>
            </select>

            <select defaultValue={order} onChange={e => setSearchParmas('order', e.target.value)}>
              <option selected value={''}>--Select--</option>
              <option value={"asc"}>Accending</option>
              <option value={"desc"}>Deccending</option>
            </select>

            <label>
              From
            </label>
            <input
              type="date"
              className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              placeholder="Search Product"
              defaultValue={date}
              onChange={e => setSearchParmas("date", e.target.value)}
            />
            <label>
              to
            </label>
            <input
              type="date"
              className=" rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              placeholder="Search Product"
              defaultValue={date}
              onChange={e => setSearchParmas("date", `${date ? `${date}|` : "|"}${e.target.value}`)} />

            <div className="hidden sm:block shadow-md px-4 py-4 rounded ">
              <div className="relative">
                <button className="absolute left-0 top-1/2 -translate-y-1/2" fdprocessedid="x8uxg">
                  <svg className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill="">
                    </path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill="">
                    </path>
                  </svg>
                </button>
                <input
                  defaultValue={search}
                  onChange={e => searchHandler(e.target.value)}
                  placeholder="Search by username..." className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125" type="text" fdprocessedid="ai7g3k" />
              </div>
            </div>

          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Appointments list
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                    Doctor
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                    Date
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                    Patients
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-black xl:pl-11">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  doctor?.map((detail, ind) => (
                    <tr className="text-left text-black dark:text-white">
                      <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        <h1 className="font-bold text-2xl">{detail.doctor.username}</h1>
                        <p>{detail.doctor.email}</p>
                      </td>
                      <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        {moment(detail.date).calendar()}
                      </td>
                      <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        <h1 className="font-bold text-2xl">{detail.user.username}</h1>
                        <p>{detail.user.email}</p>
                      </td>
                      <td className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        <button className='bg-primary text-white px-2 mx-1 rounded ' onClick={() => cancelAppointment(detail._id)}> Cancel </button>
                        <Link href={`/dashboard/appointment/${detail._id}`} className="bg-primary text-white px-2 mx-1 rounded ">View Detail</Link>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <Pagination meta={meta} />
        </div>
      </div>
    </>
  );
};

export default Calendar;
