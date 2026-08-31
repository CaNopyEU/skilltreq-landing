---
author: SkillTreq Team
date: '2026-08-31'
description: Tato aktualizace ti nabízí spolehlivější zadávání metrik, přehlednější měření času tréninku a jemnější kontrolu nad plány, deloady a změnami lekcí.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-8-more-precise-training-logs-and-plan-control
tags:
  - funkce
  - technologie
  - trénink
  - plánování
  - přístupnost
  - spolehlivost
  - devlog
title: 'Devlog #8: Přesnější tréninkové záznamy a kontrola nad plány'
type: devlog
---

## Co je nového pro tebe

Teď můžeš tréninkové metriky zaznamenávat jednodušeji a s větší kontrolou.

Pole pro metriky přijímají desetinná čísla s čárkou i s tečkou. To podporuje například zadání `7,5` pro uživatele, jejichž locale používá čárku jako oddělovač desetinných míst. Když použiješ pravítko opakování, ručně zadané hodnoty zůstávají rozhodující, takže desetinné číslo není potichu nahrazeno celým číslem. Aktivní workout také podporuje zadání půl opakování tam, kde to dává smysl.

Časovače workoutu teď zobrazují cílové pásmo délky. Během aktivní session vidíš, jestli je aktuální délka pod cílem, v cílovém pásmu, nebo nad ním. Změny pásma časovače jsou také oznamovány čtečkám obrazovky. Trénink bez použití rukou se tak snáz sleduje, aniž by ses musel spoléhat jen na vizuální změny.

Rozšířili jsme několik ovládacích prvků plánů a session:

- Dokončené série zůstanou zaznamenané, i když přeskočíš odpočinek v bloku nebo cviku.
- Během workoutu můžeš změnit směr progrese.
- Deloady mohou snížit počet sérií nebo opakování a strategii můžeš pro konkrétní den přepsat.
- Zaznamenaný výkon může upravit cílovou váhu pro pozdější práci podle plánu.
- Session v plánu můžeš označit jako povinnou nebo volitelnou. To určuje, jak se zpracují vynechané session.
- Karty plánů zobrazují, kdy byl jejich obsah naposledy upraven.
- Náhledy knihoven jsou dostupné i pro nodes, ke kterým momentálně nejsi přihlášený.
- Když se blížíš ke konci knihovny, může se ti zobrazit návrh navazující knihovny.

Onboarding teď určuje výchozí bod knihovny podle uložené hodnoty v databázi. Vybraný vstupní bod tréninku tak zůstává konzistentní s daty připojenými k tvému účtu.

## Proč jsme tyto změny udělali

Tréninkové záznamy jsou užitečné jen tehdy, když odpovídají tomu, co jsi skutečně udělal. Zadávání by tě nemělo nutit měnit způsob zápisu nebo hodnotu znovu odhadovat. Podpora desetinných čísel s čárkou a půl opakování zmenšuje rozdíl mezi session a jejím záznamem.

Pravítko opakování potřebovalo jasné pravidlo pro kombinované zadávání. Pravítko se hodí pro rychlý výběr běžných celých počtů opakování. Nemělo by přepsat hodnotu, kterou jsi zadal záměrně. Tyto dvě funkce jsme proto oddělili: pravítko pomáhá s výběrem, zatímco ručně zadaná hodnota zůstává zdrojem pravdy.

I čas potřebuje kontext. Běžící hodiny ti řeknou, jak dlouho cvik trvá, ale neřeknou ti, jestli tato délka odpovídá zamýšlenému cíli. Cílové pásmo ti během session poskytuje jednoduché srovnání. Oznámení pro čtečky obrazovky předávají stejnou změnu stavu zvukem. To je důležité ve chvíli, kdy se soustředíš na pohyb místo na obrazovku.

Ovládání plánů je navržené pro skutečné tréninkové podmínky. Možná dokončíš jen část session, přeskočíš cvik, upravíš progresi nebo budeš jeden den potřebovat jiný přístup k deloadu. Zachování dokončených sérií brání ztrátě záznamů. Přepsání nastavení pro konkrétní den zase zabraňuje tomu, aby jedno rozhodnutí pro celý plán platilo pro každou session.

Přidali jsme také více informací o údržbě plánů. Datum úpravy ti pomůže poznat, jestli plán odráží nedávné změny. Nastavení povinných a volitelných session dělá zpracování vynechaných session explicitní, místo aby předpokládalo, že všechny session mají stejnou důležitost.

Změny knihovny se řídí stejným principem. Dostupný obsah si můžeš prohlédnout dřív, než se rozhodneš, jestli zapadá do tvého tréninku. Návrh pokračování ti nabídne jasnou další oblast k prozkoumání, když je knihovna téměř dokončená, aniž by automaticky měnil tvůj současný trénink.

## Technické podrobnosti

V tomto období jsme pracovali na tréninkovém rozhraní, datovém modelu i procesu doručování změn.

Parsování a formátování metrik jsme upravili v rychlém zaznamenávání, zadávání váhy vlastního těla, řádcích sérií, skill testech a polích aktivního workoutu. Unit testy pokrývají zamknutí pravítka, nadřazenost desetinné hodnoty a formátování metrik. Časovač teď ve workout komponentách a v hands-free odpočtu sleduje stav cílového pásma. Oznámení pro přístupnost jsou lokalizována do podporovaných jazyků rozhraní.

Pomocné funkce pro session jsme změnili tak, aby dokončené série zůstaly zachované při přeskočení bloku nebo cviku. Metadata plánů teď podporují pravidla pro vynechané session a data úprav obsahu. Konfigurace deloadu podporuje strategii na úrovni plánu i přepsání pro konkrétní den. Úprava váhy používá zaznamenaný výkon z procesu dokončení session a před použitím změny ji uživateli zobrazí.

Přidali jsme také ochranu autentizovaných endpointů na straně serveru. Rate limit nyní pokrývá endpointy identifikované při kontrole pravidel. Serverový log událostí pro jednotlivé uživatele poskytuje konzistentnější záznam relevantní aktivity účtu a zároveň zachovává přiřazení událostí ke správnému uživateli.

Spolehlivost jsme zlepšili také v procesu vývoje. End-to-end testy se teď spouštějí v continuous integration místo jako povinný úkol před pushnutím. Sadu testů jsme upravili tak, aby se vyhnula zastaralým zápisům, rozdílům v parsování prostředí a dalším zdrojům nedeterministických výsledků. Neúspěšné end-to-end běhy lze v workflow pull requestu předat automatizovanému kroku triage.

Zpřísnili jsme také kontroly repozitáře. Kontroly shody locale a povinných souborů teď běží přes lint nástroje pro pravidla. Skenování volání analytiky nahradilo starší přístup založený na tabulce událostí a skenování repozitáře už neprochází vnořené worktrees. Klasifikace deploymentu teď před nasazením rozlišuje přeskočené, pouze migrační a úplné deploymenty.

## Co bude dál

Pokračujeme v beta práci na plánu tréninku a zobrazení kalendáře. Další pozornost zaměříme na historii aktivity, statistiky a osobní rekordy, aby se ti zaznamenané session lépe kontrolovaly v průběhu času.

Budeme také dál vylepšovat content engine a data knihoven, přičemž záznamy tréninku i chování plánů zůstanou explicitní. Práce po betě se bude dál soustředit na export dat, trendy osobních rekordů a časovou osu tréninkové cesty.
