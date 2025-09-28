// app/(admin)/manage-content/layout.tsx
import QueryProvider from "@/components/query-provider";
export default function ManageContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Manage Content</h1>
      <QueryProvider> {children}</QueryProvider>
    </div>
  );
}
