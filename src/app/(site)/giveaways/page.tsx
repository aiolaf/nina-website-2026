import { redirect } from "next/navigation";

/** Oude actie-URL van de live site; content leeft onder /freebies. */
export default function GiveawaysPage() {
  redirect("/freebies");
}
