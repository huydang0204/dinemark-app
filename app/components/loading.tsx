export default function Loading() {
  return (
    <div className="w-full h-full fixed top-0 bottom-0 left-0 right-0 bg-gray-100 bg-opacity-50 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};