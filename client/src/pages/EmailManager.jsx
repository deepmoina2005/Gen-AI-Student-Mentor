import React, { useEffect, useState } from "react";
import { Mail, Star, Calendar, User, Paperclip } from "lucide-react";

const EmailManager = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Simulated email data (you can later replace with API call)
  const simulatedEmails = [
    {
      id: 1,
      subject: "Assignment Submission Reminder",
      sender: "Prof. Sharma",
      date: "2025-10-22",
      important: true,
      attachments: true,
      message:
        "Dear Student, please remember to submit your Data Structures assignment by October 25th. Late submissions will not be accepted.",
    },
    {
      id: 2,
      subject: "Upcoming Seminar on AI Ethics",
      sender: "College Admin",
      date: "2025-10-21",
      important: true,
      attachments: false,
      message:
        "Join us for a seminar on 'AI and Ethical Computing' this Friday at 10:00 AM in the main auditorium. Attendance is mandatory for all BCA students.",
    },
    {
      id: 3,
      subject: "Library Fine Notice",
      sender: "Library Department",
      date: "2025-10-19",
      important: false,
      attachments: false,
      message:
        "Our records indicate that you have an overdue library book. Please return it by October 24th to avoid additional fines.",
    },
    {
      id: 4,
      subject: "Exam Schedule Released",
      sender: "Examination Cell",
      date: "2025-10-18",
      important: true,
      attachments: true,
      message:
        "The final exam schedule for BCA 3rd Semester has been released. Kindly check the attached PDF for detailed timings.",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setEmails(simulatedEmails);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="h-full p-6 bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Email Manager</h1>
        <p className="text-sm text-slate-600 mt-1">
          View your important academic and administrative emails
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email List */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-600" /> Inbox
              </h2>
              <p className="text-xs text-slate-500">{emails.length} emails</p>
            </div>
            <div className="divide-y divide-gray-100">
              {emails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedEmail?.id === email.id
                      ? "bg-emerald-50 border-l-4 border-emerald-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-slate-800 text-sm truncate">
                      {email.subject}
                    </h3>
                    {email.important && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {email.sender}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(email.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Email Details */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            {selectedEmail ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {selectedEmail.subject}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedEmail.sender} •{" "}
                      {new Date(selectedEmail.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {selectedEmail.attachments && (
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
                      <Paperclip className="w-3 h-3" /> Attachment
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedEmail.message}
                </p>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-center">
                <Mail className="w-10 h-10 text-slate-400 mb-3" />
                <p className="text-slate-500 text-sm">
                  Select an email from the list to read its details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailManager;
