# React-Native-AvianBlood

**AvianBlood** คือแอปพลิเคชันสำหรับบันทึกและติดตามผลการตรวจจับประเภทเซลล์เม็ดเลือดของไก่ ช่วยให้นักวิจัยหรือสัตวแพทย์สามารถจัดการข้อมูลสุขภาพไก่ได้อย่างมีประสิทธิภาพ ทั้งในรูปแบบ Online และ Offline
---
## Tech Stack (เทคโนโลยีที่ใช้)
- **Framework:** React Native Expo
- **Database:** Firebase, SQLite
---
## Folder Structure (โครงสร้างโปรเจกต์)
```
React-Native-AvianBlood/
|── assets/                        # ไฟล์รูปภาพ
|── components/                    # UI Components ที่นำกลับมาใช้ซ้ำได้
|   ├── HeaderBar.js               # แถบหัวข้อแอป
|   ├── HistoryDetailView.js       # แสดงรายละเอียดประวัติ
|   ├── HistoryItemCard.js         # การ์ดแสดงรายการประวัติ
|   ├── Navbar.js                  # เมนูนำทางด้านล่าง
|   ├── Post.js                    # การ์ดแสดงโพสต์ข่าวสารพร้อมแกลเลอรีรูปภาพ
|   ├── PredictionResultsCard.js   # แสดงผลการวิเคราะห์
|   ├── RecordForm.js              # ฟอร์มบันทึกข้อมูลทางชีวภาพ
|   ├── ResultTable.js             # ตารางแสดงจำนวนเซลล์และความแม่นยำ
|   ├── SelectedImagesGrid.js      # Grid จัดการรูปภาพที่เลือกก่อนประมวลผล
|   ├── StainSelector.js           # ปุ่มเลือกประเภทสีย้อม
|   ├── TabBar.js                  # แถบหัวข้อเมนูด้านล่าง
|── config/                        # ตั้งค่าระบบ
|   ├── firebase-config.js         # เชื่อมต่อ Firebase
|── screens/                       # หน้าจอหลักของแอปพลิเคชัน
|   ├── Add.js                     # อัปโหลดรูปภาพ
|   ├── History.js                 # แสดงประวัติการตรวจ
|   ├── Home.js                    # หน้าหลักแสดงข่าวสารและข้อมูล
|   ├── Login.js                   # เข้าสู่ระบบและจัดการ Session ในเครื่อง
|   ├── Predict.js                 # ประมวลผลภาพเลือดและบันทึกผลการตรวจ
|   ├── Profile.js                 # แก้ไขข้อมูลส่วนตัวและรูปโปรไฟล์
|   ├── SignUp.js                  # ลงทะเบียนผู้ใช้งานใหม่
|   ├── Welcome.js                 # หน้าต้อนรับ
|── services/                      # จัดการฐานข้อมูล
|   ├── firebase-service.js        # จัดการข้อมูล Online
|   ├── sqlite-service.js          # จัดการข้อมูล Offline
|── styles/                        # ตกแต่งดีไซน์
|   ├── myStyle.js                 # Stylesheet กลางสำหรับคุม
|── App.js                         # จุดเริ่มต้นการทำงานหลัก
|── app.json                       # Expo Configuration
|── eas.json                       # EAS Build Configuration
```
---
## Getting Started
### 1. Clone the repository
```git clone [https://github.com/NaiSyntaxSultan/React-Native-AvianBlood.git](https://github.com/NaiSyntaxSultan/React-Native-AvianBlood.git)```
### 2. Install dependencies
```npm install```
### 3. Run the app
```npm start```
