export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl animate-pulse">
      <div className="h-10 bg-zinc-200 rounded-lg w-48 mb-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items skeleton */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-zinc-100">
              <div className="w-full sm:w-32 aspect-square bg-zinc-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-grow space-y-3">
                <div className="h-5 bg-zinc-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-zinc-200 rounded-md w-1/2"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-8 bg-zinc-200 rounded-lg w-24"></div>
                  <div className="h-6 bg-zinc-200 rounded-md w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary skeleton */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 space-y-4">
            <div className="h-8 bg-zinc-200 rounded-lg w-32 mb-6"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-zinc-200 rounded w-20"></div>
              <div className="h-4 bg-zinc-200 rounded w-16"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 bg-zinc-200 rounded w-16"></div>
              <div className="h-4 bg-zinc-200 rounded w-12"></div>
            </div>
            <div className="pt-4 border-t border-zinc-200 flex justify-between">
              <div className="h-6 bg-zinc-200 rounded w-16"></div>
              <div className="h-6 bg-zinc-200 rounded w-20"></div>
            </div>
            <div className="h-12 bg-zinc-200 rounded-xl w-full mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
