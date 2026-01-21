import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "vidhirawat54@gmail.com",
    profileComplete: false,
    stats: {
      emailsSent: 0,
      emailsRemaining: 100,
      toBePreviewed: [],
      history: [],
    },
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
