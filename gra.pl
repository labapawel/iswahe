:- discontiguous empty/1.
:- discontiguous x/1.
:- discontiguous o/1.

% Definicje zwycięskich linii
winning_line(1, 2, 3).
winning_line(4, 5, 6).
winning_line(7, 8, 9).
winning_line(1, 4, 7).
winning_line(2, 5, 8).
winning_line(3, 6, 9).
winning_line(1, 5, 9).
winning_line(3, 5, 7).

% Reguły gry
% Wygrana komputera "O"
wygrana(Pos) :-
    o(A), o(B), empty(Pos),
    winning_line(A, B, Pos).

% Blokowanie wygranej gracza "X"
blokuj(Pos) :-
    x(A), x(B), empty(Pos),
    winning_line(A, B, Pos).

% Zajmowanie środka planszy
srodek(Pos) :-
    Pos = 5, empty(5).

% Zajmowanie narożników
naroze(Pos) :-
    member(Pos, [1, 3, 7, 9]),
    empty(Pos).

% Zajmowanie dowolnego wolnego pola
dowolne(Pos) :-
    empty(Pos).

% Mechanizm wnioskowania: wybór najlepszego ruchu
najlepszy_ruch(Pos) :-
    (wygrana(Pos);
     blokuj(Pos);
     srodek(Pos);
     naroze(Pos);
     dowolne(Pos)).

% Predykat główny: ruch
ruch(Pos) :-
    najlepszy_ruch(Pos),
    write(Pos), nl.

% Sprawdzanie zwycięzcy
% Jeśli trzy pola w zwycięskiej linii należą do tego samego gracza
czy_wygral('X') :-
    winning_line(A, B, C),
    x(A), x(B), x(C), !.

czy_wygral('O') :-
    winning_line(A, B, C),
    o(A), o(B), o(C), !.

czy_wygral('Brak').

% Predykat główny: sprawdzanie zwycięzcy
sprawdz_wygranego(Gracz) :-
    (czy_wygral('X') -> Gracz = 'X';
     czy_wygral('O') -> Gracz = 'O';
     Gracz = 'Brak').
