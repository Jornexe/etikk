<img src="assets/icon.svg" width="64" height="64" alt="">

# Etikk — ditt lille øvingsrom

En norsk øvingsapp basert på [Etikk begreper.md](Etikk%20begreper.md), med alle 9 hovedbegreper og 3 tilleggsbegreper. Eksamensøving er også basert på [Oppsummering13112026.pdf](Oppsummering13112026.pdf).

- **Flashcards:** blandede kort, temavalg og egen økt for usikre begreper. Baksiden forklarer hva teorien betyr, med figurer og mulighet til å gå i dybden.
- **Quiz:** 36 spørsmål, inkludert en egen seks-spørsmålsøkt om anvendelse, motargumenter og faglig presisjon. Forklaring etter hvert svar og repetisjon av feil.
- **Eksamensøving fra oppsummeringen:** egen side med de tre eksempeloppgavene fra «Oppsummering13112026.pdf»: Alex og Emma, banken og sårbare kunder, og sysselsetting og anstendig arbeid. Hver oppgave har original oppgavetekst, fem tilpassede skrivefelt, teoripåminnelser med sidehenvisninger, drøftingsforslag og seks egne sjekkpunkter. Fire quizspørsmål per alternativ og en blandet økt med 12 spørsmål. Utkast og gjennomgått-status vises per oppgave.
- **Dilemmaer og tidligere eksamensøving:** tre korte øvingscase og én lengre drøftingsoppgave med egne skrivespørsmål, automatisk lagrede utkast, ordtelling og drøftingsforslag.
- **Skriveverksted:** kommenterte skrivegrep fra den innlagte A-besvarelsen, et nyskrevet eksempelavsnitt og seks egenvurderingspunkter i alle drøftingsforslag. Avkrysningene lagres per oppgave og nullstilles ved tekstendringer, sammen med eventuell gjennomgått-markering.
- **Begrepsoversikt:** søkbare forklaringer til alle 12 begrepene, gjennomgåtte eksempler, styrker og begrensninger, formuleringseksempler og forståelsesspørsmål.
- **Faglige figurer:** klikkbar CSR-pyramide med forklaring av hvert ansvarsområde, sammenligning av etiske perspektiver, interessentkart, eksternaliteter, felles verdier, bærekraft, middelvei og rikdommens formål. Figurene tilpasses tilgjengelig bredde og mørk modus.
- **Fremgang:** kortvurderinger, quizhistorikk og gjennomgåtte dilemmaer.
- **Mørk modus:** bytt med knappen i topplinjen. Følger systemtemaet til du velger selv, og husker deretter valget på enheten.

## Kjør lokalt

Krever Node.js 20.19+ eller 22.12+.

```sh
npm install
npm run dev
```

Åpne adressen Vite skriver ut, vanligvis http://127.0.0.1:5173.

```sh
npm test
npm run build
npm run preview
```

Produksjonsbygget ligger i `dist/` og kan publiseres på en statisk vert. Appen bruker ingen server eller innlogging. Fremgang og dilemmatekster lagres i nettleserens `localStorage`; de synkroniseres ikke mellom enheter og kan forsvinne hvis nettleserdata slettes. Fontene lastes fra Google Fonts med lokale reservefonter.

Testene kontrollerer samsvar med begrepsguiden, lokal lagring, temafiltrering og gjennomføring av de sentrale øvingsflytene. Drøftingsforslagene er veiledning til egenvurdering, ikke automatisk sensur. Eksisterende utkast og fremgang beholdes ved oppdatering.

## Eksempeloppgaver fra oppsummeringen

Åpne **Eksamensøving** i menyen eller fra forsiden. Oppsummeringen sier at eksamen har tre alternative oppgaver og at du velger én; oppgavene i appen er eksemplene fra dokumentet, ikke en garanti for den faktiske eksamenen. Appens disposisjoner, drøftingsforslag og quiz er studiestøtte. Det er ikke lagt inn en oppdiktet eksamensvarighet eller ordgrense. Se [kildekartet](docs/exam-preparation.md) for dekning og avgrensninger.

## Sammenligning med A-besvarelsen

«ETIKK EKSAMEN BESVARELSE.pdf» brukes som et eksempel på argumentasjon, ikke som faglig fasit. Oppgavetekst og sensorbegrunnelse følger ikke med, så appen utleder ingen offisiell vurderingsrubrikk eller karaktergaranti. Se [sammenligningen](docs/exam-comparison.md) for hvilke skrivegrep som er tatt videre og hvilke upresisheter som ikke er kopiert.

Created in [T3 Code](https://t3.codes).
