---
author: SkillTreq Team
date: '2026-03-18'
description: 'Sedem týždňov vývoja: kompletná stránka progresu, onboarding založený na cieľoch, vylepšený UX tréningových jednotiek a nové knižnice pre tumbling, žonglovanie a weapon spinning.'
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-progress-tracking-onboarding-redesign-new-libraries
tags:
  - progres
  - onboarding
  - tréning
  - knižnice
  - bezpečnosť
title: 'Devlog #2: Sledovanie progresu, redizajn onboardingu a šesť nových knižníc zručností'
type: devlog
---

## Na čom sme pracovali

Tento devlog pokrýva približne sedem týždňov vývoja, 166 commitov od 5. marca. Hlavné oblasti: budovanie stránky progresu, redizajn onboardingu, vylepšenie tréningovej jednotky, pridanie šiestich nových knižníc zručností a posilnenie backendu.

## Prečo tieto zmeny

### Stránka progresu: zviditeľnenie tréningových dát

Dáta sme mali. Používatelia zaznamenávajú aktivity, dokončujú jednotky, sledujú osobné rekordy. Ale neexistovalo centralizované miesto, kde by sa to všetko dalo vidieť. Stránka progresu túto medzeru vypĺňa.

Teraz obsahuje heatmapu aktivity s navigáciou po rokoch, mriežku zvládnutia kategórií, prehľad míľnikov s indikátormi progresu, graf trendov osobných rekordov, štatistiky tréningov a časovú os s filtrovaním na strane servera.

Komponent zvládnutia kategórií prešiel viacerými iteráciami. Začali sme s názvom „Category Strength" a dual-bar vizualizáciou, potom sme ho premenovali na „Category Mastery" a prepracovali vzorec, aby lepšie odrážal skutočný progres v zručnostiach, nie len objem aktivity. Layout si vyžadoval opravy pre locale-aware zoradenie, správne poradie a kompaktnú notáciu.

Heatmapa si tiež vyžadovala starostlivý prístup. Premenovali sme „sessions" na „activities", pretože dáta zahŕňajú viac než len tréningové jednotky. Navigácia po rokoch, edge cases okolo prázdnych dát a konzistencia UTC zabrali viac práce, než sme čakali.

### Onboarding: začať od cieľov, nie od funkcií

Predchádzajúci onboarding bol orientovaný na funkcie: vyber si jazyk, nastav obmedzenia, hotovo. Fáza 28 ho nahradila flowom založeným na cieľoch. Noví používatelia si teraz vyberú, čo sa chcú naučiť (stojka, muscle-up, aerial cartwheel), zvolia svoju úroveň skúseností a vyberú si, ktoré knižnice zručností chcú odoberať.

Po onboardingu začiatočníci automaticky dostanú štartovací plán a guided tour po stránke zručností. Tour systém ukladá stav dokončenia pre každú stránku v databáze, takže si ho používatelia môžu neskôr zopakovať, ak chcú pripomenutie.

Pridali sme aj flow obnovy účtu pre vracajúcich sa používateľov, aby pri reaktivácii preskočili celý onboarding.

### Tréningová jednotka: menej trenia, viac kontroly

Tréningová jednotka prešla výrazným UX prepracovaním:

- **More actions sheet** nahrádza staré inline tlačidlá a znižuje vizuálny neporiadok
- **Prehľad tréningu** poskytuje rýchle zhrnutie pred jednotkou aj počas nej
- **Živé poznámky** ku každému cviku, písané počas jednotky
- **Undo podpora** pre náhodné dokončenie sérii
- **Flow výmeny cviku** prepracovaný ako multi-step drawer s výzvou po tréningu na aktualizáciu plánu
- **Assessment mód** na zhodnotenie tvojej úrovne v zručnosti bez započítania do tréningového objemu
- **Poznámky trénera** viditeľné pri cvikoch z plánu počas jednotky

Flow výmeny cviku bol najzložitejšia časť. Keď vymeníš cvik uprostred jednotky, aplikácia ti teraz po dokončení tréningu navrhne aktualizáciu plánu. Vďaka tomu zostávajú plány synchronizované s tým, čo reálne trénuješ.

### Obsah: šesť nových knižníc zručností

Pridali sme knižnice pre disciplíny nad rámec kalisteniky:

- Tumbling (začiatočník, mierne pokročilý, pokročilý)
- Žonglovanie s loptičkami (začiatočník, mierne pokročilý)
- Staff spinning, dual swords, sword spinning (všetky začiatočník)

Každá obsahuje kompletné slovenské a české preklady. Taktiež sme ku všetkým existujúcim cvikom pridali pohybové fázy (dekompozícia technických pokynov), takmer 300 celkovo, s rozpisom fáza po fáze pre každý cvik.

V rámci existujúcich kalistenických knižníc sme pridali začiatočníkom prístupné progresné kroky pre kliky a drepy, 24 nových zručností v expert a intermediate úrovniach a nové typy metrík: `height_cm` pre plyometrické cviky, `distance_m` pre pike kompresiu a `duration_seconds` pre výdrže v mobilite.

### Bezpečnosť a výkon

Dve backendové zmeny si zaslúžia osobitnú zmienku.

Prvá: rate limiting cez Upstash Redis a Zod validácia na všetkých mutation endpointoch. To zasiahlo 96+ súborov v jednom commite. Každý POST, PUT, PATCH a DELETE endpoint teraz validuje vstup na strane servera.

Druhá: bezpečnostné hlavičky, self-invite guard pre pozvánky trénerov a konverzia endpointov bez vedľajších efektov na čisté GETy.

Na strane výkonu sme spustili audit, ktorý skonvertoval obrázky do WebP, pridal lazy loading CSS, nastavil správne cache hlavičky a zaviedol stránkovanie tam, kde chýbalo.

## Čo sme sa naučili

**Pomenovanie je dôležité od začiatku.** Premenovanie „Category Strength" na „Category Mastery" uprostred vývoja zasiahlo viac súborov, než sme čakali: názvy komponentov, i18n kľúče, API endpointy, testy. Správny názov pred začiatkom implementácie šetrí reálnu prácu navyše.

**Chyby s časovými zónami sa kumulujú.** Viaceré komponenty mali subtílne problémy s UTC vs. lokálny čas. Heatmapa, graf dodržiavania plánu a widget telesnej hmotnosti potrebovali opravy. Nakoniec sme štandardizovali spracovanie časových zón na strane servera, čo vyriešilo väčšinu odchýlok.

**Pohybové fázy sú vysoko hodnotný obsah.** Pridanie rozpisov fáza po fáze bola obsahová úloha, nie programátorská. Ale prvotná spätná väzba naznačuje, že ide o jeden z užitočnejších príspevkov pre učenie sa nových zručností. Jednoduché textové pokyny pre každú fázu pohybu sa ukázali byť užitočnejšie než samotné video.

**Validuj vstupy od prvého dňa.** Pridanie Zod validácie do 96 súborov naraz funguje, ale čistejšie by bolo presadiť validáciu od začiatku so zdieľaným middleware patternom. Retrofitting je vždy ťažší.

## Čo ďalej

Cieľ pre beta launch je Q1 2026 a zostávajúce položky sú integrácia kalendára tréningových plánov, doladenie štatistík a spoľahlivý beh blogovej infraštruktúry (tento content engine). Po bete sa zameriame na dashboardy pre trénerov, export dát a grafy trendov osobných rekordov. Plánovanie monetizácie (free/pro/coach úrovne) je v roadmape na Q3.
