import { categories } from "./categories"
import { languages } from "./langs";
import { announcementArray } from "./announcements";
import "./search-dropdown";
import "./login-modal";

const langBtn = document.querySelector('.language-btn');
const langText = langBtn.querySelector('span');
const langImg = langBtn.querySelector('img');
let langList = document.querySelector('.language-list');
let announcementList = document.querySelector('.announcement-list');
let currentYear = document.querySelector('.currentYear');

let activeLanguage = "uz";
let activeLanguageObj;

const toggleLangList = () => {
  if (langList.classList.contains('list-hidden')) {
    langList.classList.remove('list-hidden');
  } else {
    langList.classList.add('list-hidden');
  }
}

currentYear.innerHTML = new Date().getFullYear()

const updateLangBtn = () => {
  langText.innerText = activeLanguageObj.title;
  langImg.src = activeLanguageObj.image;
}

const setActiveLanguage = (code) => {
  activeLanguageObj = languages.find((l) => l.code === code);
  updateLangBtn();
  toggleLangList();
}

activeLanguageObj = languages.find((l) => l.code === activeLanguage);
updateLangBtn()

langBtn.addEventListener('click', toggleLangList);

languages.forEach((lang) => {
  const liElement = document.createElement("li");
  liElement.innerText = lang.title;
  liElement.classList.add('langStyle')

  liElement.addEventListener("click", () => {
    setActiveLanguage(lang.code)
  });

  langList.append(liElement);
});

const hideEl = (el, display = "block") => {
  if (display) {
    el.classList.remove(display)
  }

  el.classList.add("hidden");
}

const showEl = (el, display = "block") => {
  el.classList.remove("hidden");

  if (display) {
    el.classList.add(display)
  }
}

announcementArray.forEach(announcement => {
  const context =
      `<article class="card border-none shadow-4xl relative group cursor-pointer max-sm:w-[70%] max-sm:mx-auto">
      <img
        class="rounded-t-xl w-full"
        src="/images/home/${announcement.image}"
        alt="cap"
      />
      <div class="card-body bg-white p-5 rounded-b-xl flex flex-col gap-y-2">
        <p class="bg-[#eaedf0] text-[#63676C] inline-block py-1 px-2 rounded-md w-fit">
          ${announcement.country}
        </p>
        <h3 class="text-black text-lg leading-130 font-semibold min-h-[46.78px] group-hover:text-[#388FF3] transition-300">
          ${announcement.title}
        </h3>
        <span class="text-[#8E9297] font-normal leading-130 text-sm">${announcement.date}</span>
        <a
          href="tel:+998 71 200 70 07"
          class="text-[#8E9297] font-semibold leading-130 text-base">
          ${announcement.telephone}</a
        >
        <b class="text-black font-bold text-2xl leading-130"
          >${announcement.price}
          <span class="text-[#388FF3] leading-4 text-base font-normal"
            >UZS</span
          ></b
        >
      </div>
      <i
        class="icon-heart inline-block absolute top-3 left-3 text-white text-4xl font-medium leading-10 cursor-pointer"
      ></i>
  </article>`

  announcementList.innerHTML += context
});

const getCategoryTemplate = (category, idx) => {
  return `
  <div class="box-border transition-300 flex shadow-3xl items-center justify-between border rounded-xl relative pl-10 py-5  cursor-pointer group hover:border hover:border-[#388FF3]"
   data-index="${idx}" 
   onclick="toggleDropdown(${idx})"
  >
    <i class="${category.image} transition-300 text-[#388FF3] bg-white absolute -left-8 text-3xl p-4 shadow-category border rounded-xl group-hover:text-white group-hover:bg-[#388FF3]"></i>
      <div class="flex flex-col">
        <p class="text-black text-base font-semibold leading-normal">
          ${category.title}
        </p>
        <span class="text-[#8E9297] font-normal leading-130 text-sm"
          >${category.description} объявлений</span
        >
      </div>
      <i class="icon-down -rotate-90 inline-block text-xl leading-5 text-[#B8BBBD]"></i>
  </div>`
}

const renderCategories = () => {
  const categoriesSection = document.querySelector(".category-list");

  categories.forEach((category, idx) => {
    categoriesSection.innerHTML += getCategoryTemplate(category, idx);
  })
}

renderCategories();

const getSubcategoryTemplate = (subcategory) => {
  return `
  <a href="#" class="flex items-center justify-between gap-3 p-3">
   <h4>${subcategory.name}</h4>
   <i class="icon-down -rotate-90 inline-block text-xl leading-5 text-[#B8BBBD]"></i>
  </a>
  `
}

let activeIdx = null;

const adjustDropdownPosition = (categoryIdx, dropdownContainer) => {
  const activeRow = Math.floor(categoryIdx / 3) + 2;
  dropdownContainer.style.gridRow = activeRow;
}

const toggleDropdownVisibility = (categoryIdx, dropdownContainer) => {
  if (dropdownContainer.classList.contains("hidden")) {
    showEl(dropdownContainer, "grid");
  } else if (activeIdx === categoryIdx) {
    hideEl(dropdownContainer, "grid");
  }
}

const renderSubcategories = (subcategories, dropdownContainer) => {
  dropdownContainer.innerHTML = subcategories ?
    subcategories.map(getSubcategoryTemplate).join("")
    : "Empty"
}

const toggleCategoryActive = (categoryIdx) => {
  const categoryList = document.querySelectorAll(".category-list");

  categoryList.forEach((c) => c.classList.remove("active"));

  if (activeIdx === categoryIdx) {
    categoryList[categoryIdx]?.classList.remove("active")
  } else {
    categoryList[categoryIdx]?.classList.add("active")
  }
}

window.toggleDropdown = (categoryIdx) => {

  const subcategories = categories[categoryIdx].subcategories;

  const dropdownContainer = document.querySelector(".subcategories-dropdown");

  adjustDropdownPosition(categoryIdx, dropdownContainer);

  toggleDropdownVisibility(categoryIdx, dropdownContainer);

  toggleCategoryActive(categoryIdx);

  renderSubcategories(subcategories, dropdownContainer);

  activeIdx = categoryIdx;
}









