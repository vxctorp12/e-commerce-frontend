export default function OrdersLoading() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-4xl animate-pulse">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-zinc-200 rounded-xl"></div>
        <div className="h-9 bg-zinc-200 rounded-lg w-64"></div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-zinc-100 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-zinc-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-200 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 rounded w-32"></div>
                  <div className="h-5 bg-zinc-200 rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-2 md:text-right">
                <div className="h-4 bg-zinc-200 rounded w-24"></div>
                <div className="h-7 bg-zinc-200 rounded w-28"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-zinc-200 rounded w-20 mb-2"></div>
              {[1, 2].map((j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-4 bg-zinc-200 rounded w-40"></div>
                  <div className="h-4 bg-zinc-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
