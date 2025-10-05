import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/auth";
export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const loggedIn = login(password);
    if (loggedIn) {
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="absolute inset-0 bg-grid-slate-200/[0.5] dark:bg-grid-slate-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
      <div className="relative z-10 flex flex-col items-center text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold font-display text-slate-800 dark:text-white">
          Aegis AI
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
          Intelligent Insurance Administration
        </p>
      </div>
      <Card className="w-full max-w-sm z-10 shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@aegis.ai"
                defaultValue="admin@aegis.ai"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full active:scale-95 transition-transform">
              Login
            </Button>
            <Button variant="link" size="sm" className="w-full">
              Forgot your password?
            </Button>
          </CardFooter>
        </form>
      </Card>
      <footer className="absolute bottom-8 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
    </main>
  );
}