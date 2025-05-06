import { createContext, useState } from "react";

// Create the context
export const VoterDataContext = createContext();

// Create the provider
export const VoterContext = ({ children }) => {

  const [voter, setVoter] = useState({
    username: '',
    aadhaarNumber: '',
    dob: '',
    password: '',
    descriptor: null,
  });

  return (
    <VoterDataContext.Provider value={{ voter, setVoter }}>
      {children}
    </VoterDataContext.Provider>
  );
};
