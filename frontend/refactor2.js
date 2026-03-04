const fs = require('fs');
const file = 'c:\\HOSPITAL MANAGEMENT SYSTEM\\Hospital Mangement System\\src\\components\\hospitals\\details\\Details.jsx';
let content = fs.readFileSync(file, 'utf8');

const importsToAdd = `
import Hero from "./subpages/Hero";
import Tabs from "./subpages/Tabs";
import Overview from "./subpages/Overview";
import Departments from "./subpages/Departments";
import Facilities from "./subpages/Facilities";
import Doctors from "./subpages/Doctors";
import Awards from "./subpages/Awards";
import Timings from "./subpages/Timings";
import Reviews from "./subpages/Reviews";
`;

content = content.replace('// --- Comprehensive Mock Data for Hospital ---', importsToAdd + '\\n// --- Comprehensive Mock Data for Hospital ---');

const mainStart = content.indexOf('<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">');
const mainEnd = content.indexOf('</main>') + 7;

const newMain = `<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Hero HOSPITAL={HOSPITAL} isFavorite={isFavorite} setIsFavorite={setIsFavorite} handleBookAppointment={handleBookAppointment} />
        <Tabs activeTab={activeTab} scrollToSection={scrollToSection} />
        <div className="space-y-8 pb-12">
          <Overview HOSPITAL={HOSPITAL} />
          <Departments HOSPITAL={HOSPITAL} />
          <Facilities HOSPITAL={HOSPITAL} />
          <Doctors HOSPITAL={HOSPITAL} />
          <Awards HOSPITAL={HOSPITAL} />
          <Timings HOSPITAL={HOSPITAL} />
          <Reviews HOSPITAL={HOSPITAL} />
        </div>
      </main>`;

content = content.substring(0, mainStart) + newMain + content.substring(mainEnd);

content = content.replace('<div className="min-h-screen bg-slate-50 font-sans pb-24 text-slate-800">', '<div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-24 text-slate-800 dark:text-slate-200">');

content = content.split('const [activeImageIndex, setActiveImageIndex] = useState(0);').join('');

content = content.replace('className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"', 'className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-transparent dark:border-slate-800"');
content = content.replace('border-b border-slate-100', 'border-b border-slate-100 dark:border-slate-800');
content = content.split('text-slate-900').join('text-slate-900 dark:text-white');
content = content.replace('text-slate-400 hover:text-slate-600', 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300');
content = content.split('text-slate-500').join('text-slate-500 dark:text-slate-400');
content = content.replace('bg-slate-900 hover:bg-slate-800 text-white', 'bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900');

content = content.replace('<nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-slate-500 dark:text-slate-400">', '<nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-slate-500 dark:text-slate-400">');
content = content.replace('<span className="text-slate-900 dark:text-white font-medium">Hospital Profile</span>', '<span className="text-slate-900 dark:text-white font-medium">Hospital Profile</span>');

fs.writeFileSync(file, content);
console.log("Details.jsx rewrite complete.");
