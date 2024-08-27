import { createContext, useState } from "react";


export const UserContext = createContext({});

type childrenType = {
    children: React.ReactNode
}

const userContextProvider = ({children}: childrenType) => {
    const [user, setUser] = useState(null)
}