"use client";

import PolicyLayout from "@/components/policy/PolicyLayout";

export default function CookiesPolicyPage() {
  return (
    <PolicyLayout title="Cookies Policy" lastUpdated="May 14, 2025">
      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
        <section className="mb-8">
          <p className="mb-4">
            This cookie policy ("Policy") describes what cookies are and how and they're being used by the cactusits.com website ("Website" or "Service") and any of its related products and services (collectively, "Services"). This Policy is a legally binding agreement between you ("User", "you" or "your") and this Website operator ("Operator", "we", "us" or "our"). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms "User", "you" or "your" shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. You should read this Policy so you can understand the types of cookies we use, the information we collect using cookies and how that information is used. It also describes the choices available to you regarding accepting or declining the use of cookies. For further information on how we use, store and keep your personal data secure, see our privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What are cookies?</h2>
          <p className="mb-4">
            Cookies are small pieces of data stored in text files that are saved on your computer or other devices when websites are loaded in a browser. They are widely used to remember you and your preferences, either for a single visit (through a "session cookie") or for multiple repeat visits (using a "persistent cookie").
          </p>
          <p className="mb-4">
            Session cookies are temporary cookies that are used during the course of your visit to the Website, and they expire when you close the web browser.
          </p>
          <p className="mb-4">
            Persistent cookies are used to remember your preferences within our Website and remain on your desktop or mobile device even after you close your browser or restart your computer. They ensure a consistent and efficient experience for you while visiting the Website and Services.
          </p>
          <p className="mb-4">
            Cookies may be set by the Website ("first-party cookies"), or by third parties, such as those who serve content or provide advertising or analytics services on the Website ("third party cookies"). These third parties can recognise you when you visit our website and also when you visit certain other websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What type of cookies do we use?</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <p className="font-semibold">Necessary cookies</p>
              <p>Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our Website and using its features. For example, these cookies let us recognise that you have created an account and have logged into that account to access the content.</p>
            </li>
            <li>
              <p className="font-semibold">Functionality cookies</p>
              <p>Functionality cookies let us operate the Website and Services in accordance with the choices you make. For example, we will recognise your username and remember how you customised the Website and Services during future visits.</p>
            </li>
            <li>
              <p className="font-semibold">Analytical cookies</p>
              <p>These cookies enable us and third party services to collect aggregated data for statistical purposes on how our visitors use the Website. These cookies do not contain personal information such as names and email addresses and are used to help us improve your user experience of the Website.</p>
            </li>
            <li>
              <p className="font-semibold">Social media cookies</p>
              <p>Third party cookies from social media sites (such as Facebook, Twitter, etc) let us track social network users when they visit or use the Website and Services, or share content, by using a tagging mechanism provided by those social networks.</p>
              <p>These cookies are also used for event tracking and remarketing purposes. Any data collected with these tags will be used in accordance with our and social networks' privacy policies. We will not collect or share any personally identifiable information from the user.</p>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What are your cookie options?</h2>
          <p className="mb-4">
            If you don't like the idea of cookies or certain types of cookies, you can change your browser's settings to delete cookies that have already been set and to not accept new cookies. Visit internetcookies.com to learn more about how to do this.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Changes and amendments</h2>
          <p className="mb-4">
            We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.
          </p>
          <p className="mb-4">
            An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other act specified at that time) will constitute your consent to those changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Acceptance of this policy</h2>
          <p className="mb-4">
            You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorised to access or use the Website and Services. This cookie policy was created with the help of WebsitePolicies.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contacting us</h2>
          <p className="mb-4">
            If you have any questions, concerns, or complaints regarding this Policy or the use of cookies, we encourage you to contact us using the details below:
          </p>
          <p className="mb-4 flex items-center">
            <a href="https://cactusits.com/" className="text-primary hover:underline">https://cactusits.com/</a> - 
            <a href="mailto:mirna@cactusits.com" className="text-primary hover:underline ml-2">mirna@cactusits.com</a>
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
}
