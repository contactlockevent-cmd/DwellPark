export default function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden bg-dp-ocean/15 animate-pulse">
      <div className="aspect-[4/3] bg-dp-ocean/30" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start gap-3">
          <div className="h-4 bg-dp-ocean/40 rounded-full w-2/3" />
          <div className="h-4 bg-dp-ocean/30 rounded-full w-10 flex-shrink-0" />
        </div>
        <div className="h-3 bg-dp-ocean/25 rounded-full w-1/2" />
        <div className="flex gap-2 pt-1">
          <div className="h-6 w-14 bg-dp-ocean/30 rounded-full" />
          <div className="h-6 w-12 bg-dp-ocean/30 rounded-full" />
          <div className="h-6 w-16 bg-dp-ocean/30 rounded-full" />
        </div>
        <div className="h-px bg-dp-ocean/20 !mt-4" />
        <div className="flex justify-between items-center pt-1">
          <div className="h-7 w-20 bg-dp-ocean/35 rounded-full" />
          <div className="h-8 w-24 bg-dp-ocean/25 rounded-full" />
        </div>
      </div>
    </div>
  );
}
