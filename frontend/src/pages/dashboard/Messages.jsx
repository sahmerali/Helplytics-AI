import React, { useState } from "react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1);
  const [messageText, setMessageText] = useState("");

  const chats = [
    { id: 1, name: "Sarah K.", role: "Helper", lastMessage: "Yes, I can jump on a call now.", time: "10:42 AM", avatar: "S", unread: 2 },
    { id: 2, name: "Marcus T.", role: "Requester", lastMessage: "Thanks for the design review!", time: "Yesterday", avatar: "M", unread: 0 },
    { id: 3, name: "Elena R.", role: "Helper", lastMessage: "Let me check the Dockerfile.", time: "Mon", avatar: "E", unread: 0 },
  ];

  const messages = [
    { id: 1, sender: "Sarah K.", text: "Hi! I saw your request about the React useEffect loop.", time: "10:30 AM", isMe: false },
    { id: 2, sender: "You", text: "Hey Sarah! Yes, it's driving me crazy. I'm passing a context object down.", time: "10:35 AM", isMe: true },
    { id: 3, sender: "Sarah K.", text: "Ah, that's a common gotcha. Are you memoizing the object in the provider?", time: "10:40 AM", isMe: false },
    { id: 4, sender: "Sarah K.", text: "Yes, I can jump on a call now if you want to screenshare.", time: "10:42 AM", isMe: false },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-hidden">
      {/* Left Sidebar: Chat List */}
      <Card className="w-80 flex-shrink-0 flex flex-col h-full bg-white hidden md:flex">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Messages</h2>
          <div className="mt-3 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {chats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeChat === chat.id ? "bg-indigo-50 border border-indigo-100" : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold shrink-0 relative">
                {chat.avatar}
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{chat.name}</h4>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Right Panel: Active Chat */}
      <Card className="flex-1 flex flex-col h-full bg-white relative">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">S</div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Sarah K.</h3>
              <p className="text-xs text-emerald-600 flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span> Online
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Call</Button>
            <Button variant="ghost" size="sm">⋮</Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          <div className="text-center">
            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today</span>
          </div>
          
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
              <div className="flex items-end gap-2 max-w-[80%]">
                {!msg.isMe && (
                  <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0 mb-1">
                    S
                  </div>
                )}
                <div 
                  className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${
                    msg.isMe 
                      ? "bg-indigo-600 text-white rounded-br-sm" 
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-8">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">📎</button>
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setMessageText("")}
            />
            <Button variant="primary" className="rounded-full px-6" onClick={() => setMessageText("")}>
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
