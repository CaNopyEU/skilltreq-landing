---
author: SkillTreq Team
date: '2026-09-14'
description: Souhrny plánů, historie pokroku, připomínky a kontroly dat teď usnadňují přehled výsledků tréninku a zvyšují důvěru v ně.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-10-clearer-plan-results-and-more-reliable-training-data
tags:
  - funkce
  - technika
  - devlog
  - pokrok
  - tréninkové-plány
  - iOS
  - kvalita-dat
title: 'Devlog #10: Přehlednější výsledky plánů a spolehlivější tréninková data'
type: devlog
---

## Co je nového

Tato aktualizace ti usnadní pochopit, co se během tréninkového plánu změnilo.

Po dokončení plánu teď SkillTreq zobrazí souhrn s relevantními údaji o tělesné hmotnosti a kontextem pokroku. Výsledek si můžeš prohlédnout v seznamu plánů, banneru dokončení i v souhrnu plánu. Plán se také může označit jako dokončený po dosažení data ukončení, nejen po ručním dokončení.

Časová osa journey teď zaznamenává posuny mezi kroky. Uvidíš tak jasněji, jak se tvoje tréninková historie v čase vyvíjela, místo aby se zobrazoval pouze aktuální stav.

Na iOS můžeš také dostávat připomínky vynechaných tréninků prostřednictvím služby Apple Push Notification service. Tyto připomínky jsou volitelné a můžeš je spravovat v nastavení oznámení.

Onboarding je kratší. Samostatný krok pro výběr jazyka byl odstraněn. Aplikace teď při nastavení používá locale tvého prohlížeče. Podporované jazykové nastavení zůstává tam, kde je potřeba.

Aplikace pro iOS má také vlastní ikonu a úvodní obrazovku v brand stylu. Nativní aplikaci tak snáz poznáš, když ji otevřeš ze svého zařízení.

Několik oprav dat zvyšuje spolehlivost knihoven skills. Kritéria mastery jsou teď propojena s měřitelnými metrikami, které daný pohyb skutečně sleduje. Opravili jsme také případ při parsování, kdy počáteční číslo mohlo způsobit, že se nesprávné kritérium zobrazilo jako platné.

## Proč jsme tyto změny udělali

Dokončený plán by měl odpovědět na praktickou otázku: *co se změnilo, když jsem se podle něj řídil?* Dříve byla tato odpověď rozdělená mezi různé části aplikace. Přidali jsme proto souhrn zaměřený na výsledek, který si můžeš projít bez toho, abys ho musel skládat z jednotlivých tréninků.

Stejným principem se řídí i časová osa. Tréninkový pokrok není jen konečné měření. Když se snažíš pochopit, jestli plán odpovídal tvé aktuální kapacitě, záleží také na pořadí a načasování změn. Zaznamenávání posunů mezi kroky ti pro toto vyhodnocení poskytne užitečnější kontext.

Změnili jsme také způsob dokončování plánů, aby odpovídal tomu, jak lidé používají plány založené na datech. Některé plány končí jednoduše proto, že uplyne jejich naplánované období. Pokud se takové plány považovaly za nedokončené, vznikal nepřesný záznam. Dokončení teď zohledňuje ruční akce i datum ukončení plánu.

Připomínky mají jiný účel. Když je trénink součástí nabitého týdne, může být snadné vynechaný trénink přehlédnout. Možnost připomínek na iOS nabízí jednoduché upozornění, aniž by měnila tvůj rozvrh nebo předpokládala, proč jsi trénink vynechal. O tom, jestli bude zapnutá, rozhoduješ ty.

Během onboardingu nemělo vyžádání jazyka před znalostí kontextu zařízení pro většinu uživatelů žádný přínos a přidávalo další krok. Použití locale prohlížeče toto rozhodnutí odstraňuje z úvodního nastavení a nechává pozornost u tréninkových cílů.

A konečně, data o skills musí být interpretovatelná. Požadavek na mastery je užitečný jen tehdy, když ho lze porovnat s metrikou zaznamenávanou daným pohybem. Prošli jsme dotčené položky knihovny a opravili pravidla parsování, aby zobrazená kritéria lépe odpovídala podkladovým tréninkovým datům.

## Technické detaily

Změny dokončování plánů vyžadovaly úpravy datového modelu plánu a migrace databáze. Dokončení lze teď odvodit ve chvíli, kdy plán dosáhne svého nastaveného data ukončení. Opravili jsme také store tréninkových plánů, takže dokončené volání `fetchPlans()` spolehlivě znamená, že store obsahuje načtená data. Tím se předchází časovému nesouladu u view, která vykreslují výsledky plánu bezprostředně po načtení.

Časová osa journey teď získává události posunů mezi kroky prostřednictvím stats API a vykresluje je s přeloženými labely. Během těchto změn jsme přidali kontroly pokrytí locale pro angličtinu, češtinu a slovenštinu.

U připomínek na iOS aplikace používá konfiguraci APNs prostřednictvím nativního shellu. Nastavení zpřístupňuje ovládání oznámení, zatímco server zpracovává událost připomínky. Nativní view nastavení také skrývá sekci podpory, která uvnitř app shellu není relevantní.

Rozšířili jsme lint tooling pro rules ve čtyřech oblastech:

- Kontroluje, že překladové klíče použité s `$t()` existují v `en.json`.
- Kontroluje hloubku zanoření klíčů locale.
- Ověřuje tvary analytics events a reaktivní překladová pole.
- Zamítá konfigurační možnosti, které jsou deklarované, ale žádné rule je nepoužívá.
- Kontroluje komentáře vysvětlující, proč kód existuje, nikoli pouze popisující, co dělá.

Tyto kontroly jsou záměrně úzce zaměřené. Zachycují opakující se skupiny chyb během vývoje, ale nesnaží se nahradit testy ani code review.

Opravili jsme také celkový počet výsledků vyhledávání pohybů, aby představoval úplný počet výsledků před použitím stránkování. Metadata vyhledávání tak zůstávají konzistentní se skutečnou sadou výsledků.

## Co bude dál

Naším dalším zaměřením zůstává beta roadmapa: dokončení builderu tréninkových plánů a kalendáře, následované rozšířením heatmapy aktivity, statistik a view osobních rekordů. Nové souhrny plánů a události na časové ose tvoří základ pro tyto funkce, protože poskytují pohledům na pokrok úplnější data.
