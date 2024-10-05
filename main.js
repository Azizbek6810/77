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
const langBtn = document.querySelector('.language-btn');
const langText = langBtn.querySelector('span');
const langImg = langBtn.querySelector('img');
let langList = document.querySelector('.language-list');

let activeLanguage = "uz";
let activeLanguageObj;

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

    liElement.addEventListener("click", () => {
        setActiveLanguage(lang.code)
    });

    langList.append(liElement)
    // const context =
    //     `<li class="flex items-center gap-1 text-sm font-medium leading-130 text-black py-2.5 pr-11">
    //         <img src="${lang.image}" alt="language flag" class="h-fit" /> ${lang.title} 
    //     </li>`;
    // langList.insertAdjacentHTML('beforeend', context);
});



