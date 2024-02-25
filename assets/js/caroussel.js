const caroussel = document.querySelector(".slider-inner");
const arrowLeft = document.querySelector(".bi-chevron-left");
const arrowRight = document.querySelector(".bi-chevron-right");

let width = 660; // Largura de um cartão, ajuste conforme necessário

arrowLeft.addEventListener("click", () => {
    caroussel.scrollLeft -= width;
   
});

arrowRight.addEventListener("click", () => {
    caroussel.scrollLeft += width;
    
   
    });



