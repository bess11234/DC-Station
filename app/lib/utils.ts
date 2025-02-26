export function displayMonthThai(month: number) {
  switch (month) {
    case 0:
      return "ม.ค";
    case 1:
      return "ก.พ";
    case 2:
      return "มี.ค";
    case 3:
      return "ม.ย";
    case 4:
      return "พ.ค";
    case 5:
      return "มิ.ย";
    case 6:
      return "ก.ค";
    case 7:
      return "ส.ค";
    case 8:
      return "ก.ย";
    case 9:
      return "ต.ค";
    case 10:
      return "พ.ย";
    case 11:
      return "ธ.ค";
  }
}

export function displayIllness(status: "Under treatment" | "Recovered" | "Chronic" | "Under surveillance"){
  if (status == "Under treatment"){
    return "กำลังรักษา"
  }
  if (status == "Chronic"){
    return "เรื้อรัง"
  }
  if (status == "Recovered"){
    return "หายแล้ว"
  }
  if (status == "Under surveillance"){
    return "เฝ้าระวัง"
  }
}