import { notFound } from "next/navigation";
import { executiveSections } from "@/data/executive-analysis";
import { ExecutiveSectionView } from "@/components/analysis/ExecutiveSectionView";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return executiveSections.map((s) => ({ slug: s.slug }));
}

export default function LeadershipAnalysisSectionPage({ params }: Props) {
  const section = executiveSections.find((s) => s.slug === params.slug);
  if (!section) notFound();
  return <ExecutiveSectionView section={section} />;
}
