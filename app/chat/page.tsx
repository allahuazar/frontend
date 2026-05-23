import AIChatInterface from "@/components/AIChatInterface";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EduRender Assistant — Chat Workspace",
  description:
    "Futuristic conversational workspace powered by EduRender AI. Connect concepts, query equations, and build simulations.",
};

export default function ChatPage() {
  return <AIChatInterface />;
}
