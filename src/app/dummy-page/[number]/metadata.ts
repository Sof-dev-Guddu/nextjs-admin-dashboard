import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { number: string };
}): Promise<Metadata> {
  const title = `Dummy Page - ${params.number}`;
  const description = `This is dummy page number ${params.number}, showcasing links to real calendar and CRUD table modules in the app.`;

  return {
    title,
    description,
    keywords: ['Next.js dynamic route', 'dummy page', 'calendar link', 'table link'],
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/dummy-page/${params.number}`,
      type: 'website',
      siteName: 'Demo Dashboard',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
