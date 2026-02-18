import { EventCard } from "../events/EventCard.jsx";
import { useEffect, useContext } from "react";
import { getAllEvents } from "../../services/EventService.jsx";

// adds events
import { EventsContext } from "../../context/EventsContext.jsx";

export const Dashboard = () => {

    const { events, setEvents } = useContext(EventsContext);

    useEffect(() => {
        getAllEvents().then(response => {
            setEvents(response);
        }).catch(error => {
            console.log('Error getting events', error);
        })
    }, [])

    return (
        <>
            <div className="transition-all duration-500 ease-out min-h-screen bg-[#242424]">
                {events.length === 0 ? (
                    <div className="max-w-3xl mx-auto p-12 text-center text-gray-200">
                        <p className="text-xl font-semibold mb-3">No events yet.</p>
                        <p className="text-gray-400">Add one to get started.</p>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
                        {events.map((event, index) => (
                            <EventCard key={index} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
};
