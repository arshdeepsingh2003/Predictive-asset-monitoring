import "../../styles/components/_cards.scss";

const StatusCard = ({ title, value, color }) => {
  return (
    <div className={`status-card ${color}`}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
};

export default StatusCard;