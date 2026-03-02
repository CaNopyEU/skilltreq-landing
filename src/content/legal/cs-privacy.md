---
title: Ochrana soukromí
description: Jak Skilltreq sbírá, používá a chrání vaše osobní údaje.
locale: cs
lastUpdated: '2026-03-01'
---

## Jaké údaje sbíráme

Při používání Skilltreq sbíráme následující informace:

- **Údaje o účtu**: E-mailová adresa a základní profilové údaje z vašeho OAuth poskytovatele (GitHub nebo Google)
- **Tréninková data**: Záznamy cvičení, série, opakování, výdrže a osobní rekordy, které zadáte
- **Údaje o pokroku**: Stavy dovedností, pokrok v tréninkových plánech a časová razítka dosažených milníků
- **Údaje o používání**: Anonymní analytika o používání funkcí pro zlepšení produktu

## Jak ukládáme vaše údaje

- Všechna data jsou uložena v databázích **Neon PostgreSQL**
- Aplikace je hostována na infrastruktuře **Vercel**
- Používáme standardní šifrování pro data v přenosu (TLS) i v klidu

## Služby třetích stran

Skilltreq používá následující služby třetích stran:

- **GitHub OAuth** — pro autentizaci účtu
- **Google OAuth** — pro autentizaci účtu
- **Brevo** — pro transakční e-maily (ověření účtu, obnova hesla)
- **Sentry** — pro sledování chyb a monitoring výkonu

Vaše údaje neprodáváme třetím stranám. Služby třetích stran dostávají pouze minimální údaje nutné pro jejich fungování.

## Cookies a lokální úložiště

- **Session cookie** — používaný pro autentizaci (httpOnly, secure)
- **localStorage** — používaný pro UI preference (téma, jazyk)
- **Žádné sledovací cookies** — nepoužíváme reklamní ani analytické cookies

## Uchovávání údajů

- Vaše údaje uchováváme po dobu aktivity vašeho účtu
- Po smazání účtu jsou všechna související data trvale odstraněna do 30 dnů
- Anonymní, agregovaná analytická data mohou být uchovávána na neurčito

## Vaše práva

Máte právo na:

- **Přístup** k vašim údajům — zobrazte si všechny informace v aplikaci
- **Export** vašich údajů — použijte funkci JSON exportu v nastavení aplikace
- **Smazání** vašich údajů — smažte účet v nastavení aplikace, čímž se odstraní všechna související data
- **Opravu** vašich údajů — aktualizujte svůj profil a tréninková data kdykoli

## Kontakt

Pro dotazy nebo žádosti týkající se soukromí nás kontaktujte na **privacy@skilltreq.com**.
