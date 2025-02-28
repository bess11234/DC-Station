'use client';
 
import { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    // console.error(error);
  }, [error]);
 
  return (
    <div className="flex m-auto flex-col items-center justify-center gap-2">
      <ExclamationCircleIcon className='w-10 text-gray-400' />
      <h2 className="text-center">500 Server Error!</h2>
      <p>เกิดข้อผิดพลาด!</p>
      <button
        className="mt-4 rounded-md px-4 py-2 text-sm transition-colors button-theme cursor-pointer"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        ลองอีกครั้ง
      </button>
    </div>
  );
}