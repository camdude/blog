const SupportGraph = ({ raised, target, minTarget, heading }) => {
  const percentage = (raised / target) * 100;

  return (
    <div className="SupportGraph">
      <div className="SupportGraph_heading">{heading}</div>
      <div className="SupportGraph_graph">
        <div
          className="SupportGraph_raised"
          style={{ width: `${percentage}%` }}
        >
          <p className="SupportGraph_percentage">{`${percentage.toFixed(
            2
          )}%`}</p>
        </div>
        {minTarget ? (
          <div
            className="SupportGraph_target"
            style={{ left: `${minTarget}%` }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SupportGraph;
