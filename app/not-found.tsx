import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <div className="bg-canvas py-24">
      <Container className="text-center">
        <h1 className="font-heading text-4xl uppercase tracking-[0.24em] text-neutral-900">Page Not Found</h1>
        <p className="mt-4 text-neutral-700">The placeholder page you requested does not exist.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 font-heading text-sm uppercase tracking-[0.16em] text-black"
        >
          Back Home
        </Link>
      </Container>
    </div>
  );
}
