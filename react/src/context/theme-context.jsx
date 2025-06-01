import { createContext, useState } from "react";

export const TemaContexto = createContext("claro");

export const ProvedorTema = ({ children }) => {
  const [tema, setTema] = useState("claro");

  return (
    <TemaContexto.Provider value={{ tema, setTema }}>
      {children}
    </TemaContexto.Provider>
  );
};
