interface msgtype {
  msg: string;
}

export default function Loading({ msg }: msgtype) {
  return (
    <>
      <p className="flex space-x-2 justify-center items-center">
        {msg}
        <span className="sr-only">loading</span>
        <span className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-1 w-1 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-1 w-1 bg-black rounded-full animate-bounce"></span>
      </p>
    </>
  );
}
