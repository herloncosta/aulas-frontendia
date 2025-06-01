import { useContext } from "react";
import { BotaoTema } from "./botao-mudar-tema";
import { TemaContexto } from "../context/theme-context";

export const Menu = () => {
  const { tema } = useContext(TemaContexto);

  return (
    <nav
      className={`${
        tema === "claro" ? "bg-slate-300" : "bg-slate-700"
      } w-full p-4 flex justify-end`}
    >
      <BotaoTema />
    </nav>
  );
};
