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
          <Calendar/>
        </div>
    </>
  );
};

export default CalendarPage;
