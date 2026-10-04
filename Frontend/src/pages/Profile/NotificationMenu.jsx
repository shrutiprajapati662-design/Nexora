import { ArrowLeft, Bell, Briefcase, CheckCircle, XCircle, MessageSquare } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Application Accepted",
    message: "Google accepted your application for Frontend Developer.",
    time: "2 min ago",
    icon: CheckCircle,
    color: "text-green-400",
    unread: true,
  },
  {
    id: 2,
    title: "Recruiter Message",
    message: "Microsoft recruiter sent you a new message.",
    time: "1 hour ago",
    icon: MessageSquare,
    color: "text-cyan-400",
    unread: true,
  },
  {
    id: 3,
    title: "New Jobs Available",
    message: "25 new MERN Developer jobs were posted.",
    time: "Today",
    icon: Briefcase,
    color: "text-blue-400",
    unread: false,
  },
  {
    id: 4,
    title: "Application Rejected",
    message: "Amazon rejected your application.",
    time: "Yesterday",
    icon: XCircle,
    color: "text-red-400",
    unread: false,
  },
];

function NotificationMenu({ onBack }) {
  return (
    <div className="flex h-full flex-col bg-slate-900">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

        <div className="flex items-center gap-3">

          <button
            onClick={onBack}
            className="rounded-lg p-2 hover:bg-slate-800"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>

          <h2 className="text-xl font-bold text-white">
            Notifications
          </h2>

        </div>

        <button className="text-sm text-blue-400 hover:text-blue-300">
          Mark all read
        </button>

      </div>

      {/* Notification List */}

      <div className="flex-1 overflow-y-auto">

        {notifications.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.id}
              className={`border-b border-slate-800 p-5 transition hover:bg-slate-800/40 ${
                item.unread && "bg-blue-500/5"
              }`}
            >

              <div className="flex gap-4">

                <div
                  className={`mt-1 rounded-full bg-slate-800 p-3 ${item.color}`}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h3 className="font-semibold text-white">
                      {item.title}
                    </h3>

                    {item.unread && (
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                    )}

                  </div>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {item.time}
                  </p>

                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">

        <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
          View All Notifications
        </button>

      </div>

    </div>
  );
}

export default NotificationMenu;