import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/Card";
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
    <div className="h-[calc(100vh-12rem)] flex gap-8">
      {/* Left Sidebar: Chat List */}
      <Card className="w-80 flex-shrink-0 flex flex-col h-full bg-beige-50 border-0 shadow-xl hidden lg:flex">
        <div className="p-8 pb-4">
          <h4 className="text-[10px] font-bold tracking-widest text-teal-600 uppercase mb-2">Network</h4>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Messages</h2>
          <div className="mt-6 relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-white border border-slate-100 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium text-slate-700 shadow-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-start gap-3 p-4 rounded-2xl cursor-pointer transition-all ${
                activeChat === chat.id ? "bg-white shadow-md border border-slate-100" : "hover:bg-white/50 border border-transparent"
              }`}
            >
              <div className="h-11 w-11 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 font-bold shrink-0 relative">
                {chat.avatar}
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-teal-600 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">{chat.unread}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">{chat.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0 ml-2 uppercase">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? "font-bold text-slate-700" : "text-slate-500 font-medium"}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Right Panel: Active Chat */}
      <Card className="flex-1 flex flex-col h-full bg-beige-50 border-0 shadow-xl overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-6 md:p-8 bg-white/50 backdrop-blur-sm border-b border-slate-100 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-lg">S</div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Sarah K.</h3>
              <p className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1.5 tracking-widest">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span> Active Now
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white border-gray-200 text-slate-700 font-bold rounded-full h-11 px-6 text-sm shadow-sm">Voice Call</Button>
            <Button variant="ghost" className="h-11 w-11 p-0 rounded-full bg-white border border-gray-200 text-slate-400">⋮</Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="text-center relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative text-[10px] font-bold text-slate-400 bg-beige-50 px-4 uppercase tracking-widest">Today, Oct 24</span>
          </div>
          
          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
              <div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%]">
                {!msg.isMe && (
                  <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-[10px] shrink-0 mb-1 shadow-sm">
                    S
                  </div>
                )}
                <div 
                  className={`px-6 py-4 rounded-[1.5rem] shadow-sm text-sm font-medium leading-relaxed ${
                    msg.isMe 
                      ? "bg-slate-900 text-white rounded-br-sm" 
                      : "bg-white border border-slate-100 text-slate-800 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              <span className={`text-[9px] font-bold text-slate-400 mt-2 ${msg.isMe ? "pr-2" : "pl-10"} uppercase tracking-tight`}>{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-6 md:p-8 bg-white/50 border-t border-slate-100">
          <div className="flex items-center gap-4 bg-white p-2 rounded-[2rem] border border-slate-100 shadow-lg pr-3">
            <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-teal-600 transition-colors">📎</button>
            <input 
              type="text" 
              placeholder="Type your response intelligence..." 
              className="flex-1 bg-transparent border-0 px-2 text-sm font-medium focus:outline-none text-slate-700 placeholder-slate-400"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setMessageText("")}
            />
            <Button 
              variant="primary" 
              className="bg-teal-600 text-white font-bold h-11 px-8 rounded-full shadow-lg shadow-teal-600/20 active:scale-95" 
              onClick={() => setMessageText("")}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
