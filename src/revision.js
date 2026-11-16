// Adapted study aids, not verbatim quotations or an official exam rubric.
export const revisionSource = 'etikk-eksamensark copy (1).pdf';
export const revisionTopics = {
  ethics: { title: 'Etisk dilemma', caseId: 'exam-alex-emma', color: 'sage' },
  responsibility: { title: 'Samfunnsansvar', caseId: 'exam-vulnerable-bank', color: 'peach' },
  sustainability: { title: 'Bærekraft', caseId: 'exam-decent-work', color: 'lavender' },
};

export const revisionCards = [
  {
    id: 'answer-method', topic: 'ethics', title: 'Fra teori til begrunnet svar', cue: 'Forklar → Bruk → Vei → Velg', pages: '1, 5, 32',
    question: 'Hva er de fire stegene fra teoriforklaring til et begrunnet standpunkt?',
    answer: 'Forklar teorien presist. Bruk kriteriet på konkrete opplysninger i caset. Vei argumentet mot en reell innvending. Velg et standpunkt og begrunn hvilke hensyn som veier tyngst.',
    example: 'Fiktivt: Forklar menneskeverd, vis hvordan uklare lånevilkår svekker informerte valg, drøft kostnaden ved bedre informasjon og begrunn bankens ansvar.',
    caution: 'Huskeregelen hjelper med struktur. Det er den konkrete oppgaveteksten som avgjør hva svaret skal dekke.',
  },
  {
    id: 'utility-test', topic: 'ethics', title: 'Nytteetikk', cue: 'Hva skjer? · Bentham og Mill', pages: '1, 6, 27',
    question: 'Hvordan sammenligner du to handlinger nytteetisk, og hva er en viktig innvending?',
    answer: 'Finn alle berørte, vurder konsekvensene av de samme alternativene på kort og lang sikt og begrunn størst samlet velferd. Bentham vektlegger mengde lyst og smerte; Mill skiller også mellom gleders kvalitet. En innvending er at samlet nytte kan gå på bekostning av et mindretall.',
    example: 'Fiktivt: Sammenlign taushet og et tilbud om hjelp ut fra prosjektkvalitet, Emmas læring og tillit i arbeidsmiljøet.',
    caution: 'Nytte er ikke bare profitt, og flertallets ønske er ikke i seg selv størst samlet nytte.',
  },
  {
    id: 'kant-tests', topic: 'ethics', title: 'Pliktetikk', cue: 'Regel + menneskeverd · Kant', pages: '1, 6, 27',
    question: 'Hva prøves med Kants to formuleringer av det kategoriske imperativ?',
    answer: 'Formuler maksimen: hva gjør jeg, i hvilken situasjon og med hvilket formål? Prøv om den kan villes som allmenn lov. Vurder også om mennesker respekteres som mål i seg selv og aldri bare brukes som midler.',
    example: 'Fiktivt: «Når jeg ser en saklig risiko, deler jeg bekymringen respektfullt med den ansvarlige.» Prøv regelen og om Emma får delta i vurderingen.',
    caution: 'Spørsmålet er mer presist enn «hva om alle gjorde det?». Gode konsekvenser alene gjør ikke en pliktstridig handling riktig.',
  },
  {
    id: 'virtue-test', topic: 'ethics', title: 'Dyd og praktisk klokskap', cue: 'For lite · passende · for mye', pages: '1, 7, 27',
    question: 'Hvordan bruker du den gylne middelvei uten å gjøre den til et kompromiss?',
    answer: 'Aristoteles legger vekt på gode karaktertrekk, vaner og praktisk klokskap. Finn relevante dyder og begrunn den passende handlingen i situasjonen. Mot kan ligge mellom feighet og dumdristighet; det passende er ikke et matematisk midtpunkt.',
    example: 'Fiktivt: Mot kan være å ta en vanskelig samtale, mens ydmykhet krever at Alex lytter før han antar at Emma tar feil.',
    caution: 'Å velge «litt av begge deler» er ingen begrunnelse. Dyder kan også trekke i forskjellige retninger.',
  },
  {
    id: 'voice-exit', topic: 'ethics', title: 'Lojalitet, voice og exit', cue: 'Bli · Si fra · Gå · Hirschman', pages: '1, 9, 27',
    question: 'Hvordan kan lojalitet, stemmebruk og exit hjelpe deg å finne handlingsalternativer?',
    answer: 'Vurder å bli, å forsøke å endre forholdene gjennom stemmebruk eller å trekke seg ut. Beskriv konkrete handlinger og konsekvenser. Lojalitet kan også motivere en til å si fra for å forbedre virksomheten.',
    example: 'Fiktivt: En ansatt kan ta opp utrygge forhold internt, bruke en relevant varslingskanal eller forlate arbeidet. Vurder hva som faktisk beskytter dem som rammes.',
    caution: 'Dette er ideer til alternativer, ikke tre valg som passer enhver sak. Oppgaven om Alex krever minst to alternativer, ikke nødvendigvis tre.',
  },
  {
    id: 'ethics-tools', topic: 'ethics', title: 'Navigasjonshjulet', cue: 'Juss · Identitet · Moral · Omdømme · Økonomi · Etikk', pages: '9, 27',
    question: 'Hvilke seks spørsmål stiller navigasjonshjulet, og hvordan bruker du svarene?',
    answer: 'Kvalnes og Øverenget spør om handlingen er lovlig, samsvarer med identiteten vår, er moralsk riktig, ivaretar troverdighet, lønner seg og kan begrunnes etisk. Hjulet synliggjør spenninger som må drøftes.',
    example: 'Fiktivt: Et lovlig kutt i kundestøtten kan være lønnsomt, men stride mot uttalte verdier og kundenes behov for tilgjengelige tjenester.',
    caution: 'Omdømme og lovlighet avgjør ikke alene hva som er etisk riktig. Verktøyet supplerer argumentasjonen.',
  },
  {
    id: 'dialogue', topic: 'ethics', title: 'Diskursetikk', cue: 'Alle berørte · det beste argumentet', pages: '8, 28',
    question: 'Hva krever diskursetikken av en god interessentdialog?',
    answer: 'Habermas og Apel knytter normers gyldighet til hva alle berørte kan godta i en fri og åpen samtale. Deltakerne skal ha like muligheter til å delta, uten tvang, og argumenter skal telle mer enn makt.',
    example: 'Fiktivt: Inviter berørte kunder til å utforme tilgjengelig rådgivning, og sørg for at møtet også er tilgjengelig for dem.',
    caution: 'En høring er ikke automatisk likeverdig dialog. Spør hvem som mangler, og om maktforskjeller påvirker samtalen.',
  },
  {
    id: 'rawls', topic: 'ethics', title: 'Rawls og etiske prinsipper', cue: 'Velg uten å vite din egen plass', pages: '8, 28',
    question: 'Hvordan kan Rawls’ slør av uvitenhet og etiske prinsipper brukes på et case?',
    answer: 'Spør hvilke regler du ville valgt uten å vite din egen posisjon. Rawls vektlegger like grunnleggende friheter, rimelig mulighetslikhet og at sosiale og økonomiske ulikheter skal gagne de dårligst stilte. Autonomi, velgjørenhet, ikke skade og rettferdighet er andre relevante prinsipper som kan komme i konflikt.',
    example: 'Fiktivt: Ville du akseptert bankens vilkår om du selv kunne være kunden med minst kunnskap og færrest alternativer?',
    caution: 'Sløret er et tankeeksperiment, ikke en påstand om at alle skal få nøyaktig samme resultat.',
  },
  {
    id: 'owners', topic: 'responsibility', title: 'Friedman og eierne', cue: 'FrieDman = Dollar · shareholder', pages: '1, 13, 28–29',
    question: 'Hva er Friedmans begrunnelse for eierfokus, og hvilke grenser gjelder?',
    answer: 'Ledere forvalter eiernes penger og skal søke avkastning innenfor loven og etiske spilleregler, uten svindel og bedrag. Agentargumentet gjelder lederens mandat; demokratiargumentet gjelder hvem som skal bestemme over samfunnspolitiske prioriteringer. Samfunnstiltak kan forsvares med langsiktig lønnsomhet.',
    example: 'Fiktivt: Bedre rådgivning kan redusere mislighold og styrke tilliten, og dermed begrunnes innenfor et eierperspektiv.',
    caution: 'Huskeregelen «Dollar» betyr ikke profitt for enhver pris. Ikke anta at samfunnsansvar alltid lønner seg.',
  },
  {
    id: 'stakeholder-priority', topic: 'responsibility', title: 'Freeman og interessentene', cue: 'FreEman = Everyone · stakeholder', pages: '1–2, 13, 28–29',
    question: 'Hvordan kan du begrunne hensyn til en interessent med lite makt?',
    answer: 'Freeman inkluderer grupper som påvirker eller påvirkes av virksomheten, også eierne. Mitchell, Agle og Wood beskriver interessenters betydning gjennom makt, legitimitet og hvor mye kravet haster. Moralsk prioritering krever også vurdering av rettigheter, sårbarhet og berørthet.',
    example: 'Fiktivt: En kunde med funksjonsnedsettelse kan ha et legitimt krav på tilgjengelighet selv om kunden har liten mulighet til å presse banken.',
    caution: 'Modellen beskriver oppmerksomhet og prioritet; makt er ikke et mål på moralsk verdi. Sekundære interessenter kan også ha sterke krav.',
  },
  {
    id: 'csr-four', topic: 'responsibility', title: 'Carrolls fire ansvar', cue: 'Ø · J · E · F', pages: '2, 14, 28',
    question: 'Hva står Ø–J–E–F for, og kan en donasjon kompensere for uforsvarlig drift?',
    answer: 'Økonomisk, juridisk, etisk og filantropisk ansvar. Carrolls modell omfatter alle fire samtidig: økonomisk levedyktighet, lovlydighet, etisk forsvarlig praksis og frivillige bidrag til samfunnet.',
    example: 'Fiktivt: En bankgave til gjeldsrådgivning erstatter ikke forståelige vilkår og ansvarlig behandling av kundene.',
    caution: 'Pyramiden er ikke en trapp der etikken kan vente til man har tjent nok penger.',
  },
  {
    id: 'shared-value', topic: 'responsibility', title: 'Porter og Kramer', cue: 'Produkt · Prosess · Plass', pages: '2, 14, 28',
    question: 'Hvilke tre veier til felles verdier foreslår Porter og Kramer?',
    answer: 'Revurdere produkter og markeder, forbedre produktiviteten i verdikjeden og utvikle lokale klynger. Vis hvordan et tiltak skaper både samfunnsverdi og økonomisk verdi gjennom kjernevirksomheten.',
    example: 'Fiktivt: Leverandøropplæring kan gi tryggere arbeidsforhold, bedre kvalitet og mer stabile leveranser.',
    caution: 'Vinn-vinn må forklares og undersøkes. Perspektivet gir begrenset hjelp når viktige samfunnshensyn ikke er lønnsomme.',
  },
  {
    id: 'external-effects', topic: 'responsibility', title: 'Eksternaliteter og ansvar', cue: 'Hvem bærer en kostnad utenfor prisen?', pages: '14, 28–29',
    question: 'Hva må du vise for å identifisere og internalisere en negativ eksternalitet?',
    answer: 'Identifiser en virkning på tredjeparter som ikke inngår tilstrekkelig i markedsprisen. Internalisering gjør virkningen relevant for aktørens egne kostnader og beslutninger, for eksempel gjennom en avgift eller krav om å forebygge skade.',
    example: 'Fiktivt: Utslipp skader naboenes helse uten at bedriften dekker kostnaden. Utslippskrav og avgifter kan endre bedriftens valg.',
    caution: 'Ikke enhver skade eller prisendring er en eksternalitet. Internalisering garanterer heller ikke i seg selv en positiv nettoeffekt for samfunnet.',
  },
  {
    id: 'legitimacy', topic: 'responsibility', title: 'Legitimitet og begrunnelser', cue: 'Lovlig · akseptabelt · tatt for gitt', pages: '13, 16, 29',
    question: 'Hva er legitimitet, og hvordan skiller en etisk begrunnelse seg fra en økonomisk?',
    answer: 'Legitimitet gjelder omgivelsenes aksept. Scott skiller mellom regulative, normative og kulturelt-kognitive grunnlag. Donaldson og Preston skiller mellom deskriptive, instrumentelle og normative lesninger av interessentteori: hva bedrifter gjør, hva som lønner seg og hva som er riktig.',
    example: 'Fiktivt: «Tilrettelegging gir flere kunder» er instrumentelt. «Kundene har legitime krav på deltakelse» er normativt.',
    caution: 'Godt omdømme beviser ikke etisk forsvarlighet, og utbredt praksis er ikke nødvendigvis riktig.',
  },
  {
    id: 'due-diligence', topic: 'responsibility', title: 'Aktsomhetsvurderinger', cue: 'Kartlegg → forebygg → følg opp → kommuniser', pages: '15–16, 29',
    question: 'Hva innebærer en aktsomhetsvurdering i en leverandørkjede?',
    answer: 'Forankre ansvar, kartlegg faktiske og mulige negative virkninger på menneskerettigheter og anstendig arbeid, forebygg eller begrens dem, følg opp effekten og kommuniser håndteringen. Bidra til gjenoppretting der det er relevant. Arket knytter dette til OECD og åpenhetsloven.',
    example: 'Fiktivt: Finn risiko for farlige arbeidsforhold, involver arbeidere, avtal konkrete forbedringer og undersøk om sikkerheten faktisk blir bedre.',
    caution: 'En underskrift fra leverandøren er ikke nok. Konkrete lovplikter avhenger av virksomheten og saken.',
  },
  {
    id: 'standards-investing', topic: 'responsibility', title: 'Standarder og eierskap', cue: 'Veiledning · forpliktelser · påvirkning', pages: '15–16, 28–29',
    question: 'Hvordan skiller ISO 26000, Global Compact og ansvarlige investeringer seg fra hverandre?',
    answer: 'ISO 26000 gir veiledning om samfunnsansvar og er ikke en sertifiseringsstandard. Global Compact bygger på ti prinsipper om menneskerettigheter, arbeidsliv, miljø og antikorrupsjon. Investorer kan bruke negativ eller positiv filtrering, aktivt eierskap og samfunnsinvesteringer.',
    example: 'Fiktivt: En investor kan selge seg ut av et selskap eller beholde aksjene og kreve forbedringer gjennom aktivt eierskap.',
    caution: 'Medlemskap, rapportering og merkevarer dokumenterer ikke alene ansvarlig praksis. Undersøk krav, oppfølging og resultater.',
  },
  {
    id: 'sustainability-capital', topic: 'sustainability', title: 'Bærekraft og naturkapital', cue: 'I dag uten å ta fra i morgen', pages: '2, 18, 29–30',
    question: 'Hvordan henger Brundtland, den triple bunnlinjen og sterk bærekraft sammen?',
    answer: 'Brundtland gjelder dagens og fremtidens behov. Elkingtons triple bunnlinje omfatter sosiale, miljømessige og økonomiske resultater. Zadek fremhever avhengigheten mellom økonomi, samfunn og natur. Svak bærekraft tillater større erstatning mellom kapitalformer; sterk bærekraft setter grenser, særlig for kritisk naturkapital.',
    example: 'Fiktivt: Nye arbeidsplasser er en gevinst, men begrunner ikke automatisk tap av et uerstattelig økosystem.',
    caution: 'Sterk bærekraft er mer presist enn «ingen endring i naturen er tillatt». Forklar hva som er kritisk og hvorfor det ikke kan erstattes.',
  },
  {
    id: 'jonas', topic: 'sustainability', title: 'Jonas’ ansvarsetikk', cue: 'Vite · Usikkerhet · Makt · Forestilling', pages: '2, 19, 30',
    question: 'Hva innebærer Jonas’ fremtidsansvar når teknologien kan gi alvorlig skade?',
    answer: 'Skaff kunnskap, ta alvorlig usikkerhet på alvor, bygg evne til å styre teknologien og forestill deg langsiktige følger. Makt til å påvirke livsbetingelser gir ansvar også for mennesker og natur langt unna og i fremtiden.',
    example: 'Fiktivt: Før et naturinngrep bør virksomheten undersøke langtidsskader, alternativer og muligheten for å stanse eller endre tiltaket.',
    caution: 'Å ta usikkerhet alvorlig er ikke å hevde at enhver tenkelig skade sikkert vil skje. Drøft alvor, kunnskapsgrunnlag og forholdsmessige tiltak.',
  },
  {
    id: 'commons', topic: 'sustainability', title: 'Allmenningens tragedie', cue: 'Ett dyr til på fellesbeitet', pages: '2, 19, 30',
    question: 'Hva forklarer Hardin, og hvordan utfordrer Ostrom en uunngåelig tragedie?',
    answer: 'Når hver bruker får hele gevinsten ved ekstra uttak, mens kostnaden deles, kan summen av valgene overbelaste en fellesressurs. Hardin vektlegger felles regulering. Ostrom viser at brukere kan utvikle fungerende institusjoner med regler, oppfølging og sanksjoner.',
    example: 'Fiktivt: Flere bedrifter henter vann fra samme begrensede kilde. Avtal uttaksgrenser, overvåking og ansvar ved brudd.',
    caution: 'En fellesressurs trenger ikke være uten regler. Samarbeid må organiseres; det oppstår ikke automatisk.',
  },
  {
    id: 'washing', topic: 'sustainability', title: 'Grønn-, blå- og SDG-vasking', cue: 'Påstand → praksis → dokumentasjon', pages: '2, 20, 30',
    question: 'Hvordan skiller de tre formene for vasking seg, og hvordan kan du undersøke dem?',
    answer: 'Grønnvasking gir et misvisende miljøinntrykk. Blåvasking bruker tilknytning til FN som pynt. SDG-vasking viser til bærekraftsmål uten tilsvarende endringer. Undersøk mål, tiltak, resultater, hele verdikjeden og hvilke negative virkninger som utelates.',
    example: 'Fiktivt: Et selskap viser store mål 8-symboler, men rapporterer ikke arbeidstid, sikkerhet eller lønn hos leverandørene.',
    caution: 'En logo er verken bevis på ansvar eller tilstrekkelig grunnlag for å anklage noen for vasking. Vurder dokumentasjonen.',
  },
  {
    id: 'decoupling', topic: 'sustainability', title: 'Frikobling og rebound', cue: 'Per enhet ≠ totalt', pages: '18, 20, 29–30',
    question: 'Hva er relativ og absolutt frikobling, og hvordan kan rebound svekke gevinsten?',
    answer: 'Relativ frikobling betyr lavere miljøbelastning per økonomisk enhet, mens total belastning fortsatt kan vokse. Absolutt frikobling betyr at samlet belastning går ned mens økonomien vokser. Rebound oppstår når effektivisering bidrar til mer bruk og spiser opp deler av gevinsten.',
    example: 'Fiktivt: Utslipp per vare faller 20 %, men salget dobles. Totale utslipp blir 60 % høyere, ikke lavere.',
    caution: 'Se på absolutte tall, systemgrenser og tidsrom. En prosentforbedring sier ikke alene om aktiviteten er innenfor naturens tålegrenser.',
  },
  {
    id: 'sdg-articles', topic: 'sustainability', title: 'Mål 5, 8, 9 og 12', cue: 'Likestilling · Arbeid · Innovasjon · Forbruk', pages: '2, 20–21, 30',
    question: 'Hvilke fire mål og pensumartikler kobler arket sammen?',
    answer: 'Mål 5: likestilling, Halrynjo og Blair-Loy om strukturelle og organisatoriske hindringer. Mål 8: anstendig arbeid, Frey om vekst og rettigheter. Mål 9: innovasjon, Gundersen og Bærøe om normative utfordringer ved KI. Mål 12: ansvarlig forbruk og produksjon, Ødegård, Reiersen og Branstad om nordisk omstilling og samarbeid.',
    example: 'Fiktivt: Ved innføring av KI kan du koble kompetanse og jobber til mål 8, rettferdig teknologi til mål 9 og ressursbruk til mål 12.',
    caution: 'Å nevne et målnummer er ikke en drøfting. Forklar mekanismen og en mulig konflikt mellom målene.',
  },
  {
    id: 'decent-work', topic: 'sustainability', title: 'Anstendig arbeid', cue: 'Flere jobber + bedre jobber', pages: '21–22, 29–30',
    question: 'Hvorfor er sysselsetting alene ikke nok til å oppfylle mål 8?',
    answer: 'Arbeidets kvalitet teller: forsvarlig inntekt, sikkerhet, rettigheter, sosial beskyttelse, medvirkning og like muligheter. Frey viser en spenning mellom vekst og arbeidstakerrettigheter. Arket fremhever organisasjonsfrihet, ikke-diskriminering og vern mot barne- og tvangsarbeid.',
    example: 'Fiktivt: Automatisering kan gi høyere produktivitet, men kreve opplæring og involvering for å unngå at ansatte skyves ut av arbeidslivet.',
    caution: 'Arkets fire ILO-områder er en eldre inndeling. Et trygt og sunt arbeidsmiljø er også et grunnleggende ILO-prinsipp siden 2022.',
  },
  {
    id: 'nordic-transition', topic: 'sustainability', title: 'Omstilling og den nordiske modellen', cue: 'Tillit · Involvering · Samarbeid · Risikodeling', pages: '21–22',
    question: 'Hvordan kan nordiske samarbeidsformer gjøre en bærekraftig omstilling lettere?',
    answer: 'Medarbeiderinvolvering gir kunnskap og medvirkning. Samarbeid mellom virksomheter, myndigheter og sivilsamfunn kan løse felles problemer. Velferdsordninger og kompetansetiltak kan dele risikoen, og fordelingskonflikter må håndteres åpent.',
    example: 'Fiktivt: Et selskap planlegger nye produksjonsmetoder sammen med ansatte og tilbyr opplæring før arbeidsoppgaver endres.',
    caution: 'Tillit fjerner ikke interessekonflikter. Vis hvem som bærer kostnader, og hvordan tiltakene faktisk hjelper.',
  },
];

// Relative days keep the source plan useful after its original weekdays have passed.
export const studyDays = [
  { title: 'Husk og forklar', focus: 'Bygg grunnlaget i etisk teori.', tasks: [
    { id: 'day1-recall', text: 'Skriv Forklar–Bruk–Vei–Velg og de tre etiske teoriene fra hukommelsen.', mode: 'recall', topic: 'ethics' },
    { id: 'day1-theory', text: 'Forklar kjerne, anvendelse og én innvending ved hver etisk teori.', mode: 'sheet', topic: 'ethics' },
    { id: 'day1-case', text: 'Lag en disposisjon for Alex og Emma med minst to alternativer.', caseId: 'exam-alex-emma' },
  ] },
  { title: 'Lær samfunnsansvaret', focus: 'Skill begrunnelsene for ansvar fra hverandre.', tasks: [
    { id: 'day2-theory', text: 'Forklar Friedman, Freeman, Carroll, eksternaliteter og felles verdier.', mode: 'sheet', topic: 'responsibility' },
    { id: 'day2-recall', text: 'Test deg uten å se, og marker det du trenger å repetere.', mode: 'recall', topic: 'responsibility' },
    { id: 'day2-case', text: 'Planlegg et svar om bankens ansvar for sårbare kunder.', caseId: 'exam-vulnerable-bank' },
  ] },
  { title: 'Skriv et dilemmasvar', focus: 'Øv på å bruke teoriene i sammenheng.', tasks: [
    { id: 'day3-write', text: 'Skriv et helt dilemmasvar uten å slå opp. Velg selv en tidsramme.', caseId: 'exam-alex-emma' },
    { id: 'day3-review', text: 'Sammenlign med drøftingsforslaget og vurder kravene i oppgaven.', caseId: 'exam-alex-emma' },
    { id: 'day3-recall', text: 'Repeter usikre begreper og forklar hva du endret i vurderingen din.', mode: 'recall', topic: 'ethics' },
  ] },
  { title: 'Skriv og utvid', focus: 'Drøft ansvar og få oversikt over bærekraft.', tasks: [
    { id: 'day4-write', text: 'Skriv et helt svar om samfunnsansvar, med et reelt motargument.', caseId: 'exam-vulnerable-bank' },
    { id: 'day4-theory', text: 'Les bærekraftskortene og forklar koblingen mellom vekst, natur og arbeid.', mode: 'sheet', topic: 'sustainability' },
    { id: 'day4-case', text: 'Lag en plan for tiltak og én konflikt rundt anstendig arbeid.', caseId: 'exam-decent-work' },
  ] },
  { title: 'Hent frem og samle', focus: 'Finn hullene før du avslutter repetisjonen.', tasks: [
    { id: 'day5-recall', text: 'Ta hele selvtesten, og repeter kortene du er usikker på.', mode: 'recall', topic: 'all' },
    { id: 'day5-outlines', text: 'Lag korte disposisjoner for alle tre eksempeloppgavene.', overview: true },
    { id: 'day5-check', text: 'Sjekk navn, oppgaveverb, teori–case-koblinger og begrunnede konklusjoner.', mode: 'sheet', topic: 'all' },
  ] },
];

export function filterRevisionCards(topic = 'all', query = '', ratings = {}, weakOnly = false) {
  const search = query.trim().toLocaleLowerCase('nb-NO');
  return revisionCards.filter(card => (topic === 'all' || card.topic === topic)
    && (!weakOnly || ratings[card.id] === 'again')
    && `${card.title} ${card.cue} ${card.question} ${card.answer} ${card.example} ${card.caution}`.toLocaleLowerCase('nb-NO').includes(search));
}
