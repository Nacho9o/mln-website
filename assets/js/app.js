"use strict";

const wrapper = document.querySelector(".wrapper");
const header = document.querySelector(".header");
const wrapperHeight = wrapper.getBoundingClientRect().height;
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const scrollTop = document.querySelector(".scroll-to-top");
const goTop = document.querySelector(".banner");

///////////////////////////////////////
// Sticky nav
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) wrapper.classList.add("sticky");
  else wrapper.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${wrapperHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////
// Modal window
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////
// Scroll top
const scrollToTop = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) scrollTop.classList.remove("show");
  else scrollTop.classList.add("show");
};
const scrollObserver = new IntersectionObserver(scrollToTop, {
  root: null,
  threshold: 0.1,
});
scrollObserver.observe(goTop);

/////////////////////////////////////
// Custom cursor
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 14) + "px; left: " + (e.pageX - 14) + "px;"
  );
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");

  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 300);
});

