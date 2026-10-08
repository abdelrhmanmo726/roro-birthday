import { FloatingBackground } from "../components/FloatingBackground";
import { initLogin } from "../core/GameManager.js";

export function Login() {
    setTimeout(() => {
        initLogin();
    }, 50);

    return `
    <section class="login-screen">
        ${FloatingBackground()}

        <div class="login-container-wrapper">
            
            <!-- بوكيه الورد الماستر بيس النهائي (مصحح الإحداثيات بالكامل) -->
            <div class="master-bouquet-container">
                <svg class="bouquet-svg-master" viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <!-- تدرجات البتلات -->
                        <radialGradient id="pGrad1" cx="40%" cy="30%" r="70%">
                            <stop offset="0%" stop-color="#ffb3c7" />
                            <stop offset="45%" stop-color="#ff6d93" />
                            <stop offset="100%" stop-color="#c52851" />
                        </radialGradient>
                        <radialGradient id="pGrad2" cx="50%" cy="25%" r="65%">
                            <stop offset="0%" stop-color="#ffc2d4" />
                            <stop offset="50%" stop-color="#ff86a8" />
                            <stop offset="100%" stop-color="#d0315c" />
                        </radialGradient>
                        <radialGradient id="pGrad3" cx="60%" cy="40%" r="60%">
                            <stop offset="0%" stop-color="#ffaec5" />
                            <stop offset="50%" stop-color="#ff7097" />
                            <stop offset="100%" stop-color="#b01e46" />
                        </radialGradient>

                        <!-- قلب الوردة الحلزوني -->
                        <linearGradient id="centerCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#ff9f1c" />
                            <stop offset="100%" stop-color="#964b00" />
                        </linearGradient>

                        <!-- السيقان -->
                        <linearGradient id="stemGradReal" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#73e26b" />
                            <stop offset="50%" stop-color="#55a630" />
                            <stop offset="100%" stop-color="#2b580c" />
                        </linearGradient>

                        <!-- أوراق اليوكلبتوس -->
                        <linearGradient id="eucRealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#a3c9a8" />
                            <stop offset="100%" stop-color="#38b000" />
                        </linearGradient>

                        <!-- التغليف -->
                        <linearGradient id="wrapBackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fdf6ec" stop-opacity="0.85" />
                            <stop offset="100%" stop-color="#e2c4a9" stop-opacity="0.75" />
                        </linearGradient>
                        <linearGradient id="wrapLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fffaf4" stop-opacity="0.95" />
                            <stop offset="50%" stop-color="#f2decb" stop-opacity="0.90" />
                            <stop offset="100%" stop-color="#d6b394" stop-opacity="0.85" />
                        </linearGradient>
                        <linearGradient id="wrapRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fcf1e5" stop-opacity="0.92" />
                            <stop offset="100%" stop-color="#c9a27e" stop-opacity="0.82" />
                        </linearGradient>

                        <!-- شريط الساتان -->
                        <linearGradient id="satinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#ff5f87" />
                            <stop offset="30%" stop-color="#ff99b6" />
                            <stop offset="70%" stop-color="#ff4071" />
                            <stop offset="100%" stop-color="#cc2953" />
                        </linearGradient>

                        <!-- قالب الوردة الحقيقية -->
                        <g id="master-rose-v2">
                            <g class="layer-outer">
                                <path d="M0,-35 C15,-35 24,-12 11,8 C5,18 -5,18 -11,8 C-24,-12 -15,-35 0,-35Z" fill="url(#pGrad1)" transform="rotate(0) scale(1, 1.05)" />
                                <path d="M0,-32 C12,-32 22,-9 8,11 C3,19 -3,19 -8,11 C-22,-9 -12,-32 0,-32Z" fill="url(#pGrad2)" transform="rotate(45) scale(0.95, 1)" />
                                <path d="M0,-36 C16,-36 25,-14 12,6 C6,16 -6,16 -12,6 C-25,-14 -16,-36 0,-36Z" fill="url(#pGrad3)" transform="rotate(90) scale(1.05, 0.95)" />
                                <path d="M0,-33 C14,-33 21,-11 10,9 C4,17 -4,17 -10,9 C-21,-11 -14,-33 0,-33Z" fill="url(#pGrad1)" transform="rotate(135) scale(1)" />
                                <path d="M0,-35 C12,-35 23,-13 9,7 C3,15 -3,15 -9,7 C-23,-13 -12,-35 0,-35Z" fill="url(#pGrad2)" transform="rotate(180) scale(1.02, 0.98)" />
                                <path d="M0,-31 C15,-31 20,-8 8,12 C4,20 -4,20 -8,12 C-20,-8 -15,-31 0,-31Z" fill="url(#pGrad3)" transform="rotate(225) scale(0.98, 1.02)" />
                                <path d="M0,-34 C13,-34 22,-10 11,9 C5,18 -5,18 -11,9 C-22,-10 -13,-34 0,-34Z" fill="url(#pGrad1)" transform="rotate(270) scale(1)" />
                                <path d="M0,-32 C14,-32 24,-12 10,8 C4,16 -4,16 -10,8 C-24,-12 -14,-32 0,-32Z" fill="url(#pGrad2)" transform="rotate(315) scale(1.04, 0.96)" />
                            </g>
                            <g class="layer-mid">
                                <path d="M0,-24 C10,-24 16,-8 6,5 C2,12 -2,12 -6,5 C-16,-8 -10,-24 0,-24Z" fill="url(#pGrad2)" transform="rotate(20) scale(1, 1.03)" />
                                <path d="M0,-22 C9,-22 15,-7 7,6 C2,13 -2,13 -7,6 C-15,-7 -9,-22 0,-22Z" fill="url(#pGrad3)" transform="rotate(92) scale(0.98, 1)" />
                                <path d="M0,-25 C11,-25 17,-9 6,4 C2,10 -2,10 -6,4 C-17,-9 -11,-25 0,-25Z" fill="url(#pGrad1)" transform="rotate(164) scale(1.02, 0.97)" />
                                <path d="M0,-23 C10,-23 14,-8 7,5 C3,11 -3,11 -7,5 C-14,-8 -10,-23 0,-23Z" fill="url(#pGrad2)" transform="rotate(236) scale(1)" />
                                <path d="M0,-24 C10,-24 16,-7 6,6 C2,12 -2,12 -6,6 C-16,-7 -10,-24 0,-24Z" fill="url(#pGrad3)" transform="rotate(308) scale(1, 1.02)" />
                            </g>
                            <g class="layer-inner">
                                <path d="M0,-14 C7,-14 11,-4 4,3 C1,7 -1,7 -4,3 C-11,-4 -7,-14 0,-14Z" fill="url(#pGrad1)" transform="rotate(40)" />
                                <path d="M0,-15 C8,-15 12,-5 5,4 C2,8 -2,8 -5,4 C-12,-5 -8,-15 0,-15Z" fill="url(#pGrad3)" transform="rotate(160)" />
                                <path d="M0,-13 C7,-13 10,-4 4,3 C1,7 -1,7 -4,3 C-10,-4 -7,-13 0,-13Z" fill="url(#pGrad2)" transform="rotate(280)" />
                            </g>
                            <g class="spiral-core">
                                <path d="M0,1 C4,-3 2,-8 -2,-7 C-7,-6 -8,0 -3,2 C2,3 5,-2 1,-6" fill="none" stroke="url(#centerCoreGrad)" stroke-width="2" stroke-linecap="round" />
                                <path d="M-1,-2 Q3,-5 0,-9 Q-5,-6 -2,-1" fill="none" stroke="url(#centerCoreGrad)" stroke-width="1.6" stroke-linecap="round" />
                                <circle cx="0" cy="-3" r="2" fill="url(#centerCoreGrad)" />
                            </g>
                        </g>

                        <!-- عنقود Baby's Breath -->
                        <g id="babys-breath-cluster">
                            <circle cx="0" cy="0" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 2px rgba(255,255,255,0.9))" />
                            <circle cx="-7" cy="-6" r="2.5" fill="#ffffff" />
                            <circle cx="7" cy="-5" r="2" fill="#ffffff" />
                            <circle cx="-2" cy="-10" r="1.8" fill="#ffffff" />
                            <circle cx="3" cy="-9" r="2.5" fill="#ffffff" />
                            <path d="M0,0 L0,15 M0,5 L-7,-6 M0,4 L7,-5 M-2,-4 L-2,-10 M2,-4 L3,-9" stroke="#ffffff" stroke-width="0.8" opacity="0.85" />
                        </g>

                        <!-- غصن يوكلبتوس -->
                        <g id="eucalyptus-branch">
                            <path d="M0,70 Q6,35 0,0" stroke="#38b000" stroke-width="1.5" fill="none" />
                            <ellipse cx="-7" cy="55" rx="6" ry="10" fill="url(#eucRealGrad)" transform="rotate(-30 -7 55)" />
                            <ellipse cx="7" cy="45" rx="6" ry="10" fill="url(#eucRealGrad)" transform="rotate(30 7 45)" />
                            <ellipse cx="-8" cy="35" rx="7" ry="11" fill="url(#eucRealGrad)" transform="rotate(-25 -8 35)" />
                            <ellipse cx="8" cy="25" rx="7" ry="11" fill="url(#eucRealGrad)" transform="rotate(25 8 25)" />
                            <ellipse cx="-6" cy="15" rx="6" ry="9" fill="url(#eucRealGrad)" transform="rotate(-20 -6 15)" />
                            <ellipse cx="6" cy="7" rx="5" ry="8" fill="url(#eucRealGrad)" transform="rotate(20 6 7)" />
                            <ellipse cx="-5" cy="0" rx="5" ry="7" fill="url(#eucRealGrad)" transform="rotate(-15 -5 0)" />
                        </g>
                    </defs>

                    <!-- الخلفية للتغليف -->
                    <path d="M160,250 C190,230 310,230 340,250 C370,310 330,520 250,550 C170,520 130,310 160,250 Z" fill="url(#wrapBackGrad)" />

                    <!-- السيقان الكثيفة -->
                    <g class="stems-group">
                        <path d="M250,550 C248,430 245,340 250,250" stroke="url(#stemGradReal)" stroke-width="3.5" fill="none" stroke-linecap="round" />
                        <path d="M240,550 C230,440 220,350 225,260" stroke="url(#stemGradReal)" stroke-width="2.8" fill="none" stroke-linecap="round" />
                        <path d="M260,550 C270,440 280,350 275,260" stroke="url(#stemGradReal)" stroke-width="2.8" fill="none" stroke-linecap="round" />
                        <path d="M230,550 C210,430 195,340 190,250" stroke="url(#stemGradReal)" stroke-width="2.2" fill="none" stroke-linecap="round" />
                        <path d="M270,550 C290,430 305,340 310,250" stroke="url(#stemGradReal)" stroke-width="2.2" fill="none" stroke-linecap="round" />
                        <path d="M220,550 C190,430 170,330 160,240" stroke="url(#stemGradReal)" stroke-width="1.8" fill="none" stroke-linecap="round" />
                        <path d="M280,550 C310,430 330,330 340,240" stroke="url(#stemGradReal)" stroke-width="1.8" fill="none" stroke-linecap="round" />
                        <path d="M245,550 C235,420 230,320 235,230" stroke="url(#stemGradReal)" stroke-width="2.5" fill="none" stroke-linecap="round" />
                        <path d="M255,550 C265,420 270,320 265,230" stroke="url(#stemGradReal)" stroke-width="2.5" fill="none" stroke-linecap="round" />
                        <path d="M238,550 C218,430 205,330 200,220" stroke="url(#stemGradReal)" stroke-width="2" fill="none" stroke-linecap="round" />
                        <path d="M262,550 C282,430 295,330 300,220" stroke="url(#stemGradReal)" stroke-width="2" fill="none" stroke-linecap="round" />
                        <path d="M250,550 C250,440 250,330 250,210" stroke="url(#stemGradReal)" stroke-width="3" fill="none" stroke-linecap="round" />
                    </g>

                    <!-- فروع يوكلبتوس جانبية -->
                    <use href="#eucalyptus-branch" x="135" y="250" transform="rotate(-25 135 250) scale(1.1)" />
                    <use href="#eucalyptus-branch" x="365" y="250" transform="rotate(25 365 250) scale(1.1)" />
                    <use href="#eucalyptus-branch" x="155" y="290" transform="rotate(-15 155 290)" />
                    <use href="#eucalyptus-branch" x="345" y="290" transform="rotate(15 345 290)" />

                    <!-- Layer Back من Baby's Breath -->
                    <g class="bb-layer-back">
                        <g transform="translate(190, 220) scale(0.8)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(220, 195) scale(0.8)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(250, 180) scale(0.8)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(280, 195) scale(0.8)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(310, 220) scale(0.8)"><use href="#babys-breath-cluster" /></g>
                    </g>

                    <!-- الطبقة الخلفية للورد (باستخدام Wrapper <g>) -->
                    <g class="bouquet-cluster-3d">
                        <g transform="translate(200, 215) rotate(-12) scale(0.8)"><use href="#master-rose-v2" class="rose-item r-b1" /></g>
                        <g transform="translate(225, 195) rotate(-5) scale(0.84)"><use href="#master-rose-v2" class="rose-item r-b2" /></g>
                        <g transform="translate(250, 185) rotate(0) scale(0.82)"><use href="#master-rose-v2" class="rose-item r-b3" /></g>
                        <g transform="translate(275, 195) rotate(5) scale(0.84)"><use href="#master-rose-v2" class="rose-item r-b4" /></g>
                        <g transform="translate(300, 215) rotate(12) scale(0.8)"><use href="#master-rose-v2" class="rose-item r-b5" /></g>
                        <g transform="translate(250, 165) rotate(-1) scale(0.86)"><use href="#master-rose-v2" class="rose-item r-b6" /></g>
                    </g>

                    <!-- Layer Mid من Baby's Breath -->
                    <g class="bb-layer-mid">
                        <g transform="translate(165, 235)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(200, 210)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(235, 195)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(265, 195)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(300, 210)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(335, 235)"><use href="#babys-breath-cluster" /></g>
                    </g>

                    <!-- الطبقة الوسطى للورد (باستخدام Wrapper <g>) -->
                    <g class="bouquet-cluster-3d">
                        <g transform="translate(175, 245) rotate(-15) scale(0.92)"><use href="#master-rose-v2" class="rose-item r-m1" /></g>
                        <g transform="translate(205, 225) rotate(-8) scale(0.96)"><use href="#master-rose-v2" class="rose-item r-m2" /></g>
                        <g transform="translate(230, 210) rotate(-3) scale(0.99)"><use href="#master-rose-v2" class="rose-item r-m3" /></g>
                        <g transform="translate(250, 205) rotate(2) scale(1.02)"><use href="#master-rose-v2" class="rose-item r-m4" /></g>
                        <g transform="translate(270, 210) rotate(4) scale(0.99)"><use href="#master-rose-v2" class="rose-item r-m5" /></g>
                        <g transform="translate(295, 225) rotate(9) scale(0.96)"><use href="#master-rose-v2" class="rose-item r-m6" /></g>
                        <g transform="translate(325, 245) rotate(16) scale(0.92)"><use href="#master-rose-v2" class="rose-item r-m7" /></g>
                        <g transform="translate(215, 180) rotate(4) scale(0.78)"><use href="#master-rose-v2" class="rose-item r-m8" /></g>
                        <g transform="translate(285, 180) rotate(-4) scale(0.78)"><use href="#master-rose-v2" class="rose-item r-m9" /></g>
                    </g>

                    <!-- Layer Front من Baby's Breath -->
                    <g class="bb-layer-front">
                        <g transform="translate(180, 290) scale(1.1)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(220, 270) scale(1.1)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(250, 255) scale(1.1)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(280, 270) scale(1.1)"><use href="#babys-breath-cluster" /></g>
                        <g transform="translate(320, 290) scale(1.1)"><use href="#babys-breath-cluster" /></g>
                    </g>

                    <!-- الطبقة الأمامية للورد (باستخدام Wrapper <g>) -->
                    <g class="bouquet-cluster-3d">
                        <g transform="translate(185, 275) rotate(-10) scale(1.06)"><use href="#master-rose-v2" class="rose-item r-f1" /></g>
                        <g transform="translate(215, 255) rotate(-4) scale(1.10)"><use href="#master-rose-v2" class="rose-item r-f2" /></g>
                        <g transform="translate(235, 240) rotate(1) scale(1.14)"><use href="#master-rose-v2" class="rose-item r-f3" /></g>
                        <g transform="translate(265, 240) rotate(-2) scale(1.14)"><use href="#master-rose-v2" class="rose-item r-f4" /></g>
                        <g transform="translate(285, 255) rotate(5) scale(1.10)"><use href="#master-rose-v2" class="rose-item r-f5" /></g>
                        <g transform="translate(315, 275) rotate(11) scale(1.06)"><use href="#master-rose-v2" class="rose-item r-f6" /></g>
                        <g transform="translate(250, 230) rotate(0) scale(1.12)"><use href="#master-rose-v2" class="rose-item r-f7" /></g>
                        <g transform="translate(160, 260) rotate(-18) scale(0.95)"><use href="#master-rose-v2" class="rose-item r-f8" /></g>
                        <g transform="translate(340, 260) rotate(18) scale(0.95)"><use href="#master-rose-v2" class="rose-item r-f9" /></g>
                    </g>

                    <!-- التغليف الأمامي المنحني -->
                    <g class="wrapper-folds-group">
                        <path d="M140,290 C110,380 170,480 230,560 C190,490 130,400 155,310 Z" fill="url(#wrapLeftGrad)" />
                        <path d="M155,310 C135,370 175,440 220,540 C200,470 160,400 170,330 Z" fill="#ffffff" opacity="0.35" />
                        
                        <path d="M360,290 C390,380 330,480 270,560 C310,490 370,400 345,310 Z" fill="url(#wrapRightGrad)" />
                        <path d="M345,310 C365,370 325,440 280,540 C300,470 340,400 330,330 Z" fill="#ffffff" opacity="0.2" />
                    </g>

                    <!-- فيونكة الساتان -->
                    <g class="satin-bow-group" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))">
                        <ellipse cx="250" cy="510" rx="12" ry="9" fill="url(#satinGrad)" />
                        <ellipse cx="250" cy="509" rx="6" ry="4.5" fill="#ff99b6" opacity="0.7" />
                        <path d="M250,505 C220,475 180,490 205,520 C220,535 240,520 250,505 Z" fill="url(#satinGrad)" />
                        <path d="M250,505 C280,475 320,490 295,520 C280,535 260,520 250,505 Z" fill="url(#satinGrad)" />
                        <path d="M242,515 Q225,560 210,590" stroke="url(#satinGrad)" stroke-width="11" stroke-linecap="round" fill="none" />
                        <path d="M258,515 Q275,560 290,590" stroke="url(#satinGrad)" stroke-width="10" stroke-linecap="round" fill="none" />
                    </g>

                    <!-- لمعة الـ Light Sweep -->
                    <path class="light-sweep-curve" d="M165,340 C205,440 295,440 335,340" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0" />
                </svg>

                <div class="flower-text-pro">For You</div>
            </div>

            <!-- كارت الباسوورد -->
            <div class="login-card">
                <h1>🎁</h1>
                <h2>Welcome</h2>
                <p>A little surprise is waiting for you 💖</p>

                <div class="code-boxes">
                    <div class="code-box"></div>
                    <div class="code-box"></div>
                    <div class="code-box"></div>
                    <div class="code-box"></div>
                    <div class="code-box"></div>
                    <div class="code-box"></div>
                    <div class="code-box"></div>
                    <div class="code-box"></div>
                </div>

                <div class="number-pad">
                    <button type="button" data-value="1">1</button>
                    <button type="button" data-value="2">2</button>
                    <button type="button" data-value="3">3</button>
                    <button type="button" data-value="4">4</button>
                    <button type="button" data-value="5">5</button>
                    <button type="button" data-value="6">6</button>
                    <button type="button" data-value="7">7</button>
                    <button type="button" data-value="8">8</button>
                    <button type="button" data-value="9">9</button>
                    <button type="button" id="delete-btn">⌫</button>
                    <button type="button" data-value="0">0</button>
                    <button type="button" id="enter-btn">✓</button>
                </div>
            </div>

        </div>
    </section>
    `;
}