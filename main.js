import { categories } from "./categories"
import { languages } from "./langs";
import { announcementArray } from "./announcements";

const langBtn = document.querySelector('.language-btn');
const langText = langBtn.querySelector('span');
const langImg = langBtn.querySelector('img');
let langList = document.querySelector('.language-list');
let announcementList = document.querySelector('.announcement-list');
let currentYear = document.querySelector('.currentYear');


let activeLanguage = "uz";
let activeLanguageObj;

const searchArray = [
  {
    id: 1,
    title: "Холодильники"
  },
  {
    id: 2,
    title: "Телевизоры"
  },
  {
    id: 3,
    title: "Наушники и аксессуары"
  },
  {
    id: 4,
    title: "Кухонная мебель"
  },
  {
    id: 5,
    title: "Телефоны"
  },
  {
    id: 6,
    title: "Бытовая техника"
  },
  {
    id: 7,
    title: "Микроволновки"
  },
  {
    id: 8,
    title: "Аккумуляторы"
  },
]

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

let searchInputEl = document.querySelector('.search-input');
let dropdownWrapper = document.querySelector('.dropdown-wrapper');
let searchDropdownList = document.querySelector('.search_dropdown__list');
let dropdownBackground = document.querySelector('.dropdown-background');

let isSearchOpened = false;
let inputValue;
let resultArray;

const renderSearchResult = (array = searchArray, inputValue) => {
  searchDropdownList.innerHTML = '';

  array.length
    ? array.forEach((item) => {
      let highlightedTitle = item.title;
      if (inputValue) {
        const regex = new RegExp(inputValue, "gi");

        highlightedTitle = item.title.replace(regex, (match) => `<span class="bg-orange rounded-md">${match}</span>`)
      }
      searchDropdownList.innerHTML += `
      <li class="border-b-2 py-4 flex items-center justify-between cursor-pointer">
        <p class="flex items-center gap-2">
          <i class="icon-star text-orange-400"></i>
          <span class="text-base font-medium leading-130">${highlightedTitle}</span>
        </p>
        <i class="icon-down -rotate-90 text-2xl text-grey-200"></i>
      </li>
    `
    })
    : searchDropdownList.innerHTML = `
    <div class="flex flex-col justify-center items-center pb-8"> 
      <img src="/images/home/search-error.svg" alt="search error" class="w-fit"/>
      <h4 class="text-lg font-semibold leading-130 text-black mb-2">Ничего не найдено</h4>
      <p class="text-grey-100 text-sm font-normal leading-5 w-80 text-center">
        Упс! Мы не смогли найти ни одного подходящего результата по вашему запросу
      </p>
  </div>
    `
}

searchInputEl.addEventListener('click', () => {
  isSearchOpened = !isSearchOpened

  if (isSearchOpened) {
    dropdownWrapper.classList.add("!opacity-100")
    dropdownWrapper.classList.add("!visible")
  } else {
    dropdownWrapper.classList.remove('!opacity-100')
    dropdownWrapper.classList.remove("!visible")
  }

  renderSearchResult(resultArray, inputValue ? inputValue : null)

})

dropdownBackground.addEventListener('click', () => {
  isSearchOpened = !isSearchOpened
  dropdownWrapper.classList.remove('!opacity-100')
  dropdownWrapper.classList.remove("!visible")
})

searchInputEl.addEventListener('input', (e) => {
  inputValue = e.target.value;

  setTimeout(() => {
    resultArray = searchArray.filter((item) => {
      return item.title.toLowerCase().includes(inputValue.toLowerCase())
    })
    renderSearchResult(resultArray, inputValue)
  }, 500);
});

const loginButton = document.querySelector('.login-button');
const loginWrapper = document.querySelector('.login-wrapper');
const loginBackground = document.querySelector('.login-background');
const loginContent = document.querySelector('.login-content');
const loginClose = document.querySelector('.login-close');
const iconEyeClosed = document.querySelector('.icon-eye-closed');
const passwordInput = document.querySelector('#password-label');

let isLoginContentOpened = false;

loginButton.addEventListener('click', () => {
  isLoginContentOpened = !isLoginContentOpened;

  if (isLoginContentOpened) {
    loginWrapper.classList.add('!opacity-100');
    loginWrapper.classList.add('!visible');
  } else {
    loginWrapper.classList.remove('!opacity-100');
    loginWrapper.classList.remove('!visible');
  }
})

loginClose.addEventListener("click", () => {
  isLoginContentOpened = !isLoginContentOpened;

  loginWrapper.classList.remove('!opacity-100');
  loginWrapper.classList.remove('!visible');
})

iconEyeClosed.addEventListener('click', ()=>{
  passwordInput.getAttribute("")
})









