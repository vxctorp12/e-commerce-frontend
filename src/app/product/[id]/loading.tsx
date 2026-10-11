export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 animate-pulse">
      <div className="h-5 bg-zinc-200 rounded w-40 mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Image skeleton */}
        <div className="aspect-[4/5] bg-zinc-200 rounded-3xl"></div>

        {/* Details skeleton */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <div className="h-12 bg-zinc-200 rounded-lg w-3/4 mb-4"></div>
            <div className="h-8 bg-zinc-200 rounded-lg w-32"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-zinc-200 rounded w-full"></div>
            <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
            <div className="h-4 bg-zinc-200 rounded w-2/3"></div>
          </div>
          <div>
            <div className="h-4 bg-zinc-200 rounded w-24 mb-2"></div>
            <div className="h-7 bg-zinc-200 rounded-full w-36"></div>
          </div>
          <div className="h-14 bg-zinc-200 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
}
