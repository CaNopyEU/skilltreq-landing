---
author: SkillTreq Team
date: '2026-11-02'
description: Přehledy pokroku se nyní zaměřují na nedokončené knihovny, zatímco týdenní souhrn informuje o právě skončeném tréninkovém týdnu.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 2 min
slug: devlog-12-clearer-progress-and-weekly-digest
tags:
  - funkce
  - technologie
  - pokrok
  - knihovna
  - týdenní-souhrn
  - spolehlivost
  - vývojový-deník
title: 'Vývojový deník č. 12: Přehlednější pokrok a užitečnější týdenní souhrn'
type: devlog
---

## Co je nového

Sledování pokroku nyní zobrazuje nejdřív nedokončenou práci. Knihovny jsou seřazené podle dokončení a dokončené knihovny se z přehledu pokroku odstraní. Snáz tak poznáš, čemu je ještě potřeba věnovat pozornost, aniž bys musel procházet dokončené části.

Pořadí knihoven je nyní stabilní bez ohledu na stav tvého předplatného. Stejná struktura knihoven zůstává viditelná i při změně přístupu, takže pokrok se neposouvá jen kvůli stavu účtu.

Doplňkové cviky už nebrání tomu, aby byla knihovna označena jako dokončená. Dokončení se nyní určuje podle hlavních cviků, které danou knihovnu definují. Podpůrné pohyby můžeš dál sledovat, ale nebrání označení knihovny jako dokončené.

Týdenní souhrn se nyní odesílá v pondělí a pokrývá právě skončený týden. Získáš tak pravidelný okamžik pro vyhodnocení po dokončení tréninkového týdne.

## Proč jsme tyto změny udělali

Přehled pokroku by ti měl pomoct rozhodnout, co trénovat dál. Zobrazování dokončených knihoven společně s nedokončenými vytvářelo šum, zejména s tím, jak rostla historie tvého tréninku. Řazení podle dokončení a skrytí hotové práce udržuje přehled zaměřený na aktuální tréninkové priority.

Oddělili jsme také požadavky hlavní knihovny od doplňkových cviků. Doplňková práce je užitečná pro přípravu a rozvoj, ale neměla by měnit stav dokončení hlavní knihovny. Toto rozlišení lépe odráží, jak je skill tree strukturovaný.

Stejnou jasnost potřebovalo i načasování souhrnu. Pondělní souhrn může popsat kompletní období od pondělí do neděle. Dostaneš tak stabilní týdenní záznam místo informací o období, které stále probíhá.

## Technické detaily

Upravili jsme odvozování knihoven a výpočty dokončení tak, aby nezávisely na pořadí specifickém pro předplatné ani na stavu doplňkových cviků. Oba případy pokrývají unit testy.

Úloha pro odesílání souhrnu nyní před sestavením obsahu vypočítá předchozí kalendářní týden. Aktualizovali jsme také lokalizované texty e-mailů a související dokumentaci.

Toto období zahrnovalo několik údržbových změn. Konfiguraci nahrávání source map jsme přesunuli na správné místo v modulu, aktualizovali jsme verze závislostí a nahradili Prettier nástrojem oxfmt. Nastavení end-to-end testů nyní předem připraví klientský bundle i serverové renderování. Upraveno bylo také zpracování CI artefaktů, takže zaplněné úložiště artefaktů už nezpůsobí selhání jinak úspěšného běhu testů.

V rámci stejné údržby jsme aktualizovali základní nastavení bezpečnostních auditů a balíčky pro monitoring.

## Co bude dál

Pokračujeme v práci na roadmapě betaverze. Mezi další hlavní oblasti patří tréninkové plány, práce s kalendářem, souhrny aktivit a osobní rekordy. Cílem je propojit každodenní tréninková data s přehlednějším pohledem na dlouhodobý pokrok.
