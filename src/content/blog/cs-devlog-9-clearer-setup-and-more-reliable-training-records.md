---
author: SkillTreq Team
date: '2026-09-07'
description: Nyní můžeš nastavovat knihovny s menším počtem kroků, vybírat ze všech skupin
  aktivit a spolehnout se, že uložená tréninková data odpovídají skutečnému průběhu.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 3 min
slug: devlog-9-clearer-setup-and-more-reliable-training-records
tags:
  - funkce
  - technologie
  - trénink
  - knihovny
  - kvalita-dat
  - devlog
title: 'Devlog #9: Přehlednější nastavení a spolehlivější záznamy tréninku'
type: devlog
---

## Co je nového

V tomto období jsme se zaměřili na to, aby nastavení a záznamy tréninku byly předvídatelnější.

Když přidáš skill library, aplikace ji nyní automaticky inicializuje a zobrazí ti okno nastavení, kde můžeš zkontrolovat, co bylo přidáno. To nahrazuje předchozí průvodce inicializací. Cílem je omezit počet kroků při nastavení a zároveň ti umožnit zkontrolovat výsledek ještě před začátkem tréninku.

Výběr typu aktivity nyní umožňuje přístup ke každé skupině v knihovně. Můžeš si vybrat oblast tréninku, kterou potřebuješ, bez omezení na krátký seznam kategorií aktivit.

Pole pro cíle plánu nyní správně pracují s desetinnou čárkou. Pokud tvůj locale používá čárku jako oddělovač desetinných míst, můžeš například zadat `1,5`. Toto chování je stejné u vstupů pro tělesnou hmotnost, metrické jednotky, rozsah i quick log.

Quick testy nyní při uložení zastaví stopky. Naměřený čas už po odeslání testu nepokračuje.

Offline tréninky po přehrání poskytují přehlednější výsledek. Když se uložený trénink po opětovném připojení odešle, dokončení procesu zobrazí, co přehrání vytvořilo. Snáz tak ověříš, jestli byla lekce zaznamenána podle očekávání.

Opravili jsme také anglický text mastery v jedné knihovně a upravili rozdíly obtížnosti v několika knihovnách. Tyto změny obsahu usnadňují interpretaci postupu mezi dovednostmi s podobnou úrovní.

## Proč jsme tyto změny udělali

Tréninková data jsou užitečná jen tehdy, když můžeš věřit tomu, jak byla zadána a uložena.

Změny nastavení řeší dva běžné zdroje nejistoty: nebylo jasné, jestli je knihovna připravená, a nešlo vybrat skupinu aktivit odpovídající tomu, na čem jsi pracoval. Automatická inicializace odstraňuje zbytečné rozhodování. Okno nastavení zároveň umožňuje celý proces zkontrolovat.

Stejnou úroveň konzistence potřebovalo i zpracování vstupů. Cíl jako `1,5 kg` nebo `1,5 reps` by neměl záviset na tom, kterou část plánu právě upravuješ. Aktualizovali jsme sdílené cesty pro zpracování vstupů, takže stejné chování desetinných čísel platí ve všech relevantních polích.

Součástí záznamu jsou také měření času a ukládání offline tréninků, nejde jen o detaily rozhraní. Stopky, které běží i po uložení, mohou vytvořit nesprávný výsledek testu. Přehraný offline trénink potřebuje viditelný výsledek, abys mohl zjistit, jestli byla data přijata, změněna, nebo stále vyžadují pozornost.

Nakonec jsme zkontrolovali obsah knihoven tam, kde samotná data vytvářela nejasnosti. Rozdíly v obtížnosti a omylem ponechaný text mohou způsobit, že dobře strukturovaný plán působí nekonzistentně. Oprava těchto položek podporuje jasnější rozhodování během tréninku.

## Technické detaily

Odstranili jsme uložený stav `initialized` z odběrů uživatelských knihoven. Inicializaci nyní představují aktuální data knihovny a proces nastavení, nikoli samostatný příznak, který mohl zastarat.

Store knihoven nyní považuje dokončené `fetchAll()` za spolehlivý signál, že jsou jeho data dostupná. Závislé akce se tak snáz řídí a snižuje se časová nejednoznačnost v testech i uživatelských procesech.

Přidali jsme testy pro chování časovače quick testů, výsledky dokončení offline tréninků, výběr typu aktivity a vytváření tréninků nezávislé na knihovně. Tyto testy se zaměřují na pozorovatelné výsledky, nikoli na interní implementační detaily.

Nástroj pro validaci rules nyní selže, když nakonfigurovaný vzor souboru nic nenajde. To zachytí odchylky v konfiguraci dříve. Zpřísnili jsme také kontroly vynucování pomocných funkcí pro autentizaci a opravili seed případ, ve kterém mohla skrytá knihovna znovu získat nezamýšlený vztah.

## Co bude dál

Další zaměření zůstává stejné podle beta roadmapy: práce na tréninkových plánech a kalendáři, statistiky aktivit, osobní rekordy a podpůrný systém obsahu blogu. Jakmile se tyto oblasti budou dokončovat, budeme dál upřednostňovat spolehlivé záznamy a přehledné pracovní postupy.
