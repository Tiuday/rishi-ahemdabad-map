import { useState } from 'react';
import './Login.css';

const ShieldIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8"/>
  </svg>
);

const EyeOpen = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeClosed = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0f172a">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const SafetyMapDecor = () => (
  <svg viewBox="0 0 480 500" className="safety-map-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="safeGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.28"/>
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05"/>
      </radialGradient>
      <radialGradient id="pinkGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25"/>
        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.04"/>
      </radialGradient>
      <radialGradient id="unsafeGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.28"/>
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05"/>
      </radialGradient>
      <radialGradient id="amberGrad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25"/>
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.04"/>
      </radialGradient>
      <filter id="pinGlow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* Map background */}
    <rect width="480" height="500" fill="#f8fafc"/>

    {/* Subtle grid roads */}
    <g stroke="#e8edf4" strokeWidth="1" opacity="1">
      <line x1="0" y1="100" x2="480" y2="100"/>
      <line x1="0" y1="200" x2="480" y2="200"/>
      <line x1="0" y1="310" x2="480" y2="310"/>
      <line x1="0" y1="410" x2="480" y2="410"/>
      <line x1="70" y1="0" x2="70" y2="500"/>
      <line x1="155" y1="0" x2="155" y2="500"/>
      <line x1="250" y1="0" x2="250" y2="500"/>
      <line x1="355" y1="0" x2="355" y2="500"/>
      <line x1="440" y1="0" x2="440" y2="500"/>
    </g>

    {/* Sabarmati River */}
    <path
      d="M 212 0 C 205 70, 215 140, 207 215 S 218 315, 210 375 S 220 440, 214 500"
      fill="none" stroke="#dbeafe" strokeWidth="32" strokeLinecap="round"
    />
    <path
      d="M 212 0 C 205 70, 215 140, 207 215 S 218 315, 210 375 S 220 440, 214 500"
      fill="none" stroke="#93c5fd" strokeWidth="7" strokeLinecap="round"
      strokeDasharray="14 9" opacity="0.5"
    />
    <text
      x="185" y="258" fontSize="8.5" fill="#93c5fd" fontStyle="italic" fontWeight="600"
      textAnchor="middle" transform="rotate(-87 185 258)" opacity="0.9"
    >Sabarmati River</text>

    {/* ─── SAFE ZONES (Green) ─── */}
    <ellipse cx="95" cy="248" rx="80" ry="58" fill="url(#safeGrad)" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.35"/>
    <ellipse cx="140" cy="330" rx="58" ry="44" fill="url(#safeGrad)" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.3"/>
    <ellipse cx="55" cy="145" rx="50" ry="44" fill="url(#safeGrad)" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.3"/>

    {/* ─── PINK ZONES (Moderate-Safe) ─── */}
    <ellipse cx="128" cy="175" rx="62" ry="44" fill="url(#pinkGrad)" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.3"/>
    <ellipse cx="45" cy="378" rx="42" ry="36" fill="url(#pinkGrad)" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.28"/>
    <ellipse cx="345" cy="330" rx="55" ry="44" fill="url(#pinkGrad)" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.28"/>
    <ellipse cx="420" cy="145" rx="48" ry="40" fill="url(#pinkGrad)" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.25"/>

    {/* ─── AMBER ZONES (Caution) ─── */}
    <ellipse cx="165" cy="400" rx="44" ry="36" fill="url(#amberGrad)" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3"/>
    <ellipse cx="375" cy="205" rx="60" ry="48" fill="url(#amberGrad)" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.28"/>

    {/* ─── UNSAFE ZONES (Red) ─── */}
    <ellipse cx="288" cy="290" rx="52" ry="46" fill="url(#unsafeGrad)" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.38"/>
    <ellipse cx="335" cy="435" rx="58" ry="42" fill="url(#unsafeGrad)" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.32"/>

    {/* ─── MAJOR ROADS ─── */}
    <g fill="none" opacity="0.55">
      {/* SG Road */}
      <path d="M 28 50 L 175 390" stroke="#cbd5e1" strokeWidth="2.5"/>
      {/* CG Road */}
      <path d="M 50 290 L 248 290" stroke="#cbd5e1" strokeWidth="2.5"/>
      {/* Ring Road arc */}
      <path d="M 40 110 Q 245 45, 455 130" stroke="#d1d5db" strokeWidth="2"/>
      <path d="M 40 430 Q 245 490, 455 400" stroke="#d1d5db" strokeWidth="2"/>
      {/* Vertical connector */}
      <path d="M 248 40 L 248 475" stroke="#e2e8f0" strokeWidth="1.5"/>
    </g>

    {/* ─── AREA LABELS ─── */}
    <text x="88" y="245" fontSize="8.5" fontWeight="700" fill="#166534" textAnchor="middle">CG Road</text>
    <text x="88" y="257" fontSize="7.5" fontWeight="500" fill="#166534" textAnchor="middle" opacity="0.8">Bodakdev</text>
    <text x="140" y="328" fontSize="8.5" fontWeight="700" fill="#166534" textAnchor="middle">Navrangpura</text>
    <text x="55" y="143" fontSize="8" fontWeight="700" fill="#166534" textAnchor="middle">Thaltej</text>

    <text x="128" y="173" fontSize="8" fontWeight="700" fill="#9d174d" textAnchor="middle">Naranpura</text>
    <text x="45" y="376" fontSize="7.5" fontWeight="700" fill="#9d174d" textAnchor="middle">Bopal</text>
    <text x="345" y="328" fontSize="8" fontWeight="700" fill="#9d174d" textAnchor="middle">Maninagar</text>
    <text x="420" y="143" fontSize="7.5" fontWeight="700" fill="#9d174d" textAnchor="middle">Chandkheda</text>

    <text x="165" y="398" fontSize="7.5" fontWeight="700" fill="#92400e" textAnchor="middle">Paldi</text>
    <text x="375" y="203" fontSize="8" fontWeight="700" fill="#92400e" textAnchor="middle">Nikol</text>

    <text x="288" y="288" fontSize="8.5" fontWeight="700" fill="#991b1b" textAnchor="middle">Old City</text>
    <text x="288" y="299" fontSize="7" fontWeight="500" fill="#991b1b" textAnchor="middle" opacity="0.8">Kalupur</text>
    <text x="335" y="433" fontSize="8" fontWeight="700" fill="#991b1b" textAnchor="middle">Behrampura</text>

    {/* Region watermarks */}
    <text x="100" y="24" fontSize="8.5" fontWeight="700" fill="#d1d5db" letterSpacing="3.5" textAnchor="middle">WEST</text>
    <text x="365" y="24" fontSize="8.5" fontWeight="700" fill="#d1d5db" letterSpacing="3.5" textAnchor="middle">EAST</text>

    {/* ─── LOCATION PINS ─── */}
    {/* Safe pins */}
    <g filter="url(#pinGlow)">
      <circle cx="92" cy="228" r="5.5" fill="#22c55e" stroke="white" strokeWidth="2.2"/>
      <circle cx="140" cy="312" r="4.5" fill="#22c55e" stroke="white" strokeWidth="1.8"/>
      <circle cx="58" cy="130" r="4.5" fill="#22c55e" stroke="white" strokeWidth="1.8"/>
    </g>
    {/* Pink pins */}
    <circle cx="128" cy="158" r="4" fill="#ec4899" stroke="white" strokeWidth="1.8"/>
    <circle cx="345" cy="312" r="4" fill="#ec4899" stroke="white" strokeWidth="1.8"/>
    {/* Red pins */}
    <g filter="url(#pinGlow)">
      <circle cx="288" cy="272" r="5.5" fill="#ef4444" stroke="white" strokeWidth="2.2"/>
      <circle cx="333" cy="418" r="4" fill="#ef4444" stroke="white" strokeWidth="1.8"/>
    </g>
    {/* Amber pins */}
    <circle cx="375" cy="185" r="4" fill="#f59e0b" stroke="white" strokeWidth="1.8"/>

    {/* Pulse rings — main safe and unsafe */}
    <circle cx="92" cy="228" r="12" fill="none" stroke="#22c55e" strokeWidth="1.5" className="pulse-ring-a"/>
    <circle cx="92" cy="228" r="18" fill="none" stroke="#22c55e" strokeWidth="1" className="pulse-ring-b"/>
    <circle cx="288" cy="272" r="12" fill="none" stroke="#ef4444" strokeWidth="1.5" className="pulse-ring-c"/>

    {/* ─── ROUTE LINE (decorative) ─── */}
    <path
      d="M 92 228 Q 115 268, 140 312"
      fill="none" stroke="#22c55e" strokeWidth="2.5"
      strokeDasharray="7 5" opacity="0.55"
    />

    {/* ─── SAFETY CARD ─── */}
    <rect x="330" y="446" width="132" height="42" rx="11" fill="white" stroke="#e2e8f0" strokeWidth="1.2" opacity="0.97"/>
    <circle cx="352" cy="467" r="11" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5"/>
    <path d="M347 467 L351.5 471.5 L358 463" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="369" y="462" fontSize="8.5" fontWeight="700" fill="#0f172a">Safety Score</text>
    <text x="369" y="473" fontSize="11.5" fontWeight="800" fill="#22c55e">72 / 100</text>
    <text x="369" y="483" fontSize="7.5" fill="#94a3b8">Ahmedabad City</text>
  </svg>
);

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <div className="login-page">
      {/* Left — Form */}
      <div className="login-left">
        <div className="login-form-wrap">
          <div className="login-brand">
            <div className="brand-icon-wrap">
              <ShieldIcon />
            </div>
            <span className="brand-name">Navi Secure</span>
          </div>

          <h1 className="login-heading">Welcome back!</h1>
          <p className="login-sub">Navigate safely. Know your city. Stay protected.</p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <input
                type="text"
                placeholder="Username or Email"
                className={`login-input${error && !username.trim() ? ' input-error' : ''}`}
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                autoComplete="username"
              />
            </div>

            <div className="field-group password-field">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                className={`login-input${error && !password.trim() ? ' input-error' : ''}`}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-pass"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>

            {error && <p className="field-error">{error}</p>}

            <div className="forgot-row">
              <a href="#" className="forgot-link" onClick={e => e.preventDefault()}>Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="divider"><span>or continue with</span></div>

          <div className="social-row">
            <button className="social-btn" aria-label="Continue with Google"><GoogleIcon /></button>
            <button className="social-btn" aria-label="Continue with Apple"><AppleIcon /></button>
            <button className="social-btn" aria-label="Continue with Facebook"><FacebookIcon /></button>
          </div>

          <p className="register-row">
            Not a member?{' '}
            <a href="#" className="register-link" onClick={e => e.preventDefault()}>Register now</a>
          </p>
        </div>
      </div>

      {/* Right — Decorative Safety Map */}
      <div className="login-right">
        <div className="map-card">
          <div className="map-card-header">
            <div className="map-card-title">
              <div className="map-live-dot"></div>
              Live Safety Map · Ahmedabad
            </div>
            <div className="map-card-sub">Updated just now</div>
          </div>

          <SafetyMapDecor />

          <div className="map-card-footer">
            <div className="safety-legend">
              <div className="legend-chip safe"><span className="chip-dot"></span>Safe</div>
              <div className="legend-chip pink"><span className="chip-dot"></span>Moderate</div>
              <div className="legend-chip amber"><span className="chip-dot"></span>Caution</div>
              <div className="legend-chip danger"><span className="chip-dot"></span>Unsafe</div>
            </div>
          </div>
        </div>

        <p className="right-tagline">
          Real-time safety intelligence for every commute.
        </p>
      </div>
    </div>
  );
}
