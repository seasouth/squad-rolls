import React from "react";
import Chat from "./Chat";

interface ChatPageProps {
  params: Promise<{ chat: string }>;
}

const Page: React.FC<ChatPageProps>  = ({ params }) => {
    const { chat } = React.use(params)
    console.log("Chat ID:", chat);
    return (
        <Chat chat={chat} />
    );
}

export default Page;