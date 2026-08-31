import { CakeEndingBox } from "../components/CakeEndingBox.js";
import { initCakeEndingManager } from "../core/CakeEndingManager.js";
import "../styles/cakeEnding.css";

// استيراد آمن بدون ما يوقع الـ Server لو المسار فيه مشكلة
let photoUrl = "";
try {
    // حاول يقرأ الصورة لو موجودة
    photoUrl = new URL('../assets/images/roro.jpg', import.meta.url).href;
} catch (e) {
    // صورة احتياطية مؤقتة عشان الـ CSS والتصميم يشتغلوا فوراً
    photoUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500";
}

export function Ending() {
    setTimeout(() => {
        initCakeEndingManager();
    }, 100);

    return CakeEndingBox(photoUrl);
}