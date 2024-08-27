import React, { createContext, useContext, useState } from 'react'

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
    const [currentModuleId, setCurrentModuleId] = useState(null);
    return (
        <ModuleContext.Provider value={{ currentModuleId, setCurrentModuleId }}>
            {children}
        </ModuleContext.Provider>
    );
};

export const useModule = () => useContext(ModuleContext);
