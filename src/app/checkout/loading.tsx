export default function CheckoutLoading() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-4xl animate-pulse">
      <div className="h-10 bg-zinc-200 rounded-lg w-52 mb-10"></div>
      <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 space-y-6">
        <div className="h-6 bg-zinc-200 rounded w-40"></div>
        <div className="h-12 bg-zinc-200 rounded-xl w-full"></div>
        <div className="h-12 bg-zinc-200 rounded-xl w-full"></div>
        <div className="h-14 bg-zinc-200 rounded-xl w-full mt-6"></div>
      </div>
    </div>
  );
}
