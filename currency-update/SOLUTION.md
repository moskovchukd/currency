# Rozwiązanie Aplikacji Wymiany Walut

## Przegląd

Aplikacja umożliwia użytkownikom sprawdzanie aktualnych kursów kupna i sprzedaży wybranych walut przy użyciu API Narodowego Banku Polskiego (NBP). Użytkownicy mogą również przeglądać historyczne dane kursów wymiany dla każdej waluty oraz obliczać przeliczenia walutowe.

## Zaimplementowane funkcje

1. **Tabela kursów wymiany:**
   - Wyświetla aktualne kursy kupna i sprzedaży (Tabela C) dla USD, EUR, CHF, GBP i JPY
   - Każda waluta posiada przycisk do wyświetlania wykresu z danymi historycznymi

2. **Wykresy danych historycznych:**
   - Pokazuje ostatnie 10 średnich kursów wymiany (Tabela A) dla wybranej waluty
   - Zaimplementowane jako modal/popup dla lepszego doświadczenia użytkownika
   - Zawiera elementy interaktywne (podpowiedzi, responsywny design)

3. **Kalkulator walutowy:**
   - Umożliwia użytkownikom wprowadzenie kwoty i wybór waluty
   - Wyświetla obliczenia zarówno dla kupna, jak i sprzedaży
   - Aktualizuje się w czasie rzeczywistym, gdy użytkownik zmienia dane wejściowe

4. **Responsywny design:**
   - Działa dobrze na urządzeniach stacjonarnych i mobilnych
   - Dostosowuje układ w zależności od rozmiaru ekranu

## Wykorzystane technologie i biblioteki

1. **React.js**
   - Użyty do podstawowej struktury aplikacji i zarządzania stanem
   - Komponenty funkcyjne z Hookami (useState, useEffect) dla czystego, nowoczesnego kodu

2. **Recharts**
   - Wybrane do wizualizacji danych (wykresy historycznych kursów wymiany)
   - Zapewnia interaktywne, responsywne wykresy z minimalną konfiguracją
   - Wspiera podpowiedzi i możliwość dostosowania formatowania

3. **CSS z klasami narzędziowymi**
   - Zastosowano podejście utility-first do stylizacji
   - Zapewnia responsywny design przy minimalnym wysiłku
   - Sprawia, że interfejs użytkownika jest spójny i profesjonalny

## Szczegóły implementacji

### Pobieranie danych
- Użyto async/await z API fetch do pobierania danych z endpointów NBP
- Zaimplementowano obsługę błędów dla zapytań API
- Oddzielono logikę dla różnych wywołań API (Tabela A, Tabela C, dane historyczne)

### Interfejs użytkownika
- Stworzono czysty, intuicyjny interfejs z wyraźnymi sekcjami
- Zastosowano kodowanie kolorami do rozróżnienia między kursami kupna i sprzedaży
- Zaimplementowano responsywne tabele i formularze

### Zarządzanie stanem
- Wykorzystano useState React do zarządzania stanem aplikacji
- Zaimplementowano stany ładowania i błędów dla lepszego doświadczenia użytkownika
- Oddzielono stan dla różnych funkcji (aktualne kursy, dane historyczne, kalkulator)

## Wyzwania i rozwiązania

1. **Wyzwanie:** Efektywna obsługa wielu zapytań API
   **Rozwiązanie:** Zaimplementowano równoległe zapytania z odpowiednią obsługą błędów

2. **Wyzwanie:** Tworzenie responsywnych wykresów, które dobrze działają na urządzeniach mobilnych
   **Rozwiązanie:** Użyto ResponsiveContainer z Recharts i niestandardowych stylów, aby zapewnić dobry wygląd na wszystkich rozmiarach ekranu

3. **Wyzwanie:** Zaprojektowanie intuicyjnego kalkulatora walutowego
   **Rozwiązanie:** Stworzono prosty dwupolowy formularz z natychmiastową informacją zwrotną i przejrzystym wyświetlaniem wyników

4. **Wyzwanie:** Zarządzanie modalem/popupem dla danych historycznych
   **Rozwiązanie:** Zaimplementowano czysty komponent modalu z odpowiednim tłem i funkcją zamykania

## Przyszłe udoskonalenia

1. **Dodatkowe funkcje:**
   - Wybór zakresu dat dla danych historycznych
   - Wykresy porównawcze dla wielu walut
   - Zapisywanie ulubionych walut
   - Konwersja walut między dowolnymi dwiema walutami (nie tylko do/z PLN)

2. **Usprawnienia techniczne:**
   - Implementacja React Router dla lepszej nawigacji między różnymi widokami
   - Dodanie testów jednostkowych i integracyjnych
   - Implementacja bardziej zaawansowanego zarządzania stanem (Context API lub Redux) dla większego zestawu funkcji
   - Dodanie buforowania danych w celu zmniejszenia liczby wywołań API
   - Implementacja funkcji PWA dla możliwości pracy offline

3. **Udoskonalenia UI:**
   - Dodanie większej liczby elementów interaktywnych, takich jak sortowanie i filtrowanie
   - Implementacja trybu ciemnego
   - Dodanie animacji dla lepszego doświadczenia użytkownika
   - Stworzenie wersji aplikacji mobilnej przy użyciu React Native

## Instrukcje konfiguracji

1. Sklonuj repozytorium
2. Uruchom `npm install`, aby zainstalować zależności
3. Uruchom `npm start`, aby uruchomić serwer deweloperski
4. Uzyskaj dostęp do aplikacji pod adresem http://localhost:3000

## Użyta dokumentacja API

Aplikacja korzysta z następujących endpointów API NBP:

- Tabela A (średnie kursy): https://api.nbp.pl/api/exchangerates/tables/a/
- Tabela C (kursy kupna/sprzedaży): https://api.nbp.pl/api/exchangerates/tables/c/
- Dane historyczne: https://api.nbp.pl/api/exchangerates/rates/a/{code}/last/10/

## Podsumowanie

Aplikacja skutecznie implementuje wszystkie wymagane funkcje przy użyciu nowoczesnych praktyk React i zapewnia solidną podstawę do przyszłych ulepszeń. Kod jest ustrukturyzowany tak, aby był łatwy w utrzymaniu i rozszerzalny, z wyraźnym rozdzieleniem odpowiedzialności i możliwymi do ponownego użycia komponentami.