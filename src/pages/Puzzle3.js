import "../styles/proposal.css"; // 👈 السطر ده ضروري جداً
import kidImage from "../assets/images/spider-kid.png";
import { ProposalBox } from "../components/ProposalBox";
import { initProposal } from "../core/ProposalManager";
import { navigate } from "../core/Router.js";
import { Ending } from "./Ending.js"; // تم التصحيح إلى الملف Ending.js

import { stopAllAudio } from "../core/AudioManager.js";

export function Puzzle3() {
  setTimeout(() => {
    initProposal();

    // متابعة الضغط على زرار الـ Yes لإظهار زرار Continue وتفعيل الانتقال للنهاية
    const checkYesBtn = setInterval(() => {
      const yesBtn = document.getElementById("yes-btn");
      
      if (yesBtn) {
        yesBtn.addEventListener("click", () => {
          setTimeout(() => {
            const buttonsArea = document.querySelector(".proposal-buttons");
            
            // التأكد إن زرار الكونتينيو مش متضاف قبل كده عشان متتكررش
            if (buttonsArea && !document.getElementById("ending-continue-btn")) {
              const continueBtn = document.createElement("button");
              continueBtn.id = "ending-continue-btn";
              continueBtn.className = "yes-btn continue-proposal-btn";
              continueBtn.innerHTML = "Continue ✨";

              // عند الضغط على الكونتينيو يتم إيقاف أي أغانٍ والانتقال لصفحة Ending
              continueBtn.addEventListener("click", () => {
                stopAllAudio();
                navigate(Ending);
              });

              buttonsArea.appendChild(continueBtn);
            }
          }, 400);
        });

        clearInterval(checkYesBtn);
      }
    }, 100);

  }, 50);

  return `
    <section class="proposal-screen">
      ${ProposalBox(kidImage)}
    </section>
  `;
}