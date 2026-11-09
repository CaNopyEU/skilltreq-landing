---
author: SkillTreq Team
date: '2026-11-09'
description: Tato aktualizace zlepšuje práci s fokusem klávesnice, podporu omezení pohybu
  a práci s bezpečnými okraji na mobilních zařízeních. Zároveň udržuje aktuální závislosti,
  bezpečnostní kontroly a údržbu CI.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-13-safer-focus-motion-and-release-maintenance
tags:
  - funkce
  - technologie
  - přístupnost
  - frontend
  - závislosti
  - ci
  - devlog
title: 'Devlog #13: Spolehlivější focus, pohyb a údržba releasů'
type: devlog
---

## Co je nového pro tebe

SkillTreq teď spolehlivěji zvládá několik běžných stavů rozhraní.

Uživatelé klávesnice dostanou jasnější správu fokusu při otevření dočasných prvků rozhraní. Focus zůstane tam, kde má, a po zavření prvku se vrátí na správné místo. Snižuje se tak riziko, že při pohybu aplikací bez myši ztratíš přehled o své pozici.

Rozhraní také respektuje nastavení omezení pohybu v operačním systému. Když je omezení pohybu zapnuté, podporované přechody se omezí, takže navigace působí méně vizuálně náročně.

Na mobilních zařízeních rozestupy v layoutu nově počítají s bezpečnými okraji kolem výřezů displeje a systémových ovládacích prvků. Spodní navigace a notifikační zprávy se méně často dostanou příliš blízko k okrajům obrazovky nebo se překryjí s rozhraním zařízení.

Tyto změny nemění způsob, jakým zaznamenáváš trénink. Zlepšují podmínky kolem tohoto workflow, hlavně když používáš klávesnici, mobilní zařízení nebo nastavení přístupnosti.

## Proč jsme tyto změny udělali

Tréninková data jsou užitečná jen tehdy, když rozhraní zůstává předvídatelné.

Správa fokusu je důležitá, protože focus na nesprávném místě může přerušit trénink nebo zkomplikovat vyplnění formuláře. Toto chování jsme zpřesnili u overlayů a notifikací, aby rozhraní jasně ukazovalo, kde má proběhnout tvá další akce.

Nastavení pohybu je osobní a někdy nezbytné. Nepředpokládáme, že animace zlepšuje každou interakci. Podpora omezení pohybu umožňuje aplikaci přizpůsobit se nastavení, které sis na zařízení už zvolil.

Práce s bezpečnými okraji je také praktická. Telefony mají různé tvary obrazovek a systémové oblasti. Když tyto oblasti bereme jako vstup pro návrh, navigace a stavové zprávy zůstanou čitelné na více zařízeních.

Tyto změny jsme vytvořili jako sdílená vylepšení rozhraní, ne jako izolované opravy. Budoucí obrazovky tak budou mít konzistentní sadu vzorů, které mohou následovat.

## Technické detaily

Aktualizovali jsme sdílený styling systém tak, aby pro rozestupy bezpečných okrajů používal tokeny. Padding specifický pro jednotlivá zařízení tak zůstává mimo samostatné komponenty a chování se snáze kontroluje.

Focus trap a práce s omezením pohybu byly použity ve sdílených oblastech pro toast zprávy a navigaci. Aktualizovali jsme také pokyny pro projekt a dokumentaci návrhu, aby tato pravidla byla zaznamenaná společně s implementací.

Toto období zahrnovalo rozsáhlejší údržbu závislostí. Aktualizovali jsme Pinia, výběr data, Floating UI, balíček ikon a další minor a patch verze. `js-yaml` jsme také přesunuli na novější API pojmenovaných exportů.

CI job pro kontrolu typů teď dostává 4 GB heapu. Řeší to chyby z nedostatku paměti, místo aby skrýval chyby typů. TypeScript jsme také ponechali na verzi 6, dokud nebude aktuální podpora TypeScript ESLint připravená pro další verzi.

Úklid CI artefaktů teď odstraňuje staré soubory a upozorní dříve, než se limity úložiště stanou problémem. Bezpečnostní aktualizace závislostí vyřešily stávající auditní práh pomocí upgradů, ne změnou výchozího nastavení tak, aby se nálezy ignorovaly.

## Co bude dál

Pokračujeme v práci na beta roadmapě. Zaměřujeme se na builder tréninkového plánu, workflow kalendáře, souhrny aktivit a osobní rekordy. Stejný přístup povedeme i dál: zviditelnit progres, udržet interakce předvídatelné a podporovat zařízení a nastavení, která sportovci už používají.
