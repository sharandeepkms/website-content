"use client"

import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { motion } from 'framer-motion'

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our website and services."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
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
                subtitle="By accessing or using our website, you agree to be bound by these Terms of Service."
              />

              <div className="mt-12 space-y-8 text-gray-700">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using the PalC Networks website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our website.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h3>
                  <p className="mb-4">
                    Permission is granted to temporarily download one copy of the materials on PalC Networks' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Intellectual Property</h3>
                  <p>
                    All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of PalC Networks or its content suppliers and is protected by international copyright laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. User Accounts</h3>
                  <p className="mb-4">
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                  </p>
                  <p>
                    You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Uses</h3>
                  <p className="mb-4">You may not use our website:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>In any way that violates any applicable national or international law or regulation</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                    <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                    <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                    <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer</h3>
                  <p className="mb-4">
                    The materials on PalC Networks' website are provided on an 'as is' basis. PalC Networks makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property</li>
                    <li>Any warranty or representation that the website will be available, secure, or error-free</li>
                    <li>Any warranty regarding the accuracy, likely results, or reliability of the use of the materials on its website</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitations</h3>
                  <p>
                    In no event shall PalC Networks or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PalC Networks' website, even if PalC Networks or a PalC Networks authorized representative has been notified orally or in writing of the possibility of such damage.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Accuracy of Materials</h3>
                  <p>
                    The materials appearing on PalC Networks' website could include technical, typographical, or photographic errors. PalC Networks does not warrant that any of the materials on its website are accurate, complete, or current. PalC Networks may make changes to the materials contained on its website at any time without notice.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">9. Links</h3>
                  <p>
                    PalC Networks has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PalC Networks of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">10. Modifications</h3>
                  <p>
                    PalC Networks may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h3>
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws of the State of California, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h3>
                  <p className="mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <p className="font-semibold text-gray-900 mb-2">PalC Networks</p>
                    <p className="text-gray-700 mb-1">Email: <a href="mailto:legal@palcnetworks.com" className="text-primary hover:underline">legal@palcnetworks.com</a></p>
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

