import Header from './Header';

interface LoginProps {
  onLogin: (usuario: string, senha: string) => void;
}

const usuariosMock = [
  { usuario: 'joao', senha: '1234' },
  { usuario: 'maria', senha: '5678' },
  { usuario: 'pedro', senha: '9012' }
];

export default function Login({ onLogin }: LoginProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const usuario = formData.get('usuario') as string;
    const senha = formData.get('senha') as string;

    const usuarioValido = usuariosMock.find(
      u => u.usuario === usuario && u.senha === senha
    );

    if (usuarioValido) {
      onLogin(usuario, senha);
    } else {
      alert('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header />
      <div className="d-flex align-items-center justify-content-center">
        <div className="card shadow" style={{ width: '400px' }}>
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label fw-semibold">Login</label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  name="usuario"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="senha" className="form-label fw-semibold">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  name="senha"
                  required
                />
              </div>
              <button type="submit" className="btn w-100 fw-semibold text-white" style={{ backgroundColor: '#2c5282', fontSize: '1.1rem', padding: '0.75rem' }}>
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
