import { useState, FormEvent, useEffect } from "react";
import { Header } from "../../components/header/Header";
import { Input } from "../../components/input/Input";
import { FiTrash } from "react-icons/fi";
import { db } from "../../service/fireBaseConnection";
import { ToastContainer, toast } from "react-toastify";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  deleteDoc,
  query,
  doc,
} from "firebase/firestore";

interface ListProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [NameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [links, setLinks] = useState<ListProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let list = [] as ListProps[];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(list);
    });

    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (NameInput === "" || urlInput === "") {
      const notify = toast.error("Os campos não podem está vazio");
      notify;
      return;
    }

    addDoc(collection(db, "links"), {
      name: NameInput,
      url: urlInput,
      color: textColorInput,
      bg: backgroundColorInput,
      created: new Date(),
    })
      .then(() => {
        const notify = toast.success("Link cadastrado");
        notify;
        setNameInput("");
        setUrlInput("");
      })
      .catch((error) => {
        console.log("Error ao cadastrar ono banco" + error);
      });
  }

  async function handleDeleteLink(id: string) {
    console.log(id);
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={NameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Nome da url</label>
        <Input
          placeholder="Digite o nome da url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex justify-center w-full py-4 gap-5">
          <div className="flex items-center gap-1.5">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
          <label className="text-white font-medium mt-2 mb-2">
            Veja como etá ficando:
          </label>
          {NameInput !== "" && (
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between px-2 py-2  rounded-md"
              style={{
                marginTop: 8,
                marginBlock: 8,
                backgroundColor: backgroundColorInput,
                color: textColorInput,
              }}
            >
              <p className="text-xl font-medium">{NameInput}</p>
            </article>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-400 text-white font-medium py-2 px-2 rounded-md cursor-pointer"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-2xl text-white mb-2">Meus links</h2>
      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none"
          style={{
            backgroundColor: link.bg,
            color: link.color,
          }}
        >
          <p className="font-medium">{link.name}</p>

          <div>
            <button
              onClick={() => handleDeleteLink(link.id)}
              className="border border-dashed p-1 rounded cursor-pointer"
            >
              <FiTrash size={18} color="#FFF" />
            </button>
          </div>
        </article>
      ))}
      <ToastContainer />
    </div>
  );
}
