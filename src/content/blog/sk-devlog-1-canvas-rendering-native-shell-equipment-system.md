---
author: SkillTreq Team
date: '2026-04-01'
description: 'Mesiac plný nasadenia: migrácia grafu zručností na canvas, zabalenie
  aplikácie do Capacitoru pre iOS, kompletný systém vybavenia a spustenie AI asistenta
  na tvorbu plánov.'
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-canvas-rendering-native-shell-equipment-system
tags:
- cytoscape
- capacitor
- vybavenie
- ai
- mapa-tela
- devlog
title: 'Devlog #3: Canvas renderovanie, natívny shell a systém vybavenia'
type: devlog
---

## Na čom sme pracovali

Marec bol nabitý. Dodali sme 114 commitov v rámci aplikácie SkillTreq, pričom sme sa dotkli renderera grafu zručností, natívneho iOS shellu, filtrovania podľa vybavenia, vizualizácie mapy tela, AI asistovanej tvorby plánov a šiestich nových knižníc obsahu.

Najväčšia jednotlivá zmena: migrácia interaktívneho skill tree z VueFlow (založeného na DOM) na Cytoscape.js (založený na canvas). Bolo to výkonnostné rozhodnutie. Pri viac ako 400 uzloch zručností na obrazovke mal DOM renderovanie problémy na mobilných zariadeniach. Canvas renderovanie zvládne rovnaký graf pri zlomku pamäťových nákladov.

Tiež sme zabalili webovú aplikáciu do Capacitoru pre iOS, postavili kompletný systém vybavenia (Fáza 33), rozšírili mapu tela o dáta tréningového pokrytia (Fáza 32) a dodali prototyp AI asistenta na tvorbu plánov (Fáza 34).

## Prečo tieto zmeny

**Canvas renderovanie pre graf zručností.** Skill tree je hlavná navigačná plocha aplikácie. Na starších telefónoch spôsobovalo posúvanie cez 400 uzlov výpadky snímkov a oneskorené reakcie na ťuknutie. VueFlow renderoval každý uzol ako Vue komponent v DOM. Tento prístup nám dal jednoduché štýlovanie a reaktivitu, ale pri väčšom rozsahu sa layout engine prehliadača stal úzkym hrdlom. Cytoscape.js kreslí všetko na jediný `<canvas>` element, čo umožňuje GPU priamo spracovať renderovanie. Migrácia si vyžadovala prebudovanie animácií (progress fill bary, particle efekty, focus overlaye) a pridanie logiky úrovne detailov na zjednodušenie uzlov pri nízkom priblížení. Po migrácii sme strávili dva týždne opravou okrajových prípadov: memory leaky z osirotených event listenerov, animácie sa pozastavovali počas posúvania/zoomovania a konzolové varovania z neplatných Cytoscape štýlových vlastností.

**Profily vybavenia.** Športovci trénujú v rôznych prostrediach. Niekto v parku má hrazdu a bradlá. Niekto doma má len kruhy a podložku. Systém vybavenia (Fáza 33) umožňuje používateľom deklarovať, čo vlastnia, a následne podľa toho filtruje tvorbu plánov a ponuku zámen. Každý pohyb v knižnici teraz nesie metadáta o vybavení. Tvorca plánov zobrazí varovania, keď naplánované cvičenie vyžaduje vybavenie, ktoré používateľ neuviedol. Otagovali sme všetkých 415 pohybov naprieč všetkými knižnicami.

**Capacitor natívny shell.** Webová aplikácia funguje dobre v prehliadači, ale mobilní používatelia očakávajú natívne správanie: safe area insety, haptickú odozvu, biometrický zámok, správne spracovanie klávesnice a lokálne notifikácie. Capacitor zabalí existujúcu Nuxt aplikáciu do natívneho iOS shellu bez prepisovania frontendu. Väčšina práce spočívala v úprave layoutov pre safe area insety naprieč všetkými bottom sheetmi, dropdownmi a akčnými menu. Tiež sme pridali biometrický zámkový overlay a splash screen.

**Mapa tela a tréningové pokrytie.** Fáza 32 pridala vizuálnu mapu tela na stránku pokroku. Zvýrazňuje, ktoré svalové skupiny sú trénované a ktoré sú zanedbávané. Počiatočná verzia bola jednoduché SVG s predným pohľadom. Iterovali sme smerom k pridaniu zadného pohľadu, zón podľa kategórie (rameno, bedro, chrbtica, členok, zápästie), ťuknutia na zónu pre detailné listy a výpočtov tréningového pokrytia. Model pokrytia zohľadňuje tréningové sessions (joga, lezenie, plávanie) popri štruktúrovaných tréningoch, s rôznymi časmi regenerácie podľa zóny.

**AI asistent na tvorbu plánov.** Ručné zostavenie viac-týždňového tréningového plánu je časovo náročné. AI asistent (Fáza 34) využíva Claude cez MCP server na generovanie návrhov plánov na základe knižníc a cieľov, ktoré si používateľ predplatil. UI je chatový panel s náhľadom plánu a importom na jedno kliknutie. Prešli sme niekoľkými iteráciami transportu: Claude Agent SDK (spôsoboval EBADF chyby v Node), CLI subprocess a nakoniec Anthropic SDK s OAuth tokenmi cez RPi proxy. Dvojfázový prístup generovania (návrh, potom validácia) zachytí štrukturálne problémy skôr, než používateľ uvidí plán.

**Nové knižnice obsahu.** Pridali sme švihadlo (začiatočník a stredne pokročilý), kickbox (začiatočník až pokročilý), tricking (začiatočník až pokročilý) a bojovú mobilitu. Každá knižnica obsahuje kompletné SK a CS preklady. Tiež sme vložili YouTube tutoriálové odkazy do viac ako 200 pohybov a vytvorili tlačidlo na nahlásenie tutoriálu, aby mohli používatelia označiť nefunkčné video odkazy.

## Čo sme sa naučili

**Migrácia na canvas je jednosmerné dvere.** Akonáhle prejdeš z DOM na canvas, stratíš CSS štýlovanie, inšpekciu elementov v DevTools prehliadača a Vue reaktivitu na jednotlivých uzloch. Každá vizuálna funkcia sa musí reimplementovať v canvas API. Výkonnostný zisk to stál za to, ale povrch následných bugov bol väčší, než sme čakali. Strávili sme viac času opravami po migrácii než samotnou migráciou.

**Tagovanie vybavenia je dátový problém, nie kódový.** Systémový kód (DB schéma, API, UI) trval asi dva dni. Otagovanie 415 pohybov so správnymi metadátami o vybavení trvalo dlhšie. Niektoré pohyby majú nejednoznačné požiadavky. Je stena kus vybavenia? (Áno, pre stojky na rukách pri stene.) Správna taxonómia bola dôležitejšia než kód.

**Safe area insety ovplyvňujú všetko.** Pridanie Capacitor iOS podpory zasiahlo 14 komponentov. Každý bottom sheet, dropdown a element s fixnou pozíciou potreboval úpravu insetov. Podcenili sme, koľko stránok bez layout-false malo hardcoded padding.

**AI transport je krehký.** Prešli sme štyrmi rôznymi prístupmi volania Claude z Nuxt servera, kým sme sa ustálili na Anthropic SDK s OAuth. Každý predchádzajúci prístup zlyhal z iného dôvodu: Agent SDK spôsoboval úniky file deskriptorov pri dev štarte, CLI subprocess mal problémy s kódovaním a priame API volania potrebovali logiku na obnovu tokenov. Fungujúce riešenie využíva RPi proxy, ktorý spravuje OAuth tokeny samostatne.

## Čo je ďalej

Apríl sa zameriava na checklist pred beta spustením. Tvorca tréningových plánov a kalendár potrebujú doladiť pred pozvaním externých testerov. Heatmapa aktivít a stránky osobných rekordov sú ďalšie v poradí. Na strane obsahu budujeme túto blogovú infraštruktúru, aby sa devlogy ako tento publikovali automaticky.