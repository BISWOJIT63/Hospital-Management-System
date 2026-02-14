const RoleButton = ({ role, label, icon: Icon, userRole, setUserRole }) => {
  return (
    <button
      type="button"
      onClick={() => setUserRole(role)}
      className={`flex-1 py-2.5 px-4 flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-bold text-sm border ${
        userRole === role
          ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-100 scale-105"
          : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100 hover:text-gray-600"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
};

export default RoleButton;
