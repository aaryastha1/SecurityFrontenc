export default function ProductItem({ name, category, price }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg mb-2 hover:shadow">
      <div>
        <h3 className="text-md font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          ${price}
        </span>
        <button className="text-gray-500 hover:text-black">
          ✏️
        </button>
      </div>
    </div>
  );
}
