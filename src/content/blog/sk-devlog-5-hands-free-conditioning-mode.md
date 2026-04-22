---
author: SkillTreq Team
date: '2026-04-15'
description: Fáza 33 pridáva zvukové signály, správu wake lock a hands-free režim, aby si mohol trénovať bez toho, aby si sa dotýkal telefónu.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-5-hands-free-conditioning-mode
tags:
  - tréning
  - kondičný tréning
  - hands-free
  - zvuk
  - fáza-33
title: 'Devlog #4: Hands-free režim pre kondičný tréning'
type: devlog
---

## Na čom sme pracovali

Posledné dva týždne sme sa venovali Fáze 33: podpora HIIT kondičného tréningu a hands-free režim cvičenia. Cieľ bol jednoduchý. Športovci, ktorí robia kondičné okruhy, výdrže na čas alebo HIIT intervaly, by nemali musieť medzi sériami zdvíhať telefón.

To znamenalo vybudovať niekoľko prepojených častí: systém wake lock na udržanie obrazovky aktívnej, zvukové signály namiesto vizuálnej kontroly časovača, nové cieľové metriky pre kondičné cvičenia a hands-free runtime, ktorý to všetko spája. Tiež sme doplnili kodanský plank do knižnice calisthenics-intermediate a venovali sme čas posilneniu nášho CI/CD pipeline.

## Prečo tieto zmeny

SkillTreq začínal ako tracker pre calisthenics skill tree, ale reálne tréningové programy kombinujú prácu na skilloch s kondičným tréningom. Typická tréningová jednotka môže zahŕňať nácvik stojky na rukách, po ktorom nasleduje okruh intervalov na airbiku. Aplikácia zvládala prácu na skilloch dobre. Kondičná časť bola nepraktická.

Hlavný problém: počas výdrže na čas alebo HIIT intervalu potrebuješ vedieť, kedy začať a kedy skončiť, bez toho, aby si sa pozeral na obrazovku. Preto sme najprv vybudovali zvukové signály (Fáza 33.4) a až potom hands-free runtime (Fáza 33.6). Signály museli spoľahlivo fungovať predtým, než sme mohli postaviť režim, ktorý na nich závisí.

Pridali sme aj watty a kcal ako cieľové metriky (Fáza 33.2). Kondičné cvičenia ako airbike majú iné kritériá úspechu než výdrž v planche. Namiesto sledovania sekúnd alebo opakovaní cielia na výkon alebo energetický výdaj. Nový airbike skill a dedikovaná kondičná kategória (Fáza 33.3) nám dali reálne cvičenie, na ktorom sme tieto metriky mohli otestovať.

Hands-free režim samotný pribudol v dvoch častiach. Najprv prepínač na blokoch tréningových dní v pláne (Fáza 33.5), aby si mohol pri tvorbe plánu označiť konkrétne tréningové dni ako hands-free. Potom runtime (Fáza 33.6), ktorý automaticky prechádza medzi cvičeniami pomocou zvukového odpočítavania namiesto toho, aby vyžadoval ťuknutie na obrazovku.

## Čo sme sa naučili

**Race conditions pri wake lock sú reálny problém.** Naša pôvodná implementácia mala bug, pri ktorom uvoľnenie a opätovné získanie wake lock v rýchlom slede mohlo nechať zámok obrazovky v nedefinovanom stave. Stávalo sa to pri rýchlom prepínaní medzi cvičeniami. Riešením bolo serializovať požiadavky na zámok a ošetriť prípad, keď sa uvoľnenie dokončí až po tom, čo sa začne nové získanie. Pre túto konkrétnu race condition sme pridali unit testy.

**Syntetizovaný zvuk tu funguje lepšie než nahrané súbory.** Zvažovali sme pribalenie nahraných zvukových súborov pre signály časovača, ale namiesto toho sme zvolili syntézu cez Web Audio API. Päť rôznych typov signálov (štart, stop, odpočítavanie, odpočinok, dokončenie), každý generovaný za behu. Žiadne zvukové súbory na načítanie, žiadna latencia zo sieťových požiadaviek a signály sú dostatočne odlišné na to, aby si ich rozpoznal bez pohľadu na obrazovku.

**CI si zaslúži rovnakú pozornosť ako produktový kód.** Sedem z 27 commitov v tomto období bolo opráv CI. Náš Forgejo workflow na automatické vytváranie PR z dev do master neustále ticho zlyhával. Pridanie debug výstupu, oprava oprávnení tokenov a zabezpečenie plných git klonov pre GitHub mirror push boli jednotlivo malé opravy, ale blokovali celý deploy pipeline, kým neboli vyriešené. Poučenie: pridaj viditeľnosť chýb do CI jobov od začiatku, nie až po treťom tichom zlyhaní.

## Čo bude nasledovať

Tvorca tréningových plánov a kalendárový pohľad sú ďalšou prioritou na beta roadmape. S hands-free režimom na mieste je ďalším krokom zjednodušiť štruktúrovanie viacdňových tréningových plánov, ktoré kombinujú prácu na skilloch a kondičné bloky. Taktiež pracujeme na heatmape aktivity a sledovaní osobných rekordov pred uzavretím beta milestonu.
