const CakeCard = ({ name, imageUrl }: { name: string; imageUrl: string }) => {
  return (
    <div className=" relative mx-2">
      <img
        src={imageUrl}
        alt={name}
        className="w-full object-cover h-64"
        draggable={false}
      />
      <div className="absolute bottom-0 bg-black/60 w-full text-center py-3">
        <h2 className="text-white font-dream lg:text-2xl">{name}</h2>
      </div>
    </div>
  );
};

export default CakeCard;
