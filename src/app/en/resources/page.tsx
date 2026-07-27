import { redirect } from "next/navigation";

/** /en/resources and /en/ai-knowledge are the same page; keep one. */
export default function ResourcesRedirectEn() {
  redirect("/en/ai-knowledge");
}
