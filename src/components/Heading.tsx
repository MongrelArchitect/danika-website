import { useEffect, useState } from "react";
import User from "@customTypes/User";
import cancelIcon from "@assets/close-box-outline.svg";
import editIcon from "@assets/note-edit-outline.svg";
import saveIcon from "@assets/content-save-outline.svg";
import { updateHeading } from "@util/database";

interface Props {
  heading: string;
  user: null | User;
}

export default function Heading({ heading, user }: Props) {
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
      value: heading,
      valid: true,
    });
  }, [heading]);

  const handleFormChange = (event: React.SyntheticEvent) => {
    setError(null);
    const target = event.target as HTMLInputElement;
    setFormInfo({
      value: target.value,
      valid: target.validity.valid,
    });
  };

  const toggleEdit = () => {
    setEditing(!editing);
    setError(null);
    setAttempted(false);
    setFormInfo({
      value: heading,
      valid: true,
    });
  };

  const submit = async () => {
    setAttempted(true);
    if (formInfo.valid) {
      try {
        setLoading(true);
        await updateHeading(formInfo.value);
        toggleEdit();
      } catch (err) {
        console.error(err);
        let message = "Unknown error";
        if (err instanceof Error) {
          message = err.message;
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
        <form className="flex flex-col items-start gap-1 text-2xl">
          {attempted && error ? (
            <div className="w-full rounded bg-rose-700 p-2">{error}</div>
          ) : null}
          <input
            className="w-full rounded bg-neutral-100 p-2 text-slate-800"
            type="text"
            id="heading"
            onChange={handleFormChange}
            required
            value={formInfo.value || ""}
          />
          {attempted && !formInfo.valid ? (
            <div className="w-full rounded bg-rose-700 p-2">
              Heading required
            </div>
          ) : null}
        </form>
      ) : (
        <h1 className="text-4xl">{heading}</h1>
      )}
    </div>
  );
}
