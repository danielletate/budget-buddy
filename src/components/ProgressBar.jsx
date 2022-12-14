const ProgressBar = ({ amount, max }) => {
  const ratio = (amount / max) * 100;

  return <progress max="100" value={ratio} className="w-full"></progress>;
};

export default ProgressBar;
