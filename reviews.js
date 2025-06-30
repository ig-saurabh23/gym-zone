function openForm() {
    document.getElementById("reviewForm").style.display = "block";
}

function closeForm() {
    document.getElementById("reviewForm").style.display = "none";
}

document.getElementById("reviewFormElement").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("userName").value;
    const review = document.getElementById("userReview").value;
    const rating = document.getElementById("userRating").value;
    const photo = document.getElementById("userPhoto").files[0];

    const reader = new FileReader();
    reader.onload = function () {
        const newReview = document.createElement("div");
        newReview.className = "review-card";
        newReview.innerHTML = `
            <img src="${reader.result}" alt="${name}">
            <h3 class="member-name">${name}</h3>
            <p class="member-review">${review}</p>
            <div class="stars">${rating}</div>
        `;
        document.querySelector(".reviews-container").appendChild(newReview);
        closeForm();
    };
    if (photo) {
        reader.readAsDataURL(photo);
    }
});
