function StepHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-300 shrink-0">{title}</h2>
        <div className="h-px bg-slate-200 flex-1 rounded-full mt-1"></div>
      </div>
      <p className="text-slate-500">{subtitle}</p>
    </div>
  );
}
export default StepHeader;