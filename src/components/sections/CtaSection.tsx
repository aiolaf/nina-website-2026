import CtaDonker from "./CtaDonker";

type Props = {
  title?: string;
  sub?: string;
  label?: string;
};

/**
 * De afsluitende CTA van een subpagina. Sinds de huisstijl "Licht" is dit de
 * donkere merk-sectie met violette gloed: het ene NinA-moment per pagina.
 *
 * Blijft bestaan als eigen component omdat vier pagina's hem met eigen titel
 * en subregel aanroepen; de opmaak zelf komt uit CtaDonker.
 */
export default function CtaSection({
  title = "Zet samen de eerste stap.",
  sub = "Plan een vrijblijvend kennismakingsgesprek van 15 minuten, of vraag direct een lezing of workshop aan.",
  label = "Kennismaken",
}: Props) {
  return <CtaDonker label={label} title={title} sub={sub} />;
}
