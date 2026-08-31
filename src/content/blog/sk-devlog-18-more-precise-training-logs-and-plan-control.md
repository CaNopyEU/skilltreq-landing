---
author: SkillTreq Team
date: '2026-08-31'
description: Táto aktualizácia ti prináša spoľahlivejšie zadávanie metrík, jasnejšie časovanie tréningu a lepšiu kontrolu nad plánmi, deloadmi a zmenami v tréningových jednotkách.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-18-more-precise-training-logs-and-plan-control
tags:
  - funkcie
  - technológie
  - tréning
  - plánovanie
  - prístupnosť
  - spoľahlivosť
  - devlog
title: 'Devlog #18: Presnejšie tréningové záznamy a kontrola plánov'
type: devlog
---

## Čo je nové

Tréningové metriky teraz môžeš zapisovať jednoduchšie a s väčšou kontrolou.

Polia pre metriky prijímajú desatinnú čiarku aj bodku. Podporujú napríklad zadanie `7,5` v prostredí, kde sa ako desatinný oddeľovač používa čiarka. Zadané hodnoty zostávajú nadradené pri použití pravítka opakovaní, takže desatinné číslo sa potichu nenahradí celým číslom. Aktívny tréning teraz podporuje aj zadávanie polovičných opakovaní tam, kde to dáva zmysel.

Časovače tréningu teraz zobrazujú cieľové pásmo trvania. Počas aktívnej jednotky vidíš, či je aktuálne trvanie pod cieľom, v cieľovom pásme alebo nad ním. Zmeny v pásme časovača sú oznamované aj čítačkám obrazovky. Tréning bez používania rúk sa tak dá jednoduchšie sledovať bez spoliehania sa iba na vizuálne zmeny.

Rozšírili sme viacero nastavení plánov a tréningových jednotiek:

- Dokončené série zostanú zaznamenané aj vtedy, keď preskočíš odpočinok v bloku alebo cviku.
- Počas tréningu môžeš zmeniť smer progresie.
- Deload môže znížiť počet sérií alebo opakovaní a stratégiu môžeš pre konkrétny deň prepísať.
- Zaznamenaný výkon môže upraviť cieľovú váhu pre neskoršie tréningy v pláne.
- Pri rozhodovaní, ako spracovať vynechané jednotky, môžeš tréningové jednotky v pláne označiť ako povinné alebo voliteľné.
- Karty plánov zobrazujú, kedy bol ich obsah naposledy upravený.
- Ukážky z knižnice sú dostupné aj pre nodes, ktoré momentálne nemáš predplatené.
- Keď sa blížiš ku koncu knižnice, môže sa ti navrhnúť pokračovanie knižnice.

Onboarding teraz načíta počiatočný bod tvojej knižnice z uloženej hodnoty v databáze. Vybraný vstupný bod do tréningu tak zostáva v súlade s údajmi priradenými k tvojmu účtu.

## Prečo sme tieto zmeny urobili

Tréningové záznamy sú užitočné iba vtedy, keď odrážajú to, čo si skutočne urobil. Spôsob zadávania by ťa nemal nútiť meniť zápis ani znova odhadovať hodnotu. Podpora desatinných čiarok a polovičných opakovaní zmenšuje rozdiel medzi tréningom a jeho záznamom.

Pravítko opakovaní potrebovalo jasné pravidlo pre kombinované zadávanie. Pravítko je užitočné na rýchly výber bežných celých hodnôt opakovaní. Nemalo by však prepísať hodnotu, ktorú si zadal úmyselne. Tieto dve funkcie sme preto oddelili: pravítko pomáha s výberom a zadaná hodnota zostáva zdrojom pravdy.

Aj čas potrebuje kontext. Bežiace hodiny ti povedia, ako dlho cvik trvá, ale nepovedia ti, či toto trvanie zodpovedá plánovanému cieľu. Cieľové pásmo ti počas jednotky poskytne jednoduchú referenciu. Oznámenia pre čítačky obrazovky sprostredkujú rovnakú zmenu stavu zvukom, čo je dôležité vtedy, keď sa sústredíš na pohyb a nie na obrazovku.

Nastavenia plánov vychádzajú z reálnych tréningových podmienok. Môžeš dokončiť iba časť jednotky, preskočiť cvik, upraviť progresiu alebo potrebovať iný prístup k deloadu v konkrétny deň. Zachovanie dokončených sérií zabraňuje strate záznamov. Nastavenia pre jednotlivé dni ti umožnia vyhnúť sa tomu, aby jedno rozhodnutie pre celý plán platilo pre každú jednotku.

Pridali sme aj viac informácií o údržbe plánov. Dátum úpravy ti pomôže zistiť, či plán odráža nedávne zmeny. Nastavenia povinných a voliteľných jednotiek robia spracovanie vynechaných tréningov jednoznačným namiesto predpokladu, že každá jednotka má rovnakú dôležitosť.

Zmeny v knižnici sa riadia rovnakým princípom. Dostupný obsah si môžeš prezrieť ešte predtým, než sa rozhodneš, či zapadá do tvojho tréningu. Návrh pokračovania ti poskytne jasnú ďalšiu oblasť na preskúmanie, keď je knižnica takmer dokončená, bez automatickej zmeny tvojho aktuálneho tréningu.

## Technické detaily

V tomto období sme pracovali na tréningovom rozhraní, dátovom modeli aj procese doručovania zmien.

Spracovanie a formátovanie metrík sme aktualizovali v rýchlom zaznamenávaní, zadávaní telesnej hmotnosti, riadkoch sérií, testoch skills a vstupoch aktívneho tréningu. Unit testy pokrývajú uzamknutie pravítka, nadradenosť desatinnej hodnoty a formátovanie metrík. Časovač teraz sleduje stav cieľového pásma v komponentoch tréningu aj v hands-free odpočítavaní. Oznámenia pre prístupnosť sú lokalizované v podporovaných jazykoch rozhrania.

Pomocné funkcie pre tréningové jednotky sme upravili tak, aby sa dokončené série zachovali pri preskočení bloku alebo cviku. Metadáta plánov teraz podporujú pravidlá pre vynechané jednotky a dátumy úprav obsahu. Konfigurácia deloadu podporuje stratégiu pre celý plán aj nastavenia pre konkrétny deň. Úprava váhy používa zaznamenaný výkon z procesu dokončenia jednotky a pred použitím zmeny ju zobrazí.

Pridali sme aj ochranu autentifikovaných endpointov na strane servera. Rate limits teraz pokrývajú endpointy identifikované pri kontrole pravidiel. Serverový event log pre každého používateľa poskytuje konzistentnejší záznam relevantnej aktivity účtu a zároveň zachováva priradenie udalostí k správnemu používateľovi.

Spoľahlivosť sme zlepšili aj v procese vývoja. End-to-end testy teraz bežia v continuous integration namiesto povinnej úlohy pred pushom. Sadu testov sme upravili tak, aby sa vyhla zastaraným zápisom, rozdielom v spracovaní prostredia a ďalším zdrojom nedeterministických výsledkov. Neúspešné end-to-end behy možno v procese pull requestu odoslať do automatizovaného triedenia.

Sprísnili sme aj kontroly v repozitári. Kontroly zhody lokalizácií a povinných súborov teraz používajú rules lint tooling. Skenovanie volaní analytiky nahradilo starší prístup založený na tabuľke udalostí a skenovanie repozitára už neprechádza vnorené worktrees. Klasifikácia deploymentov teraz pred nasadením rozlišuje preskočené, iba migračné a úplné deploymenty.

## Čo bude ďalej

Pokračujeme v beta práci na tréningovom pláne a kalendári. Ďalším zameraním je zlepšenie histórie aktivity, štatistík a osobných rekordov, aby sa tvoje zaznamenané jednotky dali jednoduchšie spätne prechádzať v čase.

Ďalej budeme upravovať content engine a dáta knižnice, pričom tréningové záznamy a správanie plánov zostanú jednoznačné. Práca po beta verzii sa bude naďalej sústreďovať na export dát, trendy osobných rekordov a časovú os tréningovej cesty.