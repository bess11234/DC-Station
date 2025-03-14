import { NotFoundDetail } from "@/app/components/NotFoundDetail";

export default function NotFound() {
  return (
    <NotFoundDetail title="ไม่พบข้อมูลคำร้องขอที่คุณเลือก" backUrl="/dashboard/requests/" />
  );
}