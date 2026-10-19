---
author: SkillTreq Team
date: '2026-10-19'
description: Tréningové plány teraz presnejšie zohľadňujú dokončené tréningy, zatiaľ čo prístup k účtu, lokalizácia a spoľahlivosť nasadenia prešli cielenými opravami.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-11-more-accurate-plan-progress-and-safer-account-access
tags:
  - funkcie
  - technológie
  - devlog
  - tréningové-plány
  - autentifikácia
  - spoľahlivosť
title: 'Devlog #11: Presnejší priebeh plánu a bezpečnejší prístup k účtu'
type: devlog
---

## Čo je nové

Priebeh tréningového plánu teraz presnejšie odráža tvoje zaznamenané tréningy.

Ak boli tréningy dokončené, ale plán ich ešte nezohľadnil, SkillTreq túto aktivitu teraz zosúladí pred výpočtom miery plnenia. To znamená, že údaj o plnení plánu vychádza z práce zaznamenanej v tvojej tréningovej histórii, nie iba z predchádzajúceho stavu plánu.

Plán môžeš dokončiť aj manuálne. Hodí sa to vtedy, keď si dokončil zamýšľanú prácu, ale plán už nemá k dispozícii ďalšiu automatickú zmenu stavu. Dokončený plán zostáva dostupný na nahliadnutie.

Dokončené a pozastavené plány teraz zobrazujú mieru plnenia priamo na svojich kartách. Môžeš si tak skontrolovať, ako presne si plán dodržiaval, bez toho, aby si musel otvárať každý plán zvlášť.

Opravili sme aj niekoľko menších problémov:

- Najnovšia voľba lokalizácie má teraz počas ukladania prednosť. Rozhranie by sa už nemalo na chvíľu vrátiť k staršej hodnote z databázy.
- Callbacky pri prihlasovaní cez GitHub sa teraz overujú voči nakonfigurovanému GitHub issueru.
- Zmeny plánu teraz vymažú súvisiace cache relácií a štatistík, takže upravené plány budú menej často zobrazovať staré údaje.
- Ak sa rate limiting musí uchýliť k úložisku v pamäti, konfigurácia nasadenia teraz toto správanie jasne uvádza.

## Prečo sme tieto zmeny urobili

Tréningový plán je užitočný iba vtedy, keď jeho stav zodpovedá tomu, čo si skutočne urobil. Predtým mohol plán po zaznamenaní tréningov alebo po zmene svojej štruktúry zobrazovať zastaranú mieru plnenia. Pri kontrole tréningu v kalendári to vytváralo neistotu.

Rozhodli sme sa zosúladiť tréningy pred výpočtom miery plnenia namiesto toho, aby sme za zdroj pravdy považovali uložený stav plánu. Zaznamenaná aktivita je bližšie k skutočnému správaniu športovca. Plán tak môže toto správanie opísať bez potreby manuálnych opráv v bežných prípadoch.

Manuálne dokončenie rieši inú situáciu. Nie každý plán sa skončí rovnakou automatickou cestou. Možno si dokončil zamýšľanú prácu, prestal plán používať alebo si dosiahol platný koncový bod, ktorý rozvrh nedokáže odvodiť. Priama akcia na dokončenie necháva životný cyklus plánu pod tvojou kontrolou.

Zobrazenie miery plnenia na dokončených a pozastavených kartách uľahčuje spätné vyhodnotenie po skončení plánu. Tréningová história nie je užitočná iba počas aktívneho plánu. Pomáha ti tiež porovnať zamýšľaný rozvrh s tým, čo sa v priebehu času skutočne stalo.

Oprava lokalizácie vychádza z rovnakého princípu. Tvoja aktuálna voľba by mala byť viditeľná okamžite, aj keď sa uložená preferencia ešte zapisuje. Opravy účtu a nasadenia sme pridali preto, že nekonzistentné overovanie pri prihlasovaní alebo nejasné správanie rate limitingu môžu sťažiť používanie inak správne fungujúcich tréningových funkcií.

## Technické detaily

Aktualizácia plánu pridáva cestu na zosúladenie tréningov a upravuje dátový model aj migráciu používanú štatistikami plánov. Pri nahradení plánu sa teraz vymažú aj jeho cache relácií a štatistík. Tým sa zabráni zobrazovaniu výsledkov vypočítaných podľa predchádzajúcej štruktúry plánu.

Výpočty miery plnenia zdieľajú aktívne, dokončené a pozastavené zobrazenia plánu. Karty v zozname plánov dostávajú vypočítané hodnoty zo servera, takže súhrn zostáva konzistentný s detailným zobrazením.

Konfigurácia GitHub OAuth teraz pri autentifikácii obsahuje issuer potrebný na overenie callbacku podľa príslušného štandardu. Zmenu pokrýva guard test pre issuer poskytovateľa.

Rate limiting teraz hlási, keď konfigurácia trvalého úložiska nie je dostupná a aplikácia prejde na správanie založené na úložisku v pamäti. Limiting v pamäti je užitočná záloha, ale platí iba pre bežiaci proces. Zviditeľnenie tohto obmedzenia pomáha kontrolám nasadenia odhaliť konfigurácie, ktoré si vyžadujú pozornosť.

Odstránili sme aj nepoužívaný databázový stĺpec `personal_records.context`. Odstránenie nevyužívanej časti schémy znižuje počet polí, s ktorými musí budúci kód a migrácie počítať.

Túto verziu podporuje aj niekoľko údržbových zmien. Aktualizovali sme závislosti aplikácie a testov, Content Security Policy teraz používa hash pre import map potrebnú pri spustení v produkcii a kontroly continuous integration dostali širšie pokrytie pravidiel auditu a type safety. Pridali sme aj nové dáta o pohyboch zameraných na explozívnu silu a o ovládaní, navigácii a akrobacii dronov z pohľadu prvej osoby pre začiatočníkov.

## Čo bude ďalej

Pokračujeme v práci na beta roadmape so zameraním na tvorbu tréningových plánov, prácu s kalendárom, súhrny aktivít a osobné rekordy. Ďalšie zmeny budú naďalej prepájať zaznamenané tréningy s prehľadnejšou dlhodobou tréningovou históriou.
