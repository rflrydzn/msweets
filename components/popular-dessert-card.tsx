import Image from "next/image";

export default function DessertCard({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <>
      <div
        key={name}
        className="w-full rounded-t-2xl overflow-hidden  border-b-1  shadow-md"
      >
        {/* Image */}
        <div className="h-96 w-full">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="p-4 text-center">
          <h2 className="xl:text-xl font-dream uppercase font-semibold text-[#d49690] tracking-wider py-5">
            {name}
          </h2>
        </div>
      </div>
    </>
  );
}
