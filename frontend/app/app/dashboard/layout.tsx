export default function Layout({
  children,
  tags,
  history,
  categories,
  equipment,
}: {
  children: React.ReactNode;
  tags: React.ReactNode;
  history: React.ReactNode;
  categories: React.ReactNode;
  equipment: React.ReactNode;
}) {
  return (
    <main>
      <div className="p-32 pt-16 pb-6">
        {children}
        {tags}
        {history}
        {categories}
        {equipment}
      </div>
    </main>
  );
}
