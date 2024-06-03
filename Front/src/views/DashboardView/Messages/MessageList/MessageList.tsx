import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const MessageList = () => {
  const chats = [
    {
      id: 1,
      name: "Alicia",
      message: "Tengo disponible el horario de 20 a 23.",
      avatar:
        "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    },
    {
      id: 2,
      name: "Martín",
      message: "Genial, si recibo transferencias!",
      avatar:
        "https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    },
    {
      id: 3,
      name: "Carlos",
      message: "Por supuesto mi wps es: ******",
      avatar:
        "https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    },
    {
      id: 4,
      name: "Roberto",
      message: "No los lunes no trabajo",
      avatar:
        "https://placehold.co/200x/2e83ad/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
    },
  ];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="overflow-y-auto h-screen p-3 mb-9 pb-36">
      {chats.map((chat) => (
        <>
          {isLoading ? (
            <>
              <div className="text-center ">
                <Spinner color="warning" label="Cargando" />
              </div>
            </>
          ) : (
            <div
              key={chat.id}
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src={chat.avatar}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{chat.name}</h2>
                <p className="text-gray-600">{chat.message}</p>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default MessageList;
