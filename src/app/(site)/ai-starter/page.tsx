import { redirect } from "next/navigation";

/**
 * /ai-starter was op de oude site een ads-landing die inhoudelijk
 * overlapt met /lezingen-workshops; oude campagnelinks landen daar.
 */
export default function AiStarterRedirect() {
  redirect("/lezingen-workshops");
}
