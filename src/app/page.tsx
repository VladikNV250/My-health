import Card from "@/components/card";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="bg-gray-200 w-screen h-screen pl-96 pr-20 py-24">
      <Navbar />
      <div className="container min-w-full min-h-full grid grid-cols-3 auto-rows-min gap-x-5 gap-y-16">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}
