import type { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import { Em } from "@/components/ui/Section";
import { alternatesVoor, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "NinA AI Agency values the protection of your personal data. Read what data we collect, why, how long we retain it, and what rights you have.",
  alternates: alternatesVoor("/en/privacy"),
};

const downloadHref = "/downloads/privacyverklaring-nina-ai.docx";

export default function PrivacyPageEn() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(12,14,24,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-12 sm:pb-16">
          <div className="reveal-now">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Privacy Policy
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              How we handle <Em>your data</Em>.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-muted">
              NinA AI Agency values the protection of your personal data. This
              privacy policy explains what data we collect, why we do so, how
              long we retain it, and what rights you have.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href={downloadHref}>
                Download privacy policy
              </MagneticButton>
              <p className="text-sm text-text-muted">
                Last updated: March 2026 · Full document in Dutch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy text */}
      <section className="border-t border-border bg-bg-alt">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-20">
          <article className="article-prose">
            <p>
              NinA AI Agency (&ldquo;NinA&rdquo;, &ldquo;we&rdquo; or
              &ldquo;us&rdquo;) values the protection of your personal data.
              This policy applies to all services we offer through our website
              www.nina-ai.nl and in the course of our work. We process
              personal data in accordance with the General Data Protection
              Regulation (GDPR) and other applicable Dutch privacy
              legislation. The Dutch version of this policy, available as a
              download, is the authoritative version.
            </p>

            <h2>1. Who are we?</h2>
            <p>
              NinA AI Agency is an Amsterdam-based company specialized in
              artificial intelligence. We offer three core services: AI
              Knowledge (workshops, masterclasses and keynotes), AI Consult
              (strategic advice) and AI Implementation (AI automations, AI
              agents and workflows).
            </p>
            <ul>
              <li>Company name: NinA AI Agency</li>
              <li>Website: www.nina-ai.nl</li>
              <li>E-mail: info@nina-ai.nl</li>
              <li>Location: Amsterdam, the Netherlands</li>
              <li>Chamber of Commerce (KvK): {site.kvk}</li>
            </ul>

            <h2>2. What personal data do we process?</h2>
            <p>
              Depending on how you get in touch with us, we may process the
              following personal data:
            </p>
            <h3>2.1 Data you provide to us</h3>
            <ul>
              <li>First and last name</li>
              <li>E-mail address</li>
              <li>Phone number</li>
              <li>Company name and job title</li>
              <li>
                Content of messages you send us via contact forms, e-mail or
                social media
              </li>
              <li>
                Data you share when registering for workshops, masterclasses
                or events
              </li>
            </ul>
            <h3>2.2 Data collected automatically</h3>
            <ul>
              <li>IP address</li>
              <li>Browser type and device information</li>
              <li>Pages visited and click behavior on our website</li>
              <li>Date and time of website visits</li>
              <li>Referring website (referrer URL)</li>
            </ul>
            <h3>2.3 Data of clients and principals</h3>
            <ul>
              <li>Contact details of contact persons within the organization</li>
              <li>Billing details (company name, address, VAT number)</li>
              <li>
                Communication and correspondence related to projects and
                assignments
              </li>
              <li>
                Data required for delivering AI implementations, consultancy
                assignments or training
              </li>
            </ul>

            <h2>3. Why do we process personal data?</h2>
            <p>
              We process personal data exclusively for the following purposes,
              each based on the legal ground stated:
            </p>
            <h3>3.1 Performance of a contract</h3>
            <ul>
              <li>
                Delivering our services (AI Knowledge, AI Consult, AI
                Implementation)
              </li>
              <li>Handling requests, quotes and orders</li>
              <li>Invoicing delivered services</li>
              <li>Communicating about the progress of projects</li>
            </ul>
            <h3>3.2 Legitimate interest</h3>
            <ul>
              <li>Improving our website and services</li>
              <li>Analyzing website usage for optimization</li>
              <li>Securing our systems and preventing fraud</li>
              <li>Maintaining relationships with clients and partners</li>
            </ul>
            <h3>3.3 Consent</h3>
            <ul>
              <li>
                Sending newsletters and marketing communication about
                AI-related topics
              </li>
              <li>Placing analytical and marketing cookies</li>
            </ul>
            <p>
              You can withdraw consent at any time. This does not affect the
              lawfulness of processing carried out before withdrawal.
            </p>
            <h3>3.4 Legal obligation</h3>
            <ul>
              <li>
                Complying with tax retention obligations and other legal
                requirements
              </li>
            </ul>

            <h2>4. Cookies</h2>
            <p>
              Our website uses cookies: small text files placed on your device
              when you visit. Functional cookies are required for the website
              to work properly and need no consent. Analytical cookies help us
              understand how visitors use the website; where possible they are
              anonymized, and we ask your consent through our cookie banner
              before placing them. With your consent we may also place
              marketing cookies to show you relevant content and ads on other
              platforms, such as LinkedIn. You can adjust your cookie
              preferences at any time via the cookie banner.
            </p>

            <h2>5. Sharing with third parties</h2>
            <p>
              We only share your personal data with third parties when this is
              necessary for our services, or when we are legally required to.
              We may share data with hosting providers and IT service
              providers, accounting and invoicing software, e-mail marketing
              tools (only with your consent), AI tool providers we use in
              assignments (such as API connections with AI models), and
              analytics services. With all parties processing personal data on
              our behalf we conclude a data processing agreement to guarantee
              an appropriate level of protection.
            </p>
            <h3>5.1 Transfers outside the EU/EEA</h3>
            <p>
              Some of our service and tool providers are located outside the
              European Economic Area (EEA). In those cases we ensure
              appropriate safeguards are in place, such as standard
              contractual clauses (SCCs) approved by the European Commission
              or an adequacy decision.
            </p>

            <h2>6. Retention periods</h2>
            <p>
              We do not keep personal data longer than necessary for the
              purpose it was collected for:
            </p>
            <ul>
              <li>
                Client data and project administration: for the duration of
                the agreement and up to 2 years after termination, unless
                legally required otherwise
              </li>
              <li>Billing data: 7 years (statutory tax retention obligation)</li>
              <li>Newsletter subscribers: until you unsubscribe</li>
              <li>Website statistics and cookie data: up to 26 months</li>
              <li>
                Job application data: up to 4 weeks after the procedure ends,
                unless you consent to a longer period (up to 1 year)
              </li>
            </ul>

            <h2>7. Security</h2>
            <p>
              We take appropriate technical and organizational measures to
              protect your personal data against unauthorized access, loss or
              theft: encrypted connections (SSL/TLS) on our website, access
              restrictions based on necessity, regular updates and security
              patches, strong passwords and two-factor authentication, and
              staff awareness and training on information security.
            </p>

            <h2>8. Your rights</h2>
            <p>
              Under the GDPR you have the following rights regarding your
              personal data:
            </p>
            <ul>
              <li>
                <strong>Right of access</strong> &mdash; you can request which
                personal data we process about you.
              </li>
              <li>
                <strong>Right to rectification</strong> &mdash; you can ask us
                to correct inaccurate or incomplete data.
              </li>
              <li>
                <strong>Right to erasure</strong> &mdash; you can ask us to
                delete your personal data (&ldquo;right to be
                forgotten&rdquo;).
              </li>
              <li>
                <strong>Right to restriction</strong> &mdash; you can ask us
                to temporarily restrict the processing of your data.
              </li>
              <li>
                <strong>Right to data portability</strong> &mdash; you can ask
                us to transfer your data to you or another party in a
                structured, commonly used and machine-readable format.
              </li>
              <li>
                <strong>Right to object</strong> &mdash; you can object to
                processing based on our legitimate interest.
              </li>
              <li>
                <strong>Right to withdraw consent</strong> &mdash; where
                processing is based on your consent, you can withdraw it at
                any time.
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us at info@nina-ai.nl.
              We respond within 4 weeks at the latest. We may ask you to
              identify yourself before handling your request.
            </p>

            <h2>9. Right to complain</h2>
            <p>
              If you are unhappy with how we handle your personal data, we
              would like to hear from you so we can help. You also always have
              the right to file a complaint with the Dutch Data Protection
              Authority (Autoriteit Persoonsgegevens):
              www.autoriteitpersoonsgegevens.nl, phone 088 - 1805 250.
            </p>

            <h2>10. Use of AI tools</h2>
            <p>
              As an AI agency we may use AI tools and models from external
              providers when delivering our services. We handle your data with
              care: we only share personal data with AI tools when necessary
              for the assignment and only with your knowledge; we select AI
              tools that comply with European privacy legislation or for which
              appropriate safeguards exist; where possible we work with
              anonymized or pseudonymized data; and we do not make automated
              decisions based on personal data that have legal consequences
              for you without human involvement.
            </p>

            <h2>11. Social media and online presence</h2>
            <p>
              NinA AI Agency is active on social media platforms, including
              LinkedIn and TikTok. When you interact with our content on these
              platforms, the privacy terms of the platform apply. We have no
              influence on how these platforms process your data. If you
              contact us via social media, we may use the data you share (such
              as your name and message) to answer your question.
            </p>

            <h2>12. Changes to this privacy policy</h2>
            <p>
              We may update this privacy policy from time to time, for example
              when our services, legislation or technology change. The most
              recent version is always available on our website. We recommend
              consulting it regularly; we will actively inform you of material
              changes.
            </p>

            <h2>13. Contact</h2>
            <p>
              Questions about this privacy policy or how we process your
              personal data? Get in touch:
            </p>
            <p>
              NinA AI Agency
              <br />
              E-mail: info@nina-ai.nl
              <br />
              Website: www.nina-ai.nl
              <br />
              Location: Amsterdam, the Netherlands
            </p>
            <hr />
            <p>&copy; NinA AI Agency &ndash; All rights reserved</p>
          </article>

          <div className="mt-12">
            <MagneticButton href={downloadHref} variant="ghost">
              Download privacy policy (.docx, Dutch)
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
