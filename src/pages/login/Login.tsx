import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/input/Input";
import { auth } from "../../service/fireBaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navegte = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      return alert("PREENCHA TODOS OS CAMPOS");
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navegte("/admin", { replace: true });
      })
      .catch((erro) => {
        console.log("ERRO DE LOGIN");
        console.log(erro);
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl flex-col px-2"
      >
        <Input
          placeholder="Digite o seu email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="*******"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
