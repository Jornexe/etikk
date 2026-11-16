export const writingCriteria = [
  { id: 'question', title: 'Jeg svarer på problemstillingen', hint: 'Innledning og konklusjon behandler samme spørsmål, uten en lang omvei.' },
  { id: 'precision', title: 'Jeg fremstiller teoriene presist', hint: 'Jeg forklarer teorienes kriterier, ikke bare navnene, og unngår stråmenn.' },
  { id: 'application', title: 'Jeg viser hvordan teorien virker i saken', hint: 'Minst ett avsnitt kobler teorikriterium → konkret opplysning → begrunnet vurdering.' },
  { id: 'objection', title: 'Jeg prøver et reelt motargument', hint: 'Jeg utfordrer en forutsetning i mitt eget argument og forklarer hvordan det påvirker vurderingen.' },
  { id: 'evidence', title: 'Jeg skiller fakta fra antakelser', hint: 'Eksempler er enten dokumenterte eller tydelig fiktive. Jeg markerer det jeg ikke vet.' },
  { id: 'judgement', title: 'Jeg begrunner prioriteringen min', hint: 'Jeg forklarer hvorfor noe veier tyngst, også hvis ansvar og lønnsomhet ikke går sammen.' },
];

export function draftWordCount(draft) {
  return draft.join(' ').trim().split(/\s+/u).filter(Boolean).length;
}

export function renderExamCoach() {
  return `<details class="exam-coach">
    <summary>Fra begrepskunnskap til eksamensdrøfting <span>Se skrivegrep fra A-besvarelsen</span></summary>
    <div class="exam-coach-body">
      <p class="eyebrow">LÆR AV RESONNEMENTET, IKKE KOPIER TEKSTEN</p>
      <h2>La teoriene gjøre en jobb.</h2>
      <p>Du oppgir at «ETIKK EKSAMEN BESVARELSE.pdf» fikk A. Vi har ikke oppgaveteksten eller sensorbegrunnelsen, så dette er skriveøving inspirert av besvarelsen, ikke en offisiell A-oppskrift eller vurderingsrubrikk.</p>
      <ol class="exam-moves">
        <li><strong>Still et spørsmål med en faktisk spenning.</strong> Besvarelsen setter profitt opp mot ansvar (s. 1). Prøv: Kan lønnsomhet alene begrunne ansvar?</li>
        <li><strong>Sammenlign fremfor å ramse opp.</strong> Den kobler eierperspektiv, interessenter og CSR (s. 1–2). Vis både likheter og forskjeller i hva som begrunner ansvar.</li>
        <li><strong>Utfordre ditt eget argument.</strong> Etter argumentet om boikott spør den hva som skjer når kundene mangler alternativer (s. 3). Det er et motargument som faktisk prøver en forutsetning.</li>
        <li><strong>Samle trådene i en vurdering.</strong> Avslutningen forsøker å forene flere hensyn (s. 4). Gjør det enda tydeligere: Hva veier tyngst, hvorfor, og under hvilke vilkår?</li>
      </ol>
      <section class="exam-example" aria-label="Eksempel på et drøftingsavsnitt">
        <h3>Fra påstand til begrunnet avsnitt</h3>
        <p><strong>For tynt:</strong> «Stakeholder-teorien er viktig. Bedriften bør ta ansvar.»</p>
        <p><strong>Mer presist, i et fiktivt eksempel:</strong> «Freemans stakeholder-perspektiv gir også sårbare kunders legitime krav selvstendig betydning. Hvis kundene ikke har reelle alternativer, viser ikke fortsatt salg at vilkårene er rimelige. Derfor må ledelsen vurdere forståelig informasjon som et ansvar overfor kundene, ikke bare som et middel til økt salg. Kostnadene må fortsatt vurderes, men profitt alene avgjør ikke spørsmålet.»</p>
        <p class="muted">Grep: teorikriterium → konkret forhold → motargument → begrunnet vurdering. Eksemplet er nyskrevet, ikke et sitat fra besvarelsen.</p>
      </section>
      <details class="exam-precision">
        <summary>Behold den faglige presisjonen – også når forbildet fikk A</summary>
        <ul>
          <li>På s. 1 byttes shareholder/stakeholder-betegnelsene om noen steder. Bruk Friedman = shareholder og Freeman = stakeholder.</li>
          <li>Ikke gjengi Friedman som «profitt uansett hva». Begrepsguiden beholder grensene ved loven og etiske spilleregler.</li>
          <li>Ikke gjør den gylne middelvei til et matematisk kompromiss mellom profitt og ansvar. Begrunn passende handling med praktisk klokskap.</li>
          <li>Høy profitt alene viser ikke grenseløs krematistikk. Undersøk rikdommens formål og hvordan den erverves.</li>
          <li>Ikke overta udokumenterte påstander om historien eller navngitte selskaper. Bruk et tydelig fiktivt eksempel når faktagrunnlaget mangler.</li>
        </ul>
        <p>Faglige presiseringer følger «Etikk begreper.md». Begrepsguiden er fortsatt appens faglige grunnlag.</p>
      </details>
      <button class="button secondary" data-action="open-dilemma" data-id="exam-responsibility">Prøv eksamensøvelsen →</button>
    </div>
  </details>`;
}

export function renderWritingReview(checks = [], criteria = writingCriteria) {
  return `<fieldset class="writing-review">
    <legend>Sjekk begrunnelsene dine</legend>
    <p>Egenvurdering, ikke automatisk sensur. Kryss bare av hvis du kan peke på et sted i teksten som viser dette. Endrer du utkastet, nullstilles avkrysningene slik at du vurderer det på nytt.</p>
    ${criteria.map((criterion, index) => `<label><input type="checkbox" data-writing-review="${index}" ${checks[index] ? 'checked' : ''}/><span><strong>${criterion.title}</strong><small>${criterion.hint}</small></span></label>`).join('')}
  </fieldset>`;
}
