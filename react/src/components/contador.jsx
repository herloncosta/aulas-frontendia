import { useState, useEffect, useContext } from "react";
import { TemaContexto } from "../context/theme-context";

export const Contador = ({ className }) => {
  const [contador, setContador] = useState(0);
  const [nome, setNome] = useState("Herlon Costa");
  const { tema } = useContext(TemaContexto);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const decrementar = () => {
    setContador(contador - 1);
  };

  const mudarNome = (novoNome) => {
    setNome(novoNome);
  };

  useEffect(() => {
    document.title = `Olá, ${nome}!`;
    console.log("Título atualizado!");
    return () => console.log("Limpando o efeito do título!");
  }, [nome]);

  useEffect(() => {
    console.log("O componente foi montado!");
  }, []);

  return (
    <div
      className={`${
        tema === "claro" ? "bg-slate-400" : "bg-slate-600"
      } flex flex-col items-center justify-center h-screen`}
    >
      <input
        type="text"
        value={nome}
        onChange={(e) => mudarNome(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Digite seu nome"
      />

      <h1 className="text-2xl font-bold mb-4">Contador: {contador}</h1>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={incrementar}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Incrementar
        </button>

        <button
          type="button"
          onClick={decrementar}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrementar
        </button>
      </div>
    </div>
  );
};
