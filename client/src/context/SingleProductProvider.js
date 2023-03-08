import { createContext, useState } from "react";

const SingleProductContext = createContext({});

export const SingleProductProvider = ({ children }) => {
  const [data, setData] = useState(null);
  return (
    <SingleProductContext.Provider value={{ data, setData }}>
      {children}
    </SingleProductContext.Provider>
  );
};

export default SingleProductContext;
