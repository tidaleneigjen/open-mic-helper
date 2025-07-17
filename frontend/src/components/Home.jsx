import SessionPreview from "./SessionPreview";
import SetPreview from "./SetPreview";
import SongPreview from "./SongPreview";

export default function Home() {
  return (
    <div className="w-full">
      <SessionPreview />
      <SetPreview />
      <SongPreview />
    </div>
  );
}
