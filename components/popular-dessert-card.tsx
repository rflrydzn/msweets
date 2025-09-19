import Image from "next/image";

const Desserts = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1599785209796-786432b228bc?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cupcake",
  },

  {
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Cake",
  },

  {
    imageUrl:
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvd25pZXN8ZW58MHx8MHx8fDA%3D",
    name: "Brownies",
  },
];

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
