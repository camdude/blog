const SupportGraph = ({ raised, target, minTarget, heading }) => {
  let percentage = 0;
  if (raised >= target) {
    percentage = 100;
  } else {
    percentage = (raised / target) * 100;;
  }
  

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
