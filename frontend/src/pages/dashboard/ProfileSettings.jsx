import { useAuth } from "../../context/AuthContext";

export default function ProfileSettings() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account details and preferences.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" disabled value={user?.name || ""} className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" disabled value={user?.email || ""} className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input type="text" disabled value={user?.role || ""} className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-500" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 italic">Editing profile and skills will be implemented in the next phase.</p>
        </div>
      </div>
    </div>
  );
}
