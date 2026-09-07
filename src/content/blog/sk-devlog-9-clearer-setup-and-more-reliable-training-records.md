---
author: SkillTreq Team
date: '2026-09-07'
description: Teraz môžeš nastavovať knižnice s menším počtom krokov, vybrať si zo všetkých
  skupín aktivít a spoľahnúť sa, že uložené tréningové dáta odrážajú to, čo sa skutočne stalo.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-9-clearer-setup-and-more-reliable-training-records
tags:
  - funkcie
  - technológie
  - tréning
  - knižnice
  - kvalita-dát
  - devlog
title: 'Devlog #9: Prehľadnejšie nastavenie a spoľahlivejšie tréningové záznamy'
type: devlog
---

## Čo je nové pre teba

V tomto období sme sa zamerali na to, aby bolo nastavovanie a zaznamenávanie tréningov predvídateľnejšie.

Keď pridáš skill library, aplikácia ju teraz automaticky inicializuje a zobrazí ti okno nastavenia, v ktorom môžeš skontrolovať, čo sa pridalo. Nahrádza to predchádzajúceho sprievodcu inicializáciou. Cieľom je znížiť počet krokov pri nastavovaní a zároveň ti ukázať výsledok ešte pred začiatkom tréningu.

Výber typu aktivity sa teraz dostane do každej skupiny knižnice. Môžeš si vybrať oblasť tréningu, ktorú potrebuješ, bez toho, aby si sa spoliehal na obmedzený zoznam kategórií aktivít.

Polia cieľov v pláne teraz správne pracujú s desatinnou čiarkou. Napríklad môžeš zadať `1,5`, ak tvoje miestne nastavenie používa čiarku ako oddeľovač desatinných miest. Toto správanie je jednotné pri vstupoch pre telesnú hmotnosť, metrické hodnoty, rozsah aj quick-log.

Rýchle testy teraz pri uložení pozastavia stopky. Zaznamenaný čas už po odoslaní testu ďalej nebeží.

Offline tréningy po opätovnom odoslaní zobrazia jasnejší výsledok. Keď sa uložený tréning po opätovnom pripojení odošle, proces dokončenia oznámi, čo opätovné odoslanie vytvorilo. Ľahšie tak overíš, či sa tréning zaznamenal podľa očakávania.

Opravili sme aj anglický text pre úroveň zvládnutia v jednej knižnici a upravili rozdiely v náročnosti vo viacerých knižniciach. Tieto obsahové zmeny uľahčujú interpretáciu postupu medzi blízkymi skillmi.

## Prečo sme tieto zmeny urobili

Tréningové dáta sú užitočné iba vtedy, keď môžeš dôverovať tomu, ako boli zadané a uložené.

Zmeny v nastavovaní riešia dva bežné zdroje neistoty: nevedel si, či je knižnica pripravená, a nemohol si vybrať skupinu aktivít, ktorá zodpovedala tvojej práci. Automatická inicializácia odstraňuje zbytočné rozhodovanie. Okno nastavenia zároveň udržiava celý proces prehľadný a kontrolovateľný.

Rovnako konzistentné muselo byť aj spracovanie vstupov. Cieľ ako `1,5 kg` alebo `1,5 reps` by nemal závisieť od toho, ktorú časť plánu upravuješ. Aktualizovali sme spoločné cesty pre vstupy, aby sa rovnaké správanie desatinnej čiarky uplatňovalo vo všetkých relevantných poliach.

Súčasťou záznamu je aj meranie času a ukladanie offline tréningov, nejde iba o detaily rozhrania. Stopky, ktoré pokračujú po uložení, môžu vytvoriť nesprávny výsledok testu. Pri opätovnom odoslaní offline tréningu potrebuješ viditeľný výsledok, aby si vedel, či boli dáta prijaté, zmenené alebo stále vyžadujú pozornosť.

Nakoniec sme skontrolovali obsah knižníc tam, kde samotné dáta vytvárali nejasnosti. Rozdiely v náročnosti a omylom zobrazený text môžu spôsobiť, že dobre štruktúrovaný plán pôsobí nekonzistentne. Oprava týchto záznamov podporuje jasnejšie rozhodovanie počas tréningu.

## Technické detaily

Z odberov používateľských knižníc sme odstránili uložený stav `initialized`. Inicializáciu teraz reprezentujú aktuálne dáta knižnice a proces nastavenia namiesto samostatného príznaku, ktorý mohol zostať neaktuálny.

Úložisko knižníc teraz považuje dokončenie `fetchAll()` za spoľahlivý signál, že jeho dáta sú k dispozícii. Závislé akcie sa tak ľahšie analyzujú a v testoch aj používateľských procesoch vzniká menšia časová nejednoznačnosť.

Pridali sme testy pre správanie časovača pri rýchlych testoch, výsledky dokončenia offline tréningov, výber typu aktivity a vytváranie tréningov nezávisle od knižníc. Tieto testy sa zameriavajú na pozorovateľné výsledky, nie na interné detaily implementácie.

Nástroj na overovanie pravidiel teraz zlyhá, keď sa nakonfigurovaný vzor súboru nezhoduje so žiadnym súborom. To umožňuje skôr odhaliť rozdiel medzi konfiguráciou a skutočným stavom projektu. Sprísnili sme aj kontroly vynucovania pomocných funkcií pre autentifikáciu a opravili seed prípad, v ktorom mohla skrytá knižnica získať nechcený vzťah.

## Čo bude ďalej

Ďalším zameraním zostáva beta roadmapa: práca s tréningovým plánom a kalendárom, štatistiky aktivít, osobné rekordy a podporný systém blogového obsahu. Aj pri dokončovaní týchto oblastí budeme naďalej uprednostňovať spoľahlivé záznamy a jasné pracovné postupy.
