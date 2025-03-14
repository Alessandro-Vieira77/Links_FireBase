import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header/Header";
import { Input } from "../../components/input/Input";
import { db } from "../../service/fireBaseConnection";
import { toast, ToastContainer } from "react-toastify";
import { getDoc, doc, setDoc } from "firebase/firestore";

export function Network() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    async function social() {
      const linksRef = doc(db, "social", "links");
      const docSnap = await getDoc(linksRef);

      if (docSnap.exists()) {
        setFacebook(docSnap.data().facebook);
        setInstagram(docSnap.data().instagram);
        setYoutube(docSnap.data().youtube);
      } else {
        const notify = toast.error("Erro em buscar links no banco");
        notify;
      }
    }
    social();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "social", "links"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("CADRASTADOS COM SUCESSO!");
        const notify = toast.success("Links salvos");

        notify;
      })
      .catch((error) => {
        console.log("ERRO DE CADASTRO" + error);
      });
  }

  return (
    <div className="flex items-center w-full flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas reded sociais
      </h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2">Link do Facebook</label>
        <Input
          type="url"
          placeholder="Digite sua url do Facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className="text-white font-medium mt-2">Link do Instagram</label>
        <Input
          type="url"
          placeholder="Digite sua url do instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="text-white font-medium mt-2">Link do Youtube</label>
        <Input
          type="url"
          placeholder="Digite sua url do Youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md  items-center justify-center flex mb-7 font-medium cursor-pointer"
        >
          Salvar Links
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
