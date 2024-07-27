let forecast;

function toggleVisibility(shown) {
  let hidden = shown === "main" ? ".contact-main" : "main";

  $(hidden).addClass("d-none");
  $(shown).removeClass("d-none");
}
function toggleActive(activated) {
  let inActive = activated === "#contact-nav" ? "#home-nav" : "#contact-nav";

  $(activated).addClass("active");
  $(inActive).removeClass("active");
}

function handleNavigation(targetVisibility, targetActive) {
  toggleVisibility(targetVisibility);
  toggleActive(targetActive);
}

$("#contact-nav").on("click", () => {
  handleNavigation(".contact-main", "#contact-nav");
});

$("#home-nav").on("click", () => {
  handleNavigation("main", "#home-nav");
});

$("#return-home").on("click", () => {
  handleNavigation("main", "#home-nav");
});
