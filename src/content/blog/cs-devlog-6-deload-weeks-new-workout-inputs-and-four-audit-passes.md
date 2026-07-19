---
author: SkillTreq Team
date: '2026-07-19'
description: Proč deload týdny vynucujeme, místo abychom je jen naznačovali, proč
  se zápis sérií přesunul na posuvné voliče a co před betou odhalila čtyři kola auditu.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-6-deload-weeks-new-workout-inputs-and-four-audit-passes
tags:
- devlog
- deload
- treninkove-plany
- workout-ui
- audit
title: 'Devlog #6: Deload týdny, nové zadávání tréninku a čtyři kola auditu'
type: devlog
---

## Na čem jsme pracovali

Poslední tři měsíce, od konce dubna do poloviny července, pokryly 56 commitů. Nejvíc času zabraly tři oblasti:

- **Systém deloadů.** Tréninkové plány teď umí naplánovat týdny se sníženou zátěží. Aplikace je během tréninku vynucuje, v náhledech zobrazuje snížené hodnoty, a když plán upravíš uprostřed cyklu, udrží příznaky správně nastavené.
- **Nové zadávání tréninku.** Ohraničený kolečkový volič času pro délky trvání a posuvné pravítko pro zadávání váhy a opakování ve formuláři aktivní série. Rozcvičkové série používají stejné pravítko jen pro čtení a přesné cíle z plánu na něm vykreslují značku s barvou zóny.
- **Čtyři kola auditu.** Prošli jsme celý kód od začátku do konce a opravili, co jsme našli: race condition při vytváření session, práci s časovými pásmy, mezery v content security policy, rate-limit buckety, plurály v překladech, problémy s přístupností a slabé pokrytí end-to-end testy.

Vedle toho: plány z více knihoven (primární knihovna cviků plus doplňkové seřazené podle priority), bezeztrátový export a import plánů, podtypy aktivit pro jednotlivé typy s přehledem pokroku, uživatelsky nastavitelné barvy odporových gum a strukturální refaktoring kódu aktivní session.

## Proč právě tyto změny

Nejdřív deloady. Strukturovaný plán není jen o přidávání zátěže. Plánované regenerační týdny jsou součástí progrese, takže je bereme jako součást plánu, ne jako doporučení. Během deload týdne aplikace sníží počet kol a předvyplní sníženou váhu. Nápověda, kterou můžeš prostě přescrollovat, není deload. Zároveň jsme nechali možnost „Trénovat normálně“, která vrátí původní počet kol, protože sportovec na place ví věci, které plán neví. Ve výchozím stavu vynucovat, ale umožnit explicitní přepsání.

Práce na zadávání vznikla z pozorování, jak zápis sérií skutečně probíhá: uprostřed tréninku, na telefonu, často s unavenýma rukama nebo rukama od magnézia. Vyťukávat čísla do malého textového pole je v takovém stavu pomalé a náchylné k chybám. Kolečko a pravítko jsou hrubší, ale rychlejší, a nesou kontext, který textové pole nést nemůže. Cíl z plánu sedí na pravítku jako značka a barva zóny ti říká, kde vůči němu jsi.

Kola auditu byla přípravou na betu. Místo abychom čekali, až problémy najdou uživatelé, prošli jsme kód ve čtyřech kolech, od rychlých oprav (race condition u session, počítání dat citlivé na časová pásma) po hlubší práci (oddělený rate-limit bucket, aby pasivní čtení session nemohla vyhladovět skutečné pokusy o přihlášení, a kontrola kvality slovenských a českých překladů).

Plány z více knihoven existují proto, že většina sportovců netrénuje jen v jedné disciplíně. Plán teď může čerpat z primární knihovny a doplňkové řadit podle priority, takže blok stojek může stát vedle začátečnické silové práce bez duplikování cviků.

## Co jsme se naučili

Postavit na webu kolečkový volič, který působí nativně, je těžké. Detekce ustálení scrollu, synchronizační pojistky, které polykaly rychlé změny směru, vybrané hodnoty, které nikdy neopustily kolečko: každá oprava má teď regresní test kolem geometrie scrollování. Takhle záludný UI kód testy potřebuje, jinak se chyby vracejí.

Velké composables zahnívají. Náš composable pro aktivní session narostl, až dělal všechno, tak jsme ho rozdělili s pomocí limitu na velikost souboru, pět session overlayů jsme sloučili pod jednoho společného hostitele a několik ad-hoc časovačů nahradili jedním společným tickerem. Limit velikosti v CI je tupý nástroj, ale vynutil rozdělení, které jsme měsíce odkládali.

Mazání „nepoužívaných“ dat je bezpečné, jen když nejdřív zkontroluješ reference. Odhlášení od knihovny cviků dřív rozbilo plány, které na její cviky odkazovaly, a databázový seeder mohl odstranit staré cviky, na které pořád ukazovala historie uživatele. Obě cesty teď odmítnou smazat cokoli, na co existuje odkaz.

Rozdíly mezi runtime prostředími se projevují na zvláštních místech. Bun vyřešil default export jedné závislosti jinak než Node, což rozbilo přihlašování, a náš test runner se pod Bunem choval jinak taky. Testy teď pinujeme na Node. Nudné, ale předvídatelné.

## Co bude dál

Nástroje pro plány jsou ve stabilním stavu, takže se pozornost přesouvá k tomu, co je obklopuje. AI asistent plánů (chat v roli kouče, který navrhuje a upravuje tréninkové plány podle tvého skutečného pokroku) je hotový po stránce kódu a v interním testování, zatímco dokončujeme infrastrukturu, na které běží. Potom: notifikační centrum v aplikaci a pokračující práce na nativní iOS aplikaci, která míří do App Store.