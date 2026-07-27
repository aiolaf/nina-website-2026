import { redirect } from "next/navigation";

/** /resources heette op de oude site ook wel /ai-kennis; één pagina. */
export default function ResourcesRedirect() {
  redirect("/ai-kennis");
}
