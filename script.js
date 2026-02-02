const puzzle = document.getElementById("puzzle");
const popup = document.getElementById("successPopup");

const pieces = [
    "piece_1.jpg",
    "piece_2.jpg",
    "piece_3.jpg",
    "piece_4.jpg",
    "piece_5.jpg",
    "piece_6.jpg",
    "piece_7.jpg",
    "piece_8.jpg",
    "piece_9.jpg"
];

// Shuffle pieces
pieces.sort(() => Math.random() - 0.5);

let dragged = null;

// Create puzzle pieces
pieces.forEach((img, index) => {
    const div = document.createElement("div");
    div.className = "puzzle-piece";
    div.draggable = true;
    div.dataset.correct = `piece_${index + 1}.jpg`;

    const image = document.createElement("img");
    image.src = `images/${img}`;
    image.style.width = "100%";
    image.style.height = "100%";

    div.appendChild(image);
    puzzle.appendChild(div);

    div.addEventListener("dragstart", () => {
        dragged = div;
        div.classList.add("dragging");
    });

    div.addEventListener("dragend", () => {
        dragged = null;
        div.classList.remove("dragging");
        checkSolved();
    });

    div.addEventListener("dragover", e => e.preventDefault());

    div.addEventListener("drop", () => {
        if (dragged !== div) {
            const temp = div.innerHTML;
            div.innerHTML = dragged.innerHTML;
            dragged.innerHTML = temp;
        }
    });
});

function checkSolved() {
    const all = document.querySelectorAll(".puzzle-piece");
    let solved = true;

    all.forEach((div, i) => {
        const imgSrc = div.querySelector("img").src;
        if (!imgSrc.includes(`piece_${i + 1}.jpg`)) {
            solved = false;
        }
    });

    if (solved) {
        popup.style.display = "block";
    }
}
