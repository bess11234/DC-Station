import { NotFoundDetail } from "@/app/components/NotFoundDetail";
 
export default function NotFound() {
  return (
    <NotFoundDetail title="ไม่พบข้อมูลเกร็ดความรู้ที่คุณเลือก" backUrl="/knowledges" />
  );
}