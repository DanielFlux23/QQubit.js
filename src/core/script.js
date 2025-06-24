export class QQubit {
  constructor() {
    this.qubits = [] // Guarda todos os qubits criados
  }
  
  create(callback) {
    // Cria um novo qubit no estado |0⟩ puro (alpha=1, beta=0)
    const q = {
      alpha: 1, // amplitude da base |0⟩ (probabilidade 1 ao quadrado)
      beta: 0, // amplitude da base |1⟩ (probabilidade 0)
      estado: null // estado medido ainda não colapsou
    };
    this.qubits.push(q); // adiciona na lista
    
    // Chama o callback passando o qubit e os métodos ligados a ele
    callback(
      q,
      (q) => this.superposicao(q),
      (q) => this.medir(q),
      (q) => this.reset(q)
    );
  }
  
  superposicao(q) {
    // Coloca o qubit em superposição igual (estado Hadamard simplificado)
    const norm = Math.sqrt(0.5) // 1/√2 para normalizar o vetor
    q.alpha = norm; // amplitude |0⟩ = 1/√2
    q.beta = norm; // amplitude |1⟩ = 1/√2
    q.estado = null; // estado colapsado é apagado (incerteza total)
  }
  
  medir(q) {
    // Calcula a probabilidade de medir 0 = |alpha|²
    const p0 = q.alpha ** 2;
    
    // Simula a medição: sorteia aleatório e decide colapso
    q.estado = Math.random() < p0 ? 0 : 1;
    
    // Colapsa o estado do qubit para o valor medido
    if (q.estado === 0) {
      q.alpha = 1; // certeza total em |0⟩
      q.beta = 0;
    } else {
      q.alpha = 0;
      q.beta = 1; // certeza total em |1⟩
    }
    
    return q.estado; // retorna o resultado da medição
  }
  
  reset(q) {
    // Reseta o qubit para o estado inicial |0⟩
    q.alpha = 1;
    q.beta = 0;
    q.estado = null;
  }
}