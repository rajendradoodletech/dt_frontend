import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Our Privacy Policy page explains how we handle your data." />
      </Head>
      <main style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Privacy Policy</h1>
        <p>Last updated: [Insert Date]</p>

        <h2>Introduction</h2>
        <p>
          Welcome to [Your Company Name]! Your privacy is important to us. This Privacy Policy outlines how we collect,
          use, and protect your information.
        </p>

        <h2>Information We Collect</h2>
        <ul>
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Usage data (IP address, browser type, operating system, etc.)</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To analyze and improve our service</li>
        </ul>

        <h2>Sharing Your Information</h2>
        <p>
          We do not share your personal information with third parties, except in the following cases:
        </p>
        <ul>
          <li>When required by law</li>
          <li>To protect and defend our legal rights</li>
        </ul>

        <h2>Your Data Protection Rights</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
          <li>The right to access, update, or delete the information we have about you</li>
          <li>The right to object to the processing of your data</li>
          <li>The right to data portability</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use cookies to improve your experience on our website. You can manage your cookie preferences through your browser settings.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at [your email address].
        </p>
      </main>
    </>
  );
};

export default PrivacyPolicy;
