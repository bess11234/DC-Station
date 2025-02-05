'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-center">เกิดข้อผิดพลาด!</h2>
      <button
        className="mt-4 rounded-md px-4 py-2 text-sm transition-colors button-theme cursor-pointer"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        ลองอีกครั้ง
      </button>
    </main>
  );
}