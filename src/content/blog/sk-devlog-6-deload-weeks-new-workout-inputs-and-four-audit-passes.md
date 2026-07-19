---
author: SkillTreq Team
date: '2026-07-19'
description: Prečo deload týždne vynucujeme namiesto toho, aby sme ich len naznačovali,
  prečo sa zapisovanie sérií presunulo na posuvné voliče a čo pred betou odhalili
  štyri kolá auditu.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-6-deload-weeks-new-workout-inputs-and-four-audit-passes
tags:
- devlog
- deload
- treningove-plany
- workout-ui
- audit
title: 'Devlog #6: Deload týždne, nové vstupy pri tréningu a štyri kolá auditu'
type: devlog
---

## Na čom sme pracovali

Posledné tri mesiace, od konca apríla do polovice júla, pokryli 56 commitov. Najviac času zabrali tri veci:

- **Systém deloadov.** Tréningové plány teraz vedia naplánovať týždne so zníženou záťažou. Aplikácia ich počas tréningu vynucuje, v náhľadoch zobrazuje znížené hodnoty a keď plán upravíš uprostred cyklu, príznaky deloadov zostanú správne.
- **Nové vstupy pri tréningu.** Ohraničený otočný volič na výber trvania a posuvné pravítko na zadávanie váhy a opakovaní vo formulári aktívnej série. Rozcvičkové série používajú to isté pravítko ako zobrazenie len na čítanie a presné ciele z plánu na ňom vykresľujú značku vo farbe zóny.
- **Štyri kolá auditu.** Prešli sme codebase od začiatku do konca a opravili, čo sme našli: race condition pri vytváraní session, prácu s časovými pásmami, medzery v content security policy, rate-limit buckety, plurály v prekladoch, problémy s prístupnosťou a slabé pokrytie end-to-end testami.

Popri tom: plány z viacerých knižníc (primárna knižnica pohybov plus doplnkové s určeným poradím), bezstratový export a import plánov, podtypy aktivít podľa typu s rozpadom progresu, používateľsky nastaviteľné farby odporových gúm a štrukturálny refaktor kódu aktívnej session.

## Prečo tieto zmeny

Najprv deloady. Štruktúrovaný plán nie je len o pridávaní záťaže. Plánované regeneračné týždne sú súčasťou progresie, takže ich berieme ako súčasť plánu, nie ako odporúčanie. Počas deload týždňa aplikácia zníži počet kôl a predvyplní zníženú váhu. Upozornenie, ktoré môžeš odscrollovať, nie je deload. Zároveň sme nechali možnosť „Trénovať normálne“, ktorá vráti pôvodné kolá, pretože športovec na tréningu vie veci, ktoré plán nevie. Predvolene vynucovať, no umožniť explicitné prepísanie.

Práca na vstupoch vznikla z pozorovania, ako zapisovanie sérií naozaj prebieha: uprostred tréningu, na telefóne, často s unavenými alebo zakriedovanými rukami. Písať čísla do malého textového poľa je v takom stave pomalé a náchylné na chyby. Volič a pravítko sú hrubšie, ale rýchlejšie, a nesú kontext, ktorý textové pole nedokáže. Cieľ z tvojho plánu sedí na pravítku ako značka a farba zóny ti povie, kde si voči nemu.

Kolá auditu boli prípravou na betu. Namiesto čakania, kým problémy nájdu používatelia, sme kód prešli v štyroch kolách, od rýchlych opráv (race condition pri session, výpočty dátumov citlivé na časové pásmo) po hlbšiu prácu (samostatný rate-limit bucket, aby pasívne čítania session nemohli vyhladovať skutočné pokusy o prihlásenie, a kontrola kvality slovenských a českých prekladov).

Plány z viacerých knižníc existujú, pretože väčšina športovcov netrénuje v rámci jednej disciplíny. Plán teraz môže čerpať z primárnej knižnice a zoradiť doplnkové, takže handstandový blok môže stáť vedľa začiatočníckej silovej práce bez duplikovania pohybov.

## Čo sme sa naučili

Postaviť na webe otočný volič, ktorý pôsobí natívne, je ťažké. Detekcia ustálenia scrollu, synchronizačné poistky, ktoré zhltli rýchle zmeny smeru, vybrané hodnoty, ktoré nikdy neopustili volič: každá oprava má teraz regresný test okolo geometrie scrollovania. Takto háklivý UI kód potrebuje testy, inak sa bugy vrátia.

Veľké composables hnijú. Náš composable pre aktívnu session narástol, až robil všetko, tak sme ho rozdelili pod dohľadom limitu na veľkosť súborov, päť session overlayov sme presunuli za jedného spoločného hostiteľa a niekoľko ad-hoc časovačov sme nahradili jedným ticker primitívom. Limit veľkosti v CI je tupý nástroj, ale vynútil rozdelenie, ktoré sme mesiace odkladali.

Mazanie „nepoužívaných“ dát je bezpečné, len ak najprv skontroluješ referencie. Odhlásenie z knižnice pohybov predtým rozbilo plány, ktoré odkazovali na jej pohyby, a databázový seeder mohol odstrániť staré pohyby, na ktoré stále ukazovala história používateľa. Obe cesty teraz odmietnu zmazať čokoľvek, na čo existuje referencia.

Rozdiely medzi runtime sa objavujú na zvláštnych miestach. Bun vyriešil default export jednej závislosti inak než Node, čo rozbilo prihlasovanie, a aj náš test runner sa pod Bunom správal inak. Pre testy teraz pripíname Node. Nudné, ale predvídateľné.

## Čo bude ďalej

Keď sú nástroje na plány v stabilnom stave, pozornosť sa presúva na to, čo ich obklopuje. AI asistent plánov (chat v štýle kouča, ktorý navrhuje a upravuje tréningové plány podľa tvojho skutočného progresu) je code-complete a v internom testovaní, kým dokončíme infraštruktúru, na ktorej beží. Potom: centrum notifikácií v aplikácii a pokračujúca práca na natívnej iOS aplikácii na jej ceste do App Store.