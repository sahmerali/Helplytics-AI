import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export default function Overview() {
  const { user } = useAuth();

  const stats = [
    { title: "MEMBERS", value: "384+", desc: "Students, mentors, and helpers in the loop." },
    { title: "REQUESTS", value: "72+", desc: "Support posts shared across learning journeys." },
    { title: "SOLVED", value: "69+", desc: "Problems resolved through fast community action." },
  ];

  const coreFlows = [
    { title: "Ask for help clearly", desc: "Create structured requests with category, urgency, AI suggestions, and tags that attract the right people." },
    { title: "Discover the right people", desc: "Use the explore feed, helper lists, and messaging to move quickly once a match happens." },
    { title: "Track real contribution", desc: "Trust scores, badges, solved requests, and rankings help the community recognize meaningful support." },
  ];

  const featuredRequests = [
    { id: 1, title: "Need help", user: "Ayesha Khan", loc: "Karachi", helpers: 1, category: "Web Development", urgency: "High", status: "Solved" },
    { id: 2, title: "Need help making my portfolio responsive before demo day", user: "Sara Noor", loc: "Karachi", helpers: 1, category: "Web Development", urgency: "High", status: "Solved", tags: ["HTML/CSS", "Responsive", "Portfolio"] },
    { id: 3, title: "Looking for Figma feedback on a volunteer event poster", user: "Ayesha Khan", loc: "Lahore", helpers: 1, category: "Design", urgency: "Medium", status: "Open", tags: ["Figma", "Poster", "Design Review"] },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">SMIT Grand Coding Night 2026</h4>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Find help faster.<br/>Become help that matters.
            </h1>
            <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
              HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="bg-teal-600 px-6 py-6 h-auto text-sm">Open product demo</Button>
            <Link to="/dashboard/create">
              <Button variant="outline" className="px-6 py-6 h-auto text-sm bg-white border-gray-200 text-slate-700">Post a request</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-beige-50">
                <CardContent className="p-6">
                  <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-2">{stat.title}</p>
                  <p className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{stat.value}</p>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">{stat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Section: Dark Card */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-8 right-8 h-12 w-12 bg-yellow-400 rounded-full opacity-80 blur-lg"></div>
            <div className="relative z-10 flex flex-col h-full">
               <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">Live Product Feel</h4>
               <h2 className="text-3xl font-bold tracking-tight mb-4 leading-snug">More than a form.<br/>More like an ecosystem.</h2>
               <p className="text-slate-400 text-sm leading-relaxed mb-8">
                 A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
               </p>

               <div className="space-y-4 flex-1">
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <h5 className="font-bold text-sm mb-1">AI request intelligence</h5>
                    <p className="text-[11px] text-slate-400">Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <h5 className="font-bold text-sm mb-1">Community trust graph</h5>
                    <p className="text-[11px] text-slate-400">Badges, helper rankings, trust score boosts, and visible contribution history.</p>
                 </div>
                 <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                    <h5 className="font-bold text-sm mb-1">100%</h5>
                    <p className="text-[11px] text-slate-400">Top trust score currently active across the sample mentor network.</p>
                 </div>
               </div>
            </div>
          </Card>
        </div>
      </div>

      {/* CORE FLOW Section */}
      <div className="space-y-8">
        <div>
          <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Core Flow</h4>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">From struggling alone to solving together</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreFlows.map((flow, idx) => (
            <Card key={idx} className="bg-beige-50">
              <CardContent className="p-8">
                <h5 className="font-bold text-slate-900 mb-3">{flow.title}</h5>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{flow.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FEATURED REQUESTS Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Featured Requests</h4>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Community problems currently in motion</h2>
          </div>
          <Link to="/dashboard/feed">
            <Button variant="outline" className="bg-white border-gray-200 text-slate-700 font-bold">View full feed</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRequests.map((req) => (
            <Card key={req.id} className="bg-beige-50 overflow-hidden">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="primary" className="text-[9px] px-2">{req.category}</Badge>
                  <Badge variant={req.urgency === "High" ? "danger" : "warning"} className="text-[9px] px-2">{req.urgency}</Badge>
                  <Badge variant="success" className="text-[9px] px-2">{req.status}</Badge>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 leading-snug">{req.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold mb-4 uppercase tracking-tighter">help needed</p>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-200/50">
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{req.user}</h5>
                    <p className="text-[10px] text-slate-500 font-bold">{req.loc} • {req.helpers} helper interested</p>
                  </div>
                  <Link to={`/dashboard/request/${req.id}`}>
                    <Button variant="outline" size="sm" className="bg-white border-gray-200 text-slate-900 font-bold h-10 px-4 rounded-full">Open details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-12 text-center border-t border-slate-200/50">
        <p className="text-[10px] font-bold text-slate-400 tracking-wide">
          HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and MongoDB.
        </p>
      </div>
    </div>
  );
}
