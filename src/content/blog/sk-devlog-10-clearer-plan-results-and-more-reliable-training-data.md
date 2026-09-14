---
author: SkillTreq Team
date: '2026-09-14'
description: Súhrny plánov, história pokroku, pripomienky a kontroly dát teraz uľahčujú kontrolu tréningových výsledkov a zvyšujú dôveru v ne.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-10-clearer-plan-results-and-more-reliable-training-data
tags:
  - funkcie
  - technológie
  - devlog
  - pokrok
  - tréningové-plány
  - iOS
  - kvalita-dát
title: 'Devlog #10: Jasnejšie výsledky plánov a spoľahlivejšie tréningové dáta'
type: devlog
---

## Čo je nové

Táto aktualizácia ti uľahčí pochopiť, čo sa počas tréningového plánu zmenilo.

Po dokončení plánu SkillTreq teraz zobrazí súhrn s relevantnými údajmi o telesnej hmotnosti a kontextom pokroku. Výsledok si môžeš pozrieť v zozname plánov, bannere dokončenia aj v súhrne plánu. Plán sa môže označiť ako dokončený aj po dosiahnutí dátumu ukončenia, nielen po manuálnom dokončení.

Časová os cesty teraz zaznamenáva posuny medzi krokmi. Získaš tak jasnejší prehľad o tom, ako sa tvoj tréning v priebehu času vyvíjal, namiesto zobrazenia iba aktuálneho stavu.

Na iOS môžeš tiež dostávať pripomienky vynechaných tréningov prostredníctvom služby Apple Push Notification service. Tieto pripomienky sú voliteľné a môžeš ich spravovať v nastaveniach upozornení.

Úvodné nastavenie je kratšie. Samostatný krok výberu jazyka sme odstránili. Aplikácia teraz počas nastavovania používa lokalizáciu tvojho prehliadača. Podporované nastavenia jazyka sú naďalej dostupné tam, kde je to potrebné.

Aplikácia pre iOS má aj vlastnú ikonu a úvodnú obrazovku v štýle SkillTreq. Natívnu aplikáciu tak po otvorení zo zariadenia ľahšie identifikuješ.

Niekoľko opráv dát zvyšuje spoľahlivosť knižníc skillov. Kritériá zvládnutia sú teraz prepojené s merateľnými metrikami, ktoré súvisiaci pohyb skutočne sleduje. Opravili sme aj prípad pri parsovaní, keď úvodné číslo mohlo spôsobiť, že sa nesprávne kritérium považovalo za platné.

## Prečo sme tieto zmeny urobili

Dokončený plán by mal odpovedať na praktickú otázku: *čo sa zmenilo, keď som sa podľa neho riadil?* Predtým bola táto odpoveď rozdelená medzi rôzne časti aplikácie. Pridali sme sústredený súhrn, aby si si mohol skontrolovať výsledok bez toho, aby si ho musel zostavovať z jednotlivých tréningov.

Časová os vychádza z rovnakého princípu. Tréningový pokrok nie je iba konečné meranie. Keď sa snažíš pochopiť, či plán zodpovedal tvojej aktuálnej kapacite, dôležité je aj poradie a načasovanie zmien. Zaznamenávanie posunov medzi krokmi ti pri tomto hodnotení poskytne užitočnejší kontext.

Spracovanie dokončenia sme zmenili aj preto, aby zodpovedalo tomu, ako ľudia používajú plány založené na dátumoch. Niektoré plány sa skončia preto, že uplynie ich naplánované obdobie. Ak sa takéto plány považovali za nedokončené, vznikal nepresný záznam. Dokončenie teraz zohľadňuje manuálne akcie aj dátum ukončenia plánu.

Pripomienky majú iný účel. Keď je tréning súčasťou rušného týždňa, vynechané tréningy sa dajú ľahko prehliadnuť. Možnosť pripomienok na iOS ponúka jednoduché upozornenie bez zmeny tvojho rozvrhu a bez predpokladov o tom, prečo si tréning vynechal. Ty rozhoduješ, či túto funkciu zapneš.

Počas úvodného nastavenia nemalo zisťovanie jazyka pred poznaním kontextu zariadenia pre väčšinu používateľov prínos. Použitie lokalizácie prehliadača odstráni toto rozhodovanie z úvodného nastavenia a ponechá pozornosť pri tréningových cieľoch.

Napokon, dátam o skilloch musí byť možné rozumieť. Požiadavka na zvládnutie je užitočná iba vtedy, keď ju možno porovnať s metrikou zaznamenávanou daným pohybom. Skontrolovali sme dotknuté položky v knižnici a opravili pravidlá parsovania, aby zobrazené kritériá lepšie zodpovedali základným tréningovým dátam.

## Technické detaily

Zmeny týkajúce sa dokončenia plánu si vyžiadali úpravy dátového modelu plánu a migrácie databázy. Dokončenie sa teraz môže odvodiť v momente, keď plán dosiahne nakonfigurovaný dátum ukončenia. Opravili sme aj úložisko tréningových plánov, aby volanie `fetchPlans()` s `await` spoľahlivo znamenalo, že úložisko obsahuje načítané dáta. Tým sa predchádza časovému nesúladu v zobrazeniach, ktoré vykresľujú výsledky plánu okamžite po načítaní.

Časová os cesty teraz prijíma udalosti o posunoch medzi krokmi prostredníctvom stats API a zobrazuje ich s preloženými popismi. Pri týchto zmenách sme pridali kontroly pokrytia lokalizácií pre angličtinu, češtinu a slovenčinu.

Pri pripomienkach na iOS aplikácia používa konfiguráciu APNs prostredníctvom natívneho shellu. Nastavenia sprístupňujú ovládanie upozornení, zatiaľ čo server spracúva udalosť pripomienky. Natívne zobrazenie nastavení tiež skrýva sekciu podpory, ktorá sa v shelli aplikácie nepoužíva.

Rozšírili sme lint nástroje pre pravidlá v troch oblastiach:

- Kontrolujú, či prekladové kľúče použité s `$t()` existujú v `en.json`.
- Kontrolujú hĺbku vnorenia kľúčov lokalizácie.
- Overujú tvary analytických udalostí a reaktívne prekladové polia.
- Odmietajú konfiguračné možnosti, ktoré sú deklarované, ale žiadne pravidlo ich nepoužíva.
- Kontrolujú komentáre vysvetľujúce, prečo kód existuje, nielen popisujúce, čo robí.

Tieto kontroly sú zámerne úzko zamerané. Počas vývoja zachytávajú opakujúce sa skupiny chýb, no nesnažia sa nahradiť testy ani kontrolu kódu.

Opravili sme aj celkový počet výsledkov vyhľadávania pohybov, aby predstavoval úplný počet výsledkov pred použitím stránkovania. Metadáta vyhľadávania tak zostávajú konzistentné so skutočnou množinou výsledkov.

## Čo bude ďalej

Našou ďalšou prioritou zostáva roadmapa beta verzie: dokončenie tvorby tréningových plánov a kalendára, potom rozšírenie heatmapy aktivity, štatistík a zobrazení osobných rekordov. Nové súhrny plánov a udalosti na časovej osi poskytujú týmto funkciám základ, pretože zobrazenia pokroku majú k dispozícii úplnejšie dáta.
