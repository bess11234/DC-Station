<h1 style="font-weight: bolder; font-size: xxx-large; text-align: center">DC-Station 🏠</h1>

**โครงงาน DC Station** เป็นระบบช่วยจัดหาบ้านให้สัตว์เลี้ยงของแพลตฟอร์มเว็บไซต์ โดยมีบริการร้องขอการรับเลี้ยง มีวัตถุประสงค์เพื่อทำให้สัตว์เลี้ยงหาบ้านที่มีความสะดวกและได้บ้านที่อบอุ่นจริง ๆ โดยเฉพาะอย่างยิ่งสำหรับกลุ่มเป้าหมายคือบุคคลที่มีความเมตตาต่อสัตว์โลก 🐾

---

## 📦 Technology (เทคโนโลยีที่ใช้)

- **Next.js** : 
    - เป็น **React Framework** ที่ช่วยให้การพัฒนาเว็บแอปพลิเคชันง่ายขึ้น โดยเน้นเรื่อง Performance, SEO และ Developer Experience มันถูกออกแบบมาให้สามารถทำงานได้ทั้ง Server-Side Rendering (SSR) และ Static Site Generation (SSG) รวมถึงรองรับ API Routes และ Full-Stack Development ภายในตัวเอง 

    - มีการเรียกใช้ **Library Motion** ที่ช่วยในการทำให้หน้าบ้านมีลูกเล่นมากขึ้น โดยการกำหนด Animation ให้กับ Element และทำให้ Element นั้นเคลื่อนไหวและปรับเปลี่ยนตามโครงสร้างหน้าบ้าน 

    - และการใช้งาน **Library CKEditor** ทำให้เขียนเอกสารภายในหน้าเว็บแล้วสามารถแปลงเป็น Tag HTML ได้ ซึ่งใช้ในการเพิ่มข้อมูลเกร็ดความรู้ภายในระบบของเรา

- **Tailwind CSS Framework** : เป็น tool ที่ช่วยให้ตกแต่งรายละเอียดของ CSS ได้อย่างง่าย ลดกระบวนการที่นักพัฒนาเข้าไปแก้ไขที่ไฟล์ CSS หลัก ข้อดีหลักๆของ Tailwind CSS คือทำให้ลดขนาดของไฟล์ CSS ได้ระดับนึง เพราะสามารถเขียน style ในไฟล์ HTML แบบ Inline ได้เลย โดยวิธีการนี้จะทำให้หน้าเว็บเพจโหลดเร็วขึ้น

- **Express.js** : Framework สำหรับการเขียนการทำงานฝั่ง **Backend** โดยใช้เพื่อทำ REST API, Model, Routes และ Authentication เชื่อมเข้ากับ MongoDB Atlas ผ่าน Library Mongoose

- **MongoDB** : เป็นฐานข้อมูลแบบ **NoSQL** เก็บข้อมูลในรูปแบบของ Document  มีความยืดหยุ่นสูงในการเก็บข้อมูล ซึ่งในระบบนี้จะมีการอ่านที่เยอะกว่าเขียน และโครงสร้างข้อมูลบางส่วนไม่เหมือนกัน ทำให้ MongoDB เหมาะที่จะปรับใช้เข้ากับระบบจัดหาบ้านให้สัตว์เลี้ยง

- **Mongoose*** : มีหน้าที่หลักในการ**แปลง Schema** ที่ถูกเขียนอยู่ในรูปแบบโค้ดให้เป็น Schema Object ใน MongoDB ทำให้ผู้ใช้ไม่จำเป็นต้องเข้าไปแก้ Schema ใน MongDB โดยตรง และทำการ**ตรวจสอบความถูกต้องของข้อมูลตาม Schema** ที่กำหนดให้โดยอัตโนมัติเมื่อมีการ Insert ข้อมูล

- **Bcrypt** : Library สำหรับทำการ**เข้ารหัส Password**

---

## 🛢️ Database (ฐานข้อมูล)

*ตาราง users : ข้อมูลบัญชีผู้ใช้ที่มีสิทธิ์เข้าหน้า Dashboard (ในบทบาทนี้คือเจ้าหน้าที่ DC Staion)

![ER Diagram](er-diagram.png)

## 🛠️ How to install (วิธีติดตั้งโปรเจค)

เมื่อทำการ Clone โปรเจคมาจาก github เรียบร้อยให้ตั้งค่าไฟล์ `.env`

````env
# YOUR_MONGO_URL
MONGO_URL=

# YOUR_SECURE_CHARACTER_FOR_JWT
JWT_SECRET=

# CKEDITOR_TOKEN
NEXT_PUBLIC_CK_LICENSEKEY=

# YOUR_PORT_TO_BACKEND
NEXT_PUBLIC_BACKENDPORT= # 1234

# YOUR_SECURE_CHARACTER_FOR_AUTH_SECRET
AUTH_SECRET=

# IS PRODUCTION
AUTH_TRUST_HOST= # true or false

````

เมื่อกำหนดตามนี้แล้วให้รันคำสั่ง เพื่อทำการ Build Express and Next Project (หากมีการแก้ไขข้อมูลภายในไฟล์ .env ต้องมีการรันคำสั่งนี้)

```bash
npm run publish:build
```

หากครั้งต่อไปต้องการจะรันโปรเจคขึ้นมาใหม่ สามารถใช้คำสั่ง เพื่อความรวดเร็วในการใช้งาน

```bash
npm run publish
```

หลังจากดำเนินการตามนี้จะสามารถเข้าเว็บได้ผ่านทาง [localhost:3000](http://localhost:3000)

โดยจะขึ้นหน้าเว็บไซต์แบบนี้ หากดำเนินการติดตั้งสำเร็จ

![alt text](document_image/install_successfully.png)

## 🌟 Sample Webiste (ตัวอย่างเว็บไซต์)

<h2 style="font-weight: bolder; font-size: xx-large; text-align: center">👤 ผู้รับเลี้ยง (Guest)</h2>

### `🏠 Home (หน้าหลัก)`

<section style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); justify-items: center;gap: 10px">
    <img style="border-radius: 20px; grid-column: span 2" src="document_image/install_successfully.png" />
    <img style="border-radius: 20px;" src="document_image/mainpage-1.png" />
    <img style="border-radius: 20px;" src="document_image/mainpage-2.png" />
</section>

### `🐶 Find House (หน้าน้องหาบ้าน)`

<section style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); justify-items: center;">
    <img style="border-top-left-radius: 20px; border-top-right-radius: 20px;" src="document_image/nonghaban.png" />
    <img style="" src="document_image/nonghaban-2.png" />
    <img style="" src="document_image/nonghaban-3.png" />
    <img style="border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;" src="document_image/nonghaban-4.png" />
</section>

### `📚 Knowledges (หน้าเกร็ดความรู้)`

<img style="border-radius: 20px;" src="document_image/knowledge.png" />

### `📞 Contact (หน้าติดต่อสอบถาม)`

<img style="border-radius: 20px;" src="document_image/contact.png" />

<hr/>

<h2 style="font-weight: bolder; font-size: xx-large; text-align: center">🧑‍💼 ผู้ดูแล (Manager)</h2>

### `🔑 Sign in (หน้าเข้าสู่ระบบ)`

การจะเข้าถึงได้ต้องมีการล็อคอินผ่าน URL /login เสียก่อน มีการดึงข้อมูลจากฐานข้อมูล users มาเช็คในการเข้าถึงระบบ [http://localhost:3000/login](http://localhost:3000/login)

<img style="border-radius: 20px;" src="document_image/login.png" />

### `📊 Manage Dashboard (หน้าจัดการแดชบอร์ด)`

<img style="border-radius: 20px;" src="document_image/dashboard.png" />

### `📝 Manage Requests (หน้าจัดการคำร้องขอรับเลี้ยง)`

<img style="border-radius: 20px;" src="document_image/dashboard-request.png" />

### `🐾 Manage Animals (หน้าจัดการสัตว์)`

<img style="border-radius: 20px;" src="document_image/dashboard-animal.png" />

### `📚 Manage Knowledges (หน้าจัดการเกร็ดความรู้)`

<img style="border-radius: 20px;" src="document_image/dashboard-knowledge.png" />

## ⚠️ Troubleshoot

<img style="border-radius: 20px;" src="document_image/500_server_error.png" />

หากหน้าเว็บขึ้นแบบนี้ให้ทำการดูที่ CLI ว่าขึ้นแบบนี้หรือไม่

```bash
Server running on port xxxx
MongoDB Connected
```

หากไม่มีให้ทำตามดังนี้

- ดูที่ไฟล์ `.env` ว่ากำหนดค่า `MONGO_URL` ถูกต้องหรือป่าว
- มีการตั้งค่า Network Access ที่มี IP Address ของเครื่องอยู่หรือไม่

# 📣 ผู้จัดทำโครงการ

[![Visit GitHub](https://img.shields.io/badge/Visit%20GitHub-%2300A1F1?style=for-the-badge&logo=github&logoColor=white&labelColor=black&color=0f7bff&link=https://github.com/bess11234)](https://github.com/bess11234) 

- @bess11234

[![Visit GitHub](https://img.shields.io/badge/Visit%20GitHub-%2300A1F1?style=for-the-badge&logo=github&logoColor=white&labelColor=black&color=0f7bff&link=https://github.com/KKMAI)](https://github.com/KKMAI)

- @KKMAI
