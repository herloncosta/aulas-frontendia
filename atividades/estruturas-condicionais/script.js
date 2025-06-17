// if = se
// else = senão
// else if = senão, se

// truthy = verdadeiro | 1, " ", -1, true
// falsy = falso | 0, "", undefined, null, NaN

// true ou false -> operadores booleanos
// NaN -> Not a Number

// const biscoito = 10;
// const frutas = 20;
// const caixa = biscoito + frutas;

// const saldoEmCarteira = 25;

// if (saldoEmCarteira >= caixa) {
//   console.log("Compra aprovada!!");
// } else {
//   console.log("Compra recusada!!");
// }

// const nota = 7;

// if (nota >= 9) {
//   console.log("Nota é maior ou igual a 9? ", nota >= 9);
//   console.log("Aprovado com louvor!!");
// } else if (nota >= 7) {
//   console.log("Nota é maior ou igual a 7? ", nota >= 7);
//   console.log("Aprovado!!");
// } else if (nota >= 6) {
//   console.log("Nota é maior ou igual a 6? ", nota >= 6);
//   console.log("Recuperação!!");
// } else {
//   console.log("Nota é menor que 6? ", nota < 6);
//   console.log("Reprovado!!");
// }

// const condicao = 0;

// switch (condicao) {
//   case 1:
//     console.log("1");
//     break;
//   case 2:
//     console.log("2");
//     break;
//   case 3:
//     console.log("3");
//     break;
//   default:
//     console.log("Não é 1, 2 ou 3");
// }

// const programador = "Lucas";

// switch (programador) {
//   case "Icaro":
//     console.log("Estou programando com o Icaro!");
//     break;
//   case "Amanda":
//     console.log("Estou programando com a Amanda!");
//     break;
//   case "Lucas":
//     console.log("Estou programando com o Lucas!");
//     break;
//   default:
//     console.log("Não estou programando com ninguém!");
// }

// APENAS PARA SABER QUE EXISTE!!!
// objeto é uma estrutura de chave e valor
// chave: valor

function verificarProgramador(nome) {
  const programadores = {
    Icaro: "Estou programando com o Icaro!",
    Amanda: "Estou programando com a Amanda!",
    Lucas: "Estou programando com o Lucas!",
  };

  return programadores[nome] || "Não estou programando com ninguém!";
}

console.log(verificarProgramador("Herlon"));
