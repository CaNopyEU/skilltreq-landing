---
author: SkillTreq Team
date: '2026-11-02'
description: Prehľad pokroku sa teraz zameriava na nedokončené knižnice a týždenný prehľad
  informuje o tréningovom týždni, ktorý sa práve skončil.
has_value_for_reader: true
locale: sk
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 2 min
slug: devlog-12-clearer-progress-and-weekly-digest
tags:
  - funkcie
  - technológie
  - pokrok
  - knižnica
  - týždenný-prehľad
  - spoľahlivosť
  - devlog
title: 'Devlog #12: Jasnejší pokrok a užitočnejší týždenný prehľad'
type: devlog
---

## Čo je nové

Sledovanie pokroku teraz zobrazuje nedokončenú prácu ako prvú. Knižnice sú zoradené podľa dokončenia a dokončené knižnice sa z prehľadu pokroku odstránia. Ľahšie tak uvidíš, čomu sa ešte treba venovať, bez prechádzania dokončených častí.

Poradie knižníc je teraz stabilné bez ohľadu na stav tvojho predplatného. Rovnaká štruktúra knižníc zostáva viditeľná aj pri zmene prístupu, takže pokrok sa nebude javiť ako zmenený iba preto, že sa zmenil stav účtu.

Doplnkové prvky už nebránia označeniu knižnice ako dokončenej. Dokončenie sa teraz určuje podľa hlavných prvkov, ktoré danú knižnicu definujú. Podporné pohyby môžeš naďalej sledovať, ale nebránia označeniu knižnice ako dokončenej.

Týždenný prehľad sa teraz odosiela v pondelok a zahŕňa práve skončený týždeň. Získaš tak stabilný bod na vyhodnotenie po dokončení tréningového týždňa.

## Prečo sme tieto zmeny urobili

Prehľad pokroku ti má pomôcť rozhodnúť sa, čo trénovať ďalej. Zobrazenie dokončených knižníc spolu s nedokončenými vytváralo šum, najmä keď pribúdala tvoja tréningová história. Zoradenie podľa dokončenia a skrytie hotovej práce udržiava prehľad zameraný na aktuálne tréningové priority.

Oddelili sme aj požiadavky hlavnej knižnice od doplnkových pohybov. Doplnkový tréning je užitočný na prípravu a rozvoj, ale nemal by meniť stav dokončenia hlavnej knižnice. Toto rozlíšenie lepšie odráža, ako je skill tree štruktúrovaný.

Jasnejšie bolo potrebné nastaviť aj časovanie prehľadu. Pondelkové zhrnutie môže opísať celé obdobie od pondelka do nedele. Získaš tak stabilný týždenný záznam namiesto informácií o období, ktoré ešte pokračuje.

## Technické detaily

Upravili sme odvodzovanie knižníc a výpočty dokončenia tak, aby nezáviseli od poradia špecifického pre predplatné ani od stavu doplnkových pohybov. Jednotkové testy pokrývajú oba prípady.

Úloha pre týždenný prehľad teraz pred vytvorením obsahu vypočíta predchádzajúci kalendárny týždeň. Aktualizovali sme aj lokalizované texty e-mailov a súvisiacu dokumentáciu.

Toto obdobie zahŕňalo niekoľko údržbových zmien. Konfiguráciu nahrávania source map sme presunuli na správne miesto v module, aktualizovali sme verzie závislostí a Prettier sme nahradili nástrojom oxfmt. End-to-end nastavenie teraz pripraví klientsky bundle aj serverové renderovanie. Upravili sme aj spracovanie artefaktov v CI, takže plné úložisko artefaktov už nespôsobí zlyhanie inak úspešného testovacieho behu.

V rámci rovnakej údržby sme aktualizovali základné nastavenia bezpečnostného auditu a balíky na monitorovanie.

## Čo bude ďalej

Pokračujeme v práci na beta roadmap, pričom ďalšími hlavnými oblasťami zostávajú tréningové plány a kalendárové workflow, súhrny aktivít a osobné rekordy. Cieľom je prepojiť každodenné tréningové dáta s jasnejším pohľadom na dlhodobý pokrok.
