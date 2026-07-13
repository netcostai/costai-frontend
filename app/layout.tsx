export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased min-h-screen">
        <main className="max-w-5xl mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  )
}
