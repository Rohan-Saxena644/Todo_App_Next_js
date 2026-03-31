import Image from "next/image";
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";
import TodoForm from "@/components/todo-form";

export default async function Home() {

  const conn = await connectDB();
  // console.log(conn);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Welcome to Next.js 13 with MongoDB!</h1>
        <p className="mt-4 text-lg text-gray-600">This is a simple todo app built with Next.js 13 and MongoDB.</p>
        <Button className="mt-6">Get Started</Button>
      </header>
      <main>
        <TodoForm/>
      </main>
    </div>
  );
}
