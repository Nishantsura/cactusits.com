"use client";

import PolicyLayout from "@/components/policy/PolicyLayout";

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="May 14, 2025">
      <div>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            At Cactus IT Solutions, we respect your privacy and are committed to
            protecting your personal data. This privacy policy will inform you
            about how we look after your personal data when you visit our
            website and tell you about your privacy rights and how the law
            protects you.
          </p>
          <p className="mb-4">
            This privacy policy applies to personal data we process when you use
            or interact with our website, cactusits.com, and any other services
            we offer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal
            data about you which we have grouped together as follows:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Identity Data</strong> includes first name, last name,
              username or similar identifier.
            </li>
            <li>
              <strong>Contact Data</strong> includes email address, telephone
              numbers, and physical address.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP)
              address, browser type and version, time zone setting and location,
              browser plug-in types and versions, operating system and platform,
              and other technology on the devices you use to access this
              website.
            </li>
            <li>
              <strong>Usage Data</strong> includes information about how you use
              our website and services.
            </li>
            <li>
              <strong>Marketing and Communications Data</strong> includes your
              preferences in receiving marketing from us and our third parties
              and your communication preferences.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most
            commonly, we will use your personal data in the following
            circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Where we need to perform the contract we are about to enter into
              or have entered into with you.
            </li>
            <li>
              Where it is necessary for our legitimate interests (or those of a
              third party) and your interests and fundamental rights do not
              override those interests.
            </li>
            <li>Where we need to comply with a legal obligation.</li>
            <li>
              Where you have provided consent for us to process your personal
              data for a specific purpose.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your
            personal data from being accidentally lost, used or accessed in an
            unauthorized way, altered or disclosed. In addition, we limit access
            to your personal data to those employees, agents, contractors and
            other third parties who have a business need to know.
          </p>
          <p className="mb-4">
            We have put in place procedures to deal with any suspected personal
            data breach and will notify you and any applicable regulator of a
            breach where we are legally required to do so.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Legal Rights</h2>
          <p className="mb-4">
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data. These include the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
          <p className="mb-4">
            You will not have to pay a fee to access your personal data (or to
            exercise any of the other rights). However, we may charge a
            reasonable fee if your request is clearly unfounded, repetitive or
            excessive. Alternatively, we could refuse to comply with your
            request in these circumstances.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Cookies</h2>
          <p className="mb-4">
            You can set your browser to refuse all or some browser cookies, or
            to alert you when websites set or access cookies. If you disable or
            refuse cookies, please note that some parts of this website may
            become inaccessible or not function properly.
          </p>
          <p className="mb-4">
            For more information about the cookies we use, please see our{" "}
            <a href="/cookies-policy" className="text-primary hover:underline">
              Cookie Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
          <p className="mb-4">
            This website may include links to third-party websites, plug-ins and
            applications. Clicking on those links or enabling those connections
            may allow third parties to collect or share data about you. We do
            not control these third-party websites and are not responsible for
            their privacy statements. When you leave our website, we encourage
            you to read the privacy policy of every website you visit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Changes to the Privacy Policy
          </h2>
          <p className="mb-4">
            We reserve the right to update this privacy policy at any time. Any
            changes to our privacy policy will be posted on this page. You
            should check this page from time to time to ensure you are happy
            with any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions or comments about this privacy policy, please
            contact us at:
          </p>
          <p className="mb-4 flex items-center">
            <span className="mr-2">📧</span>
            <a
              href="mailto:mirna@cactusits.com"
              className="text-primary hover:underline"
            >
              mirna@cactusits.com
            </a>
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
