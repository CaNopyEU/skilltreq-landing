---
author: SkillTreq Team
date: '2026-10-19'
description: Tréninkové plány nyní přesněji zohledňují dokončenou práci. Cílené opravy se zároveň zaměřily na přihlášení a lokalizaci.
has_value_for_reader: true
locale: cs
matches_brand_voice: true
no_fake_urgency: true
no_gamification: true
no_hype_language: true
readingTime: 4 min
slug: devlog-11-more-accurate-plan-progress-and-safer-account-access
tags:
  - funkce
  - technologie
  - devlog
  - tréninkové-plány
  - autentizace
  - spolehlivost
title: 'Devlog #11: Přesnější průběh plánu a bezpečnější přístup k účtu'
type: devlog
---

## Co je nového pro tebe

Průběh tréninkového plánu nyní přesněji zohledňuje zaznamenané tréninky.

Pokud byly tréninky dokončené, ale plán je ještě nezohlednil, SkillTreq tuto aktivitu nyní před výpočtem adherence synchronizuje. Údaj o adherence u plánu tak vychází z práce zaznamenané v historii tréninku, ne pouze z předchozího stavu plánu.

Plán můžeš také dokončit ručně. Hodí se to v situaci, kdy jsi dokončil zamýšlenou práci, ale plán už nemá další automatickou změnu stavu, kterou by mohl provést. Dokončený plán zůstane dostupný pro pozdější kontrolu.

Dokončené a pozastavené plány nyní zobrazují adherence přímo na svých kartách. Můžeš si tak ověřit, jak přesně ses plánu držel, aniž bys každý plán otevíral zvlášť.

Opravili jsme také několik menších problémů:

- Nedávno zvolená lokalizace má nyní přednost po dobu ukládání. Rozhraní by se už nemělo krátce vracet ke starší hodnotě z databáze.
- Callbacky přihlášení přes GitHub nyní ověřují nastaveného GitHub issuer.
- Změny plánu nyní mažou související cache relací a statistik, takže aktualizované plány méně často zobrazí staré informace.

## Proč jsme tyto změny udělali

Tréninkový plán je užitečný jen tehdy, když jeho stav odpovídá tomu, co jsi skutečně udělal. Dříve mohl plán po zaznamenání tréninků nebo po změně struktury plánu zobrazovat zastaralou adherence. To vytváří nejistotu při používání kalendáře pro kontrolu tréninku.

Rozhodli jsme se před výpočtem adherence synchronizovat tréninky místo toho, abychom za zdroj pravdy považovali uložený stav plánu. Zaznamenaná aktivita lépe odpovídá skutečnému chování atleta. Plán pak může toto chování popsat bez nutnosti běžných ručních oprav.

Ruční dokončení řeší jinou situaci. Ne každý plán končí stejnou automatickou cestou. Možná jsi dokončil zamýšlenou práci, přestal plán používat nebo dosáhl platného konce, který rozvrh nedokáže odvodit. Přímá akce pro dokončení ti dává kontrolu nad životním cyklem plánu.

Zobrazení adherence na kartách dokončených a pozastavených plánů usnadňuje kontrolu po skončení plánu. Historie tréninku není užitečná jen během aktivního plánu. Pomáhá ti také porovnat zamýšlený rozvrh s tím, co se v průběhu času skutečně stalo.

Oprava lokalizace vychází ze stejného principu. Tvoje aktuální volba by měla být vidět okamžitě, i když se uložené nastavení teprve zapisuje. Opravu přihlášení jsme přidali proto, že nekonzistentní ověřování callbacků může ztížit přístup k jinak správně fungujícím tréninkovým funkcím.

## Technické detaily

Aktualizace plánu přidává cestu pro synchronizaci tréninků a upravuje datový model i migraci používanou statistikami plánu. Při nahrazení plánu se nyní také mažou cache jeho relací a statistik. Tím se zabrání zobrazování výsledků vypočítaných podle předchozí struktury plánu.

Výpočty adherence sdílejí aktivní, dokončené a pozastavené zobrazení plánu. Karty v seznamu plánů dostávají vypočítané hodnoty ze serveru, takže souhrn zůstává konzistentní s detailním zobrazením.

Konfigurace GitHub OAuth nyní obsahuje issuer vyžadovaný pro ověření callbacku podle příslušného standardu. Změnu pokrývá guard test pro issuer poskytovatele.

Odstranili jsme také nepoužívaný databázový sloupec `personal_records.context`. Odstranění nevyužívaného schématu snižuje počet polí, se kterými musí budoucí kód a migrace počítat.

Content-Security Policy nyní pokrývá hashem i import map potřebnou pro spuštění v produkci. Přidali jsme také nová data pohybů pro práci na explozivní síle a začátečnické ovládání dronu z pohledu první osoby, navigaci a akrobacii.

## Co bude dál

Pokračujeme v práci na beta roadmapě. Zaměřujeme se na builder tréninkových plánů, workflow kalendáře, souhrny aktivit a osobní rekordy. Další změny budou dál propojovat zaznamenané tréninky s přehlednější dlouhodobou historií tréninku.
