import { useState, useEffect } from 'react';
import Header from './Header';

interface Operacao {
  tipo: 'DEP' | 'SAQ';
  valor: number;
  data: string;
  saldo: number;
}

interface CaixaEletronicoProps {
  usuario: string;
  onLogout: () => void;
}

export default function CaixaEletronico({ usuario, onLogout }: CaixaEletronicoProps) {
  const [saldo, setSaldo] = useState(0);
  const [historico, setHistorico] = useState<Operacao[]>([]);
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');
  const [tipoOperacao, setTipoOperacao] = useState<'DEP' | 'SAQ' | null>(null);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    if (usuarios[usuario]) {
      setSaldo(usuarios[usuario].saldo);
      setHistorico(usuarios[usuario].historico);
    }
  }, [usuario]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    usuarios[usuario] = { saldo, historico };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [saldo, historico, usuario]);

  const formatarData = () => {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} à ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const handleSelecionarOperacao = (tipo: 'DEP' | 'SAQ') => {
    setTipoOperacao(tipo);
    setErro('');
  };

  const handleConfirmar = () => {
    const valorNum = parseFloat(valor);

    if (!tipoOperacao) {
      setErro('Selecione uma operação (Depositar ou Sacar)');
      return;
    }

    if (!valorNum || valorNum <= 0) {
      setErro('Valor inválido');
      return;
    }

    if (tipoOperacao === 'SAQ' && valorNum > saldo) {
      setErro('Saldo insuficiente');
      return;
    }

    const novoSaldo = tipoOperacao === 'DEP' ? saldo + valorNum : saldo - valorNum;
    const novaOperacao: Operacao = {
      tipo: tipoOperacao,
      valor: valorNum,
      data: formatarData(),
      saldo: novoSaldo
    };

    setSaldo(novoSaldo);
    setHistorico([novaOperacao, ...historico]);
    setValor('');
    setErro('');
    setTipoOperacao(null);

    alert(`Operação realizada com sucesso!\n${tipoOperacao === 'DEP' ? 'Depósito' : 'Saque'} de R$ ${valorNum.toFixed(2).replace('.', ',')}\nNovo saldo: R$ ${novoSaldo.toFixed(2).replace('.', ',')}`);
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4">Bem-vindo, {usuario}!</h2>

                <div className="alert mb-4" style={{ backgroundColor: '#e6f2ff', border: '1px solid #2c5282' }}>
                  <div className="fw-semibold" style={{ color: '#1a365d' }}>Saldo:</div>
                  <div className="fs-4 fw-bold" style={{ color: '#2c5282' }}>
                    R$ {saldo.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="d-flex gap-2 mb-3">
                  <button
                    className={`btn flex-fill fw-semibold ${tipoOperacao === 'DEP' ? 'text-white' : ''}`}
                    style={{
                      backgroundColor: tipoOperacao === 'DEP' ? '#2c5282' : '#e6f2ff',
                      color: tipoOperacao === 'DEP' ? 'white' : '#2c5282',
                      border: '2px solid #2c5282',
                      fontSize: '1.1rem',
                      padding: '0.75rem'
                    }}
                    onClick={() => handleSelecionarOperacao('DEP')}
                  >
                    Depositar
                  </button>
                  <button
                    className={`btn flex-fill fw-semibold ${tipoOperacao === 'SAQ' ? 'text-white' : ''}`}
                    style={{
                      backgroundColor: tipoOperacao === 'SAQ' ? '#2c5282' : '#e6f2ff',
                      color: tipoOperacao === 'SAQ' ? 'white' : '#2c5282',
                      border: '2px solid #2c5282',
                      fontSize: '1.1rem',
                      padding: '0.75rem'
                    }}
                    onClick={() => handleSelecionarOperacao('SAQ')}
                  >
                    Sacar
                  </button>
                </div>

                <div className="mb-3">
                  <label htmlFor="valor" className="form-label fw-semibold">Valor da Operação</label>
                  <input
                    type="number"
                    className="form-control"
                    id="valor"
                    placeholder="Digite o valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    step="0.01"
                    min="0"
                  />
                  {erro && <div className="text-danger small mt-1">{erro}</div>}
                </div>

                <button
                  className="btn w-100 fw-semibold text-white mb-4"
                  style={{
                    backgroundColor: '#28a745',
                    fontSize: '1.1rem',
                    padding: '0.75rem'
                  }}
                  onClick={handleConfirmar}
                >
                  Confirmar Operação
                </button>

                <div className="mb-4">
                  <h5 className="mb-3">Histórico</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Tipo</th>
                          <th className="text-end">Saldo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historico.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="text-center text-muted">
                              Nenhuma operação realizada
                            </td>
                          </tr>
                        ) : (
                          historico.map((op, index) => (
                            <tr key={index}>
                              <td>{op.data}</td>
                              <td>{op.tipo}</td>
                              <td className="text-end">
                                R$ {op.saldo.toFixed(2).replace('.', ',')}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <button
                  className="btn w-100 fw-semibold"
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    fontSize: '1rem',
                    padding: '0.5rem'
                  }}
                  onClick={onLogout}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
