import { Container } from "@/components/Container";

export default function ContactPage() {
  return (
    <div className="bg-canvas pb-20 pt-20 md:pb-24 md:pt-24 lg:pb-28 lg:pt-28">
      <Container className="max-w-[1320px]">
        <div className="mx-auto max-w-[780px] rounded-[20px] border border-neutral-300 bg-white px-6 py-8 text-center shadow-[0_18px_38px_rgba(0,0,0,0.06)] md:px-10 md:py-12">
          <h1 className="mb-6 font-heading text-[2rem] uppercase tracking-[0.2em] text-neutral-900 md:text-3xl md:tracking-[0.24em]">
            Contact
          </h1>
          <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
            Contact page placeholder.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500 md:text-base">
            Public inquiry details can be added here when you are ready to publish them.
          </p>
        </div>
      </Container>
    </div>
  );
}
