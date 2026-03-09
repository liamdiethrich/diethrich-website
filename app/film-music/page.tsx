import { Container } from "@/components/Container";
import { FilmGridItem } from "@/components/FilmGridItem";
import { filmMusicItems } from "@/content/filmMusic";

export default function FilmMusicPage() {
  return (
    <div className="bg-canvas pb-24 pt-24 lg:pb-28 lg:pt-32">
      <Container className="max-w-[1320px]">
        <h1 className="mb-16 font-heading text-3xl uppercase tracking-[0.24em] text-neutral-900">Film Music</h1>
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
          {filmMusicItems.map((item) => (
            <FilmGridItem key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
