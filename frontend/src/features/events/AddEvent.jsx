import { useState } from "react";
import {Button} from "../../components/Button/Button.jsx";

export const AddEvent = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        description: "",
        location: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Combine date and time into a single datetime string
        const datetime = formData.date && formData.time
            ? `${formData.date}T${formData.time}`
            : "";

        const eventData = {
            title: formData.title,
            date: datetime,
            description: formData.description,
            location: formData.location,
        };

        onSubmit(eventData);
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
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="date"
                            className="text-sm font-medium text-gray-200 mb-2"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-col">
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
                        Save Event
                    </Button>
                </div>
            </form>
        </div>
    );
};
