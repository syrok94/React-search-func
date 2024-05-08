// eslint-disable-next-line react/prop-types
const Pill = ({ firstName, onClick }) => {
  return (
    <div onClick={onClick} className="inline-flex items-center rounded-full bg-gray-800 text-white px-3 py-1 m-1 cursor-pointer">
      <p className="text-sm">{firstName}</p>
      <span className="ml-1">&times;</span>
    </div>
  );
};

export default Pill;
