import "./style.css";
import { Login } from "./pages/Login.js";
import { navigate } from "./core/Router.js";
import { initLogin } from "./core/GameManager.js"; 

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    if (!app) return;

    // 1. عرض صفحة اللوجن أولاً في الـ DOM وتوليد الـ HTML
    navigate(Login);

    // 2. تأخير تشغيل الـ initLogin جزء من الثانية لضمان إن الـ DOM اتكتب فعلاً وبقى جاهز
    setTimeout(() => {
        if (typeof initLogin === "function") {
            initLogin();
        }
    }, 50);
});