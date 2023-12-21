import { useEffect, useState } from "react";
import User from "@customTypes/User";
import cancelIcon from "@assets/close-box-outline.svg";
import editIcon from "@assets/note-edit-outline.svg";
import saveIcon from "@assets/content-save-outline.svg";
import { updateText } from "@util/database";

interface Props {
  text: string;
  user: null | User;
}

export default function Text({ text, user }: Props) {
  const [attempted, setAttempted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [formInfo, setFormInfo] = useState({
    value: "",
    valid: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormInfo({
      value: text,
      valid: true,
    });
  }, [text]);

  const handleFormChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setFormInfo({
      value: target.value,
      valid: target.validity.valid,
    });
  };

  const toggleEdit = () => {
    setEditing(!editing);
    setAttempted(false);
    setFormInfo({
      value: text,
      valid: true,
    });
  };

  const submit = async () => {
    setAttempted(true);
    if (formInfo.valid) {
      try {
        setLoading(true);
        await updateText(formInfo.value);
        toggleEdit();
      } catch (err) {
        console.error(err);
        let message = "Unknown error";
        if (err instanceof Error) {
          message = err.message;
          if (message === "Firebase: Error (auth/invalid-credential).") {
            message = "Incorrect email or password";
          }
        }
        if (typeof err === "string") {
          message = err;
        }
        setError(message);
      }
      setLoading(false);
    }
  };

  const showControls = () => {
    if (editing) {
      return (
        <div className="flex gap-4">
          <button
            className="rounded bg-teal-600 p-1 hover:outline focus:outline"
            onClick={submit}
            type="button"
          >
            <img
              alt="submit"
              className="h-[32px] w-[32px] invert-[95%]"
              src={saveIcon}
              title="submit"
            />
          </button>
          <button
            className="rounded bg-rose-700 p-1 hover:outline focus:outline"
            onClick={toggleEdit}
            type="button"
          >
            <img
              alt="cancel"
              className="h-[32px] w-[32px] invert-[95%]"
              src={cancelIcon}
              title="cancel"
            />
          </button>
        </div>
      );
    }

    return (
      <button
        className="rounded bg-neutral-600 p-1 hover:outline focus:outline"
        onClick={toggleEdit}
        type="button"
      >
        <img
          alt="edit"
          className="h-[32px] w-[32px] invert-[95%]"
          src={editIcon}
          title="edit"
        />
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="text-2xl">Loading...</span>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-transparent border-t-neutral-100" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {user ? showControls() : null}
      {editing ? (
        <form className="flex flex-col items-start gap-1 text-xl">
          {attempted && error ? (
            <div className="w-full rounded bg-rose-700 p-2">{error}</div>
          ) : null}
          <textarea
            className="w-full rounded bg-neutral-100 p-2 text-slate-800"
            id="text"
            onChange={handleFormChange}
            required
            rows={3}
            value={formInfo.value || ""}
          />
          {attempted && !formInfo.valid ? (
            <div className="w-full rounded bg-rose-700 p-2">
              Text required
            </div>
          ) : null}
        </form>
      ) : (
        <pre className="whitespace-pre-wrap font-sans text-xl">{text}</pre>
      )}
    </div>
  );
}
