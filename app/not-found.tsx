import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <div className="bg-canvas py-24">
      <Container className="text-center">
        <h1 className="font-heading text-[2.6rem] uppercase tracking-[0.24em] text-neutral-900 md:text-[3.25rem]">Page Not Found</h1>
        <p className="mt-4 text-[1.16rem] text-neutral-700 md:text-[1.22rem]">
          The placeholder page you requested does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-8 py-3 font-heading text-[0.98rem] uppercase tracking-[0.14em] text-black"
        >
          Back Home
        </Link>
      </Container>
    </div>
  );
}
