---
author: SkillTreq Team
date: '2026-03-04'
description: Šprint s 201 commitmi premenil SkillTreq z prototypu skill tree na funkčnú
  tréningovú appku s aktívnymi sessions, tvorcom plánov a systémom pre trénerov.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-from-skill-tree-viewer-to-gym-ready-training-app
tags:
  - devlog
  - tréning
  - výkon
  - mobil
  - design-system
  - backend
title: 'Devlog #1: Od prehliadača Skill Tree po tréningovú appku pripravenú na gym'
type: devlog
---

## Na čom sme pracovali

Tento devlog pokrýva 201 commitov naprieč frontendom, backendom a infraštruktúrou. Hlavné oblasti: aktívne tréningové sessions, tvorca tréningových plánov, integrácia s kalendárom, systém pre trénerov a kompletný redizajn design systému. Väčšina týchto zmien mieri k rovnakému cieľu. Spraviť zo SkillTreq appku použiteľnú počas reálneho tréningu, nie len na prezeranie skill tree.

## Prečo tieto zmeny

### Tréningové sessions pripravené na gym

Pôvodné zaznamenávanie tréningov bolo navrhnuté pre desktop. Tlačidlá boli malé, text sa ťažko čítal medzi sériami a časovač nebol dostatočne presný. Prepracovali sme UI aktívnej session s väčšími dotykovými plochami, vysúvacím panelom na review sérií a veľkosťami prispôsobenými pre gym. Časovač výdrží sa stal samostatným stopkami s presnosťou na desatiny sekundy, pretože kalistenické výdrže vyžadujú presné meranie času. Pridali sme aj informačný panel o cviku, aby si mohol skontrolovať detaily pohybu uprostred tréningu bez opustenia flow.

Tieto zmeny vznikli z testovania appky počas reálnych tréningov. Malé obrazovky, spotené ruky a obmedzená pozornosť medzi sériami odhalili každú skratku, ktorú sme si dovolili.

### Tvorca tréningových plánov a kalendár

Tvorca plánov výrazne narástol. Teraz podporuje aktiváciu viacerých plánov súčasne (trénuj kalisteniku a mobilitu podľa rôznych rozvrhov), tvorbu plánov podľa skupín, vlastné bloky cvikov a ukladanie rozpracovaných konceptov, aby si nestratil prácu, keď odídeš z obrazovky. Pridali sme validáciu formulárov a overlay pri ukladaní na prevenciu straty dát.

Zobrazenie kalendára sa zlúčilo so zoznamom denných sessions. Teraz vidíš naplánované sessions, dokončené tréningy a vynechané dni na jednom mieste. Akcie pre sessions (štart, preskočenie s dôvodom, zobrazenie detailov, pridanie poznámok) sú priamo inline. Pridali sme aj náhľady tréningov len na čítanie pre nadchádzajúce naplánované sessions, aby si mohol skontrolovať, čo je v pláne, bez toho, aby si čokoľvek upravoval.

### Výkon: menej databázových round-tripov

Našli sme N+1 query patterny v niekoľkých endpointoch. Endpoint na ukladanie plánov robil zhruba 50 databázových volaní na request. Zredukovali sme ich na 6. Stránka s progresom spúšťala tri redundantné API volania pre osobné rekordy pri načítaní. Tiež sme paralelizovali nezávislé API queries pomocou `Promise.all` a doplnili chýbajúce rate limity.

Neon serverless Postgres pooler priniesol vlastné problémy. Connection pooling spôsoboval race conditions pri nových registráciách, kde referencie cudzích kľúčov zlyhali, pretože riadok s používateľom sa ešte nepropagoval. Pridali sme recovery kontrolu pre riadok používateľa a opravili flow mazania účtu, aby správne odstraňoval OAuth prepojenia.

### Systém pre trénerov a inštruktorov

Fáza 9 priniesla roly, pozvánky pre klientov, priraďovanie plánov a dashboard pre trénerov. Bola to rozsiahla zmena (64+ zmenených súborov), ktorá vyžadovala nové databázové tabuľky, API endpointy a UI komponenty. Tréner môže pozvať klientov emailom, sledovať ich progres, priraďovať tréningové plány a monitorovať dodržiavanie. Systém používa samostatných credential providerov pre každú rolu, čo si vyžiadalo reštrukturalizáciu auth konfigurácie.

### Konsolidácia design systému

Migrovali sme všetky hodnoty spacingu z `px` na `rem` naprieč 99+ súbormi. Potom sme to isté spravili pre veľkosti fontov naprieč 96+ súbormi. Vďaka tomu appka rešpektuje používateľské preferencie veľkosti fontu a zlepšuje sa prístupnosť. Zaviedli sme font family Geist, neutrálnu šedú paletu a skupinový farebný systém, ktorý priraďuje konzistentné farby skupinám v knižnici (kalistenika, mobilita, akrobacia).

Štýly tlačidiel sa presunuli do globálnych `.btn-*` tried, čím nahradili desiatky jednorazových implementácií tlačidiel. Výsledkom je predvídateľnejšie UI a menej miest na úpravu, keď sa mení dizajn.

### Autentifikácia a email

Pridali sme email OTP prihlásenie popri existujúcom OAuth (GitHub a Google). Pôvodná implementácia používala Resend, no prešli sme na Brevo pre jeho free tier s 300 emailmi/deň. Bezpečnostné vylepšenia zahŕňali rate limiting na auth endpointoch a P0+P1 audit OTP flow.

Infraštruktúra transakčných emailov umožnila týždenné digestyy a mesačné sumáre cez cron joby. Konsolidovali sme viaceré cron endpointy do jedného `/api/cron/digest`, aby sme sa zmestili do limitov Vercel free plánu.

### Mobilná navigácia a prístupnosť

Spodná navigácia bola prestavaná so štyrmi tabmi, centrálnym floating action buttonom a profilovým menu s avatarom. Pridali sme safe-area insety a dynamickú výšku viewportu (`dvh`) na správne zvládnutie iOS browser chrome.

Špeciálny accessibility pass riešil správu focusu v modáloch, ARIA labely na interaktívnych elementoch, klávesnicovú navigáciu pre dropdowny (s použitím `@floating-ui/vue` pre viewport-aware positioning) a vylepšenia sémantického HTML naprieč 17+ komponentmi.

## Čo sme sa naučili

**Testuj počas reálneho používania.** UI tréningovej session vyzeralo dobre v prehliadači. Rozpadlo sa pri používaní medzi sériami v gym. Odlesky na obrazovke, pot, únava a časový tlak odhalili problémy, ktoré by žiadne množstvo desktopového testovania neodhalilo.

**Dávkuj databázové operácie od začiatku.** Ukladanie plánu s 50 round-tripmi fungovalo bez problémov vo vývoji s lokálnou databázou. Na Neon serverless pooleri so sieťovou latenciou na každý query to bolo citeľne pomalé. Mali sme dávkovať od začiatku.

**Connection poolery pridávajú nové spôsoby zlyhania.** Neon pooler nezaručuje read-your-own-writes konzistenciu naprieč spojeniami. Narazili sme na to pri registráciách nových používateľov, kde referencia cudzieho kľúča zlyhala, pretože INSERT sa ešte nepropagoval. Oprava (recovery kontrola riadku používateľa) je jednoduchá, ale bug sa ťažko diagnostikoval.

**Migrácia na rem je mechanická, ale stojí za to.** Konvertovanie `px` na `rem` naprieč 100+ súbormi bolo únavné. No vyriešilo to problémy s prístupnosťou pre používateľov, ktorí si nastavujú väčšie predvolené veľkosti fontov, a spravilo design systém predvídateľnejším. Začať s `rem` od prvého dňa by ušetrilo čas.

## Čo ďalej

Cieľový termín beta launchu je Q1 2026. Zostávajúce položky zahŕňajú doladenie kalendára tréningových plánov, vylepšenia activity heatmapy a blogovú infraštruktúru, na ktorej je publikovaný tento príspevok. Po bete sa zameriame na vylepšenia správy klientov pre trénerov, JSON export dát a grafy trendov osobných rekordov.
