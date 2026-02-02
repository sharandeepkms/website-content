"use client"

import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading
                tag="Last Updated"
                title={`Effective Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                subtitle="We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."
              />

              <div className="mt-12 space-y-8 text-gray-700">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
                  <p className="mb-4">
                    We collect information that you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Fill out a contact form or request information</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Register for events or webinars</li>
                    <li>Download resources or whitepapers</li>
                    <li>Apply for a job</li>
                    <li>Use our products or services</li>
                  </ul>
                  <p className="mt-4">
                    The information we collect may include your name, email address, phone number, company name, job title, and any other information you choose to provide.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h3>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Send you technical updates, newsletters, and marketing communications</li>
                    <li>Improve our website, products, and services</li>
                    <li>Process job applications</li>
                    <li>Comply with legal obligations</li>
                    <li>Protect our rights and prevent fraud</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h3>
                  <p className="mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With your consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                    <li>With service providers who assist us in operating our website and conducting our business</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h3>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h3>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and receive a copy of your personal information</li>
                    <li>Rectify inaccurate or incomplete information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your personal information</li>
                    <li>Request restriction of processing</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us at <a href="mailto:privacy@palcnetworks.com" className="text-primary hover:underline">privacy@palcnetworks.com</a>.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h3>
                  <p>
                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Links</h3>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h3>
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h3>
                  <p>
                    Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h3>
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <p className="font-semibold text-gray-900 mb-2">PalC Networks</p>
                    <p className="text-gray-700 mb-1">Email: <a href="mailto:privacy@palcnetworks.com" className="text-primary hover:underline">privacy@palcnetworks.com</a></p>
                    <p className="text-gray-700">Address: 2033 Gateway Place, Ste 500, San Jose, CA 95110</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

