"use client";
import { useRouter } from "next/navigation";

const handelClick = () => {
  window.location.href = "/home";
};

export default function Error() {
  const router = useRouter();
  const handelClick = () => {
    router.push("/");
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white min-h-screen text-black p-4">
        <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
        <p className="text-lg mb-6">
          We couldn't process your payment. Please try again.
        </p>
        <button
          onClick={handelClick}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
