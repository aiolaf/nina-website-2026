import { redirect } from "next/navigation";

/** Legacy campaign URL from the live site; content lives at /en/freebies. */
export default function GiveawaysPageEn() {
  redirect("/en/freebies");
}
