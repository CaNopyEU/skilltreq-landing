---
author: SkillTreq Team
date: '2026-11-16'
description: Tréningové relácie teraz ponúkajú prehľadnejšiu navigáciu, bezpečnejšie zaznamenávanie sérií,
  lepšie pokyny na prípravu a konzistentnejšie ovládanie v celej aplikácii.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-14-a-more-coherent-workout-session
tags:
  - funkcie
  - technológie
  - tréningové-relácie
  - prístupnosť
  - spoľahlivosť
  - devlog
title: 'Devlog #14: Súvislejšia tréningová relácia'
type: devlog
---

## Čo je nové

Tréningové relácie majú teraz jasnejšiu štruktúru od nastavenia až po dokončenie. Zmeny sú navrhnuté tak, aby počas tréningu a zaznamenávania výkonu znižovali počet chýb, ktorým sa dá predísť.

Teraz môžeš:

- Presúvať sa medzi informáciami o cviku, aktívnym tréningom a dokončením bez toho, aby si stratil svoje miesto.
- Pozastaviť sériu namiesto použitia deštruktívnej akcie späť.
- Počas odpočítavania pauzy vidieť informácie o nastavení nasledujúceho cviku.
- Zobraziť pokyny na prípravu vždy, keď sa mení nasledujúci pohyb.
- Zaznamenávať metriky zadané ručne bez straty presnosti, aj keď ovládací prvok používa inú veľkosť kroku.
- Zachovať hodnoty metrík počas celej tréningovej série.
- Rozpoznať časti rozcvičky a deloadu vďaka jemným zmenám farby obrazovky.
- Otvárať akcie relácie a spodné panely pomocou konzistentnejšieho ovládania.
- Používať dotykové plochy navrhnuté na spoľahlivé ovládanie počas tréningu.
- Nájsť nový skill tree pre začiatočníkov v olympijskom vzpieraní a jeho doplnkový obsah.
- Bezpečne ukladať záznamy aktivity a poznámok aj v prípade opakovania požiadavky.

Tok tréningu teraz používa jednotný vizuálny jazyk. Tlačidlá, akčné plochy, panely, časovače a ovládacie prvky metrík sa počas celej relácie správajú konzistentnejšie.

## Prečo sme tieto zmeny urobili

Tréningová relácia sa líši od bežnej obrazovky aplikácie. Môžeš sa presúvať medzi cvikmi, kontrolovať detaily nastavenia, zadávať hodnoty jednou rukou alebo prechádzať časovanou pauzou. Aj malé nezrovnalosti v rozhraní môžu tento proces prerušiť.

Zamerali sme sa na miesta, pri ktorých si od teba relácia predtým vyžadovala zapamätať si príliš veľa vecí.

Nová štruktúra relácie drží súvisiace akcie pohromade. Informácie o cviku sú dostupné vtedy, keď ich potrebuješ, zatiaľ čo hlavný tréningový pohľad zostáva zameraný na aktuálnu sériu. Počas pauzy môže aplikácia zobraziť, čo sa zmení ďalej, vrátane detailov prípravy na nadchádzajúci pohyb.

Zmenili sme aj fungovanie pozastavenia a kroku späť. Krok späť môže odstrániť dokončenú akciu, čo je pri zaznamenávaní skutočných tréningových údajov rizikové. Pozastavenie ti umožní zastaviť a skontrolovať reláciu bez toho, aby sa táto pauza považovala za opravu.

Podobnú pozornosť sme venovali zadávaniu metrík. Pravítko alebo časové koliesko môže používať praktický vizuálny krok, ale ten by nemal meniť presnosť zaznamenanej hodnoty. Tieto dve veci sme oddelili, aby si ručne zadané metriky zachovali svoju určenú presnosť. Opravili sme aj strácanie hodnôt počas celej série.

Farebný odtieň rozcvičky a deloadu je zámerne jemný. Poskytuje kontext bez toho, aby odvádzal pozornosť od cviku, časovača alebo zaznamenaných metrík. Cieľom je, aby si na prvý pohľad ľahšie rozpoznal aktuálnu časť relácie.

Tieto rozhodnutia podporujú položku beta roadmapy pre aktívnu tréningovú reláciu s časovačom. Relácia musí byť spoľahlivá skôr, než okolo nej pridáme ďalšie funkcie plánovania a sledovania progresu.

## Technické detaily

Spodné panely sme zjednotili okolo jedného shellu `BaseSheet`. Panely tak zdieľajú rozloženie, správanie pri zatváraní a model dotykovej interakcie. Detaily skillov a akcie tréningu teraz môžu používať rovnakú základnú štruktúru bez toho, aby každá obrazovka udržiavala vlastné správanie.

Tréningová relácia bola tiež reorganizovaná okolo spoločnej session spine. Pohľady na cvik, pauzu, nastavenie a dokončenie teraz používajú spoločné vizuálne prvky pre akcie, upozornenia, chips a overlaye. Znížilo sa tým duplikovanie štýlov a zjednodušilo uvažovanie o pravidlách prechodov.

Dotykové ovládacie prvky teraz používajú spoločnú minimálnu cieľovú plochu 44 pixelov. Platí to pre ovládacie prvky relácie aj ďalšie často používané oblasti, nielen pre jeden komponent tlačidla. Tok tréningu sme tiež presunuli na spoločný `BaseButton`, ktorý udržiava konzistentné stavy a rozostupy.

Na dátovej strane sú POST požiadavky pre aktivitu a poznámky teraz idempotentné. Ak sa požiadavka odošle znova, server rozpozná existujúcu operáciu namiesto vytvorenia duplicitného záznamu. Opravili sme aj generovanie plánov tak, aby počítalo relácie, ktoré skutočne vytvorí, vrátane prípadov predčasného dokončenia.

Zapli sme prísnejšie spracovanie nekontrolovaného prístupu k indexovaným hodnotám v klientovi, na serveri, v utilitách aj v testoch. Vyžadovalo si to opraviť predpoklady o hodnotách, ktoré nemusia existovať, najmä v kóde pre relácie, kalendár, médiá a progres. Táto práca odhalila viacero miest, kde boli runtime kontroly užitočné, aj keď existujúce dáta zvyčajne vyzerali kompletne.

Po prekročení pamäťového limitu produkčného buildu sme upravili deployment pipeline a obnovili chýbajúce ikony. Audity závislostí teraz zaznamenávajú, prečo zostáva určité upozornenie tolerované, zatiaľ čo zmeny balíkov zostávajú v rámci verzií podporovaných aktuálnou aplikáciou.

## Čo bude ďalej

Našou ďalšou prioritou zostáva beta roadmapa pre tréningové plány, plánovanie v kalendári, súhrny aktivít a osobné rekordy. Práca na relácii poskytuje týmto funkciám stabilnejšie miesto na prepojenie s dokončenými tréningovými dátami.
