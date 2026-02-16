import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const s = supabase.auth.getSession().then(res => {
      if (res?.data?.session) setSession(res.data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  async function signUp(e) {
    e.preventDefault();
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Check your email for a confirmation link (if enabled).');
  }

  async function signIn(e) {
    e.preventDefault();
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Signed in');
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>IFTY — Example App</h1>
      {!session ? (
        <div>
          <p>Register or sign in with email/password.</p>
          <form onSubmit={signIn} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
            <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={signIn} type="button">Sign In</button>
              <button onClick={signUp} type="button">Sign Up</button>
            </div>
          </form>
          {message && <p style={{ color: 'crimson' }}>{message}</p>}
          <p style={{ marginTop: 20 }}>
            After signing in you'll be taken to <a href="/dashboard">your dashboard</a>.
          </p>
        </div>
      ) : (
        <div>
          <p>Signed in as <strong>{session.user.email}</strong></p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="/dashboard"><button>Open Dashboard</button></a>
            <button onClick={signOut}>Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
}
