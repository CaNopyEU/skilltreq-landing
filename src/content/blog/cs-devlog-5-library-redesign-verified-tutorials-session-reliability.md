---
author: SkillTreq Team
date: '2026-04-21'
description: Vizuální přepracování stránky knihoven, manuální ověření všech 29 knihoven
  s tutoriály a opravy spolehlivosti aktivních tréninků.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-5-library-redesign-verified-tutorials-session-reliability
tags:
- frontend
- ux
- trénink
- obsah
- seo
title: 'Devlog #5: Redesign knihoven, ověřené tutoriály a spolehlivost tréninků'
type: devlog
---

## Na čem jsme pracovali

Tento cyklus se dotkl tří oblastí: jak vypadá a funguje stránka knihoven, kvalita obsahu tutoriálů a spolehlivost aktivních tréninků.

Stránka knihoven prošla vizuálním redesignem. Knihovny se teď zobrazují jako gradientové karty seskupené podle disciplín, s horizontálním pruhem nahoře, kde vidíš své odebírané knihovny. Nahradili jsme emoji ikony správnými SVG ikonami přes Iconify, přidali animace karet a vylepšili skeleton loading stavy.

Na straně obsahu jsme ručně ověřili tutoriálová videa ve všech 29 knihovnách. Zahrnovalo to kalistenikové knihovny (od začátečníků po experty), mobilitu, kickbox, bojovou mobilitu, tumbling, tricking, flow arts (tyč, meče, žonglování), švihadlo a nově přidanou knihovnu Ukemi (bezpečné pády). Přidali jsme také knihovnu příslušenství pro kruhy s mechanikou automatického odběru pro uživatele, kteří už na kruzích trénují.

U tréninků jsme opravili chování wake lock, aby obrazovka během cvičení nezhasínala, zlepšili spolehlivost zvukových signálů a přidali podporu pro rozsahy trvání v hands-free automatickém posouvání. Potvrzovací dialog teď brání náhodnému zahození dokončených tréninků.

Zjednodušili jsme také onboarding odebráním kroku s omezeními a přidáním automatického přeskočení na základě zkušeností, zapnuli indexování vyhledávači s podporou AI vyhledávání (llms.txt) a přidali stránku `/start` pro vstup bez zbytečného tření z landing webu.

## Proč tyto změny

Stará stránka knihoven zobrazovala všechno v plochém gridu. Jak jsme přidávali další disciplíny (momentálně máme 29 knihoven), tento layout přestal škálovat. Seskupení podle disciplín s vizuální hierarchií pomáhá uživatelům najít to, co je pro jejich trénink relevantní.

Ověření tutoriálů bylo na řadě už delší dobu. Náš automatizovaný skript na stahování správně přiřadil asi 85 % videí, ale zbytek byly duplikáty, špatné pohyby nebo mrtvé odkazy. U tréninkové aplikace je zobrazení špatného tutoriálového videa horší než nezobrazit žádné. Ověřili jsme každé jedno video, odstranili duplikáty napříč knihovnami a přidali validační skript, který problémy zachytí ještě před nasazením.

Opravy spolehlivosti tréninků vycházely z reálného používání. Ztmavení obrazovky uprostřed série je rušivé, zvlášť při výdržích na čas. Wake lock API pomáhá, ale chování prohlížečů se liší: Chrome na Androidu zámek zruší při přepnutí záložky, takže ho znovu aktivujeme, když se záložka stane viditelnou. Zvukové signály měly podobné cross-browser nekonzistence, které vyžadovaly řešení pro jednotlivé platformy.

Zjednodušení onboardingu bylo založené na datech. Krok s omezeními měl nízkou míru dokončení a data, která sbíral, se zatím smysluplně nevyužívala. Jeho odebráním se flow zkrátilo, aniž bychom přišli o cokoliv, s čím pracujeme.

## Co jsme se naučili

Vykreslování emoji je nekonzistentní napříč Android zařízeními. Co na desktopu vypadá jako čistá ikona, může být na některých telefonech předimenzované nebo špatně zarovnané. Přechod na SVG přes @nuxt/icon a Iconify tohle vyřešil a dal nám konzistentní velikost i kontrolu nad barvami.

Proces ověřování tutoriálů nás naučil, že ruční kontrola ve velkém měřítku potřebuje nástroje. Náš validační skript teď kontroluje duplicitní ID videí napříč knihovnami, ověřuje formáty URL a označuje knihovny s chybějícími tutoriály. Díky tomu je ověřování budoucích přírůstků obsahu rychlejší.

Nahrazení našeho vlastního heatmapu aktivity knihovnou vue3-calendar-heatmap ušetřilo asi 200 řádků kódu komponenty. Knihovna řeší edge cases (posuny časových zón, prázdné týdny, lokalizované popisky), které jsme udržovali sami. Někdy je správný krok přestat něco udržovat.

## Co bude dál

Seznam úkolů pro beta launch se zkracuje. Tvorba tréninkových plánů a kalendář jsou další velké funkce, na kterých se pracuje. Na řadě jsou také statistiky aktivity a osobní rekordy. Na straně obsahu se blogová infrastruktura, včetně enginu, který vygeneroval tento příspěvek, blíží ke svému prvnímu automatizovanému běhu.