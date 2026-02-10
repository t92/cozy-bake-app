import { ChevronRight, User, Bell, Globe, Moon, Info, LogOut } from 'lucide-react';

const SettingsPage = () => {
  const settingsItems = [
    { icon: User, label: 'Edit Profile', description: 'Update your personal information' },
    { icon: Bell, label: 'Notifications', description: 'Manage notification preferences' },
    { icon: Globe, label: 'Language', description: 'English' },
    { icon: Moon, label: 'Dark Mode', description: 'Switch to dark theme' },
    { icon: Info, label: 'About', description: 'Version 1.0.0' },
  ];

  return (
    <div className="pb-24 bg-secondary-light min-h-screen">
      <div className="bg-white px-6 pt-12 pb-6"><h1 className="text-3xl font-bold text-gray-800">Settings</h1></div>
      <div className="mx-6 mt-6 p-6 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"><span className="text-2xl font-bold text-white">U</span></div>
          <div className="flex-1"><h3 className="text-lg font-semibold text-gray-800">User Name</h3><p className="text-sm text-gray-500">user@example.com</p></div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} className="text-gray-400" /></button>
        </div>
      </div>
      <div className="mx-6 mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
        {settingsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={item.label} className={`w-full flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors ${index !== settingsItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"><Icon size={20} className="text-gray-600" /></div>
              <div className="flex-1 text-left"><h4 className="font-medium text-gray-800">{item.label}</h4><p className="text-sm text-gray-500">{item.description}</p></div>
              <ChevronRight size={20} className="text-gray-400 flex-shrink-0" />
            </button>
          );
        })}
      </div>
      <div className="mx-6 mt-6">
        <button className="w-full flex items-center justify-center space-x-2 py-4 bg-white rounded-2xl shadow-sm hover:bg-red-50 transition-colors">
          <LogOut size={20} className="text-red-500" /><span className="font-semibold text-red-500">Log Out</span>
        </button>
      </div>
      <div className="text-center mt-8 px-6"><p className="text-sm text-gray-400">Cozy Bake v1.0.0</p><p className="text-xs text-gray-400 mt-1">Made with \u2764\ufe0f for baking enthusiasts</p></div>
    </div>
  );
};

export default SettingsPage;
