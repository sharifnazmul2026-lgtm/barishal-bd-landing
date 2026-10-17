// আগে Apps Script Web App URL বসান। নিচের URL পরিবর্তন না করলে অর্ডার Google Sheet-এ যাবে না।
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxB_heUMrrHQFrLhbESYmft_0sihJhFTX270getCrQkjwwsn0q5MnA8DTkLHDM3zk1oFw/exec";

// দাম পরিবর্তন করতে চাইলে এই মান ও index.html-এর প্রদর্শিত দাম একইভাবে বদলান।
const PRODUCT_PRICE = 1290;

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("orderForm");
const statusBox = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusBox.className = "form-status";
  statusBox.textContent = "";

  if (!form.reportValidity()) return;

  if (!GOOGLE_SCRIPT_URL.startsWith("https://script.google.com/macros/s/")) {
    statusBox.className = "form-status error";
    statusBox.textContent = "Google Sheet সংযোগ করা হয়নি। script.js ফাইলে Apps Script Web App URL বসান।";
    return;
  }

  const data = new FormData(form);
  const quantity = Number(data.get("quantity") || 1);
  data.set("unitPrice", String(PRODUCT_PRICE));
  data.set("totalProductPrice", String(PRODUCT_PRICE * quantity));
  data.set("submittedAt", new Date().toISOString());
  data.set("pageUrl", window.location.href);

  submitBtn.disabled = true;
  submitBtn.innerHTML = 'অর্ডার পাঠানো হচ্ছে… <span>↻</span>';

  try {
    // Apps Script-এর জন্য no-cors ব্যবহার করা হয়েছে; ব্রাউজার রেসপন্স পড়তে পারে না।
    // তাই নিচের বার্তা দেখানোর পর Google Sheet-এ নতুন row এসেছে কি না যাচাই করুন।
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(data)
    });

    statusBox.className = "form-status success";
    statusBox.textContent = "অর্ডারের অনুরোধ পাঠানো হয়েছে। নিশ্চিত হওয়ার জন্য কিছুক্ষণ পর Google Sheet-এ নতুন অর্ডারটি আছে কি না দেখুন।";
    form.reset();
  } catch (error) {
    statusBox.className = "form-status error";
    statusBox.textContent = "অর্ডার পাঠানো যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'অর্ডার কনফার্ম করতে পাঠান <span>→</span>';
  }
});
