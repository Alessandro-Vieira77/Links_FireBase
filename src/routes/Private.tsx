import { ReactNode, useState, useEffect } from "react";
import { auth } from "../service/fireBaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PropsPrivate {
  children: ReactNode;
}

export function Private({ children }: PropsPrivate) {
  const [loading, setLoading] = useState(true);
  const [sing, setSing] = useState(false);

  //   const navegate = useNavigate();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("USUÁRIO LOGADO", user);
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        setLoading(false);
        setSing(true);
      } else {
        console.log("USUÁRIO NÃO LOGADO");
        // setSing(true);
        setLoading(false);
        setSing(false);
      }
    });

    return () => {
      unSub();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!sing) {
    return <Navigate to="/login" />;
  }

  return children;
}
