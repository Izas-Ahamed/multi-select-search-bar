const Pill = ({ image, name, onClick }) => {
  return (
    <span className="pill" onClick={onClick}>
      <img src={image} alt="pill_image" />
      <span>{name} &times; </span>
    </span>
  );
};

export default Pill;
