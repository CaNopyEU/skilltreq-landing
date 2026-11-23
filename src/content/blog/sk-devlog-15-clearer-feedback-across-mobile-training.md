---
author: SkillTreq Team
date: '2026-11-23'
description: Táto aktualizácia zjednocuje rozloženie na mobilných zariadeniach a poskytuje
  jasnejšiu spätnú väzbu pri uložení, vrátení alebo prerušení akcií.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-15-clearer-feedback-across-mobile-training
tags:
  - funkcie
  - technológie
  - mobilné
  - spoľahlivosť
  - tréningy
  - dizajnový-systém
  - devlog
title: 'Devlog #15: Jasnejšia spätná väzba počas mobilného tréningu'
type: devlog
---

## Čo je nové pre teba

Táto aktualizácia zlepšuje spôsob, akým SkillTreq reaguje počas tréningu, najmä na menších obrazovkách.

Mobilné a desktopové rozloženie teraz používajú jednu spoločnú hranicu breakpointu. Znižuje to počet prípadov, keď rozhranie zmení svoje správanie pri trochu odlišných šírkach. Meníže, tlačidlá, navigácia a tréningové ovládacie prvky by mali zostať predvídateľnejšie pri zmene orientácie alebo veľkosti zariadenia.

Zmeny progresu teraz presnejšie zobrazujú konečný výsledok zo servera. Ak server zmenu zamietne alebo vráti späť, aplikácia ju už nezobrazí ako dokončenú. Vďaka tomu zostáva skill tree bližšie k stavu uloženému na serveri.

Vratné akcie teraz môžu zobrazovať ovládací prvok na vrátenie priamo v oznámení. Ak akcia podporuje vrátenie, môžeš na ňu reagovať z toastu bez návratu do detailu skillu.

Nahrávanie médií počas tréningu teraz potvrdí, keď server prijme záznam vytvorený počas aktívnej relácie. Správa má zodpovedať na jednoduchú otázku: dostal sa upload do tréningu?

Chybové oznámenia majú teraz v tmavom režime jasnejší vzhľad. Farby textu a pozadia si zachovávajú dostatočný kontrast bez zmeny významu správy.

## Prečo sme tieto zmeny urobili

Tréningové záznamy potrebujú jasne zobrazovať zmeny stavu. Lokálne rozhranie môže reagovať okamžite, ale zdrojom pravdy zostáva server. Keď sa tieto dva stavy nezhodovali, predchádzajúca správa mohla pôsobiť tak, že neúspešná zmena bola dokončená. Zmenili sme spôsob zobrazovania výsledku tak, aby potvrdenie odrážalo uložený stav, nielen úvodnú interakciu.

Vrátenie akcie sa riadi rovnakým princípom. Niektoré akcie sa dajú jednoducho vrátiť, no táto možnosť je najužitočnejšia hneď po vykonaní akcie. Keď ju umiestnime do oznámenia, cesta k oprave zostáva blízko pôvodného rozhodnutia.

Zamerali sme sa aj na prerušenia počas aktívnych tréningov. Médiá môžeš nahrávať pri prechode medzi cvikmi alebo počas zaznamenávania série. Potvrdenie ti poskytne užitočný kontrolný bod bez toho, aby si musel tréning manuálne kontrolovať.

Mobilné zmeny riešia iný typ neistoty. Viaceré časti aplikácie používali súvisiace, ale oddelené kontroly viewportu. To môže pri prekročení breakpointu spôsobiť nekonzistentné správanie. Spoločná hranica založená na CSS dáva stránke aj jej skill grafu rovnakú definíciu mobilného rozloženia.

## Technické detaily

Kontroly šírky v JavaScripte na stránke skills a v grafe sme nahradili rovnakým predikátom CSS media query, ktorý používa dizajnový systém. Rozhodnutia o rozložení tak zostávajú zosúladené s aktívnymi štýlmi prehliadača.

Zámok mobilného scrollovania sa teraz uvoľní, keď viewport opustí mobilný rozsah. To rieši zmenu orientácie aj zmenu veľkosti okna bez toho, aby stránka po zmene rozloženia zostala uzamknutá.

Pridali sme testy pre prechody medzi breakpointmi, vlastníctvo zámku scrollovania, výsledky synchronizácie progresu, správanie funkcie vrátenia, spracovanie chýb a zhodu farebných tokenov v tmavom režime. Tieto testy pokrývajú zmeny stavu, nielen statické vykreslenie.

Na strane tréningov teraz tok nahrávania médií a overlay prenáša stav potvrdenia až do detailu tréningu. Správa sa zobrazí po prijatí záznamu tokom nahrávania.

Spresnili sme aj množiny stavov používané endpointmi planovaných tréningov. Ich názvy uľahčujú rozlíšenie medzi aktívnymi, dokončenými a deaktivovanými stavmi pri čítaní alebo úprave backendového kódu.

## Čo bude ďalej

Našou ďalšou prioritou zostáva beta roadmapa: práca na tréningových plánoch a kalendári, súhrny aktivity a osobné rekordy. Budeme pokračovať rovnakým spôsobom: zviditeľňovať uložený stav, udržiavať možnosti opravy blízko akcií a testovať správanie na mobilných aj desktopových rozloženiach.
