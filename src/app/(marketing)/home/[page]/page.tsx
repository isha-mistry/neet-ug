import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHeader } from "@/components/common/PageHeader";
import { ContentPageShell } from "@/components/features/content/ContentPageShell";
import { Home01Landing } from "@/components/features/home-01/Home01Landing";
import { Home02Landing } from "@/components/features/home-02/Home02Landing";
import { Home03Landing } from "@/components/features/home-03/Home03Landing";
import { Home04Landing } from "@/components/features/home-04/Home04Landing";
import { Home05Landing } from "@/components/features/home-05/Home05Landing";
import { HOME_01_METADATA } from "@/lib/home-01/content";
import { HOME_02_METADATA } from "@/lib/home-02/content";
import { HOME_03_METADATA } from "@/lib/home-03/content";
import { HOME_04_METADATA } from "@/lib/home-04/content";
import { HOME_05_METADATA } from "@/lib/home-05/content";
import { HOME_NAV_LINKS } from "@/lib/navigation/home-nav";
import { buildMetadata } from "@/lib/seo/metadata";

const HOME_PAGES = new Set(HOME_NAV_LINKS.map((link) => link.href.split("/").pop()!));

interface PageProps {
  params: Promise<{ page: string }>;
}

export function generateStaticParams() {
  return HOME_NAV_LINKS.map((link) => ({
    page: link.href.replace("/home/", ""),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const item = HOME_NAV_LINKS.find((link) => link.href === `/home/${page}`);
  if (!item) {
    return buildMetadata({
      title: "Page Not Found",
      description: "This page could not be found.",
    });
  }
  if (page === "1") {
    return buildMetadata({
      title: HOME_01_METADATA.title,
      description: HOME_01_METADATA.description,
      path: item.href,
    });
  }
  if (page === "2") {
    return buildMetadata({
      title: HOME_02_METADATA.title,
      description: HOME_02_METADATA.description,
      path: item.href,
    });
  }
  if (page === "3") {
    return buildMetadata({
      title: HOME_03_METADATA.title,
      description: HOME_03_METADATA.description,
      path: item.href,
    });
  }
  if (page === "4") {
    return buildMetadata({
      title: HOME_04_METADATA.title,
      description: HOME_04_METADATA.description,
      path: item.href,
    });
  }
  if (page === "5") {
    return buildMetadata({
      title: HOME_05_METADATA.title,
      description: HOME_05_METADATA.description,
      path: item.href,
    });
  }
  return buildMetadata({
    title: item.label,
    description: `${item.label} — MedSeat`,
    path: item.href,
  });
}

export default async function HomeSubPage({ params }: PageProps) {
  const { page } = await params;
  if (!HOME_PAGES.has(page)) {
    notFound();
  }

  const item = HOME_NAV_LINKS.find((link) => link.href === `/home/${page}`)!;

  if (page === "1") {
    return <Home01Landing />;
  }

  if (page === "2") {
    return <Home02Landing />;
  }

  if (page === "3") {
    return <Home03Landing />;
  }

  if (page === "4") {
    return <Home04Landing />;
  }

  if (page === "5") {
    return <Home05Landing />;
  }

  return (
    <ContentPageShell>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: item.label },
        ]}
      />
      <PageHeader title={item.label} description={`Welcome to ${item.label}.`} />
    </ContentPageShell>
  );
}
