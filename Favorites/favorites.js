
const favoritesGrid = document.getElementById("favoritesGrid");
const emptyMessage = document.getElementById("emptyMessage");
const favoriteCount = document.getElementById("favoriteCount");

function getFavorites() {
    try {
        const favorites = JSON.parse(
            localStorage.getItem("favoriteBooks")
        );

        return Array.isArray(favorites) ? favorites : [];
    } catch (error) {
        return [];
    }
}

function saveFavorites(favorites) {
    localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
}

function displayFavorites() {
    const favorites = getFavorites();

    favoritesGrid.innerHTML = "";

    favoriteCount.textContent = `${favorites.length} کتاب`;

    if (favorites.length === 0) {
        emptyMessage.style.display = "block";
        favoritesGrid.style.display = "none";
        return;
    }

    emptyMessage.style.display = "none";
    favoritesGrid.style.display = "grid";

    favorites.forEach((book) => {
        const card = document.createElement("div");
        card.className = "book-card";

        const image = document.createElement("img");
        image.src = `../images/${book.image}`;
        image.alt = book.title;

        image.onerror = function () {
            this.alt = "تصویر کتاب در دسترس نیست";
            this.style.display = "none";
        };

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `نویسنده: ${book.author}`;

        const category = document.createElement("p");
        category.textContent = book.categoryName;

        const removeButton = document.createElement("button");
        removeButton.className = "remove-btn";
        removeButton.textContent = "♥ حذف از علاقه‌مندی‌ها";

        removeButton.addEventListener("click", function () {
            removeFavorite(book.title);
        });

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(category);
        card.appendChild(removeButton);

        favoritesGrid.appendChild(card);
    });
}

function removeFavorite(title) {
    const favorites = getFavorites();

    const updatedFavorites = favorites.filter(
        book => book.title !== title
    );

    saveFavorites(updatedFavorites);
    displayFavorites();
}

document.getElementById("year").textContent =
    new Date().getFullYear();

displayFavorites();
