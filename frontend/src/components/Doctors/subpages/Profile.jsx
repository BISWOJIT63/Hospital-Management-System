import {
  Star,
  MapPin,
  Award,
  Calendar,
  ShieldCheck,
  Stethoscope,
  Share2,
  Heart,
  MessageSquare,
  Phone,
  Video,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

const Profile = ({DOCTOR,isFavorite,setIsFavorite}) => {
  return (
    <div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 justify-between">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                <img
                  src={DOCTOR.image}
                  alt={DOCTOR.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  Available
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  {DOCTOR.name}
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {DOCTOR.title}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Dentist - English, French, German
                </p>
                <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 pt-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{DOCTOR.location}</span>
                  <a href="#" className="text-green-600 hover:underline ml-1">
                    (Get Direction)
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Actions & Status */}
            <div className="flex flex-col justify-between items-start lg:items-end gap-4">
              <div className="flex gap-2 w-full justify-end">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 bg-slate-50 border dark:bg-slate-700  dark:border-slate-800 border-slate-200 rounded-lg hover:bg-slate-100 transition"
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-primary text-green-500" : "text-slate-600 dark:text-slate-200"}`}
                  />
                </button>
                <button className="p-2 bg-slate-50 border dark:bg-slate-700  dark:border-slate-800 border-slate-200 rounded-lg hover:bg-slate-100 transition">
                  <Share2 className="w-4 h-4 text-slate-600 dark:text-slate-200" />
                </button>
                <button className="p-2 bg-slate-50 dark:bg-slate-700  dark:border-slate-800 border border-slate-200 rounded-lg hover:bg-slate-100 transition">
                  <Info className="w-4 h-4 text-slate-600 dark:text-slate-200" />
                </button>
              </div>

              <div className="space-y-3 w-full lg:text-right">
                {DOCTOR.acceptingPatients && (
                  <div className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 lg:ml-auto">
                    <CheckCircle2 className="w-4 h-4" />
                    Accepting New Patients
                  </div>
                )}

                <div className="flex items-center gap-2 lg:justify-end">
                  <div className="flex text-green-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold">{DOCTOR.rating}</span>
                  <span className="text-slate-500 text-sm hover:underline cursor-pointer">
                    ({DOCTOR.reviewsCount} Reviews)
                  </span>
                </div>

                <div className="flex gap-2 lg:justify-end">
                  <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-slate-50 border border-slate-200 rounded dark:bg-slate-950 dark:border-slate-600 hover:bg-slate-100">
                    <MessageSquare className="w-3.5 h-3.5 text-green-600" />{" "}
                    Chat
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-slate-50 border border-slate-200 rounded dark:bg-slate-950 dark:border-slate-600 hover:bg-slate-100">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> Audio
                    Call
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-slate-50 border border-slate-200 rounded dark:bg-slate-950 dark:border-slate-600 hover:bg-slate-100">
                    <Video className="w-3.5 h-3.5 text-purple-600" /> Video Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="bg-white dark:bg-slate-800 border-t border-slate-100 p-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-md">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">
                Nearly {DOCTOR.appointmentsBooked} Appt. Booked
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-md">
                <Stethoscope className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">
                In Practice for {DOCTOR.experience}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-md">
                <Award className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium">{DOCTOR.awardsCount} Awards</span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="text-sm">
              <span className="text-slate-500">Price: </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {DOCTOR.priceRange}
              </span>
              <span className="text-slate-500"> for a session</span>
            </div>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg text-sm transition shadow-sm"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
