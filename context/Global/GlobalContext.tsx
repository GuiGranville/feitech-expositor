import React from "react";


interface GlobalContextType{
    logado: boolean 
    setLogado: React.Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = React.createContext({} as GlobalContextType);

export function GlobalProvider({ children }: any) {

    const [logado, setLogado] = React.useState(false);
    return <GlobalContext.Provider value={{
        logado, setLogado
    }}>{children}</GlobalContext.Provider>;
}