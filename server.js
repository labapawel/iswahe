// Importujemy wymagane moduły
const express = require("express"); 
const bodyParser = require("body-parser");
const { exec } = require("child_process");
require("dotenv").config();
const fs = require("fs");

// Inicjalizacja aplikacji Express
const aplikacja = express();
aplikacja.use(bodyParser.json());
aplikacja.use(express.static("public"));

/**
 *  Funkcja pomocnicza: Generowanie faktów Prolog na podstawie planszy
 * @param {array} plansza - Aktualny stan planszy
 * @returns {string} Fakty w formacie Prolog
 */
function generujFakty(plansza) {
    return plansza
        .map((wartosc, indeks) => {
            if (wartosc === "X") return `x(${indeks + 1}).`;
            if (wartosc === "O") return `o(${indeks + 1}).`;
            return `empty(${indeks + 1}).`;
        })
        .join("\n");
}

/**
 * Trasa API: Wykonanie ruchu
 * @route POST /ruch
 * @param {object} req - Żądanie HTTP zawierające stan planszy.
 * @param {object} res - Odpowiedź HTTP zawierająca ruch komputera i informację o zwycięzcy.
 */
aplikacja.post("/ruch", (req, res) => {
    const { plansza } = req.body;

    if (!Array.isArray(plansza) || plansza.length !== 9) {
        return res.status(400).json({ blad: "Nieprawidłowy format planszy." });
    }

    // Generowanie faktów Prolog
    const fakty = generujFakty(plansza);
    const plikFaktow = "fakty.pl";
    fs.writeFileSync(plikFaktow, fakty);

    // Wywołanie Prologa dla ruchu komputera
    exec(`${process.env.PATH_SWIPL} -s gra.pl -g "consult('${plikFaktow}'), ruch(Pos), halt."`, (blad, stdout, stderr) => {
        if (blad) {
            console.error("Błąd podczas wywołania Prolog (ruch):", stderr);
            return res.status(500).json({ blad: "Błąd podczas wnioskowania ruchu." });
        }

        const ruchKomputera = parseInt(stdout.trim(), 10);
        if (isNaN(ruchKomputera)) {
            return res.status(400).json({ blad: "Nie udało się znaleźć ruchu." });
        }

        plansza[ruchKomputera - 1] = "O";

        // Wywołanie Prologa dla sprawdzenia zwycięzcy
        exec(`${process.env.PATH_SWIPL} -s gra.pl -g "consult('${plikFaktow}'), sprawdz_wygranego(Gracz), halt."`, (blad2, stdout2, stderr2) => {
            if (blad2) {
                console.error("Błąd podczas wywołania Prolog (sprawdz_wygranego):", stderr2);
                return res.status(500).json({ blad: "Błąd podczas sprawdzania zwycięzcy." });
            }

            const zwyciezca = stdout2.trim();
            if (!zwyciezca && plansza.find(pole => pole === "") == -1) {
                return res.status(500).json({ blad: "Nie udało się ustalić zwycięzcy." });
            }

            // Zwracamy odpowiedź z ruchem komputera i zwycięzcą
            res.json({
                plansza,
                ruchKomputera,
                zwyciezca: zwyciezca
            });
        });
    });
});

/**
 * Trasa API: Resetowanie planszy
 * @route POST /reset
 * @param {object} req - Żądanie HTTP.
 * @param {object} res - Odpowiedź HTTP potwierdzająca reset planszy.
 */
aplikacja.post("/reset", (req, res) => {
    const plansza = ["", "", "", "", "", "", "", "", ""];
    res.json({ plansza, wiadomosc: "Plansza została zresetowana." });
});

// Uruchamiamy serwer HTTP na porcie 3000
const port = process.env.PORT || 3423;
aplikacja.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
