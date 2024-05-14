// nav Script
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = document.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});


// newPost Script
function ImagePreview(event) {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = function () {
    const image = document.getElementById("imagePreview");
    image.src = reader.result;
  };
  reader.readAsDataURL(input.files[0]);
}



