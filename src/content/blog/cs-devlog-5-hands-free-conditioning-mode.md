---
author: SkillTreq Team
date: '2026-04-15'
description: Fáze 33 přidává zvukové signály, správu wake locku a hands-free režim, abys mohl trénovat bez sahání na telefon.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-5-hands-free-conditioning-mode
tags:
- trénink
- kondice
- hands-free
- audio
- fáze-33
title: 'Devlog #4: Hands-free režim pro kondiční trénink'
type: devlog
---

## Na čem jsme pracovali

Poslední dva týdny jsme se soustředili na Fázi 33: podpora HIIT kondičního tréninku a hands-free režim cvičení. Cíl byl jednoduchý. Sportovci, kteří dělají kondiční okruhy, výdrže na čas nebo HIIT intervaly, by neměli muset mezi sériemi sahat po telefonu.

To znamenalo vybudovat několik propojených částí: systém wake locku, který udržuje obrazovku aktivní, zvukové signály nahrazující vizuální kontrolu časovače, nové cílové metriky pro kondiční vybavení a hands-free runtime, který to celé spojuje dohromady. Také jsme doplnili kodaňský plank do knihovny dovedností calisthenics-intermediate a věnovali kus času zpevňování naší CI/CD pipeline.

## Proč tyto změny

SkillTreq začínal jako tracker dovedností pro kalistheniku, ale reálné tréninkové programy kombinují práci na dovednostech s kondicí. Typická tréninková jednotka může zahrnovat nácvik stoje na rukou následovaný okruhem intervalů na airbiku. Aplikace zvládala dovednostní práci dobře. Kondiční část byla kostrbatá.

Hlavní problém: během výdrže na čas nebo HIIT intervalu potřebuješ vědět, kdy začít a kdy skončit, aniž by ses díval na obrazovku. Proto jsme nejdřív postavili zvukové signály (Fáze 33.4) a až potom hands-free runtime (Fáze 33.6). Signály musely fungovat spolehlivě, než jsme mohli postavit režim, který na nich závisí.

Přidali jsme také watty a kcal jako cílové metriky (Fáze 33.2). Kondiční cviky jako airbike mají jiná kritéria úspěchu než výdrž v planche. Místo sledování sekund nebo opakování cílíš na výkon nebo energetický výdej. Nová dovednost airbike a samostatná kondiční kategorie (Fáze 33.3) nám daly reálný cvik, na kterém jsme tyto metriky mohli otestovat.

Samotný hands-free režim přistál ve dvou částech. Nejdřív přepínač na blocích tréninkových dnů v plánu (Fáze 33.5), abys mohl při sestavování plánu označit konkrétní tréninkové dny jako hands-free. Potom runtime (Fáze 33.6), který automaticky postupuje cviky pomocí zvukového odpočítávání místo vyžadování klepnutí na obrazovku.

## Co jsme se naučili

**Race conditions u wake locku jsou reálné.** Naše počáteční implementace měla bug, kdy uvolnění a opětovné získání wake locku v rychlém sledu mohlo nechat zámek obrazovky v nedefinovaném stavu. Stávalo se to při rychlém přepínání mezi cviky. Oprava spočívala v serializaci požadavků na zámek a ošetření případu, kdy se uvolnění dokončí až po zahájení nového získání. Na tuto konkrétní race condition jsme přidali unit testy.

**Syntetizovaný zvuk funguje v tomhle případě lépe než nahrané soubory.** Zvažovali jsme přibalení nahraných zvukových souborů pro signály časovače, ale místo toho jsme zvolili syntézu přes Web Audio API. Pět různých typů signálů (start, stop, odpočítávací tik, odpočinek, dokončení), každý generovaný za běhu. Žádné audio soubory k načítání, žádná latence ze síťových požadavků a signály jsou dostatečně odlišné, abys je rozpoznal bez pohledu na obrazovku.

**CI si zaslouží stejnou pozornost jako produktový kód.** Sedm z 27 commitů v tomto období byly opravy CI. Náš Forgejo workflow pro automatické vytváření PR z dev do master tiše selhával. Přidání debug výstupu, oprava tokenových oprávnění a zajištění úplných git klonů pro push na GitHub mirror byly každá malá oprava, ale blokovaly celou deploy pipeline, dokud se nevyřešily. Poučení: přidej viditelnost chyb do CI jobů hned od začátku, ne až po třetím tichém selhání.

## Co bude dál

Stavitel tréninkových plánů a kalendářový pohled jsou další prioritou na beta roadmapě. S hands-free režimem na místě je dalším krokem usnadnit strukturování vícedenních tréninkových plánů, které kombinují bloky dovednostní práce a kondice. Také pracujeme na heatmapě aktivit a sledování osobních rekordů, než se beta milník uzavře.