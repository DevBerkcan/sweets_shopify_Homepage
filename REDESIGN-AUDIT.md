# Redesign: Audit und Umsetzung

## Ausgangspunkt und Referenz

Analyse vom 16.09.2026: Kalles 4.3.7, 167 Sections, 107 Snippets, 181 Assets, JSON-Templates, zentrale Einstellungen und bestehende Sweets-Komponenten. `settings_data.json` wird in diesem Arbeitsgang ausschließlich gelesen.

Der bereitgestellte HTML-Entwurf ist ein gebündelter interaktiver Prototyp mit eigenem React-basiertem Demo-Runtime, lokalen Produktlisten, Beispielpreisen und simuliertem Warenkorb. Seine Gestaltung wird übernommen, sein Runtime und seine Geschäftsdaten nicht. Die internen Übergabe-Notizen sind Referenzmaterial, keine zusätzlichen Arbeitsanweisungen.

| Bereich | Ist | Ziel und Umsetzung | Priorität |
|---|---|---|---|
| Gestaltung | Braun/Türkis/Orange, unterschiedliche Komponentenstile | Creme, Tannengrün, Gold; Cormorant für Kampagnen, Manrope für Bedienung; zentrale Tokens | P1 |
| Header | Sehr hohe zweizeilige Navigation | Kompakter Header; vorhandene Menüblöcke und Drawer weiterverwenden; gut sichtbare Suche | P1 |
| Hero | Großes einzelnes Kampagnenbild | Dunkler saisonaler Hero mit editierbarer Collage, zwei CTAs und gelieferten Kampagnenfotos | P1 |
| Saisonales Sortiment | Adventskalender-Kollektion vorhanden, öffentliches Produkt-Endpoint aktuell leer | Produkt-/Kollektionspicker und Ausweichprodukte; keine erfundenen Matcha-Artikel oder Preise | P0 |
| Produktkarten | Zahlreiche Kalles-Varianten, abgeschnittene Titel, teils Bild-Cropping | Einheitliche Karten; responsive Bilder; Preise, Grundpreise, Bestand, Varianten und Abo-Fälle korrekt behandeln | P1 |
| Produktseite | Native Varianten, Zoom, Sticky ATC, Zutaten-/Nährwerttab, Subi und Review-Hooks | Kern erhalten; Gestaltung, Informationshierarchie, Metafeld-Fakten und Mobile UX verbessern | P0/P1 |
| Warenkorb | AJAX-Drawer, Rabattcodes, Mengensteuerung und Checkout vorhanden | Native Logik erhalten; konsistente Gestaltung, Fokus und Beschriftungen prüfen | P0/P1 |
| Suche | Kalles Predictive Search vorhanden, Collection-Ergebnisse nicht ausgegeben | Vorhandene Suchlogik weiterverwenden und Collection-Treffer ergänzen | P1 |
| Inhalte/Trust | Statische Kundenzahlen, Testimonials und widersprüchliche Liefertexte | Keine unbestätigten Aussagen neu übernehmen; feste Demo-Testimonials nicht als verifizierte Bewertungen ausgeben | P0 |
| Apps | Vitals, Subi, Reelfy, Scrolling Logos, Review-Hooks, Willdesk | App-Blöcke und Consent/Tracking behalten; keine blind entfernten Integrationen | P0 |
| SEO | Canonical, OpenGraph, Produkt-/Artikel- und Breadcrumb-JSON-LD vorhanden | Erhalten; Organization ergänzen, Überschriften und Collection-Einleitung verbessern | P2 |
| Performance | Mehrere Schriftquellen, schwere Hero-PNG, Theme-/App-Skripte | Lokale Schriften aus Referenz, priorisiertes Hero-Bild, Lazy Loading darunter, keine neue JS-Bibliothek | P1 |

## Architekturentscheidung

Bestehende Sweets-Sections werden weiterentwickelt. Eine wiederverwendbare Produktkarten-Komponente und eine editierbare Produktauswahl ergänzen die vorhandenen Bausteine. Header und Footer bleiben in der bestehenden Architektur. Ein zentraler Design-Schalter ermöglicht den Rückweg zur bisherigen Gestaltung. Alte Section-Dateien bleiben erhalten; nur die Startseitenzusammenstellung wird angepasst.

Produktdaten kommen ausschließlich aus Shopify. Die öffentliche Produktliste enthält derzeit keine Produkte mit mehreren Varianten. Variantenwechsel und reine Abo-Produkte können deshalb nicht vollständig am realen Sortiment getestet werden; die betreffenden Codepfade werden geprüft, ohne Shop-Produkte anzulegen. Shopify Markets und App-Admin-Konfigurationen können aus dem Theme allein nicht vollständig geprüft werden.

## Prüfplan

Ansichten: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 Pixel. Flows: Startseite, Navigation, Suche, Kollektion, Produkt, Warenkorb, Menge, Entfernen, Checkout-Weiterleitung ohne Bestellung, Sale, Sold-out, Footer, 404. Außerdem: Theme Check gegen Ausgangsbestand, JavaScript, Editor-Neuladen, Tastatur, Bildfehler, JSON-LD, Fehl-/Leerzustände. Messergebnisse und verbleibende Grenzen werden am Ende ergänzt.

## Ergebnis

Umsetzung und geprüfte Grenzen sind in [REDESIGN-REPORT.md](REDESIGN-REPORT.md) dokumentiert. Der Design-Schalter wechselt die neue Gestaltung und die Header-/Hero-Darstellung; er setzt die geänderte Template-Zusammenstellung nicht automatisch zurück. Alte Section-Dateien bleiben verfügbar.
