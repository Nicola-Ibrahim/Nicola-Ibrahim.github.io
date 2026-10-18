import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services moved to Work',
  robots: { index: false, follow: true },
};

export default function ServicesRedirectPage() {
  return (
    <main>
      <meta httpEquiv="refresh" content="0;url=/projects#services" />
      <Link href="/projects#services">View services on the Work page</Link>
    </main>
  );
}
