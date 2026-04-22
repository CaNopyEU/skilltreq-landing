---
author: SkillTreq Team
date: '2026-03-04'
description: Sprint o 201 commitech proměnil SkillTreq z prototypu skill tree v funkční
  tréninkovou aplikaci s aktivními sezeními, tvorbou plánů a systémem pro trenéry.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-from-skill-tree-viewer-to-gym-ready-training-app
tags:
  - devlog
  - trénink
  - výkon
  - mobil
  - design-system
  - backend
title: 'Devlog #1: Od prohlížeče skill tree k tréninkové aplikaci připravené na gym'
type: devlog
---

## Na čem jsme pracovali

Tento devlog pokrývá 201 commitů napříč frontendem, backendem a infrastrukturou. Hlavní oblasti: aktivní tréninková sezení, tvorba tréninkových plánů, integrace kalendáře, systém pro trenéry a kompletní přepracování design systému. Většina těchto změn míří ke stejnému cíli. Udělat ze SkillTreq aplikaci použitelnou během skutečného tréninku, ne jen na procházení skill tree.

## Proč tyto změny

### Tréninková sezení připravená na gym

Původní logování tréninků bylo navržené pro desktop. Tlačítka byla malá, text se špatně četl mezi sériemi a časovač nebyl dostatečně přesný. Přepracovali jsme UI aktivního sezení s většími dotykovými plochami, zásuvkou pro přehled sérií a rozměry přizpůsobenými prostředí gymu. Časovač výdrže se stal samostatnými stopkami s přesností na desetiny sekundy, protože kalistenické výdrže vyžadují přesné měření času. Přidali jsme také informační panel cviku, abys mohl/a zkontrolovat detaily pohybu uprostřed sezení bez opuštění aktuálního flow.

Tyto změny vzešly z testování aplikace během skutečných tréninků. Malé obrazovky, zpocené ruce a omezená pozornost mezi sériemi odhalily každou zkratku, kterou jsme si vzali.

### Tvorba tréninkových plánů a kalendář

Tvorba plánů se výrazně rozrostla. Nyní podporuje aktivaci více plánů současně (trénuj kalisteniku a mobilitu v různých rozvrzích), tvorbu plánů podle skupin, vlastní bloky cviků a ukládání rozpracovaných verzí, abys nepřišel/a o práci při přechodu jinam. Přidali jsme validaci formulářů a překryvné vrstvy při ukládání, aby se předešlo ztrátě dat.

Pohled kalendáře se sloučil se seznamem denních sezení. Na jednom místě teď vidíš naplánovaná sezení, dokončené tréninky a vynechané dny. Akce sezení (spustit, přeskočit s důvodem, zobrazit detaily, přidat poznámky) jsou přímo v řádku. Přidali jsme také náhledy nadcházejících naplánovaných sezení v režimu pouze pro čtení, abys mohl/a zkontrolovat, co je v plánu, bez nutnosti cokoliv upravovat.

### Výkon: méně databázových round-tripů

Našli jsme N+1 query patterny v několika endpointech. Endpoint pro uložení plánu prováděl zhruba 50 databázových volání na jeden request. Snížili jsme to na 6. Stránka s pokrokem při načtení spouštěla tři redundantní API volání pro osobní rekordy. Paralelizovali jsme také nezávislé API dotazy pomocí `Promise.all` a přidali chybějící rate limity.

Neon serverless Postgres pooler přinesl vlastní problémy. Connection pooling způsoboval race conditions při registraci nových uživatelů, kdy reference cizího klíče selhaly, protože řádek uživatele se ještě nepropagoval. Přidali jsme obnovu uživatelského řádku a opravili flow mazání účtu, aby správně odstraňovalo OAuth vazby.

### Systém trenérů a instruktorů

Fáze 9 zavedla role, pozvánky klientů, přiřazování plánů a dashboard pro trenéry. Jednalo se o rozsáhlé rozšíření (64+ změněných souborů), které vyžadovalo nové databázové tabulky, API endpointy a UI komponenty. Trenér může pozvat klienty e-mailem, sledovat jejich pokrok, přiřazovat tréninkové plány a sledovat dodržování. Systém používá oddělené poskytovatele přihlašovacích údajů pro každou roli, což vyžadovalo restrukturalizaci konfigurace autentizace.

### Konsolidace design systému

Migrovali jsme všechny hodnoty mezer z `px` na `rem` v 99+ souborech. Poté jsme totéž udělali pro velikosti písma v 96+ souborech. Díky tomu aplikace respektuje uživatelské preference velikosti písma a zlepšuje přístupnost. Zavedli jsme rodinu písem Geist, neutrální šedou paletu a barevný systém podle skupin, který přiřazuje konzistentní barvy skupinám knihovny (kalistenika, mobilita, akrobacie).

Styly tlačítek se přesunuly do globálních `.btn-*` tříd, které nahradily desítky jednorázových implementací tlačítek. Výsledkem je předvídatelnější UI a méně míst k aktualizaci při změnách designu.

### Autentizace a e-mail

Přidali jsme přihlášení přes e-mailové OTP vedle existujícího OAuth (GitHub a Google). Původní implementace používala Resend, ale migrovali jsme na Brevo kvůli jeho free tieru s 300 e-maily denně. Bezpečnostní posílení zahrnovalo rate limiting na auth endpointech a P0+P1 audit OTP flow.

Infrastruktura transakčních e-mailů umožnila týdenní přehledy a měsíční souhrny přes cron joby. Konsolidovali jsme více cron endpointů do jednoho `/api/cron/digest`, abychom se vešli do limitů free plánu na Vercelu.

### Mobilní navigace a přístupnost

Spodní navigace byla přestavěna se čtyřmi záložkami, centrálním plovoucím akčním tlačítkem a profilovým menu s avatarem. Přidali jsme safe-area insety a dynamickou výšku viewportu (`dvh`) pro správné zvládnutí Chrome prohlížeče na iOS.

Samostatný průchod přístupností řešil správu fokusu v modálech, ARIA popisky na interaktivních prvcích, klávesovou navigaci pro dropdowny (s použitím `@floating-ui/vue` pro viewport-aware pozicování) a vylepšení sémantického HTML v 17+ komponentách.

## Co jsme se naučili

**Testuj při skutečném používání.** UI tréninkového sezení vypadalo v prohlížeči dobře. Rozpadlo se při použití mezi sériemi v gymu. Odlesky obrazovky, pot, únava a časový tlak odhalily problémy, které by žádné množství desktopového testování neodchytilo.

**Dávkuj databázové operace od začátku.** Uložení plánu s 50 round-tripy fungovalo v developmentu s lokální databází. Na Neon serverless pooleru se síťovou latencí na dotaz bylo znatelně pomalé. Měli jsme dávkovat od začátku.

**Connection poolery přidávají chybové stavy.** Neon pooler nezaručuje konzistenci read-your-own-writes napříč spojeními. Narazili jsme na to při registraci nových uživatelů, kdy reference cizího klíče selhala, protože INSERT se ještě nepropagoval. Oprava (kontrola obnovy uživatelského řádku) je jednoduchá, ale chyba se špatně diagnostikovala.

**Migrace na rem je mechanická, ale stojí za to.** Převod `px` na `rem` ve 100+ souborech byl únavný. Ale vyřešil problémy s přístupností pro uživatele, kteří si nastavují větší výchozí velikost písma, a udělal design systém předvídatelnějším. Začít s `rem` od prvního dne by ušetřilo čas.

## Co dál

Cíl pro spuštění bety je Q1 2026. Zbývající položky zahrnují vyladění kalendáře tréninkových plánů, vylepšení heatmapy aktivity a blogovou infrastrukturu, na které je publikován tento příspěvek. Po betě se zaměříme na vylepšení správy klientů pro trenéry, JSON export dat a grafy trendů osobních rekordů.
