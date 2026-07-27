import { redirect } from "next/navigation";

/** Old ads landing; English visitors land on the workshops page. */
export default function AiStarterRedirectEn() {
  redirect("/en/workshops");
}
