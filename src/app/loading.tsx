export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="h-[400px] bg-zinc-200 rounded-2xl mb-16 w-full"></div>
        
        {/* Title skeleton */}
        <div className="h-10 bg-zinc-200 rounded-md w-48 mb-2"></div>
        <div className="h-4 bg-zinc-200 rounded-md w-64 mb-8"></div>
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-[4/5] bg-zinc-200 rounded-xl mb-4"></div>
              <div className="h-5 bg-zinc-200 rounded-md w-3/4 mb-2"></div>
              <div className="h-5 bg-zinc-200 rounded-md w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
