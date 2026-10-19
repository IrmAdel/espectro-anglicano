const CFG=window.CONFIG||{};
const ok=()=>CFG.SUPABASE_URL&&CFG.SUPABASE_KEY;
const HD=()=>({apikey:CFG.SUPABASE_KEY,Authorization:'Bearer '+CFG.SUPABASE_KEY,'Content-Type':'application/json'});
async function salvar(r){
  const res=await fetch(CFG.SUPABASE_URL+'/rest/v1/resultados',{method:'POST',headers:{...HD(),Prefer:'return=minimal'},body:JSON.stringify(r)});
  if(!res.ok)throw new Error('salvar');
}
async function carregar(){
  const res=await fetch(CFG.SUPABASE_URL+'/rest/v1/resultados?select=nome,par,c,l,p,t&order=t.desc&limit=500',{headers:HD()});
  if(!res.ok)throw new Error('carregar');
  return res.json();
}
const A={C:'Católico',L:'Liberal',P:'Protestante'};
const Q=[
["A autoridade da Igreja deriva principalmente de…",[["Sucessão apostólica e sagrada tradição.","C"],["A consciência e a razão do indivíduo.","L"],["A Escritura como autoridade máxima, interpretada com a orientação da tradição e da razão.","PC"],["A Palavra de Deus inerrante na Escritura.","P"],["O consenso da comunidade de fiéis, enquanto busca a orientação do Espírito Santo.","L"],["Um equilíbrio entre Escritura, Tradição e Razão.","CP"]]],
["A Eucaristia é melhor entendida como…",[["A Presença Real do Corpo e Sangue de Cristo.","C"],["Uma verdadeira presença espiritual de Cristo, recebida pela fé (visão “recepcionista”).","P"],["Uma refeição comunitária simbolizando comunhão e inclusão.","L"],["Uma presença espiritual, um mistério a ser abraçado.","CL"],["Uma antecipação do banquete celestial, um sinal de esperança futura.","LC"],["Um memorial do sacrifício expiatório de Cristo.","P"]]],
["Em relação à liturgia, eu prefiro…",[["A linguagem e estrutura tradicionais do Livro de Oração Comum.","CP"],["Linguagem contemporânea, inovadora e formas flexíveis.","L"],["Um serviço quieto e contemplativo com espaço para silêncio e reflexão pessoal (ex.: estilo Taizé).","LC"],["Uma liturgia digna que seja acessível e compreensível para os recém-chegados.","PL"],["Rituais elaborados, incenso e vestimentas (“cheiros e sinos”).","C"]]],
["Os santos são…",[["Intercessores no céu a serem venerados e a quem se pede oração.","C"],["Parte da “grande nuvem de testemunhas” que nos inspiram e com quem estamos em comunhão.","CL"],["Figuras históricas inspiradoras, mas não objetos de devoção.","L"],["Exemplos de fé cujas vidas devemos imitar.","P"],["Um conceito que distrai da mediação única de Cristo.","P"],["Nossos ancestrais na fé, cujas histórias fazem parte da nossa memória familiar coletiva.","LC"]]],
["A salvação é alcançada através de…",[["Fé, participação nos sacramentos e boas obras.","C"],["Uma jornada de fé, cujos detalhes são um mistério.","L"],["Um processo de “theosis” ou deificação, tornando-se participantes da natureza divina através da graça.","C"],["Fé em Cristo, que é expressa e se torna real através de uma vida de amor e boas obras.","CP"],["Viver uma vida justa e trabalhar pela transformação social.","L"],["Somente pela fé (Sola Fide) em Jesus Cristo.","P"]]],
["A Bíblia deve ser interpretada…",[["Com a orientação da tradição da Igreja e do Magistério.","C"],["Como a palavra de Deus, melhor compreendida através da oração, estudo e discussão comunitária.","PL"],["Em oração pelo indivíduo, guiado pelo Espírito Santo.","P"],["Literalmente, como a palavra infalível e direta de Deus.","P"],["Como uma grande narrativa abrangente da relação de Deus com a criação, na qual se deve entrar imaginativamente.","PL"],["Usando métodos críticos modernos e reconhecendo seus elementos humanos.","L"]]],
["Em questões de ética social, a Igreja deve…",[["Sustentar verdades morais atemporais reveladas na tradição.","C"],["Fomentar o diálogo e permitir uma diversidade de opiniões.","L"],["Aplicar os princípios cristãos centrais de amor e justiça às questões contemporâneas, mesmo que isso leve a novas conclusões.","L"],["Aderir estritamente aos mandamentos morais explicitamente encontrados na Bíblia.","P"],["Crer com base na lei natural e no raciocínio moral universal, acessível a todas as pessoas de boa vontade.","C"],["Adaptar seus ensinamentos à luz de novas compreensões científicas e sociais.","L"]]],
["O papel dos bispos é…",[["Ser servos dos servos de Deus, definidos principalmente pelo seu cuidado pastoral e disposição para sofrer pelo rebanho.","CP"],["Governar a igreja como sucessores dos Apóstolos.","C"],["Uma estrutura histórica, mas não essencial para uma igreja válida.","P"],["Ser um sinal de unidade e continuidade histórica, servindo como pastores e mestres principais.","C"],["Uma função administrativa que pode ser reformada ou reimaginada.","L"],["Prover supervisão pastoral e manter a unidade.","PC"]]],
["Arte e beleza na arquitetura da igreja…",[["São essenciais para glorificar a Deus e inspirar a adoração.","C"],["São agradáveis, mas secundárias à função do espaço.","PL"],["Devem ser sustentáveis, usando materiais e luz naturais, para refletir a criação de Deus e nosso chamado à mordomia.","L"],["Podem ser uma fonte potencial de idolatria e devem ser mínimas.","P"],["Devem ser usadas para edificar os fiéis e ensinar a fé, mas com simplicidade para evitar distração.","PC"],["Devem refletir a cultura e a criatividade da comunidade local.","L"]]],
["Outras religiões mundiais…",[["São caminhos válidos para o divino e devem ser engajadas abertamente.","L"],["São caminhos falsos; a salvação é somente através de Jesus.","P"],["Deus pode operar fora da Igreja visível, mas Cristo é a revelação única e completa de Deus.","PC"],["Podem conter elementos de verdade, mas a plenitude da verdade reside na Igreja.","C"],["Pessoas de outras fés podem ser salvas através de Cristo, mesmo que não o conheçam pelo nome (“cristãos anônimos”).","CL"],["São oportunidades para o diálogo inter-religioso e aprendizado mútuo.","L"]]],
["Minha vida de oração está centrada em…",[["O Ofício Divino, terço ou outras devoções formais.","C"],["Práticas corporais como caminhar por um labirinto, peregrinação ou usar contas de oração.","LC"],["Oração espontânea e estudo bíblico pessoal.","P"],["Uma mistura de oração litúrgica (como o Ofício Divino) e oração pessoal e espontânea.","CP"],["Meditação, mindfulness ou engajamento com o trabalho de justiça social.","L"],["As orações estruturadas do Livro de Oração Comum.","C"]]],
["O termo “Católico” significa principalmente…",[["A igreja universal, que é “reformada” e está em continuidade com os apóstolos, distinta da comunhão romana.","CP"],["Universal, inclusivo e que abrange toda a humanidade.","L"],["Uma referência à Igreja antiga e indivisa.","PC"],["Um termo a ser visto com cautela devido à sua associação com Roma.","P"],["Adesão à fé da Igreja una, santa, católica e apostólica.","C"],["Um compromisso com os pobres e marginalizados, refletindo o amor universal de Deus por todos.","L"]]],
["Confissão e Absolvição é…",[["Uma prática corporativa onde a comunidade confessa seu papel no pecado sistêmico e busca reconciliação.","L"],["Suficiente na confissão geral, mas a confissão privada é um recurso valioso quando necessário.","CP"],["Tratado diretamente entre o indivíduo e Deus.","P"],["Realizado de forma significativa através da confissão geral no culto corporativo.","PL"],["Um sacramento vital para o perdão dos pecados, idealmente com um sacerdote.","C"],["Uma prática terapêutica, mas não um requisito para o perdão.","L"]]],
["A missão primária da Igreja é…",[["Administrar os sacramentos e trazer as pessoas para a fé apostólica.","C"],["Proclamar as Boas Novas, ensinar, responder às necessidades, transformar a sociedade e proteger a criação (Cinco Marcas da Missão).","LC"],["Pregar o Evangelho e evangelizar o mundo para a conversão pessoal.","P"],["Construir a “Comunidade Amada” — uma sociedade baseada na justiça, igualdade de oportunidades e amor ao próximo.","L"],["Adorar a Deus e construir uma comunidade amorosa.","CP"],["Ser uma voz para os marginalizados e desafiar sistemas injustos.","L"]]],
["Ao considerar a ordenação de mulheres, eu acredito que…",[["É uma questão de justiça e reflete a igualdade de todos em Cristo.","L"],["É contrário à tradição apostólica e à Escritura.","C"],["É um desenvolvimento válido da tradição, embora eu respeite opiniões divergentes.","LC"],["Embora a tradição seja apenas masculina, o Espírito pode estar fazendo algo novo em nosso tempo.","L"],["É permissível se um corpo eclesiástico se sentir guiado pelo Espírito, mas não é obrigatório.","PL"],["É uma questão secundária que infelizmente dividiu a igreja; a unidade é mais importante que uma decisão final.","CP"]]],
["As vestes clericais para a Eucaristia deveriam idealmente consistir em…",[["O conjunto completo: amito, alva, cíngulo, manípulo, estola e casula. Significam a sacralidade do ofício.","C"],["O tradicional Hábito Coral Anglicano: uma batina, sobrepeliz e uma estola ou “tippet”. É digno e historicamente fundamentado.","CP"],["Nenhuma veste é necessária além do que é exigido pela decência; elas podem criar uma barreira entre o clero e os leigos.","P"],["Um simples terno ou colarinho clerical com roupas de rua. O objetivo é ser acessível e profissional.","PL"],["As vestes são opcionais e podem ser adaptadas à cultura local, ou dispensadas, para promover um sentido de inclusão.","L"],["Uma simples alva e estola é suficiente. É antigo, ecumênico e evita ritualismo excessivo.","PC"]]]
];
const $=id=>document.getElementById(id);
const ans=[];let cur=0,user={};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));


function chk(){$('ini').disabled=!($('nome').value.trim()&&$('par').value.trim())}
$('nome').oninput=$('par').oninput=chk;
$('ini').onclick=()=>{user={nome:$('nome').value.trim(),par:$('par').value.trim()};$('s0').classList.add('hide');$('s1').classList.remove('hide');show()};

function show(){
  const [q,o]=Q[cur];
  $('prog').textContent=`Pergunta ${cur+1} de ${Q.length}`;
  $('pb').style.width=(cur/Q.length*100)+'%';
  $('q').textContent=q;
  $('opts').innerHTML='';
  o.forEach((x,i)=>{const b=document.createElement('button');b.className='opt'+(ans[cur]===i?' sel':'');b.textContent=x[0];
    b.onclick=()=>{ans[cur]=i;show()};$('opts').appendChild(b)});
  $('volta').disabled=cur===0;
  $('prox').disabled=ans[cur]===undefined;
  $('prox').textContent=cur===Q.length-1?'Ver resultado':'Próxima →';
}
$('volta').onclick=()=>{cur--;show()};
$('prox').onclick=()=>{if(cur<Q.length-1){cur++;show()}else finish()};

function score(){
  const t={C:0,L:0,P:0};
  ans.forEach((a,i)=>{const code=Q[i][1][a][1];t[code[0]]+=2;if(code[1])t[code[1]]+=1});
  const s=t.C+t.L+t.P;
  return {c:Math.round(t.C/s*100),l:Math.round(t.L/s*100),p:100-Math.round(t.C/s*100)-Math.round(t.L/s*100)};
}
let all=[],me=null;
async function finish(){
  const r=score();
  me={...user,...r,t:Date.now()};
  $('s1').classList.add('hide');$('s2').classList.remove('hide');
  const top=Object.entries({C:r.c,L:r.l,P:r.p}).sort((a,b)=>b[1]-a[1])[0][0];
  $('rt').textContent=`${user.nome}, você se aproxima mais do eixo ${A[top]}`;
  $('bars').innerHTML=[['C','Católico',r.c,'--c'],['L','Liberal',r.l,'--l'],['P','Protestante',r.p,'--p']]
   .map(x=>`<div class="row"><b>${x[1]}</b><div class="bar"><i style="width:${x[2]}%;background:var(${x[3]})"></i></div><span>${x[2]}%</span></div>`).join('');
  all=[me];draw();
  if(ok()){
    try{
      await salvar(me);
      all=await carregar();
      if(!all.some(x=>x.t===me.t))all.push(me);
      draw();
      $('aviso').textContent='Os resultados de todos que fizeram o teste aparecem acima.';
    }catch(e){$('aviso').textContent='Não foi possível salvar/carregar os resultados compartilhados.'}
  }else $('aviso').textContent='Banco de dados não configurado: só o seu resultado é exibido.';
}

function draw(){
  const W=520,H=470,V={C:[260,50],L:[50,410],P:[470,410]};
  const pt=r=>{const s=r.c+r.l+r.p||1;return [(r.c*V.C[0]+r.l*V.L[0]+r.p*V.P[0])/s,(r.c*V.C[1]+r.l*V.L[1]+r.p*V.P[1])/s]};
  let g='';
  [25,50,75].forEach(k=>{const f=k/100,m=(a,b)=>[a[0]*f+b[0]*(1-f),a[1]*f+b[1]*(1-f)];
    // linhas de grade paralelas aos lados
    const p1=m(V.C,V.L),p2=m(V.C,V.P),q1=m(V.L,V.C),q2=m(V.L,V.P),u1=m(V.P,V.C),u2=m(V.P,V.L);
    [[p1,p2],[q1,q2],[u1,u2]].forEach(l=>g+=`<line x1="${l[0][0]}" y1="${l[0][1]}" x2="${l[1][0]}" y2="${l[1][1]}" stroke="var(--bd)" stroke-dasharray="3 4"/>`)});
  g+=`<polygon points="${V.C} ${V.L} ${V.P}" fill="none" stroke="var(--mu)" stroke-width="1.5"/>`;
  g+=`<text x="260" y="32" text-anchor="middle" font-weight="bold" fill="var(--c)">Católico</text>
  <text x="50" y="436" text-anchor="middle" font-weight="bold">Liberal</text>
  <text x="470" y="436" text-anchor="middle" font-weight="bold">Protestante</text>`;
  const others=all.filter(x=>x.t!==me.t);
  others.forEach(x=>{const [px,py]=pt(x);
    g+=`<circle cx="${px}" cy="${py}" r="7" fill="var(--ac)" fill-opacity=".55" stroke="var(--card)"><title>${esc(x.nome)} – ${esc(x.par)}</title></circle>`});
  const [mx,my]=pt(me);
  g+=`<circle cx="${mx}" cy="${my}" r="11" fill="var(--c)" stroke="var(--tx)" stroke-width="2.5"><title>Você</title></circle>
  <text x="${mx}" y="${my-17}" text-anchor="middle" font-weight="bold">Você</text>`;
  $('chart').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico triangular dos resultados">${g}</svg>
  <p class="mu">● roxo: outros participantes (passe o cursor para ver nome e paróquia) · ● vermelho: você</p>`;
  const rows=[...all].sort((a,b)=>b.t-a.t);
  $('tb').innerHTML='<tr><th>Nome</th><th>Paróquia</th><th>Católico</th><th>Liberal</th><th>Protestante</th></tr>'+
   rows.map(x=>`<tr${x.t===me.t?' style="font-weight:bold"':''}><td>${esc(x.nome)}</td><td>${esc(x.par)}</td><td>${x.c}%</td><td>${x.l}%</td><td>${x.p}%</td></tr>`).join('');
}
