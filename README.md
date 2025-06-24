# QQubit

QQubit é uma lib que permite simular, estados quânticos de forma simplificada

## 🚀 Como usar


### importe a lib
`import {QQubit} from '/src/core/script.js';`

### crie um instância
`const qSystem = new QQubit();`

### usando recursos
`qSystem.create((q, superposicao, medir, reset) => {...});``

- q: contém (alpha, beta e estado)
- superposicao(q): pode recebe um qubit e colocar ele em superposição
- medir(q): Permite medir o qubic e colapsando-o
- reset(q): Resetar o qubit para 0


### exemplo completo
```javascript
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
```