const idade = 17;

// if (idade >= 18) {
//   console.log("Entrada inteira!");
// } else {
//   console.log("Entrada meia!");
// }

// ? => operador ternário

// const menorDeIdade = idade < 18 ? "Entrada meia!" : "Entrada inteira!";
// console.log(menorDeIdade);

const veridadeMenorIdade = (idade) =>
  idade < 18 ? "Entrada meia!" : "Entrada inteira!";

console.log(veridadeMenorIdade(17));
console.log(veridadeMenorIdade(18));
console.log(veridadeMenorIdade(19));
