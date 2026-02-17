import { Mail, ArrowRight, ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import InputField from "../utilities/InputField";

const Forgotpass = ({ setIsForgotPassword }) => {
  const { handleSubmit } = useForm();
  const onForgotSubmit = (data) => {
    console.log("Recovery Email Sent to:", data.email);
    alert("If an account exists, a reset link has been sent.");
    setIsForgotPassword(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button
        onClick={() => setIsForgotPassword(false)}
        className="flex items-center gap-2 text-slate-400 hover:text-green-500 font-bold text-sm mb-6 transition-colors"
      >
        <ChevronLeft size={16} /> Back to Login
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
          Reset Password
        </h2>
        <p className="text-slate-400 font-medium">
          Enter your email to receive recovery instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onForgotSubmit)} className="space-y-6">
        <InputField
          label="Registered Email"
          name="email"
          type="email"
          placeholder="name@hospital.com"
          icon={Mail}
          validation={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          }}
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-500/10 transition-all flex items-center justify-center gap-2 mt-4"
        >
          Send Reset Link
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default Forgotpass;
