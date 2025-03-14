import { NotFoundDetail } from "@/app/components/NotFoundDetail";

export default function NotFound() {
  return (
    <NotFoundDetail title="ไม่พบข้อมูลสัตว์ที่คุณเลือก" backUrl="/found-house" />
  );
}