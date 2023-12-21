interface Props {
  imagePath: string;
  imageURL: string;
  setLoading: (value: boolean) => void;
}

export default function Image({ imagePath, imageURL, setLoading }: Props) {
  return (
    <img
      alt=""
      className="max-h-[320px]"
      onLoad={() => {
        setLoading(false);
      }}
      src={imageURL}
    />
  );
}
