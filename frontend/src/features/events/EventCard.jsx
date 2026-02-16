import {Button} from "../../components/Button/Button.jsx";
import { CalendarDays, MapPin } from "lucide-react";

export const EventCard = ({event}) => {
    // Format date: "March 15, 2026"
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    // Format start time: "10:00 AM"
    const formattedStartTime = new Date(event.date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Europe/Berlin' // Adjust to your timezone
    });

    return (
        <div className="event-card flex flex-col bg-[#2d2d2d] rounded-2xl shadow-2xl hover:scale-[1.02] transition duration-300 overflow-hidden">

            {/* Optional Image */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1613690399151-65ea69478674?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Event"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-1 event-title flex p-6">
                    <h2 className="font-bold text-2xl text-white">
                        {event.title}
                    </h2>
                </div>
            </div>

            <div className="event-body flex flex-col px-6 pb-6 mt-6 text-gray-300">
                <div className="flex items-center mb-3">
                    <CalendarDays className="mr-2 text-indigo-400" size={20}/>
                    <span>{formattedDate}</span>
                    <span className="ml-3 text-gray-400">
                        {formattedStartTime}
                    </span>
                </div>

                <div className="flex items-start mb-3">
                    <MapPin className="mr-2 text-indigo-400 flex-shrink-0" size={20}/>
                    <span className="truncate">{event.location}</span>
                </div>


                <p className="text-m text-left text-gray-400">
                    {event.description}
                </p>
            </div>

            <div className="event-footer flex p-6 flex-row-reverse">
                <Button variant="secondary" type="button">
                    View Details
                </Button>
            </div>
        </div>
    );
};
