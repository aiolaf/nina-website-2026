"use client";

/**
 * Link in de footer om de cookiekeuze te herzien. Een gemaakte keuze moet
 * even eenvoudig terug te draaien zijn als hij te geven was; zonder deze
 * ingang zit een bezoeker vast aan zijn eerste klik.
 */
export default function ConsentHeropenen({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("nina:open-consent"))}
      className="transition-colors hover:text-primary"
    >
      {label}
    </button>
  );
}
