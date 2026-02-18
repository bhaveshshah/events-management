import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button.jsx";

export const AddEvent = ({ passingEvent = {}, onSubmit, onCancel, onDelete = {} }) => {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        description: "",
        location: "",
    });

    // if form loads with event data, populate form fields
    useEffect(() => {
        if (passingEvent) {
            setFormData({
                title: passingEvent.title || "",
                date: passingEvent.date ? passingEvent.date.split("T")[0] : "",
                time: passingEvent.date ? passingEvent.date.split("T")[1].slice(0, 5) : "",
                description: passingEvent.description || "",
                location: passingEvent.location || "",
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSetToday = () => {
        const now = new Date();
        const today = now.toISOString().split("T")[0];
        const timeNow = now.toTimeString().slice(0, 5);
        setFormData((prev) => ({
            ...prev,
            date: today,
            time: timeNow,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Combine date and time into a single datetime string
        const datetime = formData.date && formData.time
            ? `${formData.date}T${formData.time}`
            : "";

        let eventData = {
            title: formData.title,
            date: datetime,
            description: formData.description,
            location: formData.location,
        };

        if (passingEvent.id) {
            eventData.id = passingEvent.id; // Include ID for updates
        }

        onSubmit(eventData);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(passingEvent);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Field */}
                <div className="flex flex-col">
                    <label
                        htmlFor="title"
                        className="text-sm font-medium text-gray-200 mb-2"
                    >
                        Event Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter event title"
                    />
                </div>

                {/* Date and Time Fields */}
                <div className="flex flex-col">

                    <label
                        htmlFor="date"
                        className="text-sm font-medium text-gray-200 mb-2"
                    >
                        Date
                    </label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="flex-1 px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleSetToday}
                            className="px-3 py-2 whitespace-nowrap"
                        >
                            Today
                        </Button>
                    </div>

                    <label
                        htmlFor="time"
                        className="text-sm font-medium text-gray-200 mb-2"
                    >
                        Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />

                </div>

                {/* Description Field */}
                <div className="flex flex-col">
                    <label
                        htmlFor="description"
                        className="text-sm font-medium text-gray-200 mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Enter event description"
                    />
                </div>

                {/* Location Field */}
                <div className="flex flex-col">
                    <label
                        htmlFor="location"
                        className="text-sm font-medium text-gray-200 mb-2"
                    >
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter event location"
                    />
                </div>

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    {passingEvent.id && onDelete && (
                        <Button
                            type="button"
                            onClick={handleDelete}
                            className="px-4 py-2 text-red-300 hover:text-red-100"
                            variant='secondary'
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-300 hover:text-white"
                        variant='secondary'
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700"
                    >
                        {passingEvent.id ? "Update Event" : "Add Event"}
                    </Button>
                </div>
            </form>
        </div>
    );
};
