import {EventCard} from "../events/EventCard.jsx";
import {useEffect, useState} from "react";
import {getAllEvents} from "../../services/EventService.jsx";

export const Dashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAllEvents().then(response => {
            setEvents(response);
        })
    }, [])

    return (
      <>
          <div className="min-h-screen bg-[#242424]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
              {events.map((event, index) => (
                  <EventCard key={index}  event={event} />
              ))}
            </div>
          </div>
      </>
  )
};
