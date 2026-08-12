---
author: SkillTreq Team
date: '2026-08-12'
description: AI asistovaný import plánov z tabuliek, fotky a videá ako prílohy
  k tréningom a produkčný deploy pipeline, ktorý postupne builduje, migruje
  a promotuje.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-7-ai-plan-import-workout-media-deploy-pipeline
tags:
  - devlog
  - ai
  - tréning
  - médiá
  - infraštruktúra
  - prístupnosť
title: 'Devlog #7: AI import plánov, médiá k tréningom a deploy pipeline'
type: devlog
---

## Čo sme riešili

Tento cyklus sa dotkol troch oblastí: import plánov, médiá k tréningom a nahradenie manuálneho produkčného nasadzovania pipeline-om.

**Import plánov.** Existujúci plán teraz môžeš nahrať zo súboru. Uploaduj `.xlsx`, `.csv`, `.txt` alebo `.md` (alebo vlož text), pozri si náhľad, ako čítame každý hárok, a potom prejdi krátkou konverzáciou, v ktorej sa asistent spýta na čokoľvek nejasné — „sú to dipy na kruhoch, alebo dipy na bradlách?" — a navrhne štruktúrovaný plán, ktorý môžeš uložiť ako nový alebo zlúčiť s existujúcim.

Parsovanie je deterministické: súbor sa najprv prevedie na normalizovanú textovú mriežku, ešte predtým, než ho uvidí akýkoľvek model, a nikde sa neukladá — existuje iba v rámci requestu a nikde inde. Názvy cvičení sa priraďujú k našej knižnici pomocou rankovaného matchera, ktorý ignoruje množné číslo, spojovníky a diakritiku. Keď je istota nízka, asistent sa spýta, namiesto toho, aby hádal; ak sa nenájde žiadna shoda, cvičenie si zachová tvoj pôvodný text ako vlastný názov. Počet doplňujúcich otázok je pri jednom importe limitovaný, aby sa nemohlo zacykliť.

Pod tým je provider layer, ktorý sme nasadili ako prvý: jeden completion contract, task registry, ktorý pre každú úlohu pripína providera, model a dostupné nástroje, a tracing, ktorý pri každom requeste zaznamenáva spotrebu tokenov a cenu. Nič z toho nie je vidieť v UI — existuje to preto, aby sa dalo to, čo beží navrchu, vymeniť, merať a rozpočtovať.

**Médiá k tréningom.** K záznamom v denníku môžeš teraz priložiť fotky a videá, prípadne ich zachytiť priamo počas tréningu z prekrytej lišty (overlay strip). Stránka galérie zbiera všetko na jednom mieste s filtrovaním, lightboxom a meradlom využitia voči tvojej kvóte. Videá majú editor priamo v prehliadači na strihanie a orezávanie, s rýchlou cestou pre jednoduché strihy a frame-presnou cestou, keď úprava potrebuje presnosť na snímok.

**Plány a časomiery.** Plány sa teraz môžu v čase meniť: progression groups s cyklovými oknami umožňujú, aby plán v zvolenom cykle prešiel na náročnejší variant, s timeline pohľadom, ktorý zobrazuje momenty prechodu. Deload dostal konfigurovateľný prvý deload cyklus, smer rotácie a prepisy na úrovni jednotlivých dní z kalendára. Nová politika zmeškaných tréningov na úrovni plánu označuje plán ako povinný alebo voliteľný — voliteľné plány sa nikdy nezobrazia v zozname zmeškaných a po jednodňovej ochrannej lehote na dodatočné zapísanie ticho automaticky preskočia neaktuálne tréningy.

Aktívne časomiery tréningu teraz zobrazujú cieľové trvanie z plánu hneď vedľa živých číslic, farebne ich odlišujú podľa toho, či sú pod, v rámci, alebo nad rozsahom, a prekročenie hraníc signalizujú zvukom a haptikou. Keďže farba samotná nie je feedback pre každého, prekročenia sa oznamujú aj čítačkám obrazovky.

Pribudli dve knižnice: handstand-mastery (22 cvičení, odomknutá voľnou stojkou na rukách) a začiatočnícka knižnica DnB Step, ktorá otvára novú tanečnú skupinu — celkovo tak máme 34 knižníc a 572 cvičení.

## Prečo tieto zmeny

Väčšina ľudí, ktorí k nám prídu, už má plán — v tabuľke, alebo napísaný trénerom. Prepisovať ho ručne do builderu je najnudnejšia možná prvá skúsenosť. Import sme si vybrali zámerne, namiesto generovania plánov od nuly: štruktúrovať niečo, čomu už dôveruješ, a pýtať sa na časti, ktoré nevieme prečítať, je čestnejšie než vymyslieť program a predstaviť ho ako koučing.

Provider layer prišiel prvý, pretože predchádzajúci devlog správne identifikoval, kde je blocker. Tenký adapter bol lacnejší než prepis na generický SDK, a chceli sme mať cenu za request viditeľnú ešte predtým, než nasadíme čokoľvek, čo spotrebúva tokeny.

Médiá sú jednoduché: tréning skillov je vizuálny a pokrok na línii stojky na rukách sa ľahšie vidí, než sa opisuje v poznámke. Deload a politika zmeškaných tréningov sa riadia rovnakým princípom ako zvyšok aplikácie — informujú, neblokujú. Deload je odporúčanie, ktoré môžeš preskočiť, a plán, ktorý si označil ako voliteľný, by ťa nemal núcť vysvetľovať každý zmeškaný deň.

Deploy pipeline existuje, pretože poradie je dôležité: build pred migráciou udrží nefunkčný build mimo databázy, a promote až po migrácii udrží zlyhanú migráciu mimo používateľov. Predchádzajúci deployment obsluhuje traffic, kým promote neuspeje.

## Čo sme sa naučili

Promotovanie deploymentu cez Vercel CLI zlyhávalo s obyčajným „User not found (404)" — CLI si odvodzuje vlastníka deploymentu z URL a tím sa pokúša vyhľadať ako osobný účet. Zavolanie rovnakého REST endpointu s explicitným team ID funguje, a považovanie stavu „už je aktuálnym produkčným deploymentom" za úspech robí opakované behy idempotentnými.

Jedna konfiguračná hodnota nás stála výpadok. Media host musí byť holý origin; keď mu dáš koncovú cestu (trailing path), CSP path-matching ticho zablokuje každú podpísanú URL, bez akejkoľvek chybovej hlášky. Štart aplikácie teraz zlyhá nahlas, namiesto toho, aby servoval galériu rozbitých obrázkov.

Schéma, migračné súbory a bežiaca databáza sa od seba ticho odkláňajú, pretože generovanie migrácie iba porovnáva súbory (diff). Guard test teraz overuje, že posledná migrácia je skutočne aplikovaná.

Evaly pre import sa oplatili. Osem golden fixtures spustí reálny pipeline a ohodnotí výsledok voči očakávanému výstupu; jeden odhalil chybný dotaz na názov cvičenia, ktorý pri manuálnom testovaní vyzeral v poriadku. Ďalší existuje výhradne na to, aby overil, že inštrukcie skryté v nahranom súbore neskončia v pláne.

## Čo bude ďalej

Systém deloadu má stále pred sebou ďalšie iterácie, vrátane odporúčaní odvodených z tvojich vlastných tréningových dát. Dve veci, ktoré sme spomenuli minule, sa ešte nestali: centrum notifikácií v aplikácii je stále len naplánované a natívna iOS aplikácia je neskoršia fáza, ktorú sme ešte nezačali. AI prístup zostáva za allowlistom s dennými limitmi, kým sledujeme, koľko reálne stojí jeho prevádzka, takže ešte nie je otvorený pre všetkých. Radšej to povieme na rovinu, než aby to vyznelo, že je to už hotové.
