## Hooks Essenciais do React

---

### 1. `useState`

Permite adicionar estado a componentes de função. Ele retorna um par: o valor do estado atual e uma função para atualizá-lo.

**Funcionamento:** Ao chamar `useState`, você declara uma "variável de estado". Você pode passar um valor inicial para essa variável. A função retornada permite alterar esse valor, o que fará com que o componente seja renderizado novamente.

**Exemplo:**

```javascript
import React, { useState } from "react";

function Contador() {
  // Declara uma nova variável de estado chamada "contagem"
  const [contagem, setContagem] = useState(0); // 0 é o valor inicial

  return (
    <div>
      <p>Você clicou {contagem} vezes</p>
      <button onClick={() => setContagem(contagem + 1)}>Clique aqui</button>
    </div>
  );
}

export default Contador;
```

---

### 2. `useEffect`

Permite executar efeitos colaterais (como buscar dados, manipular o DOM diretamente, timers, logging) em componentes de função.

**Funcionamento:** `useEffect` aceita uma função que contém o código do efeito colateral e, opcionalmente, um array de dependências.

- Se o array de dependências não for fornecido, o efeito é executado após cada renderização.
- Se for um array vazio (`[]`), o efeito é executado apenas uma vez após a montagem do componente e antes da desmontagem.
- Se tiver variáveis/funções no array, o efeito é executado sempre que qualquer uma dessas dependências mudar.
  Pode retornar uma função de limpeza que será executada antes do componente ser desmontado ou antes de o efeito ser reexecutado.

**Exemplo:**

```javascript
import React, { useState, useEffect } from "react";

function TituloDinamico() {
  const [nome, setNome] = useState("Usuário");
  const [contador, setContador] = useState(0);

  // Efeito que atualiza o título da página quando 'nome' muda
  useEffect(() => {
    document.title = `Olá, ${nome}!`;
    console.log("Título atualizado!");

    // Função de limpeza opcional
    return () => {
      console.log("Limpando o efeito do título...");
    };
  }, [nome]); // Só re-executa se 'nome' mudar

  // Efeito que roda apenas uma vez (montagem)
  useEffect(() => {
    console.log("Componente montado!");
  }, []);

  return (
    <div>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <p>Nome: {nome}</p>
      <button onClick={() => setContador(contador + 1)}>
        Contador: {contador}
      </button>
    </div>
  );
}

export default TituloDinamico;
```

---

### 3. `useContext`

Permite acessar o valor de um Contexto do React diretamente em um componente de função, sem precisar passar props manualmente através de múltiplos níveis da árvore de componentes (prop drilling).

**Funcionamento:** Primeiro, você cria um Contexto usando `React.createContext()`. Depois, um componente "Provider" (Provedor) disponibiliza um valor para esse contexto. Componentes filhos podem então usar `useContext` para ler o valor atual desse contexto.

**Exemplo:**

```javascript
import React, { useState, useContext, createContext } from "react";

// 1. Criar o Contexto
const TemaContexto = createContext("claro"); // 'claro' é o valor padrão

function App() {
  const [tema, setTema] = useState("claro");

  return (
    // 2. Prover o valor do contexto para os componentes filhos
    <TemaContexto.Provider value={tema}>
      <Toolbar />
      <button onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}>
        Alternar Tema
      </button>
    </TemaContexto.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <BotaoTematico />
    </div>
  );
}

function BotaoTematico() {
  // 3. Usar o useContext para acessar o valor do tema
  const temaAtual = useContext(TemaContexto);

  return (
    <button
      style={{
        background: temaAtual === "claro" ? "#eee" : "#333",
        color: temaAtual === "claro" ? "#000" : "#fff",
      }}
    >
      Eu sou um botão temático ({temaAtual})
    </button>
  );
}

export default App;
```

---

## Hooks Adicionais

---

### 4. `useReducer`

Uma alternativa ao `useState` para gerenciar estados mais complexos, especialmente quando o próximo estado depende do anterior ou quando a lógica de atualização do estado é complexa.

**Funcionamento:** Aceita uma função "reducer" `(estado, acao) => novoEstado` e um estado inicial. Retorna o estado atual e uma função `dispatch` para disparar ações que atualizam o estado.

**Exemplo:**

```javascript
import React, { useReducer } from "react";

const estadoInicial = { contador: 0 };

function reducer(estado, acao) {
  switch (acao.tipo) {
    case "incrementar":
      return { contador: estado.contador + 1 };
    case "decrementar":
      return { contador: estado.contador - 1 };
    case "resetar":
      return { contador: acao.payload };
    default:
      throw new Error();
  }
}

function ContadorComReducer() {
  const [estado, dispatch] = useReducer(reducer, estadoInicial);

  return (
    <>
      Contador: {estado.contador}
      <button onClick={() => dispatch({ tipo: "incrementar" })}>+</button>
      <button onClick={() => dispatch({ tipo: "decrementar" })}>-</button>
      <button onClick={() => dispatch({ tipo: "resetar", payload: 0 })}>
        Resetar
      </button>
    </>
  );
}

export default ContadorComReducer;
```

---

### 5. `useCallback`

Retorna uma versão "memoizada" (memorizada) de uma função callback. Isso é útil para otimizar o desempenho, evitando que funções sejam recriadas desnecessariamente em cada renderização, especialmente quando passadas como props para componentes filhos que dependem da igualdade referencial para evitar re-renderizações (como componentes otimizados com `React.memo`).

**Funcionamento:** `useCallback(fn, deps)` retorna `fn` em si, mas apenas a recria se uma das dependências `deps` mudar. Sem o array de dependências, uma nova função é criada a cada renderização (similar a não usar `useCallback`).

**Exemplo:**

```javascript
import React, { useState, useCallback } from "react";

const Botao = React.memo(({ onClick, children }) => {
  console.log(`Renderizando botão: ${children}`);
  return <button onClick={onClick}>{children}</button>;
});

function AppCallback() {
  const [contador1, setContador1] = useState(0);
  const [contador2, setContador2] = useState(0);

  // Sem useCallback, esta função seria recriada a cada renderização do AppCallback,
  // fazendo com que o Botao "Incrementar Contador 1" renderize sempre.
  const incrementar1 = () => setContador1((c) => c + 1);

  // Com useCallback, esta função só é recriada se sua dependência (nenhuma neste caso) mudar.
  // Como não há dependências, ela é criada uma vez e reutilizada.
  const incrementar2 = useCallback(() => {
    setContador2((c) => c + 1);
  }, []); // Array de dependências vazio, a função nunca é recriada

  return (
    <div>
      <p>Contador 1: {contador1}</p>
      <Botao onClick={incrementar1}>
        Incrementar Contador 1 (sem useCallback)
      </Botao>
      <p>Contador 2: {contador2}</p>
      <Botao onClick={incrementar2}>
        Incrementar Contador 2 (com useCallback)
      </Botao>
    </div>
  );
}
export default AppCallback;
```

---

### 6. `useMemo`

Retorna um valor "memoizado" (memorizado). É usado para otimizar o desempenho, evitando cálculos caros em cada renderização se as dependências não mudarem.

**Funcionamento:** `useMemo(() => computeExpensiveValue(a, b), [a, b])` só recomputa o valor memoizado quando uma das dependências `[a, b]` mudar.

**Exemplo:**

```javascript
import React, { useState, useMemo } from "react";

function CalculoPesadoComponente() {
  const [numero, setNumero] = useState(10);
  const [contador, setContador] = useState(0); // Apenas para forçar re-renderizações

  // Esta função é "cara" e não queremos executá-la a cada renderização
  // a menos que 'numero' mude.
  const resultadoCalculado = useMemo(() => {
    console.log("Calculando valor pesado...");
    let resultado = 0;
    for (let i = 0; i < numero * 10000000; i++) {
      resultado += Math.sqrt(i); // Simulação de cálculo pesado
    }
    return resultado / (numero || 1); // Evitar divisão por zero
  }, [numero]); // Só recalcula se 'numero' mudar

  return (
    <div>
      <input
        type="number"
        value={numero}
        onChange={(e) => setNumero(parseInt(e.target.value, 10))}
      />
      <p>Resultado do cálculo pesado: {resultadoCalculado}</p>
      <button onClick={() => setContador((c) => c + 1)}>
        Forçar Re-render (Contador: {contador})
      </button>
      <p>
        Se você alterar o input numérico, o cálculo será refeito. Se clicar no
        botão "Forçar Re-render", o cálculo pesado não será refeito graças ao
        useMemo.
      </p>
    </div>
  );
}

export default CalculoPesadoComponente;
```

---

### 7. `useRef`

Retorna um objeto "ref" mutável cuja propriedade `.current` é inicializada com o argumento passado (initialValue). O objeto retornado persistirá durante todo o ciclo de vida do componente. `useRef` pode ser usado para acessar um elemento DOM diretamente ou para manter qualquer valor mutável que não precise causar uma nova renderização quando alterado.

**Funcionamento:**

- **Acessar DOM:** Você pode passar o objeto ref para o atributo `ref` de um elemento HTML.
- **Manter valores:** Como a alteração de `.current` não causa re-renderização, é útil para armazenar valores que você deseja persistir entre renderizações sem disparar o ciclo de renderização (como IDs de timers).

**Exemplo:**

```javascript
import React, { useRef, useEffect, useState } from "react";

function FocoInput() {
  const inputEl = useRef(null); // Inicializa com null
  const [texto, setTexto] = useState("");
  const renderContadorRef = useRef(0);

  useEffect(() => {
    // Foca o input quando o componente é montado
    inputEl.current.focus();
  }, []); // Array vazio, executa apenas na montagem

  useEffect(() => {
    renderContadorRef.current = renderContadorRef.current + 1;
    console.log(`Componente renderizou ${renderContadorRef.current} vezes.`);
  }); // Sem array de dependências, roda a cada render

  const aoClicar = () => {
    alert(`Valor do input: ${inputEl.current.value}`);
  };

  return (
    <div>
      <input
        ref={inputEl}
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button onClick={aoClicar}>Mostrar Valor do Input</button>
      <p>
        Alterar o input não causa log de "renderizou", mas clicar no botão para
        forçar o estado sim.
      </p>
    </div>
  );
}

export default FocoInput;
```

---

### 8. `useImperativeHandle`

Customiza o valor da instância que é exposto a componentes pais ao usar `ref`. Deve ser usado em conjunto com `forwardRef`.

**Funcionamento:** Permite que um componente filho exponha funções específicas para o componente pai, em vez de toda a instância do DOM.

**Exemplo:**

```javascript
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";

// Componente filho
const InputCustomizado = forwardRef((props, ref) => {
  const inputRealRef = useRef();
  const [valor, setValor] = useState("");

  // Expõe apenas 'focar' e 'getValor' para o pai
  useImperativeHandle(ref, () => ({
    focar: () => {
      inputRealRef.current.focus();
    },
    getValor: () => {
      return inputRealRef.current.value;
    },
    limpar: () => {
      setValor("");
      inputRealRef.current.value = ""; // Limpa o input diretamente
    },
  }));

  return (
    <input
      ref={inputRealRef}
      value={valor}
      onChange={(e) => setValor(e.target.value)}
      placeholder={props.placeholder}
    />
  );
});

// Componente pai
function AppImperative() {
  const meuInputRef = useRef(null);

  const handleFocar = () => {
    meuInputRef.current.focar();
  };

  const handleMostrarValor = () => {
    alert(`Valor: ${meuInputRef.current.getValor()}`);
  };

  const handleLimpar = () => {
    meuInputRef.current.limpar();
  };

  return (
    <div>
      <InputCustomizado ref={meuInputRef} placeholder="Digite algo..." />
      <button onClick={handleFocar}>Focar Input</button>
      <button onClick={handleMostrarValor}>Mostrar Valor</button>
      <button onClick={handleLimpar}>Limpar</button>
    </div>
  );
}

export default AppImperative;
```

---

### 9. `useLayoutEffect`

Idêntico ao `useEffect` em sua assinatura, mas dispara **sincronamente** após todas as mutações do DOM. Use isso para ler o layout do DOM e renderizar novamente de forma síncrona. Atualizações agendadas dentro do `useLayoutEffect` serão processadas de forma síncrona antes que o navegador tenha a chance de pintar.

**Funcionamento:** Use quando seu efeito precisa medir ou manipular o DOM e você quer que as mudanças sejam visíveis imediatamente, sem um flash de conteúdo antigo. É menos comum que `useEffect`.

**Exemplo:** (Um exemplo comum é medir a largura de um elemento após ele ser renderizado)

```javascript
import React, { useState, useLayoutEffect, useRef } from "react";

function Tooltip() {
  const ref = useRef(null);
  const [largura, setLargura] = useState(0);

  useLayoutEffect(() => {
    // Este efeito roda DEPOIS que o DOM foi atualizado, mas ANTES da pintura do navegador
    if (ref.current) {
      console.log("useLayoutEffect: Medindo largura");
      setLargura(ref.current.offsetWidth);
    }
  }, []); // Executa após a montagem inicial

  // useEffect(() => {
  //   // Se usássemos useEffect aqui, poderia haver um frame onde a largura é 0
  //   // e depois atualizada, causando um possível "flicker".
  //   if (ref.current) {
  //     console.log('useEffect: Medindo largura');
  //     setLargura(ref.current.offsetWidth);
  //   }
  // }, []);

  return (
    <div>
      <div
        ref={ref}
        style={{
          background: "lightblue",
          padding: "10px",
          display: "inline-block",
        }}
      >
        Passe o mouse aqui!
      </div>
      {largura > 0 && <p>A largura do elemento acima é: {largura}px</p>}
    </div>
  );
}

export default Tooltip;
```

---

### 10. `useDebugValue`

Pode ser usado para exibir um rótulo para Hooks customizados no React DevTools.

**Funcionamento:** Ajuda na depuração de Hooks customizados, fornecendo informações mais úteis nas ferramentas de desenvolvedor.

**Exemplo:**

```javascript
import React, { useState, useDebugValue } from "react";

// Hook customizado
function useNomeAmigo(nomeInicial) {
  const [nome, setNome] = useState(nomeInicial);

  // Exibe um rótulo customizado no React DevTools para este hook
  // O segundo argumento (opcional) é uma função de formatação.
  // Ela só é chamada se os DevTools estiverem abertos e o Hook inspecionado.
  useDebugValue(
    nome ? `Amigo: ${nome}` : "Amigo não definido",
    (n) => `Status do Amigo: ${n}`
  );

  return [nome, setNome];
}

function AppDebug() {
  const [meuAmigo, setMeuAmigo] = useNomeAmigo("Alice");

  return (
    <div>
      <p>Meu amigo é: {meuAmigo}</p>
      <input
        type="text"
        value={meuAmigo}
        onChange={(e) => setMeuAmigo(e.target.value)}
      />
      <p>
        Abra o React DevTools e inspecione o componente AppDebug para ver o
        valor de useDebugValue no hook useNomeAmigo.
      </p>
    </div>
  );
}

export default AppDebug;
```

---

### 11. `useId`

É um hook para gerar IDs únicos que são estáveis entre o servidor e o cliente, evitando "hydration mismatches". Útil para componentes de acessibilidade que precisam de IDs (por exemplo, `aria-labelledby`).

**Funcionamento:** Gera um ID único. Se você precisar de múltiplos IDs dentro do mesmo componente, pode chamar `useId` várias vezes ou sufixar o ID gerado.

**Exemplo:**

```javascript
import React, { useId } from "react";

function FormularioComId() {
  const idBase = useId(); // Gera um ID único, ex: ":r0:"

  const emailId = `${idBase}-email`;
  const senhaId = `${idBase}-senha`;

  return (
    <form>
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input id={emailId} type="email" />
      </div>
      <div>
        <label htmlFor={senhaId}>Senha:</label>
        <input id={senhaId} type="password" />
      </div>
      <p>ID base gerado: {idBase}</p>
      <p>ID do Email: {emailId}</p>
      <p>ID da Senha: {senhaId}</p>
    </form>
  );
}

export default FormularioComId;
```

---

### 12. `useTransition`

Permite marcar algumas atualizações de estado como "transições", o que informa ao React que elas podem ser interrompidas ou renderizadas em segundo plano sem bloquear a interface do usuário. Útil para manter a UI responsiva durante atualizações de estado que podem ser lentas.

**Funcionamento:** Retorna um booleano `isPending` (indicando se a transição está ativa) e uma função `startTransition` para envolver a atualização de estado.

**Exemplo:**

```javascript
import React, { useState, useTransition } from "react";

// Lista grande de itens para simular uma renderização lenta
const listaGrande = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

function AppTransition() {
  const [filtro, setFiltro] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState(listaGrande);
  const [isPending, startTransition] = useTransition();

  const handleFiltroChange = (event) => {
    const novoFiltro = event.target.value;
    setFiltro(novoFiltro); // Atualização de alta prioridade (feedback do input)

    // Envolve a atualização de estado de baixa prioridade com startTransition
    startTransition(() => {
      console.log("Iniciando transição para filtrar lista...");
      setListaFiltrada(
        listaGrande.filter((item) =>
          item.toLowerCase().includes(novoFiltro.toLowerCase())
        )
      );
    });
  };

  return (
    <div>
      <input
        type="text"
        value={filtro}
        onChange={handleFiltroChange}
        placeholder="Filtrar itens..."
      />
      {isPending && <p>Carregando lista filtrada...</p>}
      <div
        style={{
          opacity: isPending ? 0.5 : 1,
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {listaFiltrada.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default AppTransition;
```

---

### 13. `useDeferredValue`

Permite adiar a atualização de uma parte não crítica da UI. Semelhante a `useTransition`, mas geralmente usado quando você não tem acesso ao código que causa a atualização de estado (por exemplo, um valor vindo de uma biblioteca).

**Funcionamento:** Aceita um valor e retorna uma nova cópia do valor que "atrasa" em relação às atualizações urgentes. O React tentará renderizar com o valor antigo enquanto o novo valor está sendo preparado.

**Exemplo:**

```javascript
import React, { useState, useDeferredValue, useMemo } from "react";

// Componente que renderiza uma lista (potencialmente lenta)
function MinhaListaLenta({ texto }) {
  // Adia a atualização do texto para este componente
  const textoAdiado = useDeferredValue(texto);
  const isStale = texto !== textoAdiado; // Verdadeiro se estivermos mostrando um valor antigo

  const lista = useMemo(() => {
    console.log(`Renderizando lista para: "${textoAdiado}"`);
    // Simula uma renderização lenta se o texto for longo
    if (textoAdiado.length > 5) {
      // Pequena pausa para simular trabalho
      let i = 0;
      while (i < 200000000) {
        i++;
      }
    }
    return Array.from(
      { length: textoAdiado.length * 2 },
      (_, i) => `Item ${i} de "${textoAdiado}"`
    );
  }, [textoAdiado]);

  return (
    <div
      style={{
        opacity: isStale ? 0.5 : 1,
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      {isStale && (
        <p>
          <em>Renderizando com valor antigo enquanto o novo é processado...</em>
        </p>
      )}
      <p>
        <strong>Lista para: {textoAdiado}</strong>
      </p>
      {lista.slice(0, 10).map(
        (
          item,
          index // Mostra apenas os primeiros 10 para não poluir
        ) => (
          <div key={index}>{item}</div>
        )
      )}
      {lista.length > 10 && <p>... e mais {lista.length - 10} itens.</p>}
    </div>
  );
}

function AppDeferred() {
  const [textoInput, setTextoInput] = useState("Olá");

  const handleChange = (e) => {
    setTextoInput(e.target.value);
  };

  return (
    <div>
      <p>
        Digite algo no campo abaixo. Se o texto for longo, a atualização da
        lista será adiada para manter o input responsivo.
      </p>
      <input
        type="text"
        value={textoInput}
        onChange={handleChange}
        placeholder="Digite para filtrar"
        style={{ width: "300px", padding: "8px" }}
      />
      <MinhaListaLenta texto={textoInput} />
    </div>
  );
}

export default AppDeferred;
```
