export const metadata = {
  title: "DailyDocket",
  description: "",
};

export default async function Layout({ children }) {

  return (
    <div className="pt-10">
      <div>{children}</div>
    </div>
  );
}
