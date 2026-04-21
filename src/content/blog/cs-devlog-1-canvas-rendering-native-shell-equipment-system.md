---
author: SkillTreq Team
date: '2026-04-01'
description: 'Měsíc plný nasazení: migrace skill grafu na canvas, zabalení aplikace
  do Capacitoru pro iOS, kompletní systém vybavení a spuštění AI asistenta pro tvorbu
  plánů.'
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-canvas-rendering-native-shell-equipment-system
tags:
- cytoscape
- capacitor
- vybavení
- ai
- mapa-těla
- devlog
title: 'Devlog #3: Vykreslování na canvas, nativní shell a systém vybavení'
type: devlog
---

## Na čem jsme pracovali

Březen byl nabitý. V aplikaci SkillTreq jsme odeslali 114 commitů, které se dotkly rendereru skill grafu, nativního iOS shellu, filtrování vybavení, vizualizace mapy těla, AI asistenta pro tvorbu plánů a šesti nových knihoven obsahu.

Největší jednotlivá změna: migrace interaktivního skill tree z VueFlow (založeného na DOM) na Cytoscape.js (založeného na canvas). Šlo o rozhodnutí kvůli výkonu. S více než 400 uzly na obrazovce mělo DOM vykreslování na mobilních zařízeních problémy. Vykreslování na canvas zvládne stejný graf za zlomek paměťových nákladů.

Také jsme zabalili webovou aplikaci do Capacitoru pro iOS, vybudovali kompletní systém vybavení (Phase 33), rozšířili mapu těla o data pokrytí tréninku (Phase 32) a nasadili prototyp AI asistenta pro tvorbu plánů (Phase 34).

## Proč tyto změny

**Vykreslování skill grafu na canvas.** Skill tree je hlavní navigační plocha aplikace. Na starších telefonech způsobovalo posouvání přes 400 uzlů výpadky snímků a zpožděné reakce na klepnutí. VueFlow vykresloval každý uzel jako Vue komponentu v DOM. Tento přístup nám dal snadné stylování a reaktivitu, ale ve větším měřítku se layout engine prohlížeče stal úzkým hrdlem. Cytoscape.js vykresluje vše na jediný `<canvas>` element, což umožňuje GPU zpracovat rendering přímo. Migrace vyžadovala přebudování animací (progress fill bary, particle efekty, focus overlaye) a přidání logiky úrovně detailu pro zjednodušení uzlů při nízkém zoomu. Po migraci jsme dva týdny opravovali okrajové případy: úniky paměti z osiřelých event listenerů, pozastavování animací během posouvání/zoomování a varování v konzoli z neplatných Cytoscape style properties.

**Profily vybavení.** Sportovci trénují v různých prostředích. Někdo v parku má hrazdu a bradla. Někdo doma má třeba jen kruhy a podložku. Systém vybavení (Phase 33) umožňuje uživatelům zadat, co vlastní, a podle toho filtruje plánovač a drawer s alternativami. Každý cvik v knihovně teď nese metadata o potřebném vybavení. Plánovač zobrazuje varování, když naplánovaný cvik vyžaduje vybavení, které uživatel nemá v seznamu. Otagovali jsme všech 415 cviků napříč všemi knihovnami.

**Nativní shell přes Capacitor.** Webová aplikace funguje dobře v prohlížeči, ale mobilní uživatelé očekávají nativní chování: safe area insety, haptickou odezvu, biometrický zámek, správné chování klávesnice a lokální notifikace. Capacitor zabalí stávající Nuxt aplikaci do nativního iOS shellu bez přepisování frontendu. Většina práce spočívala v úpravě layoutů pro safe area insety napříč všemi bottom sheety, dropdowny a akčními menu. Také jsme přidali overlay s biometrickým zámkem a splash screen.

**Mapa těla a pokrytí tréninku.** Phase 32 přidala vizuální mapu těla na stránku s pokrokem. Zvýrazňuje, které svalové skupiny trénuješ a které zanedbáváš. Počáteční verze bylo jednoduché SVG s předním pohledem. Iterací jsme přidali zadní pohled, zóny podle kategorií (rameno, kyčel, páteř, kotník, zápěstí), klepnutí na zónu pro detail a výpočty pokrytí tréninku. Model pokrytí zohledňuje jak aktivitní tréninky (jóga, lezení, plavání), tak strukturované cvičení, s různými časy regenerace podle zóny.

**AI asistent pro plány.** Sestavit vícetýdenní tréninkový plán ručně je časově náročné. AI asistent (Phase 34) využívá Claude přes MCP server k generování návrhů plánů na základě uživatelem odebíraných knihoven a cílů. UI je chatový panel s náhledem plánu a importem jedním kliknutím. Prošli jsme několika iteracemi transportu: Claude Agent SDK (způsobovalo EBADF chyby v Node), CLI subprocess a nakonec Anthropic SDK s OAuth tokeny přes RPi proxy. Dvoufázový přístup generování (návrh, pak validace) zachytí strukturální problémy dříve, než je uživatel uvidí.

**Nové knihovny obsahu.** Přidali jsme švihadlo (začátečník a středně pokročilý), kickbox (začátečník až pokročilý), tricking (začátečník až pokročilý) a combat mobilitu. Každá knihovna obsahuje kompletní SK a CS překlady. Také jsme přidali YouTube tutoriálové odkazy u více než 200 cviků a vytvořili tlačítko pro nahlášení tutoriálu, aby uživatelé mohli upozornit na nefunkční video odkazy.

## Co jsme se naučili

**Migrace na canvas je jednosměrné rozhodnutí.** Jakmile přejdeš z DOM na canvas, přijdeš o CSS stylování, inspekci elementů v browser DevTools a Vue reaktivitu na jednotlivých uzlech. Každou vizuální funkci je třeba reimplementovat v canvas API. Výkonnostní zisk to stál za to, ale rozsah následných bugů byl větší, než jsme čekali. Na opravách po migraci jsme strávili více času než na samotné migraci.

**Tagování vybavení je datový problém, ne problém kódu.** Systémový kód (DB schéma, API, UI) zabral zhruba dva dny. Otagování 415 cviků správnými metadaty o vybavení trvalo déle. Některé cviky mají nejednoznačné požadavky. Je zeď kus vybavení? (Ano, pro stojky u zdi.) Správně nastavit taxonomii bylo důležitější než samotný kód.

**Safe area insety ovlivňují všechno.** Přidání podpory Capacitor iOS se dotklo 14 komponent. Každý bottom sheet, dropdown a element s fixní pozicí potřeboval úpravy insetů. Podcenili jsme, kolik stránek s layout-false mělo natvrdo nastavený padding.

**AI transport je křehký.** Prošli jsme čtyřmi různými přístupy k volání Claude z Nuxt serveru, než jsme se ustálili na Anthropic SDK s OAuth. Každý předchozí přístup selhal z jiného důvodu: Agent SDK způsobovalo úniky file descriptorů při dev startupu, CLI subprocess měl problémy s kódováním a přímé API volání potřebovala logiku pro refresh tokenů. Fungující řešení používá RPi proxy, který spravuje OAuth tokeny samostatně.

## Co bude dál

Duben se zaměřuje na checklist pro beta launch. Plánovač tréninků a kalendář potřebují doladit, než budeme moci pozvat externí testery. V pořadí jsou dále heatmapa aktivit a stránky s osobními rekordy. Na straně obsahu budujeme infrastrukturu tohoto blogu, aby se devlogy jako tento publikovaly automaticky.