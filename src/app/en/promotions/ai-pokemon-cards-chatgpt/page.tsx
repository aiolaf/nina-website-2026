import { redirect } from "next/navigation";

/** Legacy campaign URL; content lives on the Dutch promo page. */
export default function Page() {
  redirect("/promoties/ai-pokemon-kaarten-chatgpt");
}
