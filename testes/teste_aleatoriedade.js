import { QQubit } from '/src/core/script.js'; // ajuste o caminho conforme seu projeto

function quaseIgual(a, b, eps = 1e-10) {
  return Math.abs(a - b) < eps;
}

function testeQQubit() {
  const sistema = new QQubit();
  let passou = true;
  
  sistema.create((q, superposicao, medir, reset) => {
    // 1. Estado inicial |0⟩
    if (!(quaseIgual(q.alpha, 1) && quaseIgual(q.beta, 0) && q.estado === null)) {
      console.error('Falha: estado inicial inválido');
      passou = false;
    }
    
    // 2. Superposição correta
    superposicao(q);
    const esperado = Math.sqrt(0.5);
    if (!(quaseIgual(q.alpha, esperado) && quaseIgual(q.beta, esperado))) {
      console.error('Falha: superposição incorreta');
      passou = false;
    }
    if (q.estado !== null) {
      console.error('Falha: estado deve ser null após superposição');
      passou = false;
    }
    
    // 3. Medição deve retornar 0 ou 1 e colapsar o estado
    const resultado = medir(q);
    if (resultado !== 0 && resultado !== 1) {
      console.error('Falha: resultado da medição inválido');
      passou = false;
    }
    // Depois da medição, alpha e beta devem ser 1 e 0, ou 0 e 1
    if (resultado === 0) {
      if (!(quaseIgual(q.alpha, 1) && quaseIgual(q.beta, 0))) {
        console.error('Falha: colapso incorreto para 0');
        passou = false;
      }
    } else {
      if (!(quaseIgual(q.alpha, 0) && quaseIgual(q.beta, 1))) {
        console.error('Falha: colapso incorreto para 1');
        passou = false;
      }
    }
    if (q.estado !== resultado) {
      console.error('Falha: propriedade estado não bate com resultado');
      passou = false;
    }
    
    // 4. Resetar deve voltar para |0⟩ e estado null
    reset(q);
    if (!(quaseIgual(q.alpha, 1) && quaseIgual(q.beta, 0) && q.estado === null)) {
      console.error('Falha: reset não funcionou');
      passou = false;
    }
  });
  
  if (passou) {
    console.log('Todos os testes passaram com sucesso!');
  } else {
    console.log('Alguns testes falharam, veja os erros acima.');
  }
}

testeQQubit();