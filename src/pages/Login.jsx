export function LoginEnhanced() {
  const [remember, setRemember] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('zenith_token');
    if (stored) {
      setLastLogin(new Date().toLocaleString());
    }
  }, []);

  const handleLoginRedirect = () => {
    setAttempts(a => a + 1);
    if (remember) {
      localStorage.setItem('zenith_remember', 'true');
    }
    window.location.href = '/api/auth/login';
  };

  const clearSession = () => {
    localStorage.removeItem('zenith_token');
    localStorage.removeItem('zenith_guild_id');
    setLastLogin(null);
  };

  return (
    <div>
      {/* your original login UI is untouched and used via route */}
      <div style={{ marginTop: '15px', textAlign: 'center', color: '#aaa' }}>
        <label>
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
            style={{ marginRight: '6px' }}
          />
          Remember me (because humans forget everything)
        </label>
      </div>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button
          onClick={handleLoginRedirect}
          style={{
            background: '#5865F2',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Retry Login
        </button>
      </div>

      <div style={{ marginTop: '10px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
        Login attempts: {attempts}
      </div>

      {lastLogin && (
        <div style={{ marginTop: '6px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
          Last session: {lastLogin}
        </div>
      )}

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button
          onClick={clearSession}
          style={{
            background: 'transparent',
            border: '1px solid #444',
            color: '#aaa',
            padding: '6px 10px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Clear Session
        </button>
      </div>
    </div>
  );
}
