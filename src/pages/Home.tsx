import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "@util/firebase";

import Homepage from "@customTypes/Homepage";

export default function Home() {
  const [content, setContent] = useState<Homepage>({
    heading: "",
    text: "",
    imageURL: "",
    imagePath: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(database, "content", "homepage"), (docu) => {
      const data = docu.data() as Homepage;
      setContent(data);
    });
    return () => {
      unsub();
    };
  }, []);

  const displayContent = () => {
    return (
      <div className="relative flex flex-col items-center justify-center gap-8 bg-inherit">
        {loading ? (
          <div className="absolute flex h-full w-full items-center justify-center gap-4 bg-inherit text-4xl">
            <span>Loading...</span>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-transparent border-t-neutral-100" />
          </div>
        ) : null}
        <h1 className="text-4xl">{content.heading}</h1>
        <img
          alt=""
          className="max-h-[320px]"
          onLoad={() => {
            setLoading(false);
          }}
          src={content.imageURL}
        />
        <p>{content.text}</p>
      </div>
    );
  };

  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-slate-900 p-4 text-center text-neutral-100">
      {displayContent()}
    </div>
  );
}
