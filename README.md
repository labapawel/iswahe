# Inteligentne systemy wnioskuj AHE

## Wstęp
System Kółko i Krzyżyk to aplikacja webowa oparta na logice wnioskowania, która umożliwia użytkownikowi rywalizację z komputerem w klasyczną grę Tic-Tac-Toe. Projekt został zaprojektowany z użyciem Node.js i Express jako backendu, Prolog jako silnika wnioskowania oraz HTML, CSS i JavaScript do stworzenia dynamicznego interfejsu użytkownika.

## Cel
Głównym celem systemu jest demonstracja integracji systemów ekspertowych z nowoczesnymi aplikacjami webowymi. Prolog jest używany do podejmowania decyzji o najlepszym ruchu komputera oraz do analizy, kto wygrał grę. System obsługuje pełny cykl rozgrywki, od wykonywania ruchów, przez weryfikację zwycięzcy, po resetowanie planszy.

Kluczowe funkcjonalności
Interfejs użytkownika:

Atrakcyjny graficznie układ z responsywną planszą.
Informacje o przebiegu gry, w tym komunikaty o zwycięzcy.
Możliwość resetowania gry.
Logika gry:

Implementacja zasad gry Kółko i Krzyżyk.
Możliwość wykonywania ruchów przez gracza oraz podejmowania decyzji przez komputer.
System ekspertowy:

Silnik wnioskowania w Prolog, który:
Podejmuje decyzje o najlepszym możliwym ruchu.
Sprawdza, kto wygrał grę.
Backend:

Obsługuje żądania API do przetwarzania ruchów i resetowania gry.
Integruje logikę Prolog z aplikacją webową.
API:

POST /ruch: Przesyła aktualny stan planszy i zwraca ruch komputera oraz informację o zwycięzcy.
POST /reset: Resetuje planszę do stanu początkowego.

## Autorzy
Bartosz Mroczkowski 167120
Paweł Łaba 167122

## Instalacja oprogramowania Windows
wymagana instalacja Nodejs
https://www.swi-prolog.org/download/stable
https://nodejs.org/en


## Instalacja oprogramowania LINUX

```
sudo add-apt-repository ppa:swi-prolog/stable
sudo apt-get update
sudo apt-get install swi-prolog nodejs npm
```

## Konfiguracja
w pliku .env nalezy ustawić odpowiednie ścieżki

```
/usr/bin/swipl # dla linux
c:\\Program Files\\swipl\\bin\\swipl.exe # dla windows
```

```
PATH_SWIPL=/usr/bin/swipl
PORT=3423
```

## pierwsze uruchomienie
w Katalogu projektu podajemy polecenie 
```
npm i
```
## Uruchomienie projektu 

```
node server.js
```



