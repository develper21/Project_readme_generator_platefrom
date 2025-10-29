import UpdatedProjectsSection from "../components/UpdatedProjectSection";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Repositories</h1>
        <p className="text-gray-600 mt-2">
          Select a repository to generate a professional README file
        </p>
      </div>
      <UpdatedProjectsSection />
    </div>
  );
}
