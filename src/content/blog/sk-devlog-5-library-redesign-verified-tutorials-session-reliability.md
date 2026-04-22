---
author: SkillTreq Team
date: '2026-04-21'
description: Vizuálna prestavba stránky knižnice, manuálne overenie všetkých 29
  knižníc tutoriálov a opravy stability aktívnych tréningov.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-5-library-redesign-verified-tutorials-session-reliability
tags:
  - frontend
  - ux
  - tréning
  - obsah
  - seo
title: 'Devlog #5: Redizajn knižnice, overené tutoriály a stabilita tréningov'
type: devlog
---

## Čo sme riešili

Tento cyklus sa dotkol troch oblastí: vzhľad a fungovanie knižnice, kvalita obsahu tutoriálov a stabilita aktívnych tréningov.

Stránka knižnice dostala vizuálny redizajn. Knižnice sa teraz zobrazujú ako gradientové karty zoskupené podľa disciplíny, s horizontálnym pásom tvojich odoberaných knižníc v hornej časti. Emoji ikony sme nahradili SVG ikonami cez Iconify, pridali animácie kariet a vylepšili skeleton loading stavy.

Na strane obsahu sme manuálne overili tutoriálové videá vo všetkých 29 knižniciach. Zahrňovalo to kalisteniku (od začiatočníkov po expertov), mobilitu, kickbox, bojovú mobilitu, tumbling, tricking, flow arts (tyč, meče, žonglovanie), švihadlo a novo pridanú knižnicu Ukemi (bezpečné pády). Pridali sme aj knižnicu príslušenstva pre kruhy s mechanizmom automatického odobierania pre používateľov, ktorí už na kruhoch trénujú.

V oblasti tréningov sme opravili správanie wake lock, aby obrazovky zostali zapnuté počas cvičenia, zlepšili spoľahlivosť zvukových signálov a pridali podporu rozsahov trvania pri hands-free automatickom posúvaní. Potvrdzovací dialóg teraz zabraňuje neúmyselnému zahodeniu dokončených tréningov.

Zjednodušili sme aj onboarding odstránením kroku s obmedzeniami a pridaním automatického preskočenia na základe skúseností, povolili indexovanie vyhľadávačmi s podporou AI vyhľadávania (llms.txt) a pridali stránku `/start` pre vstup bez bariér z landing stránky.

## Prečo tieto zmeny

Stará stránka knižnice zobrazovala všetko v plochej mriežke. Ako sme pridávali ďalšie disciplíny (teraz máme 29 knižníc), tento layout prestal škálovať. Zoskupenie podľa disciplíny s vizuálnou hierarchiou pomáha používateľom nájsť to, čo je relevantné pre ich tréning.

Overenie tutoriálov bolo na čase. Náš automatizovaný fetch skript správne priradil asi 85 % videí, ale zvyšok boli duplikáty, nesprávne pohyby alebo nefunkčné odkazy. Pre tréningovú aplikáciu je zobrazenie nesprávneho tutoriálového videa horšie ako nezobrazenie žiadneho. Overili sme každé jedno video, deduplikovali naprieč knižnicami a pridali validačný skript na zachytenie problémov pred nasadením.

Opravy stability tréningov vychádzali z reálneho používania. Stmavnutie obrazovky uprostred série je rušivé, obzvlášť počas výdrží na čas. Wake lock API pomáha, ale správanie prehliadačov sa líši: Chrome na Androide zruší lock pri prepnutí tabu, takže ho znovu aktivujeme, keď sa tab stane viditeľným. Zvukové signály mali podobné nekonzistencie medzi prehliadačmi, ktoré vyžadovali riešenie pre jednotlivé platformy.

Zjednodušenie onboardingu bolo založené na dátach. Krok s obmedzeniami mal nízku mieru dokončenia a dáta, ktoré zberal, sa zatiaľ zmysluplne nevyužívali. Jeho odstránenie skrátilo flow bez straty čohokoľvek, s čím reálne pracujeme.

## Čo sme sa naučili

Renderovanie emoji je nekonzistentné naprieč Android zariadeniami. Čo na desktope vyzerá ako čistá ikona, môže sa na niektorých telefónoch zobraziť predimenzovane alebo nesprávne zarovnane. Prechod na SVG cez @nuxt/icon a Iconify toto vyriešil a dal nám konzistentnú veľkosť a kontrolu farieb.

Proces overovania tutoriálov nás naučil, že manuálna kontrola vo väčšom rozsahu potrebuje nástroje. Náš validačný skript teraz kontroluje duplicitné video ID naprieč knižnicami, overuje formáty URL a označuje knižnice s chýbajúcimi tutoriálmi. Vďaka tomu je budúce pridávanie obsahu rýchlejšie na overenie.

Nahradenie nášho vlastného activity heatmapu knižnicou vue3-calendar-heatmap ušetrilo asi 200 riadkov kódu komponentu. Knižnica rieši okrajové prípady (posuny časových zón, prázdne týždne, lokalizované popisky), ktoré sme udržiavali sami. Niekedy je správny krok prestať niečo udržiavať.

## Čo bude ďalej

Checklist pre beta launch sa skracuje. Tvorba tréningových plánov a kalendár sú ďalšie veľké funkcie v príprave. Štatistiky aktivít a osobné rekordy sú tiež na rade. Na strane obsahu sa blogová infraštruktúra, vrátane enginu, ktorý vygeneroval tento príspevok, blíži k svojmu prvému automatizovanému spusteniu.
