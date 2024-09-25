import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* 404 Heading */}
      <h1 className="text-8xl font-bold text-cyan-600 mb-4">404</h1>
      {/* Not Found Text */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">
        Page Not Found
      </h2>
      {/* Go Back Home Button */}
      <Button
        className="px-6 py-3 bg-cyan-600 text-white text-lg font-medium rounded-lg hover:bg-cyan-700 transition-all"
        onClick={() => (window.location.href = "/")}
      >
        Go back Home
      </Button>
    </div>
  );
};

export default NotFound;
