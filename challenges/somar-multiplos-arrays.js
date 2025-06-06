const array1 = [47, 2, 58, 3, 6];
const array2 = [9, 82, 17, 36, 6, 2];
const array3 = [14, 36, 5, 8];

function retornarMaiorTamanhoDeUmArray(...arrays) {
  let maiorTamanho = arrays[0].length;
  for (let i = 1; i < arrays.length; i++) {
    if (arrays[i].length > maiorTamanho) maiorTamanho = arrays[i].length;
  }
  return maiorTamanho;
}

const arrayMaiorTamanho = retornarMaiorTamanhoDeUmArray(array1, array2, array3);

let total1 = 0;
let total2 = 0;
let total3 = 0;

for (let i = 0; i < arrayMaiorTamanho; i++) {
  total1 += array1[i] || 0;
  total2 += array2[i] || 0;
  total3 += array3[i] || 0;
}

console.log(`Soma do arr1: ${total1}`);
console.log(`Soma do arr2: ${total2}`);
console.log(`Soma do arr3: ${total3}`);
