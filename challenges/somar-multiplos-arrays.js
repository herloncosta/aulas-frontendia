const arr1 = [47, 2, 58, 3, 6];
const arr2 = [9, 82, 17, 36, 6, 2];
const arr3 = [14, 36, 5, 8];

const arrayMaiorTamanho = Math.max(arr1.length, arr2.length, arr3.length);

let total1 = 0;
let total2 = 0;
let total3 = 0;

for (let i = 0; i < arrayMaiorTamanho; i++) {
  total1 += arr1[i] || 0;
  total2 += arr2[i] || 0;
  total3 += arr3[i] || 0;
}

console.log(`Soma do arr1: ${total1}`);
console.log(`Soma do arr2: ${total2}`);
console.log(`Soma do arr3: ${total3}`);
