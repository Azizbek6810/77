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
        dropdownBackground.classList.add("!opacity-100")
        dropdownBackground.classList.add("!visible")
    } else {
        dropdownWrapper.classList.remove('!opacity-100')
        dropdownWrapper.classList.remove("!visible")
        dropdownBackground.classList.remove('!opacity-100')
        dropdownBackground.classList.remove("!visible")
    }

    renderSearchResult(resultArray, inputValue ? inputValue : null)
})

dropdownBackground.addEventListener('click', () => {
    isSearchOpened = !isSearchOpened
    dropdownWrapper.classList.remove('!opacity-100')
    dropdownWrapper.classList.remove("!visible")
    dropdownBackground.classList.remove('!opacity-100')
    dropdownBackground.classList.remove("!visible")
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