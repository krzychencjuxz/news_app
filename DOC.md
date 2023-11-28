# Dokumentacja, o co cho ?

## GIT - czyli jak i czemu to działa
1. Zaktualizuj listę zdalnych gałęzi:
### git fetch
Ta komenda pobierze informacje o wszystkich zdalnych gałęziach projektu, ale nie zmieni lokalnych plików.
2. Sprawdź dostępne zdalne gałęzie:
### git branch -r
Ta komenda wyświetli listę wszystkich gałęzi w zdalnym repozytorium.
3. Pobierz i przełącz się na zdalną gałąź:
### git checkout feature-branch
Jeśli gałąź nie istnieje lokalnie, Git automatycznie utworzy ją i przełączy się na nią, śledząc jej zdalny odpowiednik.
4. Alternatywnie, użyj git switch:
### git switch feature-branch
Jeśli gałąź nie istnieje lokalnie, ta komenda również ją utworzy i przełączy się na nią, śledząc jej zdalny odpowiednik.
5. Wróc do punktu wyjścia:
### git checkout nazwaTwojejGalezi
Pamiętaj że w każdej chili możesz wrócić do punktu wyjscia nie tracąc czasu na przywracania zmian.

# Dalsza część dokumentacji ....

npm install react-router-dom
milosz2711