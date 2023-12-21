import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "@util/firebase";
import { UserContext } from "@contexts/UserContext";
import Homepage from "@customTypes/Homepage";
import Heading from "@components/Heading";
import Image from "@components/Image";
import Text from "@components/Text";

export default function Home() {
  const user = useContext(UserContext);

  const [content, setContent] = useState<Homepage>({
    heading: "",
    text: "",
    imageURL: "",
    imagePath: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <main className="relative flex w-full max-w-[700px] flex-col items-center justify-center gap-8 bg-inherit">
        {loading ? (
          <div className="absolute z-10 flex h-full w-full items-center justify-center gap-4 bg-inherit text-4xl">
            <span>Loading...</span>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-transparent border-t-neutral-100" />
          </div>
        ) : null}

        <Heading heading={content.heading} user={user} />

        <Image
          setLoading={setLoading}
          imagePath={content.imagePath}
          imageURL={content.imageURL}
          user={user}
        />

        <Text text={content.text} user={user} />
      </main>
    );
  };

  return <>{displayContent()}</>;
}
