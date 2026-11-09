---
author: SkillTreq Team
date: '2026-11-09'
description: Táto aktualizácia zlepšuje správu focusu klávesnice, podporu obmedzenia pohybu a prácu s bezpečnými okrajmi na mobiloch. Zároveň udržiava aktuálne závislosti, bezpečnostné kontroly a CI.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-13-safer-focus-motion-and-release-maintenance
tags:
  - funkcie
  - technológie
  - prístupnosť
  - frontend
  - závislosti
  - CI
  - devlog
title: 'Devlog #13: Bezpečnejší focus, pohyb a údržba vydania'
type: devlog
---

## Čo je nové pre teba

SkillTreq teraz spoľahlivejšie zvláda niekoľko bežných stavov rozhrania.

Používatelia klávesnice získajú jasnejšiu správu focusu pri otvorení dočasných prvkov rozhrania. Focus zostane tam, kde má, a po zatvorení prvku sa vráti na správne miesto. Znižuje sa tak riziko, že stratíš svoju pozíciu pri pohybe v aplikácii bez myši.

Rozhranie tiež rešpektuje nastavenie obmedzenia pohybu v tvojom operačnom systéme. Keď je obmedzenie pohybu zapnuté, podporované prechody sa zredukujú, takže navigácia pôsobí vizuálne menej náročne.

Na mobilných zariadeniach rozostupy v layoute teraz zohľadňujú bezpečné okraje okolo výrezov displeja a systémových ovládacích prvkov. Spodná navigácia a notifikačné správy sa budú menej často nachádzať príliš blízko okrajov obrazovky alebo prekrývať so systémovým rozhraním zariadenia.

Tieto zmeny nemenia spôsob, akým zaznamenávaš tréning. Zlepšujú podmienky okolo tohto procesu, najmä keď používaš klávesnicu, mobilné zariadenie alebo nastavenia prístupnosti.

## Prečo sme tieto zmeny urobili

Tréningové dáta sú užitočné iba vtedy, keď rozhranie zostáva predvídateľné.

Správa focusu je dôležitá, pretože nesprávne umiestnený kurzor môže prerušiť tréning alebo sťažiť vyplnenie formulára. Toto správanie sme upravili pri overlayoch a notifikáciách, aby rozhranie jasne ukazovalo, kde má prebehnúť tvoja ďalšia akcia.

Nastavenia pohybu sú osobné a niekedy nevyhnutné. Nepredpokladáme, že animácia zlepšuje každú interakciu. Podpora obmedzenia pohybu umožňuje aplikácii prispôsobiť sa nastaveniam, ktoré si už zvolil na svojom zariadení.

Práca s bezpečnými okrajmi je tiež praktická. Telefóny majú rôzne tvary obrazoviek a systémové oblasti. Keď tieto oblasti berieme do úvahy pri návrhu, navigácia a stavové správy zostanú čitateľné na väčšom počte zariadení.

Tieto zmeny sme vytvorili ako spoločné vylepšenia rozhrania, nie ako izolované opravy. Budúce obrazovky tak získajú konzistentnú sadu vzorov, ktoré môžu nasledovať.

## Technické detaily

Zdieľaný styling systém sme aktualizovali tak, aby používal tokeny pre rozostupy bezpečných okrajov. Špecifické odsadenie pre jednotlivé zariadenia tak zostáva mimo samostatných komponentov a správanie sa ľahšie kontroluje.

Focus trap a správa obmedzenia pohybu boli použité v zdieľaných oblastiach pre toast správy a navigáciu. Aktualizovali sme aj pokyny pre projekt a dokumentáciu návrhu, aby boli tieto pravidlá zaznamenané spolu s implementáciou.

Toto obdobie zahŕňalo rozsiahlu údržbu závislostí. Aktualizovali sme Pinia, výber dátumu, Floating UI, balík ikon a ďalšie minor a patch verzie. `js-yaml` sme tiež presunuli na novšie API pomenovaných exportov.

CI úloha na kontrolu typov teraz dostáva alokáciu haldy s veľkosťou 4 GB. Tým riešime chyby spôsobené nedostatkom pamäte, namiesto toho, aby sme skrývali chyby typov. TypeScript sme zároveň ponechali na verzii 6, kým nebude aktuálna podpora TypeScript ESLint pripravená na ďalšiu verziu.

Čistenie CI artefaktov teraz odstraňuje staré súbory a upozorní skôr, než sa limity úložiska stanú problémom. Aktualizácie bezpečnostných závislostí odstránili existujúce auditné upozornenia prostredníctvom aktualizácií, nie zmenou základnej hranice tak, aby sa nálezy ignorovali.

## Čo bude nasledovať

Pokračujeme v práci na beta roadmap, so zameraním na tvorbu tréningového plánu, kalendárové workflow, súhrny aktivít a osobné rekordy. Rovnaký prístup bude viesť aj túto prácu: zviditeľniť progres, zachovať predvídateľné interakcie a podporiť zariadenia a nastavenia, ktoré športovci už používajú.
