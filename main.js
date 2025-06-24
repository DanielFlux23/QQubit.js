import {QQubit} from '/src/core/script.js';
const qSystem = new QQubit();

qSystem.create((q, superposicao, medir, reset) => {
  console.log("Estado inicial:", q);
  
  superposicao(q);
  console.log("Depois da superposição:", q);
  
  const resultado = medir(q);
  console.log("Resultado da medição:", resultado);
  console.log("Estado após medir (colapsado):", q);
  
  reset(q);
  console.log("Estado após reset:", q);
});