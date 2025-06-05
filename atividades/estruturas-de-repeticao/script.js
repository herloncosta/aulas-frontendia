// 1. Percorra o array imprimindo todos os valores contidos nele com a função console.log().

// const numeros = [5, 10, 15, 20, 25, 30];

// for (let i = 0; i < numeros.length; i++) {
//   console.log(numeros[i]);
// }

// 2. Some todos os valores contidos no array e imprima o resultado.
// let soma = 0;
// for (let i = 0; i < numeros.length; i++) {
//   soma += numeros[i];
// }

// console.log(soma);

// 3. Calcule e imprima a média aritmética dos valores contidos no array. A média aritmética é
// o resultado da soma de todos os elementos dividido pelo número total de elementos.

// const numeros = [5, 10, 15, 20, 25, 30];

// let soma = 0;

// for (let indice = 0; indice < numeros.length; indice += 1) {
//   soma += numeros[indice];
// }

// const media = soma / numeros.length;
// console.log(`A média aritmética é: ${media}`);

// 4. Com base no código que acabou de gerar, referente ao cálculo da média aritmética, faça
// com que: caso o valor final seja maior que 20, imprima a mensagem “O valor da média
// aritmética é maior que 20”; e, caso não seja maior que 20, imprima a mensagem “O valor
// da média aritmética é menor ou igual a 20”.

// const numeros = [5, 10, 15, 20, 25, 30];
// let soma = 0;

// for (let indice = 0; indice < numeros.length; indice += 1) {
//   soma += numeros[indice];
// }

// const media = soma / numeros.length;
// const resultado =
//   media > 20
//     ? "O valor da média aritmética é maior que 20"
//     : "O valor da média aritmética é menor ou igual a 20";

// console.log(resultado);

// 5. Utilizando for, descubra o maior valor contido no array e imprima-o.
// const numeros = [5, 10, 15, 20, 25, 30];
// let maiorValor = numeros[0];

// for (let i = 1; i < numeros.length; i++) {
//   if (numeros[i] > maiorValor) {
//     maiorValor = numeros[i];
//   }
// }

// console.log(maiorValor);

// 6. Descubra quantos valores ímpares existem no array e imprima o resultado. Caso não
// exista nenhum, imprima a mensagem: “Nenhum valor ímpar encontrado”.

const numeros = [5, 10, 15, 20, 25, 30];
let numerosImpares = 0;

for (let i = 0; i < numeros.length; i++) {
  if (numeros[i] % 2 !== 0) {
    numerosImpares += 1;
  }
}

console.log(`Quantidade de números ímpares: ${numerosImpares}`);

// módulo: o resto da divisão inteira
// Exemplo: 5 % 2 = 1 (resto da divisão de 5 por 2 é 1, logo é ímpar)

const resultado =
  numerosImpares > 0 ? numerosImpares : "Nenhum valor ímpar encontrado";
console.log(resultado);

// Exercício 07
// O fatorial é a multiplicação de um número natural pelos seus antecessores, exceto
// o zero. Por exemplo:
// O fatorial é representado pelo sinal !
// Exemplo de 4 fatorial:
// 4! = 4 x 3 x 2 x 1 = 24
// Com base nessas informações, crie um algoritmo que imprima na tela o fatorial de 10.

let resultadoFatorial = 1;

for (let i = 10; i > 0; i--) {
  resultadoFatorial *= i;
}

console.log(`O fatorial de 10 é: ${resultadoFatorial}`);

// Exercício 08
// Utilize a estrutura de repetição for para desenvolver um algoritmo que seja capaz de
// inverter uma palavra, como a palavra “banana” para “ananab”. Utilize a string abaixo como
// exemplo. Depois, troque-a por outras para verificar se seu algoritmo está funcionando
// corretamente.
// Dica: Pesquise sobre os seguintes métodos: split(), reverse() e join();

const palavra = "banana";
let palavraInvertida = "";

for (let i = palavra.length - 1; i >= 0; i--) {
  palavraInvertida += palavra[i];
}

console.log(`A palavra invertida é: ${palavraInvertida}`);

// Exercício 09
// Escreva um algoritmo que, dado um valor n, sendo n > 1, imprima na tela um quadrado feito de
// asteriscos de tamanho n. Por exemplo:

// notação assintótica:
// complexidade tempo: O(n^2)
// complexidade espaço: O(1)
const n = 5;
let quadrado = "";

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    quadrado += "*";
  }
  quadrado += "\n";
}
console.log(quadrado);
