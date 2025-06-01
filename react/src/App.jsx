import { Contador } from "./components/contador";
import { Menu } from "./components/menu";
import { ProvedorTema } from "./context/theme-context";

export function App() {
  return (
    <ProvedorTema>
      <Menu />
      <Contador />
    </ProvedorTema>
  );
}
