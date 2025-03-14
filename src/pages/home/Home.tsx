import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { db } from "../../service/fireBaseConnection";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

interface ListProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  instagram: string;
  youtube: string;
}

export function Home() {
  const [links, setLinks] = useState<ListProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as ListProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
      });
    }

    async function getLinkDoc() {
      const socialRef = doc(db, "social", "links");
      const docSnap = await getDoc(socialRef);

      if (docSnap.exists()) {
        setSocialLinks({
          facebook: docSnap.data().facebook,
          instagram: docSnap.data().instagram,
          youtube: docSnap.data().youtube,
        });
      }
    }

    loadLinks();
    getLinkDoc();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <div className="w-full flex justify-center px-4">
        <nav className="flex justify-evenly items-center gap-2.5 w-2xl bg-amber-50 rounded-md h-7 font-medium">
          <Link to="/admin">Links</Link>
          <Link to="/login">Login</Link>
          <Link to="/admin/social">Rede Social</Link>
        </nav>
      </div>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
          Sujeito Programador
        </h1>
        <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>
        {links.map((link) => (
          <section
            key={link.id}
            className="bg-amber-50 mb-4 w-full py-2 rounded-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: link.bg,
              color: link.color,
            }}
          >
            <a className="font-medium" href={link?.url} target="_blank">
              <p>{link?.name}</p>
            </a>
          </section>
        ))}
      </main>
      {socialLinks && Object.keys(socialLinks).length > 0 && (
        <footer className="flex justify-center gap-3 my-4">
          <a href={String(socialLinks?.youtube)} target="_blank">
            <FaYoutube size={35} color="#FFF" />
          </a>
          <a href={String(socialLinks?.facebook)} target="_blank">
            <FaFacebook size={35} color="#FFF" />
          </a>
          <a href={String(socialLinks?.instagram)} target="_blank">
            <FaInstagram size={35} color="#FFF" />
          </a>
        </footer>
      )}
    </div>
  );
}
