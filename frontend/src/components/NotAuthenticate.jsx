import { AlertTriangle } from "lucide-react";

const NotAuthenticate = () => {
  return (
    <div>
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bg-green-100 border-b border-green-200 py-3 px-4 flex items-center justify-between shadow-md animate-bounce-short">
          <p className="text-green-800 text-sm font-medium">
            <AlertTriangle />
            Please <span className="font-bold">Login or Register</span> to book
            an appointment.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="text-green-600 text-sm font-bold hover:underline"
            >
              Login Now
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="text-green-500 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotAuthenticate;
