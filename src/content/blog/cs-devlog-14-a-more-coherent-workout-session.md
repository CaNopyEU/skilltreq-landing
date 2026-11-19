---
author: SkillTreq Team
date: '2026-11-16'
description: Tréninkové seance nyní nabízejí přehlednější navigaci, bezpečnější zaznamenávání sérií,
  lepší pokyny k přípravě a jednotnější ovládání napříč aplikací.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-14-a-more-coherent-workout-session
tags:
  - funkce
  - technologie
  - tréninkové-seance
  - přístupnost
  - spolehlivost
  - devlog
title: 'Devlog #14: Přehlednější tréninková seance'
type: devlog
---

## Co je nového

Tréninkové seance mají nyní jasnější strukturu od nastavení až po dokončení. Změny mají omezit zbytečné chyby při tréninku a zaznamenávání výkonu.

Nyní můžeš:

- Přecházet mezi informacemi o cviku, aktivním tréninkem a dokončením, aniž bys ztratil přehled o tom, kde se nacházíš.
- Pozastavit sérii místo použití akce pro zrušení, která by odstranila provedenou změnu.
- Během odpočítávání pauzy zobrazit informace o nastavení následujícího cviku.
- Zobrazit pokyny k přípravě pokaždé, když se změní následující pohyb.
- Zadávat metriky ručně bez ztráty přesnosti, i když ovládací prvek používá jiný krok hodnot.
- Zachovat hodnoty metrik po celou dobu dokončování série.
- Rozpoznat části pro warm-up a deload díky jemným změnám barvy obrazovky.
- Otevírat akce seance a spodní panely pomocí jednotnějších ovládacích prvků.
- Používat dotykové plochy navržené pro spolehlivé ovládání během tréninku.
- Najít nový začátečnický skill tree pro olympijské vzpírání a jeho doplňkový obsah.
- Bezpečně ukládat záznamy aktivit a zápisy v notebooku, i když se požadavek odešle opakovaně.

Průchod tréninkem nyní používá jeden jednotný vizuální jazyk. Tlačítka, akční plochy, panely, časovače a ovládací prvky metrik se během celé seance chovají konzistentněji.

## Proč jsme tyto změny udělali

Tréninková seance se liší od běžné obrazovky aplikace. Můžeš přecházet mezi cviky, kontrolovat informace k nastavení, zadávat hodnoty jednou rukou nebo procházet časovanou pauzou. I malé nesrovnalosti v rozhraní mohou tento proces přerušit.

Zaměřili jsme se na místa, kde po tobě seance dříve vyžadovala pamatovat si příliš mnoho věcí.

Nová struktura seance drží související akce pohromadě. Informace o cviku jsou dostupné ve chvíli, kdy je potřebuješ, zatímco hlavní tréninkové zobrazení zůstává zaměřené na aktuální sérii. Během pauzy může aplikace zobrazit, co se bude měnit dál, včetně podrobností k přípravě na následující pohyb.

Změnili jsme také fungování pozastavení a vrácení zpět. Vrácení zpět může odstranit dokončenou akci, což je při zaznamenávání skutečných tréninkových dat rizikové. Pozastavení ti umožní seanci zastavit a zkontrolovat, aniž by se tato pauza považovala za opravu.

Podobnou pozornost jsme věnovali zadávání metrik. Pravítko nebo časové kolečko může používat praktický vizuální krok, ale ten by neměl měnit přesnost zaznamenané hodnoty. Tyto dvě věci jsme oddělili, takže ručně zadané metriky zachovají zamýšlenou přesnost. Opravili jsme také ztrátu hodnot během dokončování celé série.

Barevné zvýraznění warm-upu a deloadu je záměrně jemné. Poskytuje kontext, aniž by odvádělo pozornost od cviku, časovače nebo zaznamenaných metrik. Cílem je usnadnit rychlé rozpoznání aktuální části seance.

Tato rozhodnutí podporují položku beta roadmapy pro aktivní tréninkovou seanci s časovačem. Seance musí být spolehlivá, než kolem ní přidáme další funkce pro plánování a sledování pokroku.

## Technické detaily

Sjednotili jsme spodní panely kolem jednoho shellu `BaseSheet`. Panely tak sdílejí rozvržení, chování při zavření a model dotykového ovládání. Podrobnosti o dovednostech a akce tréninku nyní mohou používat stejnou základní strukturu, aniž by každá obrazovka udržovala vlastní chování.

Tréninková seance byla také reorganizována kolem společné session spine. Obrazovky cviku, pauzy, nastavení a dokončení nyní používají společné vizuální prvky pro akce, informační bloky, štítky a překryvné vrstvy. Tím se omezilo duplicitní nastavení stylů a pravidla přechodů se lépe kontrolují.

Dotykové ovládací prvky nyní používají společnou minimální velikost aktivní plochy 44 pixelů. Platí to pro ovládání seance i další často používané oblasti, nejen pro jednu komponentu tlačítka. Tréninkový průchod také přešel na společný `BaseButton`, který udržuje jednotné stavy a rozestupy.

Na datové úrovni jsou POST požadavky pro aktivity a zápisy v notebooku nyní idempotentní. Pokud se požadavek odešle znovu, server rozpozná existující operaci místo vytvoření duplicitního záznamu. Opravili jsme také generování plánů tak, aby počítalo seancí, které skutečně vytvoří, včetně případů předčasného dokončení.

Zapnuli jsme přísnější kontrolu neověřeného přístupu k prvkům podle indexu napříč klientem, serverem, utilitami a testy. Bylo proto nutné opravit předpoklady o hodnotách, které nemusí existovat, zejména v kódu pro seance, kalendář, média a pokrok. Práce odhalila několik míst, kde byly runtime kontroly užitečné, i když existující data obvykle působila kompletně.

Po překročení limitu paměti produkčního buildu jsme upravili deployment pipeline a obnovili chybějící ikony. Audity závislostí nyní zaznamenávají, proč zůstává konkrétní upozornění tolerováno, zatímco změny balíčků zůstávají v rámci verzí podporovaných aktuální aplikací.

## Co bude dál

Naším dalším zaměřením zůstává beta roadmapa pro tréninkové plány, plánování v kalendáři, souhrny aktivit a osobní rekordy. Práce na seancích poskytuje těmto funkcím stabilnější základ pro napojení na dokončená tréninková data.
