---
author: SkillTreq Team
date: '2026-11-23'
description: Tato aktualizace sjednocuje mobilní layouty a poskytuje ti jasnější
  zpětnou vazbu, když se akce uloží, vrátí zpět nebo přeruší.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-15-clearer-feedback-across-mobile-training
tags:
  - funkce
  - technické
  - mobilní
  - spolehlivost
  - tréninky
  - design-systém
  - devlog
title: 'Devlog #15: Jasnější zpětná vazba při tréninku na mobilu'
type: devlog
---

## Co je nového

Tato aktualizace zlepšuje, jak SkillTreq reaguje během tréninku, hlavně na menších obrazovkách.

Mobilní i desktopové layouty teď používají jednu společnou hranici breakpointu. Tím se omezuje počet případů, kdy rozhraní mění své chování při trochu odlišných šířkách. Nabídky, tlačítka, navigace a tréninkové ovládací prvky by se při změně velikosti nebo otočení zařízení měly chovat předvídatelněji.

Změny pokroku teď přesněji informují o konečném výsledku na serveru. Pokud server změnu odmítne nebo vrátí zpět, aplikace ji už neoznačí jako dokončenou. Skill tree tak zůstává blíž stavu uloženému na serveru.

U akcí, které lze vrátit zpět, se teď může přímo v notifikaci zobrazit ovládací prvek pro vrácení. Pokud akce podporuje vrácení, můžeš reagovat přímo z toastu, místo abys přecházel zpět na detail skillu.

Záznam médií během session teď potvrdí, když byl záznam pořízený v aktivní session přijat. Zpráva má zodpovědět jednoduchou otázku: dorazil upload do session?

Chybové notifikace mají také jasnější vzhled v dark mode. Barvy textu a pozadí teď zachovávají dostatečný kontrast, aniž by se změnil význam zprávy.

## Proč jsme tyto změny udělali

Tréninkové záznamy potřebují jasně ukazovat změny stavu. Lokální rozhraní může reagovat okamžitě, ale zdrojem pravdy zůstává server. Když se tyto dva stavy lišily, předchozí zpráva mohla neúspěšnou změnu zobrazit jako dokončenou. Upravil jsme způsob zobrazování výsledku tak, aby potvrzení odráželo uložený výsledek, ne pouze počáteční interakci.

Vrácení akce zpět se řídí stejným principem. Některé akce lze snadno vrátit, ale tato možnost je nejpřínosnější hned po provedení akce. Když ji umístíme do notifikace, cesta k obnovení zůstane blízko původního rozhodnutí.

Zaměřili jsme se také na přerušení během aktivních sessions. Záznam médií může probíhat při přechodu mezi cviky nebo při zaznamenávání série. Potvrzení ti poskytne užitečný kontrolní bod, aniž bys musel session ručně kontrolovat.

Mobilní změny řeší jiný typ nejistoty. Několik částí aplikace používalo související, ale oddělené kontroly viewportu. To může při překročení breakpointu vést k nekonzistentnímu chování. Společná hranice založená na CSS dává stránce i skill graphu stejnou definici mobilního layoutu.

## Technické detaily

Na stránce skills a v grafu jsme nahradili kontroly šířky v JavaScriptu stejným predikátem CSS media query, který používá design systém. Rozhodování o layoutu tak zůstává sladěné s aktivními styly prohlížeče.

Zámek scrollování na mobilu se teď uvolní, jakmile viewport opustí mobilní rozsah. To řeší otáčení zařízení i změnu velikosti okna, aniž by stránka po změně layoutu zůstala uzamčená.

Přidali jsme testy přechodů mezi breakpointy, vlastnictví scroll locku, výsledků synchronizace pokroku, chování vrácení akce, zpracování chyb a shody barevných tokenů v dark mode. Tyto testy pokrývají změny stavu, nejen statické vykreslení.

Na straně session teď tok uploadu médií a overlay přenáší stav potvrzení až do detailu session. Zpráva se zobrazí, když upload flow záznam přijme.

Také jsme zpřesnili množiny stavů používané endpointy pro sessions v plánu. Názvy usnadňují pochopení rozdílů mezi aktivními, dokončenými a deaktivovanými stavy při čtení nebo úpravách backendového kódu.

## Co bude dál

Naším dalším zaměřením zůstává beta roadmapa: práce na tréninkovém plánu a kalendáři, souhrny aktivit a osobní rekordy. Budeme pokračovat stejným přístupem: zviditelňovat uložený stav, držet možnosti obnovení blízko akcí a testovat chování v mobilních i desktopových layoutech.
