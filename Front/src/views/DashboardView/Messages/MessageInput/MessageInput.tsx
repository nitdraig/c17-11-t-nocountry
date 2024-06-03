const MessageInput = () => {
  return (
    <div className="bg-white border-t border-gray-300 p-4 absolute bottom-8 w-full">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Escriba un mensaje..."
          className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
        />
        <button className="bg-[#F97D05] hover:bg-[#a5703c] text-white px-4 py-2 rounded-md ml-2">
          Enviar
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
