const board = Array(9).fill("");
const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");

function renderBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (cell !== "") {
            cellElement.classList.add("taken");
        }
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function checkBoard() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            pattern.forEach(index => {
                const cell = boardElement.children[index];
                cell.style.backgroundColor = '#e6ffe6';
                cell.style.color = '#006600';
                messageElement.textContent = `Zwycięzca: ${cell.innerHTML}`;
            });
            return board[a];
        }
    }
    return null;
}

function makeMove(index) {
    if (board[index] !== "") return;

    // Gracz "X"
    board[index] = "X";
    renderBoard();

    // Wywołanie API do ruchu komputera
    fetch("/ruch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plansza: board })
    })
    .then(response => response.json())
    .then(data => {
        board[data.ruchKomputera - 1] = "O";
        renderBoard();


        checkBoard();
        // Sprawdzenie, kto wygrał
        // if (data.zwyciezca && data.zwyciezca !== "Brak") {
        //     messageElement.textContent = `Zwycięzca: ${data.zwyciezca}`;
        //     disableBoard();
        // } else {
        //     messageElement.textContent = "Gra trwa...";
        // }

    })
    .catch(error => console.error("Błąd wnioskowania:", error));
}

function resetGame() {
    fetch("/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
        renderBoard();
        messageElement.textContent = "";
    })
    .catch(error => console.error("Błąd resetowania gry:", error));
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.add("taken");
    });
}

// Inicjalizuj planszę
renderBoard();