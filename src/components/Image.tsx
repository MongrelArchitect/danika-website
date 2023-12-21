import { useState } from "react";
import cancelIcon from "@assets/close-box-outline.svg";
import editIcon from "@assets/note-edit-outline.svg";
import saveIcon from "@assets/content-save-outline.svg";
import User from "@customTypes/User";
import { updateImage } from "@util/database";

interface Props {
  imagePath: string;
  imageURL: string;
  setLoading: (value: boolean) => void;
  user: null | User;
}

interface NewImage {
  file: null | File;
  valid: boolean;
}

export default function Image({
  imagePath,
  imageURL,
  setLoading,
  user,
}: Props) {
  const [attempted, setAttempted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [newImage, setNewImage] = useState<NewImage>({
    file: null,
    valid: false,
  });

  const submit = async () => {
    setAttempted(true);
    if (newImage.file && newImage.valid) {
      try {
        setLoading(true);
        await updateImage(newImage.file, imagePath);
        toggleEdit();
      } catch (err) {
        setLoading(false);
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
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
    setError(null);
    setAttempted(false);
    setNewImage({
      file: null,
      valid: false,
    });
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
            onClick={() => {
              setLoading(true);
              toggleEdit();
            }}
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

  const checkValidImage = (file: null | File) => {
    if (file && file.type.split("/")[0] === "image") {
      return true;
    }
    return false;
  };

  const handleFormChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    setNewImage({
      file: file || null,
      valid: checkValidImage(file || null),
    });
  };

  const displayForm = () => {
    return (
      <form>
        <label
          className="cursor-pointer rounded bg-neutral-600 p-2 text-2xl hover:outline focus:outline"
          htmlFor="file"
        >
          Choose file
        </label>
        <input
          accept="image/*"
          className="hidden"
          type="file"
          id="file"
          onChange={handleFormChange}
          required
        />
      </form>
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {user ? showControls() : null}
      {editing ? (
        <div className="flex flex-col items-center gap-4">
          {newImage.file && checkValidImage(newImage.file) ? (
            <img
              alt=""
              className="w-[128px]"
              src={URL.createObjectURL(newImage.file)}
            />
          ) : null}
          {displayForm()}
          <div>{newImage.file ? newImage.file.name : "No file chosen"}</div>
          {attempted && !newImage.valid ? (
            <div className="w-full rounded bg-rose-700 p-2">Image required</div>
          ) : null}
          {attempted && error ? (
            <div className="w-full rounded bg-rose-700 p-2">{error}</div>
          ) : null}
        </div>
      ) : (
        <img
          alt=""
          className="max-h-[320px]"
          onLoad={() => {
            setLoading(false);
          }}
          src={imageURL}
        />
      )}
    </div>
  );
}
