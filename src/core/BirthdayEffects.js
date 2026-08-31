export function startBirthdayEffects(){


    const container =
    document.createElement("div");


    container.className =
    "birthday-effects";


    document.body.appendChild(container);



    const emojis = [

"✦",
"♡",
"•",
"✧"

    ];



    setInterval(()=>{


        const item =
        document.createElement("span");



        item.innerHTML =
        emojis[
            Math.floor(
                Math.random()*emojis.length
            )
        ];



        item.className =
        "birthday-item";



        item.style.left =
        Math.random()*100 + "%";



        item.style.animationDuration =
        (5 + Math.random()*5) + "s";



        item.style.fontSize =
        (25 + Math.random()*25) + "px";



        container.appendChild(item);



        setTimeout(()=>{

            item.remove();

        },10000);



    },700);



}