import Link from "next/link";

export default function Page404() {
  return (
    <div>
      <h1>You dropped at error page</h1>
      <Link href={"/dashboard"}>Go to Dashboard !</Link>
    </div>
  );
}
