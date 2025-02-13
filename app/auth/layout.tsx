export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen flex justify-center items-start md:items-center p-8">{children}</div>;
}
