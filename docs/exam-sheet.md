# Eksamensarket i appen

Kilde: `etikk-eksamensark copy (1).pdf`, 32 sider. Den nye siden **Huskeark** (`#revision`) bearbeider dokumentet til 24 repetisjonskort, en selvtest med skjulte svar og en femdagersplan med 15 lagrede sjekkpunkter.

| Område | Dekning | Sider i arket |
| --- | --- | --- |
| Etisk dilemma | Svarstruktur, nytte-, plikt- og dydsetikk, Hirschman, navigasjonshjulet, diskursetikk og Rawls | 1, 5–9, 27–28, 32 |
| Samfunnsansvar | Friedman, Freeman, interessentprioritet, Carroll, felles verdier, eksternaliteter, legitimitet, aktsomhetsvurderinger, standarder og investeringer | 1–2, 13–16, 28–29 |
| Bærekraft | Brundtland, trippel bunnlinje, sterk/svak bærekraft, Jonas, Hardin/Ostrom, vasking, frikobling/rebound, mål 5/8/9/12, anstendig arbeid og nordisk omstilling | 2, 18–22, 29–30 |
| Femdagersplan | Hente frem, lære, skrive, sammenligne og repetere, med lenker til relevante aktiviteter | 31 |

Kortene har sidehenvisninger, et fiktivt anvendelseseksempel og en presisering. Selvtesten bruker de samme 24 kortene; svar vises først etter eget forsøk. «Kan forklare og bruke» og «Repeter» er egenvurderinger. Usikre kort kan repeteres separat, både innenfor et tema og etter en økt. Vurderingene inngår ikke i de opprinnelige 12 begrepenes mestringstall eller quizresultater.

## Faglige avgrensninger

- Begrepsguidens 12 definisjoner og de opprinnelige eksempeloppgavene beholdes. Arket er supplerende studiestøtte.
- Friedmans huskeregel må alltid leses med grensene ved lov og etiske spilleregler. Modellen støtter ikke bedrag for profitt.
- Sekundære interessenter kan ha sterke moralske krav. Mitchells makt, legitimitet og hastverk beskriver interessenters betydning; makt avgjør ikke moralsk verdi.
- Sterk bærekraft presiseres som begrenset substituerbarhet, særlig for kritisk naturkapital. Den gjengis ikke som et forbud mot enhver naturendring.
- Internalisering innebærer ikke automatisk at virksomhetens samlede samfunnseffekt er positiv.
- Jonas’ huskeregel innebærer å ta alvorlig usikkerhet på alvor, ikke å påstå at alle tenkelige skader er sikre.
- ILOs fire områder i arket er en eldre inndeling. Kortet nevner også et trygt og sunt arbeidsmiljø, inkludert blant grunnleggende prinsipper og rettigheter i 2022.
- Rawls’ fremstilling utdypes med friheter og mulighetslikhet. Ansvar og prosedyrer ved aktsomhetsvurderinger er studiestøtte, ikke en vurdering av konkrete lovkrav.
- Historiske selskapseksempler, tall, karakterløfter og påstander om hvorfor en tidligere besvarelse fikk A kopieres ikke til kortene. Alle anvendelseseksempler er merket som fiktive.
- Arkets eksamensregler gjøres ikke til bekreftet eksamensinformasjon. Brukeren henvises til offisiell informasjon om varighet og hjelpemidler. Femdagersplanen har relative dager, ingen oppdiktet dato eller påtvunget nedtelling.

## Lagring og kontroll

`recallRatings` og `studyPlan` lagres under den eksisterende lagringsnøkkelen. Eldre lagring får tomme verdier for de nye feltene; utkast, vurderinger og historikk beholdes. Ukjente verdi-typer avvises ved lasting. Global nullstilling sletter også de nye feltene. Planvisningen teller bare kjente oppgaver, og mestringstallet teller bare kjente kort.

`test/revision.test.js` dekker innholdskoblinger, direktelenke, søk, filtrering, skjulte svar, vurdering, repetisjon av usikre kort, planlagring, aktivitetslenker, migrering og nullstilling.
