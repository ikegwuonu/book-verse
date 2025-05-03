export default function Loading() {
  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-72 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="space-y-4">
        <div className="h-10 w-full md:w-96 bg-gray-200 rounded animate-pulse"></div>

        <div className="border rounded-lg p-6 space-y-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse"></div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse"></div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-24 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="flex justify-end">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
