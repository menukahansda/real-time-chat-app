export default function Message({ message, isOwn }) {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col mb-1.5 ${isOwn ? "items-end" : "items-start"}`}>
      <div
        className={` inline-block rounded px-1 py-0.5 min-w-[60px] max-w-[240px] ${
          isOwn ? "bg-emerald-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {!isOwn && (
          <div className="text-[11px] font-semibold leading-none mb-[2px]">{message.username}</div>
        )}
        <div className="text-sm leading-tight break-words">{message.text}</div>
      </div>
      <div className="text-xs text-gray-500 mt-0.5">{time}</div>
    </div>
  );
}
