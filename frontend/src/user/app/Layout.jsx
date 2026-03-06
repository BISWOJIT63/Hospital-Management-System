import './globals.css'

export default function RootLayout({ children }) {
  return (
    <div className="font-sans antialiased min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {children}
    </div>
  )
}
