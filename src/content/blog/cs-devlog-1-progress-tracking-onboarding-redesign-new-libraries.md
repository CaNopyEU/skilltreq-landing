---
author: SkillTreq Team
date: '2026-03-18'
description: 'Sedm týdnů vývoje: kompletní stránka pokroku, onboarding založený na cílech, vylepšené UX tréninkových sessions a nové knihovny pro akrobacii, žonglování a spinning zbraní.'
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 5 min
slug: devlog-1-progress-tracking-onboarding-redesign-new-libraries
tags:
- pokrok
- onboarding
- trénink
- knihovny
- bezpečnost
title: 'Devlog #1: Sledování pokroku, redesign onboardingu a šest nových knihoven dovedností'
type: devlog
---

## Na čem jsme pracovali

Tento devlog pokrývá přibližně sedm týdnů vývoje, 166 commitů od 5. března. Hlavní oblasti: budování stránky pokroku, redesign onboardingu, vylepšení tréninkové session, přidání šesti nových knihoven dovedností a posílení backendu.

## Proč tyto změny

### Stránka pokroku: zviditelnění tréninkových dat

Data jsme měli. Uživatelé logují aktivity, dokončují sessions, sledují osobní rekordy. Ale neexistovalo žádné centrální místo, kde by to všechno viděli pohromadě. Stránka pokroku tuto mezeru vyplňuje.

Nyní obsahuje heatmapu aktivit s navigací po rocích, mřížku zvládnutí kategorií, přehled milníků s indikátory pokroku, graf trendů osobních rekordů, statistiky tréninků a časovou osu s filtrováním na straně serveru.

Komponenta zvládnutí kategorií prošla několika iteracemi. Začali jsme s „Category Strength" pomocí vizualizace s dvojitými sloupci, pak jsme ji přejmenovali na „Category Mastery" a přepracovali vzorec, aby lépe odrážel skutečný pokrok v dovednostech, nejen objem aktivity. Layout vyžadoval opravy pro řazení s ohledem na lokalizaci, správné pořadí a kompaktní notaci.

Heatmapa si také vyžádala pečlivý přístup. Přejmenovali jsme „sessions" na „activities", protože data zahrnují víc než jen tréninkové sessions. Navigace po rocích, edge cases kolem prázdných dat a konzistence UTC zabraly víc práce, než jsme čekali.

### Onboarding: začít od cílů, ne od funkcí

Předchozí onboarding byl orientovaný na funkce: vyber si jazyk, nastav omezení, hotovo. Fáze 28 ho nahradila flow založeným na cílech. Noví uživatelé si teď vyberou, co se chtějí naučit (stoj na rukou, muscle-up, letové přemety), zvolí úroveň zkušeností a vyberou knihovny dovedností k odběru.

Po onboardingu začátečníci dostanou automaticky inicializovaný startovací plán a průvodce stránkou dovedností. Systém průvodce ukládá stav dokončení pro každou stránku v databázi, takže si ho uživatelé mohou přehrát později, pokud chtějí osvěžení.

Přidali jsme také flow pro obnovu účtu vracejících se uživatelů, aby při reaktivaci nemuseli procházet celým onboardingem.

### Tréninková session: méně tření, více kontroly

Tréninková session prošla výraznou úpravou UX:

- **Sheet s dalšími akcemi** nahrazuje staré inline tlačítka a snižuje vizuální zmatek
- **Přehled tréninku** poskytuje rychlý souhrn před a během session
- **Živé poznámky** ke každému cviku, pořizované během session
- **Funkce zpět** pro nechtěné dokončení sérií
- **Flow záměny cviku** přepracovaný jako vícekrokový drawer, s výzvou po tréninku k aktualizaci plánu
- **Režim hodnocení** pro zhodnocení, kde se v dané dovednosti nacházíš, bez započítání do tréninkového objemu
- **Poznámky trenéra** viditelné u cviků z plánu během session

Flow záměny cviku byl nejsložitější část. Když uprostřed session vyměníš cvik, aplikace ti po dokončení tréninku navrhne aktualizaci plánu. Díky tomu zůstávají plány v souladu s tím, co skutečně trénuješ.

### Obsah: šest nových knihoven dovedností

Přidali jsme knihovny pro disciplíny mimo kalistenika:

- Akrobacie (začátečník, středně pokročilý, pokročilý)
- Žonglování s míčky (začátečník, středně pokročilý)
- Staff spinning, dual swords, sword spinning (vše začátečník)

Každá obsahuje kompletní slovenské a české překlady. Ke všem existujícím cvikům jsme také přidali fáze pohybu (dekompozice technických pokynů), celkem téměř 300, s rozpisem fáze po fázi pro každý cvik.

V rámci existujících kalistenických knihoven jsme přidali začátečnické progresní kroky pro kliky a dřepy, 24 nových dovedností v expertních a středně pokročilých úrovních a nové typy metrik: `height_cm` pro plyometrické cviky, `distance_m` pro pike kompresi a `duration_seconds` pro výdrže v mobilitě.

### Bezpečnost a výkon

Dvě backendové změny si zaslouží samostatnou zmínku.

Za prvé, rate limiting přes Upstash Redis a Zod validace na všech mutation endpointech. To zasáhlo 96+ souborů v jediném commitu. Každý POST, PUT, PATCH a DELETE endpoint nyní validuje vstup na straně serveru.

Za druhé, bezpečnostní hlavičky, ochrana proti self-invite u pozvání od trenérů a převod endpointů bez vedlejších efektů na čisté GETy.

Na straně výkonu jsme provedli audit, který převedl obrázky do WebP, přidal lazy loading CSS, nastavil správné cache hlavičky a zavedl stránkování tam, kde chybělo.

## Co jsme se naučili

**Na pojmenování záleží od začátku.** Přejmenování „Category Strength" na „Category Mastery" uprostřed vývoje zasáhlo víc souborů, než jsme čekali: názvy komponent, i18n klíče, API endpointy, testy. Správný název od začátku ušetří reálnou práci navíc.

**Chyby s časovými zónami se násobí.** Několik komponent mělo jemné problémy s UTC vs. lokální čas. Heatmapa, graf dodržování plánu a widget tělesné hmotnosti, to vše vyžadovalo opravy. Nakonec jsme standardizovali zpracování časových zón na straně serveru, což vyřešilo většinu odchylek.

**Fáze pohybu jsou vysoce hodnotný obsah.** Přidání rozpisu fáze po fázi bylo obsahová úloha, ne programátorská. Ale první zpětná vazba naznačuje, že je to jeden z užitečnějších přídavků pro učení nových dovedností. Textové pokyny pro každou fázi pohybu se ukázaly být užitečnější než samotné video.

**Validuj vstupy od prvního dne.** Přidání Zod validace do 96 souborů najednou funguje, ale čistější by bylo prosazovat validaci od začátku se sdíleným middleware patternem. Dodatečné zavádění je vždy složitější.

## Co bude dál

Cíl pro beta launch je Q1 2026. Zbývající položky jsou integrace kalendáře tréninkového plánu, doladění statistik a zprovoznění blogové infrastruktury (tohoto content engine). Po betě se zaměříme na dashboardy pro trenéry, export dat a grafy trendů osobních rekordů. Plánování monetizace (free/pro/coach úrovně) je v roadmapě na Q3.