---
author: SkillTreq Team
date: '2026-08-12'
description: Import plánů z tabulek s pomocí AI, foto a video přílohy u tréninků
  a produkční deploy pipeline, která postupně sestaví, migruje a nasadí novou
  verzi.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-7-ai-plan-import-workout-media-deploy-pipeline
tags:
  - devlog
  - ai
  - trénink
  - média
  - infrastruktura
  - přístupnost
title: 'Devlog #7: AI import plánů, tréninková média a deploy pipeline'
type: devlog
---

## Na čem jsme pracovali

Tento cyklus zabraly především tři oblasti: import plánu, media z tréninků a náhrada manuálních produkčních nasazení deploy pipeline.

**Import plánu.** Existující plán teď můžeš nahrát ze souboru. Uploaduj `.xlsx`, `.csv`, `.txt` nebo `.md` (nebo vlož text), podívej se na náhled, jak čteme jednotlivé listy, a pak proběhni krátkou konverzací, ve které se asistent zeptá na cokoliv nejasného — „jde o dipy na kruhách, nebo na bradlech?" — a navrhne strukturovaný plán, který můžeš uložit jako nový nebo sloučit s existujícím.

Parsování je deterministické: soubor se ještě předtím, než ho uvidí jakýkoliv model, převede do normalizované textové mřížky a nikde se neukládá — existuje jen v rámci requestu a nikde jinde. Názvy cviků se párují proti naší knihovně přes žebříčkový matcher, který nerozlišuje množné číslo, pomlčky a diakritiku. Když je jistota nízká, asistent se raději zeptá, než by hádal; když se nenajde žádná shoda, cvik si ponechá tvůj původní text jako vlastní název. Počet upřesňujících otázek je na jeden import omezený, aby se to nemohlo zacyklit.

Pod tím leží provider layer, kterou jsme vydali jako první: jeden completion contract, task registry, který pro každý task fixuje providera, model a dostupné nástroje, a tracing, který zaznamenává spotřebu tokenů a náklady na request. Nic z toho není vidět v UI — existuje to proto, aby se to, co běží nad tím, dalo měnit, měřit a rozpočtovat.

**Media z tréninků.** K záznamům v deníku teď můžeš přidávat fotky a videa a natáčet je přímo uprostřed tréninku přes overlay lištu. Stránka galerie sbírá vše na jedno místo s filtrováním, lightboxem a měřičem využití proti tvé kvótě. Videa mají editor přímo v prohlížeči na střih a oříznutí — s rychlou cestou pro jednoduché řezy a frame-přesnou cestou tam, kde je potřeba.

**Plány a časovače.** Plány se teď mohou v čase měnit: progression groups s cyklovými okny umožňují, aby plán ve zvoleném cyklu přešel na těžší variantu, s timeline pohledem, který ukazuje body přechodu. Deload dostal konfigurovatelný první deload cyklus, směr rotace a přepisy na úrovni dne z kalendáře. Nová plan-level missed policy označuje plán jako povinný nebo volitelný — volitelné plány se nikdy neobjeví v seznamu zmeškaných a po jednodenní grace periodě pro dodatečné zalogování tiše automaticky přeskočí zastaralé tréninky.

Časovače aktivního tréninku teď u živých číslic zobrazují cílové trvání z plánu, barevně je odlišují podle toho, jestli jsi pod, v, nebo nad rozsahem, a přechody mezi pásmy signalizují zvukem a haptikou. Protože barva sama o sobě není zpětná vazba pro každého, přechody se také ohlašují čtečkám obrazovky.

Přistály dvě nové knihovny: handstand-mastery (22 cviků, podmíněná volným stojem na rukou) a začátečnická knihovna DnB Step, která otevírá novou taneční skupinu — celkem tedy 34 knihoven a 572 cviků.

## Proč tyto změny

Většina lidí, kteří k nám přijdou, už nějaký plán má — v tabulce, nebo sepsaný trenérem. Přepisovat ho ručně do builderu je nejnudnější možná první session. Import jsme si vybrali před generováním plánů od nuly zcela vědomě: strukturovat něco, čemu už věříš, a doptat se na části, které nedokážeme přečíst, je upřímnější než vymyslet program a vydávat ho za koučování.

Provider layer vznikla jako první, protože minulý devlog v tom, co nás blokuje, trefil přesně. Tenký adapter byl levnější než přepis na obecné SDK, a chtěli jsme mít viditelné náklady na request dřív, než vypustíme cokoliv, co utrácí tokeny.

Media jsou jednoduché na zdůvodnění: dovednostní trénink je vizuální a pokrok na lajně stoje na rukou se lépe vidí, než popisuje v poznámce. Práce na deloadu a missed policy se řídí stejným principem jako zbytek aplikace — informuje, neblokuje. Deload je doporučení, které můžeš přeskočit, a plán, který jsi označil jako volitelný, by po tobě neměl chtít vysvětlení každého zmeškaného dne.

Deploy pipeline existuje proto, že pořadí je důležité: build před migrací udrží rozbitý build mimo databázi a promote po migraci udrží neúspěšnou migraci mimo uživatele. Předchozí nasazení obsluhuje provoz, dokud promote neuspěje.

## Co jsme se naučili

Promote nasazení přes Vercel CLI padal s obyčejným „User not found (404)" — CLI si vlastníka nasazení odvozuje z URL a tým hledá jako osobní účet. Zavolání stejného REST endpointu s explicitním team ID funguje, a když „už je to aktuální produkční nasazení" berete jako úspěch, opakované běhy jsou idempotentní.

Jedna konfigurační hodnota nás stála výpadek. Media host musí být holý origin; dej mu navíc koncovou cestu a CSP path-matching ti tiše zablokuje každou signed URL, aniž by se kdekoliv objevila chyba. Startup teď při chybě spadne nahlas, místo aby servíroval galerii rozbitých obrázků.

Schéma, migrační soubory a běžící databáze se od sebe tiše rozcházejí, protože generování migrace jen diffuje soubory. Guard test teď ověřuje, že poslední migrace je skutečně aplikovaná.

Evaly pro import se vyplatily. Osm golden fixtures spustí skutečnou pipeline a ohodnotí výsledek proti očekávanému výstupu; jeden odhalil špatný dotaz na název cviku, který při manuálním testování vypadal v pořádku. Další existuje čistě proto, aby ověřil, že instrukce skryté v uploadovaném souboru neskončí v plánu.

## Co bude dál

Deload systém má před sebou ještě několik iterací, včetně tipů odvozených z tvých vlastních tréninkových dat. Dvě věci, které jsme zmínili minule, se ještě nestaly: centrum notifikací v aplikaci je stále jen v plánu a nativní iOS aplikace je pozdější fáze, kterou jsme ještě nezačali. Přístup k AI také zůstává za allowlistem s denními limity, dokud nezjistíme, kolik nás provoz skutečně stojí, takže ještě není otevřený pro všechny. Raději to řekneme na rovinu, než abychom naznačovali, že je to hotové.
