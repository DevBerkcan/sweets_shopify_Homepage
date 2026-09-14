# Shop-Optimierung – 14.09.2026

Umgesetzt und in der lokalen Shopify-Vorschau unter http://127.0.0.1:9292/ geprüft. Kein Live-Theme veröffentlicht und keine Bestellung ausgelöst.

## Gestaltung und Orientierung

- Neuer Hero mit echtem Bestsellerbild als Ersatz für das nicht auflösbare konfigurierte Bild. Eigene Bilder und Collage bleiben im Theme-Editor möglich; die Fallback-Kollektion ist auswählbar.
- Kategorien verwenden bei fehlendem Kollektionsbild das erste Produktbild statt der Handtaschen-Platzhalter.
- Produktauswahl und Snack-Finder nach vorne gezogen; die beiden doppelten Kalenderbereiche mit Artikeln aus 2025/2026 deaktiviert, im Editor weiterhin vorhanden.
- Produktbereiche als übersichtliche Grids statt Karussells ohne sichtbare Navigation.
- Footer mit fünf passend dimensionierten Spalten, vorhandenem Markenlogo, besserem Kontrast und deutschem Newsletter-Button.
- Horizontale Überläufe durch negative Footer-Abstände und eine widersprüchliche mobile Überschriftenregel behoben.

## Funktion, Zugänglichkeit und Laden

- Snack-Finder repariert: Das bisherige Inline-Skript suchte einen übergeordneten Container, lag aber außerhalb dieses Containers und beendete sich deshalb sofort.
- Erste Auswahl sichtbar; Klick, Pfeiltasten, Home/End, Fokus und erneutes Laden im Theme-Editor unterstützt. Ohne JavaScript bleiben die Produktbereiche zugänglich.
- Spiel-Skript greift nur auf seine Elemente zu, wenn sie vorhanden sind.
- Mobilzoom wieder erlaubt. Beschriftungen für Menü, Suche, Warenkorb, Mengenfelder und Mengen-/Entfernen-Schaltflächen ergänzt.
- Abschnittsüberschriften auf H2 korrigiert, Suchbegriff im Formular escaped und fehlerhafte Breadcrumb-JSON-Ausgabe korrigiert.
- Hero-Hintergrund mit `picture` statt zwei gleichzeitig angeforderten Bildern; Hauptbild priorisiert. Falsche beziehungsweise doppelte Schrift-Preloads korrigiert.
- Fokusmarkierungen, größere Bedienflächen und reduzierte Animation bei entsprechender Systemeinstellung.

## Prüfung

- Browser: 320, 390, 768 und 1440 Pixel ohne horizontalen Seitenüberlauf.
- Hero-Bild geladen, eine H1; Snack-Finder einschließlich Tastatur und simuliertem `shopify:section:load` bestanden.
- Kategorie-Verlinkung, mobiles Menü und Suche nach „American“ geprüft.
- Produkt → Warenkorb: Hinzufügen erfolgreich; Menge 1 → 2 erfolgreich; Entfernen erfolgreich. Serverantworten geprüft; Testartikel entfernt.
- Strukturierte Daten als JSON geparst. Keine JavaScript-Laufzeitfehler in den abschließend geprüften Startseiten-/Kategorieabläufen.
- JavaScript-Syntaxprüfung und `git diff --check` bestanden.
- Shopify Theme Check: vorher 236, nachher 235 Fehler; keine neu hinzugekommenen Meldungen im Vergleich. Das gesamte bestehende Theme ist damit ausdrücklich noch nicht fehlerfrei.

## Verbleibende Grenzen

- Die 235 bestehenden Theme-Check-Fehler betreffen unter anderem verschachteltes Liquid/HTML, fehlende optionale App-Snippets und Übersetzungsschlüssel sowie andere Vorlagen. Nicht alle davon sind bestätigte Laufzeitfehler. Der vollständige Altbestand wurde nicht umgebaut.
- Die aktuell verknüpften Bestseller-/USA-Kollektionen lieferten jeweils nur ein Produkt. Mehr Auswahl erfordert eine Änderung der Kollektionen im Shopify-Admin.
- Vorhandene Aussagen zu Kundenzahlen, Herkunft, Lieferzeit und Rückgabe wurden nicht inhaltlich verifiziert. Keine neuen Bewertungen oder Verkaufsaussagen erfunden.
- Newsletter-Versand, Zahlung und Bestellabschluss wurden nicht ausgelöst. Keine Lighthouse-/Core-Web-Vitals-Steigerung behauptet; dafür wären Messungen auf der produktiven Domain erforderlich.

Designanpassungen: `assets/sweets-refinements.css`. Snack-Finder: `assets/sweets-finder.js`. Startseitenreihenfolge und Konfiguration: `templates/index.json`; Footer: `config/settings_data.json`.
