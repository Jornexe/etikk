// Example task wording: Oppsummering13112026.pdf, pp. 3, 18 and 39.
// Outlines, reminders, discussion guides and quizzes are app-authored study aids.
export const examSource = 'Oppsummering13112026.pdf';

export const examCases = [
  {
    id: 'exam-alex-emma', title: 'Alex og Emma', label: 'Alternativ 1 · Etisk teori', icon: 'people', time: 'Eget tempo', page: 3,
    focus: 'Sammenlign handlinger før du tar stilling.', concepts: ['nytte', 'plikt', 'dyd', 'middelvei'],
    story: 'Virksomheten skal i gang med et omfattende utviklingsprosjekt. Alex har høy kompetanse på området, men ingen formell rolle i prosjektet. Prosjektansvaret er i stedet gitt til kollegaen Emma, for at hun skal kunne bygge kompetanse på feltet og dermed bidra til å forsterke det relevante fagmiljøet i virksomheten. Alex ser snart at prosjektet tar en vending han ikke selv ville gått god for. Skulle det fortsette i samme retning, vil det sannsynligvis gå utover sluttresultatet. Han er likevel i tvil om hvorvidt han skal engasjere seg, for han vil ikke forstyrre Emmas faglige utvikling eller virksomhetens kompetansebygging.',
    question: 'Hva bør Alex gjøre? Vurder to (eller flere) handlingsalternativer ut fra etisk teori før du bestemmer deg. Begrunn svaret ditt.',
    prompts: [
      { title: 'Avklar konflikten og alternativene', hint: 'Prosjektkvalitet, Emmas læring og rollefordeling trekker i ulike retninger. Beskriv minst to konkrete valg: forbli taus, tilby støtte eller gå til prosjektets leder.' },
      { title: 'Vurder konsekvensene', hint: 'Bruk nytteetikk til å sammenligne de samme alternativene for Alex, Emma, virksomheten og dem resultatet berører. Ta med langsiktig kompetanse og usikkerhet.' },
      { title: 'Prøv handlingsprinsippet', hint: 'Forklar pliktetikk. Formuler en maksime for hvert valg, prøv universalisering og vurder Emmas selvbestemmelse og menneskeverd.' },
      { title: 'Drøft dyder og en innvending', hint: 'Hva krever mot, ydmykhet og praktisk klokskap? Prøv innvendingen om at Alex kan ta feil, eller at hjelp kan oppleves som overstyring.' },
      { title: 'Velg og begrunn fremgangsmåten', hint: 'Sammenlign teorienes vurderinger. Hva bør Alex konkret gjøre først, hvorfor, og når kan det bli nødvendig å involvere andre?' },
    ],
    guide: [
      'Konflikten står mellom et godt prosjektresultat og rom for læring og ansvar. Sammenlign for eksempel taushet, en fortrolig samtale med tilbud om støtte og å melde bekymringen til lederen. Et tilbud om samarbeid er et selvstendig alternativ til å overta prosjektet. Vi vet ikke hvor alvorlig risikoen er eller om Alex har rett.',
      'Taushet kan skjerme Emmas selvstendighet, men medføre feil og tap av læring. En respektfull samtale kan gi bedre resultat og kompetanse uten å frata Emma ansvaret. Å gå direkte til lederen kan begrense alvorlig skade, men svekke tillit. Nytteetikk krever samlet velferd for alle berørte, ikke bare Alex’ faglige tilfredshet eller virksomhetens overskudd.',
      'Prøv for eksempel maksimen: «Når jeg har saklig grunn til å tro at et prosjekt står i fare, deler jeg bekymringen respektfullt med den ansvarlige.» Spør om regelen kan villes som allmenn lov. Humanitetsformuleringen taler for å involvere Emma som en selvstendig person, ikke bare bruke henne til virksomhetens kompetansebygging eller tilsidesette henne for å sikre et resultat. En pliktetisk begrunnelse er mer enn at hjelpen trolig lønner seg.',
      'Mot kan bety å ta en vanskelig samtale; ydmykhet å erkjenne at vurderingen kan være feil. Praktisk klokskap gjelder tidspunkt og form. Middelveien mellom unnfallenhet og overstyring er ikke en matematisk halv løsning. En reell innvending er at hjelpen kan undergrave Emma. Svar med å lytte, be om hennes vurdering og avtale støtte fremfor å overta.',
      'En mulig konklusjon er å snakke med Emma først, legge frem konkrete observasjoner og tilby støtte på hennes premisser. Det kan ivareta både kvalitet, læring og respekt. Ved alvorlig eller vedvarende risiko kan involvering av lederen være nødvendig. Begrunn terskelen ut fra risiko og ansvar; ikke legg til et sikkert skadeomfang som oppgaven ikke oppgir. Andre valg kan forsvares med tydelige begrunnelser.',
    ],
    requirements: [
      ['Minst to handlinger er sammenlignet', 'Jeg vurderer konkrete alternativer, ikke bare teorier hver for seg.'],
      ['Etisk teori er forklart presist', 'Jeg viser hva som gjør en handling riktig i teoriene jeg bruker.'],
      ['Teorien er brukt på de samme valgene', 'Jeg kobler konsekvenser, maksimer eller dyder til Alex og Emmas situasjon.'],
      ['Jeg prøver en reell innvending', 'Jeg vurderer at Alex kan ta feil eller at støtte kan bli overstyring.'],
      ['Usikkerheten er synlig', 'Jeg skiller opplysninger i caset fra mine antakelser om risiko og motiv.'],
      ['Alex får et begrunnet råd', 'Jeg sier hva han bør gjøre og hvorfor, med vilkår for eventuell videre handling.'],
    ],
    notes: [
      { title: 'Nytteetikk · sammenlign utfall', text: 'Finn alle berørte, sammenlign konsekvensene av hvert alternativ og begrunn størst samlet nytte. Ta med læring og tillit på lang sikt. Nytte er ikke bare penger.', reference: 's. 4–6' },
      { title: 'Pliktetikk · to prøver', text: 'En maksime er regelen du handler etter. Kan den villes som allmenn lov? Behandles Emma samtidig som et formål og aldri bare som et middel? Gode konsekvenser alene avgjør ikke om handlingen er riktig.', reference: 's. 7–11' },
      { title: 'Dydsetikk · praktisk klokskap', text: 'Finn relevante dyder og begrunn hvordan de kan etterleves her. Mot kan ligge mellom feighet og overmot. Den passende handlingen krever dømmekraft, ikke et automatisk kompromiss.', reference: 's. 13–17' },
    ],
  },
  {
    id: 'exam-vulnerable-bank', title: 'Banken og sårbare kunder', label: 'Alternativ 2 · Samfunnsansvar', icon: 'bank', time: 'Eget tempo', page: 18,
    focus: 'Bruk minst to teorier til å begrunne ansvar.', concepts: ['shareholder', 'stakeholder', 'csr', 'ekstern', 'felles'],
    story: 'I hvilken grad vil du si at en bank har ansvar for å ivareta sårbare kunder? Det kan for eksempel dreie seg om kunder med gjeldsproblemer, spillavhengighet og funksjonsnedsettelser.',
    question: 'Gjør rede for to (eller flere) teorier om bedriftens samfunnsansvar. Drøft spørsmålet over i lys av de teoriene du har presentert. Ta stilling til spørsmålet og begrunn svaret ditt.',
    prompts: [
      { title: 'Avgrens ansvar og sårbarhet', hint: 'Hva kan ivaretakelse bety for ulike kundegrupper? Skill mellom tilgjengelighet, god informasjon, forsvarlig utlån og å bestemme over kunden.' },
      { title: 'Forklar minst to ansvarsteorier', hint: 'Velg for eksempel Friedman og Freeman, eventuelt Carroll. Forklar hvem ansvaret gjelder overfor og hvordan det begrunnes.' },
      { title: 'Bruk teoriene på bankens tiltak', hint: 'Drøft konkrete, tydelig hypotetiske tiltak for gjeldsproblemer, spillavhengighet og funksjonsnedsettelser. Hvor gir teoriene like eller ulike begrunnelser?' },
      { title: 'Prøv grensene for ansvaret', hint: 'Hva hvis tilrettelegging koster mer enn det sparer? Drøft selvbestemmelse, personvern, bankens kompetanse og økonomisk levedyktighet.' },
      { title: 'Ta stilling til graden av ansvar', hint: 'Svar på «i hvilken grad». Begrunn hva banken bør gjøre, hvilke grenser som gjelder og hvordan tiltak bør følges opp.' },
    ],
    guide: [
      'Sårbarhet kan skyldes ulike forhold og krever ikke samme løsning for alle. Tilgjengelige tjenester, forståelige vilkår og hjelp ved betalingsvansker er mulige tiltak. Skill mellom å gi støtte til informerte valg og å frata kunder selvbestemmelse. Oppgaven oppgir ingen bestemt banks praksis eller rettslige detaljer.',
      'Friedman vektlegger eiernes avkastning innenfor loven og etiske spilleregler. God kundebehandling kan begrunnes med tillit og lavere tap. Freeman gir også kundenes legitime krav selvstendig betydning. Carroll krever samtidig økonomisk, juridisk, etisk og filantropisk ansvar. Forklar minst to teorier før du sammenligner dem; ikke fremstille Friedman som forsvarer av bedrag.',
      'Et hypotetisk eksempel er tilgjengelig rådgivning for kunder med funksjonsnedsettelser, tidlig kontakt ved gjeldsproblemer eller frivillige tiltak for kunder med spillproblemer. Friedman kan støtte tiltak som reduserer mislighold og styrker langsiktig lønnsomhet. Freeman kan også begrunne kostbare tiltak med sårbare kunders legitime krav. I Carrolls modell erstatter ikke en gave til et hjelpetiltak ansvarlig bankdrift.',
      'Et sterkt motargument gjelder kostnader og faren for formynderi. Banken kan ikke løse alle sosiale problemer, og innhenting av følsomme opplysninger krever en egen vurdering. Det innebærer ikke at alt ansvar bortfaller når tiltak koster. Felles verdier kan forklare vinn-vinn-tiltak, men løser ikke enhver konflikt. Avklar relevante lovkrav fremfor å anta at et tiltak er lovlig eller påbudt.',
      'En mulig konklusjon er et betydelig, men avgrenset ansvar knyttet til bankens produkter, kompetanse og påvirkning. Prioriter forståelig informasjon, tilgjengelighet og forsvarlig praksis, med respekt for selvbestemmelse og personvern. Begrunn også tiltak som eventuelt ikke gir gevinst. Bankens økonomiske levedyktighet må drøftes, og effekter bør undersøkes sammen med berørte kunder.',
    ],
    requirements: [
      ['Jeg svarer på «i hvilken grad»', 'Jeg avgrenser både omfanget av ansvaret og grensene for det.'],
      ['Minst to teorier om samfunnsansvar er forklart', 'Jeg bruker for eksempel Friedman og Freeman, ikke bare to generelle etiske teorier.'],
      ['Sårbarhet og tiltak er konkretisert', 'Jeg viser hvordan teoriene belyser kundebehov og bankens mulige tiltak.'],
      ['En konflikt er drøftet', 'Jeg prøver kostnader, selvbestemmelse eller personvern som et reelt motargument.'],
      ['Eksempler og lovkrav behandles ryddig', 'Hypotetiske tiltak merkes som eksempler; jeg finner ikke på rettslige krav.'],
      ['Standpunktet har en begrunnelse', 'Jeg forklarer hva banken bør gjøre og hvorfor de valgte hensynene veier tyngst.'],
    ],
    notes: [
      { title: 'Friedman og Freeman · ulikt grunnlag for ansvar', text: 'Shareholder-perspektivet vektlegger eiernes lønnsomhet innenfor spillereglene. Stakeholder-perspektivet gir også andre berørtes legitime krav selvstendig betydning. De kan anbefale samme tiltak av ulike grunner. Nedsildring er tanken om at vekst kan komme andre til gode; ikke anta at det alltid skjer.', reference: 's. 19–23; presiseringer fra begrepsguiden' },
      { title: 'Carroll · fire samtidige ansvarsområder', text: 'Økonomisk, juridisk, etisk og filantropisk ansvar må sees i sammenheng. Forsvarlig drift kan ikke erstattes med veldedighet. Avklar hva loven krever, og drøft også etiske hensyn utover lovens minstekrav.', reference: 's. 24–25' },
      { title: 'Eksternaliteter og felles verdier', text: 'Internalisering lar eksterne virkninger få betydning i virksomhetens beslutninger. Vis hvem tredjeparten er og hvilken virkning som ikke prises inn; en kundes gjeld er ikke automatisk en eksternalitet. Felles verdier skapes gjennom produkter og markeder, verdikjeden eller lokale klynger. Ikke alle viktige hensyn gir vinn-vinn.', reference: 's. 26–37; presiseringer fra begrepsguiden' },
    ],
  },
  {
    id: 'exam-decent-work', title: 'Arbeid for en bærekraftig fremtid', label: 'Alternativ 3 · Bærekraft', icon: 'leaf', time: 'Eget tempo', page: 39,
    focus: 'Forklar anstendig arbeid, drøft tiltak og en konflikt.', concepts: ['trippel', 'stakeholder', 'felles', 'ekstern'],
    story: 'Skal vi klare å utrydde fattigdom og bekjempe sosial ulikhet innen 2030, er det avgjørende at mennesker har en jobb å gå til.',
    question: 'Gjør rede for teori som angår virksomheters arbeid for en bærekraftig utvikling. Forklar hva sysselsetting og anstendig arbeid for alle dreier seg om og hvorfor det har avgjørende betydning i arbeidet for en bærekraftig utvikling. Drøft tiltak virksomheten kan vurdere for å bidra til sysselsetting og anstendig arbeid for alle og beskriv en konflikt/utfordring som kan oppstå.',
    prompts: [
      { title: 'Forklar bærekraftig utvikling med teori', hint: 'Bruk den triple bunnlinjen og sammenhengen mellom økonomi, samfunn og miljø. Knytt teori til virksomheters ansvar, ikke bare en liste over bærekraftsmål.' },
      { title: 'Forklar sysselsetting og anstendig arbeid', hint: 'Skill antall jobber fra kvaliteten på jobbene. Forklar betydningen av inntekt, trygge og rettferdige arbeidsvilkår, medvirkning og inkludering.' },
      { title: 'Vis hvorfor arbeid er viktig for bærekraft', hint: 'Knytt arbeid til fattigdom, ulikhet og mål 8. Bruk Freys to perspektiver: arbeid som middel til vekst og arbeid som et mål med rettigheter.' },
      { title: 'Drøft konkrete tiltak', hint: 'Vurder for eksempel opplæring, inkluderende rekruttering, trygge arbeidsforhold og krav i leverandørkjeden. Vis mekanisme, berørte parter og hvordan effekten kan undersøkes.' },
      { title: 'Beskriv en konflikt og begrunn prioriteringen', hint: 'Drøft for eksempel automatisering mot sysselsetting, eller klimatiltak mot jobber på kort sikt. Foreslå en begrunnet håndtering og samle svaret.' },
    ],
    guide: [
      'Den triple bunnlinjen undersøker miljømessige, sosiale og økonomiske resultater. Modellen er ikke en oppskrift på at mer profitt oppveier enhver skade. Oppsummeringen trekker også frem Zadeks poeng om gjensidig avhengighet: økonomien inngår i samfunnet, som er avhengig av miljøet. Forklar hvordan dette begrenser virksomheters valg.',
      'Sysselsetting dreier seg om at mennesker er i arbeid; anstendig arbeid gjelder også arbeidets kvalitet. Som utdypende øvingseksempler kan du bruke forsvarlig inntekt, sikkerhet, rettigheter, medvirkning og like muligheter. En jobb med farlige forhold eller utnytting løser ikke automatisk fattigdom. Denne utdypingen er appens studiestøtte, ikke et direkte sitat fra lysbildene.',
      'Arbeid kan gi inntekt, deltakelse og økonomisk trygghet, mens diskriminering og dårlige vilkår kan opprettholde ulikhet. Mål 8 gjelder anstendig arbeid og økonomisk vekst. Frey (2017) undersøker både et forretningsperspektiv og et menneskerettighetsperspektiv; de kan gi ulike løsninger når vekst og arbeidstakeres rettigheter kolliderer. Forklar begge fremfor å anta at all vekst gir anstendig arbeid.',
      'I et hypotetisk selskap kan opplæring gjøre omstilling mulig, inkluderende rekruttering åpne jobbmuligheter og samarbeid med leverandører forbedre sikkerheten. Forklar hvorfor hvert tiltak kan virke og hva som kan hindre det. Halrynjo og Blair Joy retter oppmerksomhet mot strukturelle og organisatoriske forhold, ikke bare individuelle holdninger. Den nordiske modellen fremhever tillit, involvering, samarbeid og risikodeling ved omstilling.',
      'Et hypotetisk eksempel er automatisering som bedrer produktivitet og reduserer farlig arbeid, men fjerner jobber eller stenger noen ute. Drøft om opplæring, medvirkning og overgang til andre oppgaver kan redusere konflikten, og hvem som bærer kostnadene. Ved en miljøkonflikt må også grensene for å erstatte naturkapital vurderes. Avslutt med en begrunnet prioritering og etterprøvbare tiltak, ikke bare et løfte om at alle hensyn kan oppfylles.',
    ],
    requirements: [
      ['Relevant bærekraftsteori er forklart', 'Jeg bruker teori til å belyse virksomheters arbeid med bærekraftig utvikling.'],
      ['Både sysselsetting og anstendig arbeid er definert', 'Jeg skiller mellom flere arbeidsplasser og gode, rettferdige arbeidsvilkår.'],
      ['Betydningen for bærekraft er begrunnet', 'Jeg forklarer forbindelsen til fattigdom, sosial ulikhet og mål 8.'],
      ['Konkrete tiltak er drøftet', 'Jeg viser hvordan tiltak kan virke, hvem som berøres og mulige begrensninger.'],
      ['En konflikt eller utfordring er beskrevet', 'Jeg forklarer motstridende hensyn og hvem som bærer kostnadene.'],
      ['Jeg samler svaret i en begrunnet vurdering', 'Jeg prioriterer og viser hvordan tiltak kan følges opp uten å love en automatisk vinn-vinn.'],
    ],
    notes: [
      { title: 'Den triple bunnlinjen og gjensidig avhengighet', text: 'Elkington: undersøk sosiale, miljømessige og økonomiske resultater. Zadek: områdene henger sammen. Flere jobber er en sosial gevinst, men jobbantall alene sier lite om arbeidsvilkår eller naturbelastning.', reference: 's. 40 og 45–46' },
      { title: 'Anstendig arbeid og Frey (2017)', text: 'Mål 8 kobler anstendig arbeid og økonomisk vekst. Oppsummeringen fremhever Freys forretningsperspektiv og menneskerettighetsperspektiv. Som anvendelse: undersøk både om tiltak gir produktivitet og om arbeidstakeres rettigheter ivaretas når tiltak ikke lønner seg. Jobbkvalitet, sikkerhet, medvirkning og inkludering er utdypende øvingseksempler.', reference: 's. 39, 50 og 58; appens utdyping' },
      { title: 'Svak og sterk bærekraft', text: 'Svak bærekraft åpner i større grad for at tap av naturkapital kompenseres av annen kapital. Sterk bærekraft setter grenser for slik erstatning, særlig for kritisk naturkapital. Føre var betyr å håndtere risiko også ved usikker kunnskap, ikke å late som alle konsekvenser er kjente.', reference: 's. 44; presisering fra begrepsguiden' },
      { title: 'Ansvarsetikk og allmenningens tragedie', text: 'Ansvarsetikken i oppsummeringen gjelder et langsiktig ansvar for fremtidige generasjoner: søk kunnskap, forestill deg konsekvenser og ta ansvar for usikker risiko. Allmenningens tragedie viser hvordan individuelt fordelaktig bruk av en felles, begrenset ressurs kan skade fellesskapet. Drøft samarbeid og rammer for ressursbruken.', reference: 's. 51–55' },
      { title: 'Organisasjon, likestilling og den nordiske modellen', text: 'Halrynjo og Blair Joy (2021) fremhever strukturelle og organisatoriske forhold bak kvinners underrepresentasjon i ledelsen. Ødegård, Reiersen og Branstad (2019) peker på tillit, medarbeiderinvolvering, samarbeid og en velferdsstat som reduserer risiko og omfordeler. Bruk dette til å drøfte inkluderende omstilling.', reference: 's. 56–57' },
      { title: 'KI i velferdsstaten · Gundersen og Børøe (2022)', text: 'Oppsummeringen skiller tekniske begrensninger fra normative spørsmål ved KI i offentlige tjenester: skjevheter, gjennomsiktighet, lovverk, profesjonsetikk og rettferdighet. Som overføring til et hypotetisk rekrutteringstiltak: spør hvem en algoritme kan stenge ute. En teknisk forbedring er ikke alene en etisk begrunnelse.', reference: 's. 59; appens anvendelseseksempel' },
      { title: 'Vis praksis, ikke bare symboler', text: 'Grønnvasking er å fremstille noe som miljøvennlig uten tilstrekkelig grunnlag. Blåvasking er å knytte merkevaren til FN uten faktisk praksisendring. SDG-vasking er å pynte seg med bærekraftsmålene uten dekning. Beskriv konkrete tiltak og dokumenter effekten på arbeid og miljø.', reference: 's. 47–50' },
    ],
  },
].map(task => ({ ...task, source: examSource }));

export const examQuestions = [
  { examCase: 'exam-alex-emma', concept: 'nytte', prompt: 'Hva krever en nytteetisk vurdering av Alex’ valg?', options: ['Å sammenligne konsekvensene av minst to alternativer for alle berørte', 'Å velge det Alex selv foretrekker', 'Å regne bare prosjektets økonomiske overskudd', 'Å unngå enhver innblanding uansett konsekvens'], correct: 0, explanation: 'Vurder blant annet kvalitet, Emmas læring, tillit og langsiktig kompetanse. Marker usikkerhet i konsekvensene.' },
  { examCase: 'exam-alex-emma', concept: 'plikt', prompt: 'Hvilket spørsmål prøver Alex’ handling pliktetisk?', options: ['Vil Emma bli mest fornøyd?', 'Gir handlingen størst gevinst?', 'Kan regelen bak handlingen villes som allmenn lov, og respekterer den Emma som et formål?', 'Vil Alex få ros fra lederen?'], correct: 2, explanation: 'Prøv maksimen og humanitetsformuleringen. Respekt for Emma kan tale for dialog fremfor å overta uten å involvere henne.' },
  { examCase: 'exam-alex-emma', concept: 'dyd', prompt: 'Hvordan brukes praktisk klokskap i Alex og Emma-caset?', options: ['Alex må alltid velge nøyaktig halvparten av hvert alternativ', 'Alex vurderer hvordan mot og ydmykhet bør uttrykkes i situasjonen', 'Den mest erfarne skal alltid bestemme', 'Dyder erstatter behovet for å begrunne valget'], correct: 1, explanation: 'Mot kan kreve å si fra, mens ydmykhet krever at Alex lytter og undersøker om han har rett. Middelveien er ikke et regnestykke.' },
  { examCase: 'exam-alex-emma', concept: 'nytte', prompt: 'Hva mangler hvis et svar bare forklarer tre etiske teorier og deretter sier «Alex bør hjelpe»?', options: ['Flere filosofnavn', 'En lengre historisk innledning', 'En sikker påstand om at Alex har rett', 'Sammenligning av minst to konkrete handlingsalternativer og begrunnelse for valget'], correct: 3, explanation: 'Alternativ 1 ber uttrykkelig om to eller flere handlingsalternativer vurdert med etisk teori. Redegjørelse alene dekker ikke oppgaven.' },
  { examCase: 'exam-vulnerable-bank', concept: 'shareholder', prompt: 'Hvor skiller Friedman og Freeman lag i bankoppgaven?', options: ['Bare Freeman tillater lønnsom drift', 'Friedman tillater bedrag hvis kunden ikke oppdager det', 'Kundenes legitime krav kan ha selvstendig betydning hos Freeman, utover eiernes lønnsomhet', 'Friedman krever alltid kortsiktig gevinst'], correct: 2, explanation: 'Begge kan støtte god kundebehandling, men begrunnelsen kan være forskjellig. Friedman beholder grenser ved lov og etiske spilleregler.' },
  { examCase: 'exam-vulnerable-bank', concept: 'csr', prompt: 'Banken gir penger til gjeldsrådgivning, men har uforståelige lånevilkår. Hva viser Carrolls modell?', options: ['Filantropi erstatter ikke juridisk og etisk ansvar i driften', 'Store gaver opphever alle andre krav', 'Økonomisk ansvar utelukker etisk ansvar', 'CSR gjelder bare veldedighet'], correct: 0, explanation: 'De fire ansvarsområdene gjelder samtidig. Gaver gjør ikke uansvarlig praksis i kjernevirksomheten forsvarlig.' },
  { examCase: 'exam-vulnerable-bank', concept: 'stakeholder', prompt: 'Hva er en sterk innvending som bankdrøftingen bør håndtere?', options: ['Sårbare kunder har alltid identiske behov', 'Lovlighet gjør etiske spørsmål overflødige', 'Tiltak lønner seg alltid', 'Støtte kan koste og bli formynderi; ansvar må avgrenses med respekt for selvbestemmelse'], correct: 3, explanation: 'Prøv grensene for ansvaret, inkludert kostnader, kompetanse, personvern og selvbestemmelse. Det fjerner ikke automatisk kundens legitime krav.' },
  { examCase: 'exam-vulnerable-bank', concept: 'felles', prompt: 'Hva bør du undersøke når banken hevder at alle kundetiltak skaper felles verdier?', options: ['Bare om tiltaket får en fin kampanje', 'Om det faktisk skaper både samfunnsverdi og økonomisk verdi, og hva som skjer når hensynene kolliderer', 'Om banken har gitt en gave', 'Om alle samfunnshensyn kan utelates hvis de koster'], correct: 1, explanation: 'Felles verdier krever en konkret mekanisme og dokumentasjon. Perspektivet løser ikke alle tilfeller der nødvendige hensyn reduserer lønnsomheten.' },
  { examCase: 'exam-decent-work', concept: 'trippel', prompt: 'Hvorfor er flere jobber alene utilstrekkelig i alternativ 3?', options: ['Arbeid har ingen betydning for bærekraft', 'Bare miljøresultater teller', 'Anstendig arbeid gjelder også rettigheter, sikkerhet, inkludering og arbeidsvilkår', 'Alle jobber fjerner automatisk fattigdom'], correct: 2, explanation: 'Skill sysselsetting fra jobbkvalitet. Forklar hvordan både tilgang til arbeid og anstendige vilkår kan redusere fattigdom og ulikhet.' },
  { examCase: 'exam-decent-work', concept: 'trippel', prompt: 'Hvilke to perspektiver fremheves hos Frey (2017) i oppsummeringen?', options: ['Et forretningsperspektiv og et menneskerettighetsperspektiv', 'Et eierperspektiv og ren veldedighet', 'Bare klima og miljø', 'Bare kortsiktig og langsiktig profitt'], correct: 0, explanation: 'De kan begrunne ulike løsninger for mål 8. Vekst og produktivitet avgjør ikke alene hvilke arbeidsvilkår og rettigheter som bør sikres.' },
  { examCase: 'exam-decent-work', concept: 'stakeholder', prompt: 'Et hypotetisk selskap automatiserer farlig arbeid, men fjerner jobber. Hva er en god drøfting?', options: ['Anta at alle berørte automatisk får det bedre', 'Ignorere produktivitetsgevinster', 'Bare sette et mål 8-symbol på rapporten', 'Vurdere sikkerhet og produktivitet opp mot jobbtap, og drøfte opplæring og medvirkning'], correct: 3, explanation: 'Vis konflikten, hvem som bærer kostnadene og hvordan tiltak kan redusere dem. Ikke lov at opplæring alltid løser alle problemer.' },
  { examCase: 'exam-decent-work', concept: 'trippel', prompt: 'Hvilken kobling til pensum er i tråd med oppsummeringen?', options: ['Halrynjo og Blair Joy forklarer alt med individuelle holdninger', 'Den nordiske modellen knyttes til tillit, involvering, samarbeid og risikodeling ved omstilling', 'Ansvarsetikk gjelder bare dagens eiere', 'Sterk bærekraft betyr at all natur kan erstattes med penger'], correct: 1, explanation: 'Ødegård, Reiersen og Branstad (2019) fremhever slike forhold. Halrynjo og Blair Joy peker også på strukturelle og organisatoriske forhold; ansvarsetikken gjelder fremtidige generasjoner.' },
];

export function criteriaForCase(task, fallback) {
  return task?.requirements ? task.requirements.map(([title, hint], index) => ({ id: `requirement-${index}`, title, hint })) : fallback;
}
