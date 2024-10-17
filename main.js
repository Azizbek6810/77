import { categories } from "./categories"
const languages = [
  {
    id: 1,
    code: "uz",
    title: "O'zbek",
    image: "/images/icons/uz.svg"
  },
  {
    id: 2,
    code: "ru",
    title: "Русский",
    image: "/images/icons/ru.svg"
  }
];



const announcementArray = [
  {
    id: 1,
    country: "г. Ташкент",
    title: "Кепки Corneliani Diamond for him edition.",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "2 599 000",
    image: "cap-1.webp"
  },
  {
    id: 2,
    country: "г. Самарканд",
    title: "Chevrolet Onix 1.2 Turbo в наличии",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "204 000 000",
    image: "malibu.webp"
  },
  {
    id: 3,
    country: "г. Ташкент",
    title: "7Saber Trucker Cap",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "280 000",
    image: "cap-2.webp"
  },
  {
    id: 4,
    country: "г. Ташкент",
    title: "Оригинальные кроссовки Nike Air Max Plus",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "4 820 000",
    image: "sneakers-1.webp"
  },
  {
    id: 5,
    country: "г. Ташкент",
    title: "Оригинальные кроссовки Nike Air Max 97",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "4 820 000",
    image: "sneakers-2.webp"
  },
  {
    id: 6,
    country: "г. Ташкент",
    title: "Apple Watch Series 8 - USA Non active",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "4 500 000",
    image: "iwatch.webp"
  },
  {
    id: 7,
    country: "г. Самарканд",
    title: "Лучший кроссовер Geely Monjaro Limited Edition",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "320 000 000",
    image: "jeep.webp"
  },
  {
    id: 8,
    country: "г. Ташкент",
    title: "Стайлер для волос Dyson airwrap complete long",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "500",
    image: "beauty.webp"
  },
  {
    id: 9,
    country: "г. Ташкент",
    title: "7Saber Trucker Cap",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "280 000",
    image: "cap-2.webp"
  },
  {
    id: 10,
    country: "г. Ташкент",
    title: "Оригинальные кроссовки Nike Air Max Plus",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "4 820 000",
    image: "sneakers-1.webp"
  },
  {
    id: 11,
    country: "г. Ташкент",
    title: "Chevrolet Onix 1.2 Turbo в наличии",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "204 000 000",
    image: "malibu.webp"
  },
  {
    id: 12,
    country: "г. Ташкент",
    title: "Кепки Corneliani Diamond for him edition.",
    date: "Вчера, 19:20",
    telephone: "+998 71 200 70 07",
    price: "2 599 000",
    image: "cap-1.webp"
  },

]

const langBtn = document.querySelector('.language-btn');
const langText = langBtn.querySelector('span');
const langImg = langBtn.querySelector('img');
let langList = document.querySelector('.language-list');
let announcementList = document.querySelector('.announcement-list');

let activeLanguage = "uz";
let activeLanguageObj;
let activeIdx = null;

const toggleLangList = () => {
  if (langList.classList.contains('list-hidden')) {
    langList.classList.remove('list-hidden');
  } else {
    langList.classList.add('list-hidden');
  }
}

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
    categoriesSection.innerHTML += getCategoryTemplate(category, idx)
  })
}

renderCategories()

const getSubcategoryTemplate = (subcategory) => {
  return `
  <a href="#" class="flex items-center justify-between gap-3 p-3">
   <h4>${subcategory.name}</h4>
   <i class="icon-down -rotate-90 inline-block text-xl leading-5 text-[#B8BBBD]"></i>
  </a>
  `
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
        <h3 class="text-black text-lg leading-130 font-semibold min-h-[46.78px] group-hover:text-[#388FF3]">
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
})

const adjustDropdownPosition = (categoryIdx, dropdownContainer) => {
  const activeRow = Math.floor(categoryIdx / 3) + 2;
  dropdownContainer.style.gridRow = activeRow;
}

const toggleDropdownVisibility = () => {
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
  const categories = document.querySelectorAll(".category-list");

  categories.forEach((c) => c.classList.remove("active"));

  if (activeIdx === categoryIdx) {
    categories[categoryIdx].classList.remove("active")
  } else {
    categories[categoryIdx].classList.toggle("active")
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