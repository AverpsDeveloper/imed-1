"use client"
import Calendar from "@/components/Calender";
import ReactBigCalendar from "./calenderView/ReactBigCalendar";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import events from "./calenderView/events";


const CalendarPage = () => {
  return (
    <>
    <Breadcrumb pageName="Appointments" />
      <div className="p-4">
          <h1 className="text-2xl font-bold"></h1>
          {/* <Calendar /> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-6 px-4 md:px-6 xl:px-7.5">
              <ReactBigCalendar events={events}/>
          </div>
          </div>
        </div>
    </>
  );
};

export default CalendarPage;
