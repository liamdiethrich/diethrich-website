import Image from "next/image";
import { GameProject } from "@/content/gameMusic";
import { LayeredIntensityPlayer } from "./LayeredIntensityPlayer";
import { PlaceholderMedia } from "./PlaceholderMedia";
import { TrackRow } from "./TrackRow";

type GameProjectBlockProps = {
  project: GameProject;
};

export function GameProjectBlock({ project }: GameProjectBlockProps) {
  return (
    <article className="space-y-7">
      <header className="space-y-4">
        <h2 className="font-heading text-[1.35rem] uppercase tracking-[0.2em] text-neutral-900">{project.title}</h2>
        <div className="space-y-4">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} image`}
              width={1200}
              height={675}
              className="h-auto w-full rounded-sm border border-neutral-300"
            />
          ) : (
            <PlaceholderMedia type="image" label="IMAGE PLACEHOLDER - upload game still" className="h-[180px]" />
          )}
          <p className="text-base leading-relaxed text-neutral-700">{project.description}</p>
        </div>
      </header>

      <div className="space-y-4">
        {project.tracks.map((track) => {
          if (track.type === "layered") {
            return <LayeredIntensityPlayer key={track.title} track={track} />;
          }

          return <TrackRow key={track.title} track={track} />;
        })}
      </div>
    </article>
  );
}
