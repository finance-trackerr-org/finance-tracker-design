import SideBar from "../components/ui/SideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 pt-6 pb-6 pr-10 pl-10 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}