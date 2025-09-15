import { createContext } from "react";

// Create the first context for sbal
export const SbalContext = createContext({
    sbal: 0,
    setsbal: () => {}
});

// Create the second context for pbal
export const PbalContext = createContext({
    pbal: 0,
    setpbal: () => {}
});

// Create the second context for pbal
export const loadContext = createContext({
    load: false,
    setload: () => {}
});
