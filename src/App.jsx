import { useState } from 'react';
import Login from './Login';
import MapCanvas from './MapCanvas';
import './index.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <MapCanvas onLogout={() => setLoggedIn(false)} />
    </div>
  );
}

export default App;
