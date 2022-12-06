const ProgressBar = ({ amount, max }) => {
  const ratio = (amount / max) * 100;

  return (
    <div className="h-4 w-full bg-slate-300 rounded-full">
      <div
        style={{ width: `${ratio}%` }}
        className={`h-full rounded-lg ${
          ratio < 70 ? 'bg-[#49d919]' : 'bg-[#f91f10]'
        }`}
      ></div>
    </div>
  );
};

export default ProgressBar;
