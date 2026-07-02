export default function Message({ message, isOwn }) {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col mb-2 ${isOwn ? "items-end" : "items-start"}`}>
      <div
        className={`rounded px-2 py-1 max-w-xs ${
          isOwn ? "bg-emerald-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {!isOwn && (
          <div className="text-xs font-semibold mb-1">{message.username}</div>
        )}
        <div>{message.text}</div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{time}</div>
    </div>
  );
}
