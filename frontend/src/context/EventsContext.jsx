import { createContext } from "react";

// hosts all events, so in the event of changes, 
// this context will update UI across the app
export const EventsContext = createContext(null);
