# Barishal BD — Black Casual Shoe Landing Page

## ফোল্ডারের ফাইল
- `index.html` — এক পেজের ওয়েবসাইট ও একই পেজের অর্ডার ফর্ম
- `style.css` — ডিজাইন ও মোবাইল responsive layout
- `script.js` — ফর্ম submit এবং Google Apps Script সংযোগ
- `Code.gs` — Google Sheet-এ অর্ডার save করার Apps Script
- `images/shoe-black.svg` — শুধু placeholder product visual; নিজের আসল shoe photo দিয়ে বদলে নিন

## ১) Google Sheet তৈরি
1. Google Sheets-এ নতুন spreadsheet খুলুন, নাম দিন `Barishal BD Orders`।
2. Extensions → Apps Script খুলুন।
3. এই ZIP-এর `Code.gs` ফাইলের সম্পূর্ণ কোড Apps Script editor-এ paste করুন, Save করুন।
4. Deploy → New deployment → gear icon/Select type → Web app নির্বাচন করুন।
5. Execute as: **Me** নির্বাচন করুন।
6. Who has access: **Anyone** নির্বাচন করুন। অর্ডার ফর্মটি পাবলিক হলে endpoint-ও public হবে—শুধু অর্ডার গ্রহণের জন্য এই endpoint ব্যবহার করুন।
7. Deploy চাপুন, অনুমতি চাইলে নিজের Google account দিয়ে authorize করুন।
8. যে Web app URL পাওয়া যাবে সেটি কপি করুন। URL সাধারণত `https://script.google.com/macros/s/.../exec` দিয়ে শেষ হয়।

## ২) ওয়েবসাইটে URL বসানো
1. `script.js` ফাইল VS Code-এ খুলুন।
2. `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`-এর জায়গায় নিজের Web app URL paste করুন।
3. Save করুন। URL অবশ্যই `/exec` deployment URL হবে, `/dev` নয়।

## ৩) নিজের আসল shoe photo বসানো
- আসল black casual shoe-এর ছবি `images` ফোল্ডারে `shoe-black.jpg` নামে রাখুন।
- `index.html`-এ `images/shoe-black.svg` থাকা দুই জায়গায় `images/shoe-black.jpg` লিখুন।
- বর্তমান SVG শুধু ডিজাইন preview; এটি আপনার আসল পণ্যের ছবি নয়।

## ৪) দাম, সাইজ, ডেলিভারি চার্জ
- এখন demo price `৳ ১,২৯০` এবং JavaScript-এ unit price `1290` রাখা হয়েছে। নিজের প্রকৃত দাম অনুযায়ী পরিবর্তন করুন।
- সাইজ অপশন বর্তমানে 39–44। আপনার available size অনুযায়ী বদলান।
- ডেলিভারি চার্জ এখন total-এর সঙ্গে যোগ করা হয়নি; চূড়ান্ত চার্জ ফোনে confirm করার জন্য লেখা আছে। চাইলে নির্দিষ্ট delivery charge field ও calculation যোগ করুন।

## ৫) পরীক্ষা
1. প্রথমে একটি test order দিন।
2. Google Sheet-এর `Orders` tab-এ row এসেছে কি না দেখুন।
3. নতুন Apps Script version প্রকাশ করলে Deploy → Manage deployments → Edit → New version → Deploy করুন।

## গুরুত্বপূর্ণ
`fetch(..., mode: "no-cors")` ব্যবহারের কারণে ব্রাউজার server-এর প্রকৃত response পড়তে পারে না। তাই ওয়েবসাইটের success message-কে চূড়ান্ত প্রমাণ ভাববেন না—প্রথম test order-এর পরে Google Sheet-এ row এসেছে কি না অবশ্যই যাচাই করুন। Public endpoint-এ spam order আসতে পারে; পরে চাইলে spam protection, order ID এবং server-side validation যোগ করা যাবে।
