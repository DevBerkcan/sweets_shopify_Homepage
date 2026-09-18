# Shopify-Redesign: Umsetzung und Prüfung

Stand: 18.09.2026. Umsetzung im vorhandenen Kalles-Theme, ausschließlich in der Entwicklungsvorschau. Kein Live-Theme veröffentlicht, keine Bestellung abgeschlossen. `config/settings_data.json` blieb unverändert.

## 1. Analysiert

Theme-Aufbau, Sections/Snippets, globale Assets, Einstellungen, Homepage, Collections, Produktseiten, Warenkorb, Suche, Header/Footer, Übersetzungen, strukturierte Daten, Metafelder sowie vorhandene App-/Consent-Einbindungen. Der gelieferte HTML-Prototyp wurde hinsichtlich Gestaltung und Interaktionen untersucht; seine Demo-Produkte, Preise und simulierten Warenkorbzustände wurden nicht übernommen. Die priorisierte Gegenüberstellung steht in `REDESIGN-AUDIT.md`.

## 2. Gefundene Schwachstellen

Uneinheitliche Gestaltung, hoher Header, fehlende Seitenüberschriften, fehlerhafte Kategorie-Verweise, überlaufende Footer-/Mega-Menü-Container, abgeschnittene Produkttitel und konkurrierende Kartenstyles. Außerdem doppelte Hoverbilder, ungeeignete Auswahl der ersten Variante, fehlende Collection-Suchergebnisse und fehlende Fokusbegrenzung in Drawern. Statische Kundenzahlen, Testimonials und widersprüchliche Liefertexte wurden auf den bearbeiteten Templates bereinigt beziehungsweise deaktiviert.

## 3. Redesigned

Creme, Tannengrün und Gold mit Manrope und Cormorant aus der Referenz; kompakter Header und ruhige Announcement-Leiste. Saisonaler Hero mit dem gelieferten `hero.png`, zwei Aktionen und optionalem Bild-/Produkt-/Collage-Modus. Visuelle Kategorien, Produktauswahl, Snack-Finder und Geschenkbox-Bereich; passende Produktkarten, Collection-Einleitung, Warenkorb, Footer und FAQ. Native Produktgalerie, Formulare, Lebensmittelinformationen, Reels, Abo-App, Reviews und Consent bleiben eingebunden.

## 4. Neue Bausteine

- `sections/sweets-featured-products.liquid`: Collection oder manuelle Shopify-Produktauswahl; responsive Karten; leere Auswahl im Store verborgen; editierbare Sprungmarke und Abstände.
- `sections/sweets-collection-intro.liquid`: echte Collection-Überschrift und Beschreibung; lange Texte aufklappbar.
- `sections/sweets-footer-group.json`: native Footer-Section-Gruppe mit übernommenen Einstellungen, Newsletter und unterer Leiste. Shop-Links werden über Collection-Picker gepflegt; leere Menülinks können eine vorhandene Shopify-Seite als Ersatz erhalten.
- Snippets für Premium-Header, Hero, Assets und optionale Kalender-Fakten.
- `sweets-premium.css` und `sweets-commerce.css`: zentrale Tokens und Komponentenstyles.
- `sweets-drawer-focus.js`: kleine Vanilla-JS-Ergänzung für Fokusbegrenzung und Fokusrückgabe, ohne die native Drawer-/Cart-Logik zu ersetzen.

## 5. Bestehende Dateien

Angepasst wurden `layout/theme.liquid`, `config/settings_schema.json`, alle 17 Storefront-Locale-Dateien, Header/Announcement, Footer und Footer-Inhalt, Hauptprodukt, Suche, bestehende Sweets-Sections, `head_assets`, Produktkarte 6, Produktbild, Add-to-Cart und strukturierte Daten. Die JSON-Templates für Startseite, Collection, Produkt, Warenkorb und Suche wurden neu zusammengestellt beziehungsweise korrigiert. Alte Sections sind weiterhin vorhanden. App-Blöcke und App-Embeds wurden nicht entfernt.

## 6. Kaufprozess und Bedienung

Eindeutige Hero-Aktionen, reale Produkte statt Demo-Preise, sichtbare Verfügbarkeit und Sale-Preise, passende Ein-/Mehrprodukt-Layouts, neutraler Bild-Ersatz und lesbare Titel. Die aktive Produktkarte verwendet die erste verfügbare Variante, berücksichtigt Verkauf trotz fehlendem Bestand und führt erforderliche Abo-Auswahl zur Produktseite. Produkt-, Grundpreis- und Währungsdarstellung bleiben native Shopify-/Theme-Funktionen. Die Suche zeigt auch Collections. Drawernavigation per Tab und Escape funktioniert; der Snack-Finder unterstützt Pfeiltasten.

## 7. Performance

Zwei lokale WOFF2-Schriften (zusammen rund 62 KB) ersetzen im neuen Design die zusätzlichen Google-Schriftanfragen und ungenutzten Font-Preloads. Kein neues Framework. Der Hero erhält responsive CDN-Bildgrößen, feste Abmessungen und hohe Ladepriorität; nachfolgende Bilder laden verzögert. Die doppelte Hoverbild-Ausgabe wurde entfernt.

Für das lokale Theme-Asset wird Shopifys dokumentierter [asset_img_url-Filter](https://shopify.dev/docs/api/liquid/filters/asset_img_url) verwendet. Ein lokaler Desktop-Smoke-Test ergab etwa 0,65 s LCP und 0,024 CLS. Das sind einzelne Entwicklungs-Messwerte ohne Mobilfunk-Drosselung, keine belastbaren Produktions-Core-Web-Vitals. INP und der Einfluss der externen Apps benötigen Feldmessungen.

## 8. SEO und QA

Canonical, vorhandenes Produkt-/Artikel-/Breadcrumb-Schema und App-Daten bleiben erhalten; Organization-JSON-LD ergänzt. Collection, Warenkorb und Suche haben wieder eine passende H1. Neue UI-Texte sind in der Locale-Struktur hinterlegt.

| Prüfung | Ergebnis |
|---|---|
| 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 px | Sieben Seitentypen, 63 Kombinationen, kein horizontaler Überlauf |
| Seiten | Homepage, Collection, Produkt, Cart, Suche, leere Adventskalender-Collection, 404 |
| Navigation | Mobiles Menü und Desktop-Mega-Menü; auch Wechsel von mobilem Start zu Desktopbreite |
| Suche | Produkt- und Collection-Treffer vorhanden |
| Warenkorb | Hinzufügen, Drawer, Menge 1 → 2 → 1, Entfernen → 0 bestätigt |
| Checkout | Über die echte Shopify-Entwicklungsvorschau erfolgreich: POST `/cart` → Weiterleitung → Checkout auf `www.sweetsausallerwelt.de`, HTTP 200, Kontakt-/Liefer-/Zahlungsformular sichtbar. Keine Bestellung abgeschlossen. Nur der lokale Proxy liefert auf der Checkout-Route HTTP 401 |
| Sonderfälle | Ohne Bild, ohne zweites Bild, ohne Vergleichspreis, ausverkauft, Sale, langer Titel, fehlende Kalender-Metafelder und leere Collection geprüft |
| Tastatur | Je 14 Tab-Schritte innerhalb von Menü-/Such-/Cart-Drawer, Escape und Fokusrückgabe bestanden; Finder-Pfeiltaste bestanden |
| JavaScript | Keine Seitenfehler in den geprüften Shop-Flows; Syntaxprüfung des neuen Skripts bestanden |
| Strukturierte Daten | Geladene JSON-LD-Blöcke parsebar; Homepage genau eine H1 |
| Theme Check | Vorher 235 Fehler, nachher 234; keine neuen Fehler gegenüber dem Ausgangsbestand. Altbefunde bleiben bestehen |
| Interne Links | Untersuchte Homepage-/Header-/Footer-Ziele erreichbar; defekter Boxen-Link und leerer Rückgabe-Link korrigiert. Boxen, Widerrufsseite und Tracking-App jeweils HTTP 200 |
| Footer-Gruppe | Alle neun Breiten ohne Überlauf; mobiles Aufklappen, Collection-Links und Newsletter-Formular geprüft; keine JavaScript-Fehler |

Nicht vollständig testbar: Die 19 öffentlich verfügbaren Produkte haben jeweils nur eine Variante. Mehrfachvarianten, reine Abo-Produkte, tatsächlich angewandte Rabattcodes, Markets-Wechsel und App-Admin-Einstellungen benötigen geeignete Shopdaten beziehungsweise Zugriff. Preisreduzierungen und das vorhandene Rabatt-Eingabefeld sind erhalten. Der Shopify-Theme-Editor fordert eine Cloudflare-Sicherheitsverifizierung; ein tatsächlicher Editor-Durchlauf ist daher nicht bestätigt. Schema-Validierung und gerenderte Vorschau wurden geprüft. Eine vollständige WCAG-Prüfung steht noch aus.

## 9. Im Theme Editor konfigurieren

1. **Theme-Einstellungen → Sweets Design:** Gestaltung aktivieren und Markenfarben einstellen. Der Schalter ändert Styles/Header/Hero, stellt aber keine ältere Template-Version wieder her.
2. **Sweets Hero:** Überschriften, Texte, beide CTA-Ziele und Bilder pflegen. `hero.png` ist als Theme-Asset bereits eingebaut; dafür ist kein zusätzlicher Upload in Shopify „Dateien“ erforderlich. Die aktivierte Option „Bildcollage aus dem Shop-Entwurf“ ergänzt die drei aus der gelieferten HTML-Datei übernommenen Kampagnenmotive. Hauptbild und Nebenbilder lassen sich einzeln über die Bildpicker ersetzen. Ohne diese Option bleibt der bisherige Hintergrund-/Produktbildmodus verfügbar. Die Kampagnenbilder legen keine neuen Produkte oder Verfügbarkeiten an.
3. **Sweets Produktauswahl:** Kampagnenprodukte oder Collection auswählen. Die Adventskalender-Collection ist aktuell leer, deshalb ist ein existierendes Tee-Produkt direkt ausgewählt. Dessen Produktname nennt noch 2025; vor der kommenden Kampagne Sortiment und Inhalt prüfen. Der Hero verweist auf die editierbare Sprungmarke `sweets-seasonal-products`.
4. **Kategorien / Finder / Boxen-Highlight:** echte Collections, Bilder und Texte auswählen.
5. **Produktseite → Kalender-Informationen:** optionale Metafelder unter `kalender.sorte`, `tuerchen`, `masse`, `inhaltstyp`, `zubehoer`, `anlass`. Nur vorhandene Werte erscheinen. Keine leeren Fakten oder behaupteten Inhalte werden ausgegeben.
6. **Sweets Footer → Footer → Shop-Collections:** Boxen und Sale werden bereits aus echten Collections geladen; bei Bedarf weitere auswählen. Unter „Ziel für leere Menülinks“ ist die vorhandene Widerrufsseite für den bisherigen Rückgabe-Platzhalter hinterlegt. Die alte statische HTML-Konfiguration bleibt in `settings_data.json` unangetastet und wird im neuen Design durch die Section-Gruppe abgelöst. Die nicht bestätigte monatliche Gewinnspielaussage wurde in der neuen Gruppe durch einen neutralen Social-Text ersetzt. Bestehende Versand- und Rabattangaben im Header weiterhin inhaltlich aktuell halten.

## 10. Nächste Phase

Geeignete Varianten-/Abo-Testprodukte und einen gültigen Test-Rabatt bereitstellen. Reale 2026-Kampagnenprodukte, freigegebene Bewertungen und Kalender-Metafelder pflegen. Bestehende Theme-Check-Altbefunde separat priorisieren. Drittanbieter-Apps und Core Web Vitals mit Produktionsdaten messen; anschließend gezielt optimieren. Übersetzungen, Markets und Screenreader-Verhalten im tatsächlichen Shopbetrieb prüfen. Die Shopify-Sicherheitsverifizierung abschließen und die Editor-Pflege vor einer Live-Veröffentlichung einmal durchspielen.

Beim externen Checkout-Test wurde ausschließlich die Shopify-Vorschauleiste im Testbrowser ausgeblendet, weil deren iFrame die Shop-Bedienelemente überlagerte. Der Theme-Code wurde dafür nicht verändert.

## Erneuter UI-Abgleich am 18. September 2026

Die Umsetzung ist noch keine vollständige 1:1-Portierung sämtlicher Prototype-Interaktionen. Die gesamte Homepage wurde bis zum Footer im Browser durchgescrollt und visuell geprüft, einschließlich verzögert geladener Bilder und Videos. Zusätzlich wurden Collection, Produkt, Warenkorb und Suchergebnisse erneut mobil und am Desktop geprüft.

| Bereich der Vorlage | Stand |
|---|---|
| Announcement, Header, Navigation | Vorhanden; echte Shop-Navigation. Desktop-Suchfeld mit nativen Live-Treffern ergänzt; kompakte Suchschaltfläche unter 1280 px. Warenkorbsymbol wieder kontrastreich. |
| Hero | Dreiteilige Bildcollage, große mehrzeilige Typografie, goldene Akzente und responsive Anordnung ergänzt. `hero.png` bleibt abgedunkelter Hintergrund. Bilder aus der gelieferten HTML-Datei, keine neu erfundenen Produktdaten. |
| Trust-Zeile und Kategorien | Vorhanden; Kategorien an die tatsächlich verfügbaren Shop-Collections angepasst. |
| Produktauswahl | Reale Shopify-Produkte und native Kaufaktionen. Kalender-Sortiment enthält derzeit nur ein ausgewähltes Produkt; kein künstlich aufgefülltes Demo-Sortiment. Angebotspreise auf kontrastreiches Braun korrigiert. |
| Finder | Bestehender Collection-Finder mit Tabs; der mehrstufige Kalender-Fragebogen der Vorlage ist noch nicht umgesetzt. |
| Kalendervergleich | Die interaktive Auswahl-/Vergleichstabelle der Vorlage ist noch nicht umgesetzt; die alte Vergleichssection ist deaktiviert. |
| Story und Videos | Vorhanden; editierbare Überschrift „Auspacken und ausprobieren“ vor der echten Video-App ergänzt. |
| Bewertungen | Keine neue Homepage-Bewertungssektion mit echten Daten angebunden. Demo-Bewertungen wurden nicht übernommen. Vorhandene Bewertungsintegration bleibt erhalten. |
| FAQ, Newsletter und Footer | Vorhanden; native Funktionen und echte Menü-/Collection-Ziele. |
| Zusätzlicher Snacks-/Boxen-Abschlussbanner | Kein eigener zweiter Banner nach dem FAQ; Shop-Einstiege sind bereits in Kategorien und Story vorhanden. |
| Collection, Produkt, Cart und Suche | Gestaltung und native Funktionen angepasst; keine pixelgenaue Kopie sämtlicher Sonderzustände des HTML-Prototyps. |
| Cookie-Dialog | Farben, Schrift und Buttons an das Design angepasst. Akzeptieren und Ablehnen gleich gestaltet; Consent-Verhalten unverändert. |

Zusätzliche QA: Homepage bei 320, 375, 390, 430, 768, 1024, 1280, 1440 und 1920 px ohne horizontalen Überlauf; alle vier Hero-Bilder geladen. Collection, PDP, Cart und Suche bei 390 und 1440 px ohne Überlauf. Desktop-Live-Suche und Formularabsendung mit „oreo“ erfolgreich. Keine JavaScript-Seitenfehler in diesen Durchläufen. Theme Check weiterhin 234 bestehende Fehler, keine zusätzlichen Fehler durch diese UI-Ergänzungen. `config/settings_data.json` unverändert.

Die frühere lokale Performance-Stichprobe wurde vor der zusätzlichen Collage aufgenommen und beschreibt deshalb nicht den aktuellen Hero. Die neuen Motive werden über responsive Shopify-CDN-Größen ausgeliefert; eine neue belastbare Performance-Messung steht aus.

## Vorschau starten

Im Projektordner:

```powershell
shopify.cmd theme dev --store 8qkxsd-tg.myshopify.com --port 9292
```

Dann `http://127.0.0.1:9292/` öffnen. Die CLI synchronisiert in das Entwicklungstheme; das ist keine Live-Veröffentlichung.
