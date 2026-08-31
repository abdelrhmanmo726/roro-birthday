export function navigate(page){
    const app = document.querySelector("#app");
    if (app) {
        app.innerHTML = page();
    }
}