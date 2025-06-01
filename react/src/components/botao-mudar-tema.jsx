import { useContext } from "react";
import { TemaContexto } from "../context/theme-context";

export const BotaoTema = () => {
  const { tema, setTema } = useContext(TemaContexto);
  const botaoTemaClaro = "bg-slate-400 text-slate-900";
  const botaoTemaEscuro = "bg-slate-900 text-slate-300";

  return (
    <button
      type="button"
      onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}
      className={` px-3 py-2 cursor-pointer rounded-md ${
        tema === "claro" ? botaoTemaClaro : botaoTemaEscuro
      }`}
    >
      Mudar tema para {tema === "claro" ? "escuro" : "claro"}
    </button>
  );
};
