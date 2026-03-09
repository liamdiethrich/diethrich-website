import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { filmMusicItems } from "@/content/filmMusic";

type FilmDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return filmMusicItems.map((item) => ({ slug: item.slug }));
}

export default async function FilmDetailPage({ params }: FilmDetailPageProps) {
  const { slug } = await params;
  const item = filmMusicItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="bg-canvas py-20">
      <Container className="max-w-[1100px]">
        <div className="mb-10 space-y-3 text-center">
          {item.sourceTitle ? (
            <p className="font-heading text-xs uppercase tracking-[0.28em] text-neutral-500">{item.sourceTitle}</p>
          ) : null}
          <h1 className="font-heading text-3xl tracking-[0.16em] text-neutral-900">{item.title}</h1>
        </div>
        {item.videoUrl ? (
          <div className="aspect-video overflow-hidden rounded-[2px] border border-neutral-300 bg-black shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
            <video
              src={item.videoUrl}
              poster={item.posterImage}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full bg-black object-contain"
            />
          </div>
        ) : item.embedUrl ? (
          <div className="aspect-video overflow-hidden rounded-[2px] border border-neutral-300 bg-black shadow-[0_8px_22px_rgba(0,0,0,0.12)]">
            <iframe
              title={item.title}
              src={item.embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
