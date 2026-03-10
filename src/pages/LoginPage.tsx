import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/data/mock-data';
import { Heart } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const demoAccounts = [
    { ...users[0], label: 'Admin' },
    { ...users[1], label: 'Sales Rep' },
    { ...users[2], label: 'Sales Rep' },
    { ...users[5], label: 'Doctor' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email)) {
      setError('Invalid credentials. Try a demo account.');
    }
  };

  const handleDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    login(demoEmail);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">MedFlow</h1>
          <p className="mt-1 text-sm text-muted-foreground">Medical Sales Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }}
            className="w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            className="w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground tap-target active:bg-primary/90">
            Sign In
          </button>
          <button type="button" className="w-full rounded-lg border py-3 text-sm font-medium text-foreground tap-target">
            Sign in with Google
          </button>
          <p className="text-center text-xs text-muted-foreground">
            <button type="button" className="text-primary hover:underline">Forgot password?</button>
          </p>
        </form>

        <div className="mt-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">Demo Accounts</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-4 space-y-2">
            {demoAccounts.map(acc => (
              <button
                key={acc.id}
                onClick={() => handleDemo(acc.email)}
                className="flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left tap-target active:bg-muted/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {acc.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{acc.name} <span className="text-xs text-muted-foreground">— {acc.label}</span></p>
                  <p className="text-xs text-muted-foreground">{acc.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
