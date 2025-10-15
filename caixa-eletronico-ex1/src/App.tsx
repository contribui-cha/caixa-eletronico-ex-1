import { useState } from 'react';
import Login from './components/Login';
import CaixaEletronico from './components/CaixaEletronico';

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState('');

  const handleLogin = (usuario: string) => {
    setUsuarioLogado(usuario);
  };

  const handleLogout = () => {
    setUsuarioLogado('');
  };

  return usuarioLogado ? (
    <CaixaEletronico usuario={usuarioLogado} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
