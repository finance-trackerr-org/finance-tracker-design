export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50">
      {children}
    </section>
  );
}