import MemePanel from "./components/MemePanel";
import Settings from "./components/settings/Settings";
import { createContext, useState } from "react";

export const MemeContext = createContext(null);

function App() {
    const [memeIndex, setMemeIndex] = useState(0);
    const [memeCaption, setMemeCaption] = useState({});
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-slate-950">
            <MemeContext.Provider
                value={{
                    memeIndex,
                    setMemeIndex,
                    memeCaption,
                    setMemeCaption,
                }}>
                <Settings />
                <MemePanel />
            </MemeContext.Provider>
        </div>
    );
}

export default App;
