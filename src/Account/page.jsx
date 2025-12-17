import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../global/components/LogoutModal";

const AccountPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className="min-h-[calc(93vh)] flex flex-col justify-center w-full max-w-3xl mx-auto py-10 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
        <p className="text-zinc-400">Manage your personal information and preferences.</p>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-zinc-500" />
            Personal Information
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Full Name</label>
              <div className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/50 text-zinc-200">
                <User className="w-4 h-4 text-zinc-500" />
                <span>{user.name || user.firstName ? `${user.firstName} ${user.lastName}` : "User"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Email Address</label>
              <div className="flex items-center gap-3 p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/50 text-zinc-200">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>{user.email || "No email provided"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
};

export default AccountPage;
