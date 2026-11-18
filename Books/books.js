
const books = [
  {
    title: "ملت عشق",
    author: "الیف شافاک",
    category: "novel",
    categoryName: "رمان",
    image: "millat-e-eshgh.jpeg"
  },
  {
    title: "هیچ ملاقاتی تصادفی نیست",
    author: "هاکان منگوچ",
    category: "philosophy",
    categoryName: "فلسفه و معنا",
    image: "hich-molaghati.jpeg"
  },
  {
    title: "من نی هستم",
    author: "نویسنده",
    category: "self",
    categoryName: "خودشناسی و موفقیت",
    image: "man-ni-hastam.jpeg"
  },
  {
    title: "زنده‌ایم یا زندگی می‌کنیم",
    author: "نویسنده",
    category: "philosophy",
    categoryName: "فلسفه و معنا",
    image: "zende-im.jpeg"
  },
  {
    title: "لطفاً گوسفند نباشید",
    author: "محمود نامنی",
    category: "self",
    categoryName: "خودشناسی و موفقیت",
    image: "lotfan-gosfand-nabashid.jpeg"
  },
  {
    title: "خوشبختی انقلاب بزرگی‌ست",
    author: "نویسنده",
    category: "self",
    categoryName: "خودشناسی و موفقیت",
    image: "khoshbakhti.jpeg"
  },
  {
    title: "زنان زیرک",
    author: "شری آرگو",
    category: "psychology",
    categoryName: "روان‌شناسی",
    image: "zanan-zirak.jpeg"
  },
  {
    title: "برتری خفیف",
    author: "جف اولسون",
    category: "self",
    categoryName: "خودشناسی و موفقیت",
    image: "bartari-khafif.jpeg"
  },
  {
    title: "انسان در جستجوی معنا",
    author: "ویکتور فرانکل",
    category: "philosophy",
    categoryName: "فلسفه و معنا",
    image: "ensan-maena.jpeg"
  },
  {
    title: "چهار اثر از فلورانس اسکاول شین",
    author: "فلورانس اسکاول شین",
    category: "self",
    categoryName: "خودشناسی و موفقیت",
    image: "char-asar.jpeg"
  }
];

// گرفتن عناصر HTML

const booksGrid = document.getElementById("booksGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const bookCount = document.getElementById("bookCount");
const emptyMessage = document.getElementById("emptyMessage");
const resultTitle = document.getElementById("resultTitle");

// نام دسته‌بندی‌ها

const categoryNames = {
  all: "همه کتاب‌ها",
  novel: "کتاب‌های رمان",
  self: "کتاب‌های خودشناسی و موفقیت",
  psychology: "کتاب‌های روان‌شناسی",
  philosophy: "کتاب‌های فلسفه و معنا"
};

// دریافت علاقه‌مندی‌ها از Local Storage

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favoriteBooks")) || [];
  } catch (error) {
    return [];
  }
}

// ذخیره علاقه‌مندی‌ها

function saveFavorites(favorites) {
  localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
}

// بررسی علاقه‌مندی بودن کتاب

function isFavorite(book) {
  return getFavorites().some(item => item.title === book.title);
}

// افزودن یا حذف کتاب از علاقه‌مندی‌ها

function toggleFavorite(book, button) {
  let favorites = getFavorites();

  const exists = favorites.some(
    item => item.title === book.title
  );

  if (exists) {
    favorites = favorites.filter(
      item => item.title !== book.title
    );
  } else {
    favorites.push(book);
  }

  saveFavorites(favorites);

  updateFavoriteButton(button, book);
}

// تغییر ظاهر قلب

function updateFavoriteButton(button, book) {
  const favorite = isFavorite(book);

  button.textContent = favorite ? "♥" : "♡";

  button.style.color = favorite ? "#e05268" : "#647080";

  button.style.background = favorite
    ? "rgba(224, 82, 104, 0.10)"
    : "rgba(255, 255, 255, 0.8)";

  button.title = favorite
    ? "حذف از علاقه‌مندی‌ها"
    : "افزودن به علاقه‌مندی‌ها";

  button.setAttribute("aria-label", button.title);
}

// نمایش کتاب‌ها

function displayBooks(bookList) {

  booksGrid.innerHTML = "";

  bookCount.textContent = `${bookList.length} کتاب`;

  if (bookList.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  bookList.forEach(book => {

    const card = document.createElement("article");

    card.className = "book-card";

    card.innerHTML = `
      <img
        src="../images/${book.image}"
        alt="${book.title}"
        class="book-cover"
        loading="lazy"
      >

      <div class="book-info">

        <h3>${book.title}</h3>

        <p>${book.author}</p>

        <span class="book-category">
          ${book.categoryName}
        </span>

        <button class="favorite-btn" type="button"
          style="
            display: block;
            margin: 12px 0;
            padding: 7px 14px;
            border: 1px solid rgba(100,112,128,0.2);
            border-radius: 10px;
            font-size: 23px;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
          ♡
        </button>

        <button class="details-btn">
          مشاهده کتاب
        </button>

      </div>
    `;

    // دکمه علاقه‌مندی‌ها

    const favoriteButton = card.querySelector(".favorite-btn");

    updateFavoriteButton(favoriteButton, book);

    favoriteButton.addEventListener("click", () => {
      toggleFavorite(book, favoriteButton);
    });

    // دکمه مشاهده کتاب

    card.querySelector(".details-btn").addEventListener("click", () => {

      alert(
        `نام کتاب: ${book.title}\nنویسنده: ${book.author}`
      );

    });

    booksGrid.appendChild(card);

  });

}

// جست‌وجو و فیلتر کتاب‌ها

function filterBooks() {

  const searchValue = searchInput.value.trim().toLowerCase();

  const selectedCategory = categoryFilter.value;

  resultTitle.textContent =
    categoryNames[selectedCategory] || "همه کتاب‌ها";

  const filteredBooks = books.filter(book => {

    const matchesSearch =
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" ||
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  displayBooks(filteredBooks);

}

// فعال کردن جست‌وجو و فیلتر

searchInput.addEventListener("input", filterBooks);

categoryFilter.addEventListener("change", filterBooks);

// دریافت دسته‌بندی از آدرس صفحه

const params = new URLSearchParams(window.location.search);

const selectedCategory = params.get("category");

const validCategories = [
  "novel",
  "self",
  "psychology",
  "philosophy"
];

if (validCategories.includes(selectedCategory)) {
  categoryFilter.value = selectedCategory;
}

// نمایش اولیه کتاب‌ها

filterBooks();

// نمایش سال جاری در Footer

document.getElementById("year").textContent =
  new Date().getFullYear();
