import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-slate-900 text-neutral-100">
      <h1 className="text-4xl">Error</h1>
      <p>
        Whoopsie doodle. Try going back{" "}
        <Link className="underline" to="/">
          home
        </Link>
        .
      </p>
    </main>
  );
}
