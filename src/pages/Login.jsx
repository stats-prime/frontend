import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import authApi from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // limpia error al escribir
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      setError("Por favor ingresa tu usuario y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login(form.username, form.password);
      const { access, refresh } = res.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      login(access);
      navigate("/");
    } catch (err) {
      console.error(err);

      if (err.response) {
        // Errores del backend (por ejemplo 400, 401, etc.)
        if (err.response.status === 401) {
          setError("Usuario o contraseña incorrectos.");
        } else if (err.response.status >= 500) {
          setError("Error del servidor. Inténtalo más tarde.");
        } else {
          setError("No se pudo iniciar sesión. Verifica tus datos.");
        }
      } else {
        // Errores de red o desconexión
        setError("Error de conexión. Revisa tu red.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid place-items-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <p className="text-slate-400 text-sm mt-1">Accede a tu cuenta para continuar.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label>Nombre de usuario</Label>
            <Input type="text" name="username" value={form.username} onChange={onChange} required disabled={loading} />
          </div>
          <div>
            <Label>Contraseña</Label>
            <Input type="password" name="password" value={form.password} onChange={onChange} required disabled={loading} />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <Button className="w-full" disabled={loading}>
            {loading ? "Iniciando sesión...": "Entrar"}</Button>
          <a className="block text-center text-sm text-indigo-400 hover:underline" href="/forgot-password">
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </Card>
    </section>
  );
}
