// Fallback page for solution slugs without dedicated pages
// Main solutions have their own static pages (e.g., sonic-open-networking, cloud-hybrid-cloud)
export const revalidate = 86400 // Revalidate every 24 hours

export default function SolutionPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4 px-6 py-16">
        <h1 className="heading-2 text-gray-900">Solution Not Found</h1>
        <p className="text-gray-600">
          This solution page is not available. Please use the solutions menu to access available solutions.
        </p>
      </div>
    </main>
  )
}

