// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  classes;
  activities;
  seminars;
  reflections;
  currentClassId;
  currentActivityId;
  currentSeminarId;
  currentReflectionId;
  constructor() {
    this.classes = /* @__PURE__ */ new Map();
    this.activities = /* @__PURE__ */ new Map();
    this.seminars = /* @__PURE__ */ new Map();
    this.reflections = /* @__PURE__ */ new Map();
    this.currentClassId = 1;
    this.currentActivityId = 1;
    this.currentSeminarId = 1;
    this.currentReflectionId = 1;
    this.initializeData();
  }
  initializeData() {
    const classesData = [
      {
        date: "31/03/2025",
        title: "Modo Quilombola e Fundamentos da Ginga",
        content: "No dia 31/03 vimos sobre o modo quilombola de viver e sua profunda influ\xEAncia sobre a capoeiragem. Os quilombos eram comunidades de resist\xEAncia onde ex-escravizados desenvolveram formas \xFAnicas de organiza\xE7\xE3o social, cultural e de defesa. Aprendemos como essa viv\xEAncia comunit\xE1ria influenciou diretamente os movimentos, a musicalidade e a filosofia da Capoeira. Na pr\xE1tica, refor\xE7amos a ginga - movimento base fundamental que representa a fluidez e mal\xEDcia da Capoeira - e acrescentamos as esquivas b\xE1sicas como cocorinha, negativa e rol\xEA. A metodologia TGfU (Teaching Games for Understanding) foi aplicada para entender os fundamentos da movimenta\xE7\xE3o atrav\xE9s de jogos e situa\xE7\xF5es pr\xE1ticas, onde primeiro vivenciamos os movimentos em contexto l\xFAdico antes de sistematizar tecnicamente.",
        location: "Sala 3 DEF + Gin\xE1sio I COESPE",
        tags: ["Hist\xF3ria", "Pr\xE1tica", "Quilombos", "TGfU"],
        type: "mixed"
      },
      {
        date: "02/04/2025",
        title: "Estudo Dirigido - Guerras pela Independ\xEAncia",
        content: "No dia 02/04 tivemos uma atividade n\xE3o presencial devido \xE0 infec\xE7\xE3o respirat\xF3ria do professor. Realizamos um estudo dirigido focado nas guerras pela independ\xEAncia do Brasil, explorando especificamente a participa\xE7\xE3o dos povos ind\xEDgenas, escravizados e capoeiristas nesse processo hist\xF3rico. Descobrimos como a Capoeira serviu como ferramenta de resist\xEAncia e organiza\xE7\xE3o durante os conflitos, sendo praticada por soldados e quilombolas. Estudamos casos documentados de capoeiristas que participaram das lutas pela independ\xEAncia, desmistificando a ideia de que apenas as elites participaram desse processo. A atividade culminou com a prepara\xE7\xE3o para uma Roda de Capoeira que fecharia o ciclo da metodologia TGfU, integrando todo o conhecimento hist\xF3rico vivenciado na pr\xE1tica corporal.",
        location: "Atividade n\xE3o presencial",
        tags: ["Hist\xF3ria", "Estudo Dirigido", "TGfU"],
        type: "theory"
      },
      {
        date: "07/04/2025",
        title: "Adapta\xE7\xE3o - Guerras pela Independ\xEAncia e TGfU",
        content: "No dia 07/04 adaptamos nosso cronograma para recuperar a aula anterior. Aprofundamos o tema das guerras pela independ\xEAncia do Brasil, distinguindo mitos de fatos hist\xF3ricos sobre a participa\xE7\xE3o de ind\xEDgenas, escravizados e ex-escravizados. Vimos como a historiografia tradicional omitiu ou minimizou essas participa\xE7\xF5es, enquanto pesquisas recentes revelam protagonismo desses grupos. Na parte pr\xE1tica, aplicamos a metodologia TGfU aos fundamentos b\xE1sicos da movimenta\xE7\xE3o da Capoeira. O TGfU consiste em uma abordagem pedag\xF3gica que parte do jogo/situa\xE7\xE3o-problema para depois sistematizar a t\xE9cnica, desenvolvendo primeiro a consci\xEAncia t\xE1tica. Praticamos movimentos como ginga, esquivas e deslocamentos em situa\xE7\xF5es de jogo antes de decompor tecnicamente cada movimento.",
        location: "Sala 3 + Gin\xE1sio I COESPE",
        tags: ["Hist\xF3ria", "Pr\xE1tica", "Independ\xEAncia", "TGfU"],
        type: "mixed"
      },
      {
        date: "09/04/2025",
        title: "Guerra do Paraguai, Lei \xC1urea e Rep\xFAblica",
        content: "No dia 09/04 estudamos a Guerra do Paraguai (1864-1870) e sua rela\xE7\xE3o com a Capoeira. Vimos como muitos capoeiristas foram recrutados for\xE7osamente ou se alistaram voluntariamente, levando suas habilidades de luta para o campo de batalha. Analisamos o per\xEDodo da Lei \xC1urea (1888) e da Proclama\xE7\xE3o da Rep\xFAblica (1889), momentos cruciais quando a Capoeira transitou de pr\xE1tica de resist\xEAncia escrava para arte criminalizada no c\xF3digo penal republicano. Realizamos uma Roda de Capoeira fechando nosso primeiro ciclo de aplica\xE7\xE3o da metodologia TGfU, integrando todos os movimentos e conhecimentos hist\xF3ricos vivenciados. Tamb\xE9m organizamos o evento 'Roda de Capoeira do Dia dos Povos Origin\xE1rios' como atividade de reposi\xE7\xE3o, conectando a ancestralidade ind\xEDgena com a capoeiragem.",
        location: "Sala 3 + Gin\xE1sio COESPE",
        tags: ["Hist\xF3ria", "Rep\xFAblica", "TGfU", "Roda"],
        type: "mixed"
      },
      {
        date: "14/04/2025",
        title: "Movimentos de Ataque via TGfU e Kalixto",
        content: "No dia 14/04 focamos na pr\xE1tica de movimentos de ataque na Capoeira utilizando a metodologia TGfU. Aprendemos golpes como martelo, queixada, armada e meia-lua de compasso atrav\xE9s de situa\xE7\xF5es de jogo, onde primeiro experimentamos os movimentos em contexto de aplica\xE7\xE3o para depois refinar a t\xE9cnica. Analisamos as ilustra\xE7\xF5es hist\xF3ricas de Angelo Agostini (Kalixto), caricaturista carioca que documentou as famosas maltas de Capoeira na transi\xE7\xE3o do imp\xE9rio para a rep\xFAblica no Rio de Janeiro. Suas obras retratam os capoeiras cariocas em a\xE7\xE3o, mostrando a eleg\xE2ncia e efici\xEAncia dos movimentos, al\xE9m do contexto urbano da \xE9poca. Essas imagens nos ajudaram a compreender como a Capoeira era praticada no s\xE9culo XIX e sua import\xE2ncia social nas ruas do Rio.",
        location: "Gin\xE1sio COESPE",
        tags: ["Pr\xE1tica", "Arte", "Hist\xF3ria", "TGfU", "Kalixto"],
        type: "practice"
      },
      {
        date: "16/04/2025",
        title: "Primeiras Escolas e Descriminaliza\xE7\xE3o",
        content: "No dia 16/04 estudamos as primeiras escolas formais de Capoeira e o processo de descriminaliza\xE7\xE3o. Vimos como Mestre Bimba criou a Luta Regional Baiana (1932) e Mestre Pastinha sistematizou a Capoeira Angola, transformando uma pr\xE1tica marginalizada em arte reconhecida. Analisamos como a Capoeira foi incorporada ao projeto nacionalista de Get\xFAlio Vargas como s\xEDmbolo da brasilidade, deixando de ser crime para tornar-se patrim\xF4nio cultural. Participamos de uma Roda de Capoeira onde aplicamos os conhecimentos te\xF3ricos na pr\xE1tica. Organizamos a turma em 3 grupos para preparar o evento 'Roda de Capoeira do Dia dos Povos Origin\xE1rios', integrando a ancestralidade ind\xEDgena com a tradi\xE7\xE3o afro-brasileira da Capoeira, demonstrando como diferentes culturas se entrela\xE7am na forma\xE7\xE3o da identidade brasileira.",
        location: "Sala 3 DEF + Gin\xE1sio I COESPE",
        tags: ["Hist\xF3ria", "Pol\xEDtica", "Evento", "Descriminaliza\xE7\xE3o"],
        type: "mixed"
      },
      {
        date: "28/04/2025",
        title: "Fechamento de Notas e Semin\xE1rio",
        content: "No dia 28/04 realizamos o fechamento das notas de participa\xE7\xE3o e encaminhamento da avalia\xE7\xE3o do minievento que organizamos. Foi um momento importante para refletir sobre nosso engajamento durante as aulas e atividades pr\xE1ticas. Preparamos o Semin\xE1rio de Atualiza\xE7\xE3o Cient\xEDfica em Capoeira do dia 5 de maio, definindo os crit\xE9rios avaliativos que contemplariam tr\xEAs dimens\xF5es: conceitual (1,0 ponto) - demonstrando dom\xEDnio te\xF3rico do tema; procedimental (1,0 ponto) - apresenta\xE7\xE3o clara e did\xE1tica; e atitudinal (0,5 pontos) - postura colaborativa e respeitosa. Essa estrutura avaliativa reflete a filosofia da Capoeira, que integra conhecimento, habilidade e car\xE1ter. Cada grupo ficou respons\xE1vel por apresentar pesquisas cient\xEDficas recentes (2023 em diante) relacionando diferentes \xE1reas do conhecimento com a Capoeira.",
        location: "Sala 3 DEF",
        tags: ["Avalia\xE7\xE3o", "Semin\xE1rio", "Notas"],
        type: "theory"
      },
      {
        date: "30/04/2025",
        title: "Artesanato na Capoeira - Confec\xE7\xE3o do Berimbau",
        content: "No dia 30/04 mergulhamos no artesanato da Capoeira com foco na confec\xE7\xE3o do Berimbau, instrumento principal da orquestra capoeir\xEDstica. Aprendemos sobre a escolha da madeira (tradicionalmente biriba), a prepara\xE7\xE3o do arame, da caba\xE7a e do dobr\xE3o (moeda antiga ou pedra lisa). Compreendemos a import\xE2ncia desse conhecimento artesanal que conecta o capoeirista com suas ra\xEDzes culturais e desenvolve uma rela\xE7\xE3o \xEDntima com o instrumento. Fechamos com uma Roda de Capoeira aplicando toda a metodologia TGfU vivenciada at\xE9 ent\xE3o, integrando movimentos, ritmos e conhecimentos culturais. Foi um momento especial onde pudemos experimentar os toques b\xE1sicos no berimbau confeccionado e sentir como o instrumento comanda o jogo na roda.",
        location: "Gin\xE1sio COESPE",
        tags: ["Artesanato", "Berimbau", "TGfU", "Roda"],
        type: "practice"
      },
      {
        date: "05/05/2025",
        title: "Semin\xE1rio de Atualiza\xE7\xE3o Cient\xEDfica",
        content: "No dia 05/05 realizamos nosso Semin\xE1rio de Atualiza\xE7\xE3o Cient\xEDfica, um marco importante da disciplina. Os 8 grupos apresentaram pesquisas atualizadas (artigos de 2023 em diante) conectando diferentes \xE1reas do conhecimento com a Capoeira: Filosofia e Capoeira - explorando a dimens\xE3o existencial e \xE9tica; Hist\xF3ria - contextualizando per\xEDodos espec\xEDficos; Antropologia - analisando rituais e simbolismos; Arte - manifesta\xE7\xF5es est\xE9ticas e criativas; Pedagogia do Esporte - metodologias de ensino; Fisiologia do Exerc\xEDcio - aspectos metab\xF3licos e adaptativos; Biomec\xE2nica - an\xE1lise dos movimentos; e Anatomia do Movimento - estruturas corporais envolvidas. Foi enriquecedor ver como a Capoeira dialoga com tantas disciplinas acad\xEAmicas, confirmando sua complexidade e riqueza como objeto de estudo multidisciplinar.",
        location: "Sala 3 DEF",
        tags: ["Semin\xE1rio", "Ci\xEAncia", "Apresenta\xE7\xE3o"],
        type: "theory"
      },
      {
        date: "07/05/2025",
        title: "Grupos Restantes e Projeto IPHAN",
        content: "No dia 07/05 assistimos \xE0s apresenta\xE7\xF5es dos grupos restantes do semin\xE1rio: 'Capoeira e les\xF5es' - abordando preven\xE7\xE3o e reabilita\xE7\xE3o de les\xF5es comuns na pr\xE1tica; e 'Capoeira e dan\xE7a' - explorando as fronteiras entre luta e arte perform\xE1tica. Conhecemos o Projeto 'Mestres e Grupos de Capoeira do RN', uma iniciativa de mapeamento e registro dos grupos ativos no estado. Exploramos o s\xEDtio eletr\xF4nico da Capoeira no IPHAN, compreendendo como nossa arte foi reconhecida como Patrim\xF4nio Cultural Imaterial do Brasil e da Humanidade pela UNESCO. Organizamos grupos para presta\xE7\xE3o de servi\xE7o de utilidade p\xFAblica, contribuindo para o registro oficial dos Grupos de Capoeira do RN no portal do IPHAN, conectando nossa experi\xEAncia acad\xEAmica com a preserva\xE7\xE3o cultural.",
        location: "Sala 3 DEF",
        tags: ["Semin\xE1rio", "IPHAN", "Projeto", "Registro"],
        type: "theory"
      },
      {
        date: "12/05/2025",
        title: "Plantas na Capoeira e Prepara\xE7\xE3o F\xEDsica",
        content: "No dia 12/05 estudamos as plantas na Capoeira e seu papel fundamental na tradi\xE7\xE3o capoeir\xEDstica. Aprendemos sobre a caba\xE7a (Lagenaria siceraria), planta essencial para confec\xE7\xE3o do berimbau, acompanhando todo o processo desde o plantio at\xE9 a secagem e prepara\xE7\xE3o do instrumento. Vimos tamb\xE9m outras plantas usadas na Capoeira como ervas medicinais e ritualisticas. Iniciamos nossa atividade de visita\xE7\xE3o ao IPHAN para compreender o processo de registro patrimonial. Na prepara\xE7\xE3o f\xEDsica, focamos nos aspectos espec\xEDficos para a Capoeira: flexibilidade, for\xE7a funcional, equil\xEDbrio e coordena\xE7\xE3o. Cada estudante relatou o desenvolvimento de sua muda de caba\xE7a, conectando teoria bot\xE2nica com pr\xE1tica cultural.",
        location: "Sala 3 + poss\xEDvel pr\xE1tica",
        tags: ["Bot\xE2nica", "Prepara\xE7\xE3o", "IPHAN", "Caba\xE7a"],
        type: "mixed"
      },
      {
        date: "14/05/2025",
        title: "Fundamentos da Capoeira Angola - In\xEDcio",
        content: "No dia 14/05 iniciamos os ensinamentos sobre os fundamentos da Capoeira Angola, o estilo mais tradicional e ancestral da arte. Aprendemos sobre a filosofia angoleira: jogo baixo, pr\xF3ximo ao ch\xE3o, movimentos lentos e estrat\xE9gicos que privilegiam a mal\xEDcia e a mandinga sobre a acrobacia. Praticamos a ginga angoleira, mais cadenciada que a regional, e movimentos b\xE1sicos como cocorinha, negativa e rasteira. Vivenciamos uma Roda de Angola aut\xEAntica com o toque caracter\xEDstico do berimbau Angola. Organizamos nossa visita ao espa\xE7o do Mestre Igor da Capoeira Nacional (grupo de Angola), onde pudemos observar a tradi\xE7\xE3o sendo preservada e transmitida na pr\xE1tica cotidiana de um grupo tradicional.",
        location: "Sala 3 + Gin\xE1sio",
        tags: ["Angola", "Pr\xE1tica", "Fundamentos", "Mestre Igor"],
        type: "mixed"
      },
      {
        date: "19/05/2025",
        title: "Movimentos da Capoeira Angola - Aprofundamento",
        content: "No dia 19/05 aprofundamos nossa pr\xE1tica nos movimentos caracter\xEDsticos da Capoeira Angola. Trabalhamos a movimenta\xE7\xE3o baixa e maliciosa, diferente da Regional: esquivas mais demoradas, transi\xE7\xF5es fluidas entre os movimentos, e o jogo de corpo que valoriza a estrat\xE9gia. Aprendemos as formas tradicionais de chamada: 'p\xE9 do berimbau' (forma respeitosa de entrar na roda) e 'passo a dois' (quando dois capoeiras iniciam juntos). Exploramos diferentes estilos de jogos angoleiros: o jogo de dentro (mais pr\xF3ximo), o jogo de fora (com mais dist\xE2ncia) e o jogo de amarrar (onde se 'prende' o oponente). Continuamos compreendendo como a Angola preserva a ess\xEAncia ancestral da Capoeira, priorizando a sabedoria e experi\xEAncia sobre a for\xE7a bruta.",
        location: "Gin\xE1sio COESPE",
        tags: ["Angola", "Pr\xE1tica", "Movimentos", "Chamada"],
        type: "practice"
      },
      {
        date: "21/05/2025",
        title: "Roda de Capoeira Angola - Fechamento do Ciclo",
        content: "No dia 21/05 fechamos nosso ciclo de TGfU com uma Roda de Capoeira Angola completa e aut\xEAntica. Foi o momento de integrar todo o aprendizado te\xF3rico e pr\xE1tico sobre esta modalidade ancestral. Aplicamos os movimentos aprendidos, respeitamos o ritual da ladainha, participamos do coro das chulas e vivenciamos o jogo lento e estrat\xE9gico caracter\xEDstico da Angola. Detalhamos nossa visita ao espa\xE7o do Mestre Igor, onde discutimos sobre o formul\xE1rio do IPHAN para registro no Portal da Capoeira, conectando nossa experi\xEAncia acad\xEAmica com o trabalho de preserva\xE7\xE3o cultural que os Mestres realizam. Foi emocionante sentir a continuidade dessa tradi\xE7\xE3o que atravessa s\xE9culos e se mant\xE9m viva atrav\xE9s da transmiss\xE3o oral e corporal.",
        location: "Gin\xE1sio COESPE",
        tags: ["Angola", "Roda", "TGfU", "IPHAN"],
        type: "practice"
      },
      {
        date: "26/05/2025",
        title: "Capoeira Regional - M\xE9todo de Mestre Bimba",
        content: "No dia 26/05 mergulhamos completamente na Capoeira Regional Baiana de Mestre Bimba (Sr. Manuel dos Reis Machado), o criador desta modalidade revolucion\xE1ria. Praticamos o m\xE9todo sistem\xE1tico das 8 sequ\xEAncias de Mestre Bimba, movimentos encadeados que desenvolvem coordena\xE7\xE3o, t\xE9cnica e fluidez. Aprendemos sobre os 'bal\xF5es cinturados', sistema de gradua\xE7\xE3o por cordas coloridas que Bimba criou. Experimentamos os tr\xEAs toques principais da Regional: Banguela (toque lento para iniciantes), S\xE3o Bento Grande de Regional (toque m\xE9dio da regional) e I\xFAna (toque r\xE1pido e desafiador). Foi fascinante compreender como Bimba modernizou a Capoeira, criando uma metodologia de ensino que a tirou da marginalidade e a levou \xE0s universidades, sem perder sua ess\xEAncia combativa.",
        location: "Gin\xE1sio COESPE",
        tags: ["Regional", "Bimba", "Sequ\xEAncia", "Toques", "Banguela"],
        type: "practice"
      },
      {
        date: "28/05/2025",
        title: "Roda de Capoeira Regional - Extens\xE3o",
        content: "No dia 28/05 vivenciamos uma Roda de Capoeira Regional no retorno do ciclo TGfU, desta vez em intera\xE7\xE3o com o projeto de extens\xE3o 'Capoeira do Brasil'. Foi uma aula eminentemente pr\xE1tica onde pudemos aplicar o m\xE9todo de Mestre Bimba aprendido anteriormente. A intera\xE7\xE3o com o projeto de extens\xE3o trouxe uma perspectiva mais ampla sobre como a Capoeira sai dos muros da universidade e se conecta com a comunidade. Organizamos os grupos para as visitas programadas aos espa\xE7os culturais, fortalecendo a ponte entre teoria acad\xEAmica e pr\xE1tica social. O ciclo TGfU se completou novamente, mas agora com a consci\xEAncia de que a Capoeira precisa ser vivenciada al\xE9m da sala de aula para permanecer viva como manifesta\xE7\xE3o cultural.",
        location: "Gin\xE1sio COESPE",
        tags: ["Regional", "Roda", "Extens\xE3o", "TGfU"],
        type: "practice"
      },
      {
        date: "16/06/2025",
        title: "Aspectos Folcl\xF3ricos Independentes da Capoeira",
        content: "No dia 16/06 exploramos aspectos folcl\xF3ricos associados \xE0 cultura da capoeiragem, mas que tamb\xE9m existem independentemente: Ijex\xE1 - ritmo sagrado do candombl\xE9 que influencia a musicalidade da Capoeira; Congado - festa afro-brasileira com dan\xE7as guerreiras similares aos movimentos capoeir\xEDsticos; Maculel\xEA - dan\xE7a de bast\xF5es que muitas vezes acompanha apresenta\xE7\xF5es de Capoeira; e Samba de Roda - express\xE3o cultural baiana que compartilha ra\xEDzes com a Capoeira. Analisamos como essas manifesta\xE7\xF5es culturais se entrela\xE7am, influenciam-se mutuamente e formam o rico mosaico da cultura afro-brasileira. Compreendemos que a Capoeira n\xE3o existe isolada, mas integrada a um universo cultural mais amplo que precisa ser preservado em sua totalidade.",
        location: "Gin\xE1sio COESPE",
        tags: ["Folclore", "Cultura", "Ijex\xE1", "Congado", "Maculel\xEA"],
        type: "mixed"
      },
      {
        date: "18/06/2025",
        title: "Roda de Conversa - Cultivo da Caba\xE7a",
        content: "No dia 18/06 realizamos uma emocionante roda de conversa sobre nosso processo de cultivo da caba\xE7a. Cada estudante compartilhou sua experi\xEAncia \xFAnica: sucessos, desafios, descobertas e frustra\xE7\xF5es no cultivo. Alguns trouxeram mudas vigorosas, outros relataram dificuldades na germina\xE7\xE3o. Essa diversidade de experi\xEAncias refletiu como a Capoeira \xE9: cada um tem seu tempo, seu jeito, sua jornada. Distribu\xEDmos mais sementes para quem n\xE3o conseguiu germinar, demonstrando que na Capoeira sempre h\xE1 uma nova chance. Plantamos mudas na horta do Departamento de Nutri\xE7\xE3o, criando um legado vivo da disciplina. O lan\xE7amento das notas sobre o cultivo das plantas valorizou n\xE3o apenas o resultado, mas todo o processo de aprendizado, conectando paci\xEAncia, cuidado e conhecimento - valores fundamentais da Capoeira.",
        location: "Horta DEF Nutri\xE7\xE3o",
        tags: ["Plantas", "Caba\xE7a", "Experi\xEAncia", "Avalia\xE7\xE3o"],
        type: "theory"
      },
      {
        date: "23/06/2025",
        title: "Floreios na Capoeira e Est\xE9tica",
        content: "No dia 23/06 exploramos os floreios na Capoeira e suas profundas rela\xE7\xF5es com o campo da est\xE9tica. Os floreios s\xE3o movimentos acrob\xE1ticos que embelezam o jogo: saltos, giros, parafusos e mortais que transformam a luta em arte visual. Praticamos diferentes floreios adaptados \xE0s nossas habilidades individuais, compreendendo como cada movimento carrega significado est\xE9tico e expressivo. Discutimos durante a pr\xE1tica como a Capoeira transcende a funcionalidade combativa para tornar-se express\xE3o art\xEDstica, onde beleza e efici\xEAncia se complementam. O texto no SIGAA fomentou reflex\xF5es sobre como os floreios comunicam personalidade, criatividade e dom\xEDnio t\xE9cnico, sendo fundamentais para a dimens\xE3o espetacular da Capoeira que encanta plateias no mundo inteiro.",
        location: "Gin\xE1sio COESPE",
        tags: ["Floreios", "Est\xE9tica", "Arte", "Pr\xE1tica"],
        type: "practice"
      },
      {
        date: "25/06/2025",
        title: "Prepara\xE7\xE3o F\xEDsica, Portf\xF3lio e Musicalidade",
        content: "No dia 25/06, nossa aula final, integramos m\xFAltiplas dimens\xF5es do aprendizado. Visitamos laborat\xF3rios e a sala de muscula\xE7\xE3o para reflex\xE3o cr\xEDtica sobre prepara\xE7\xE3o f\xEDsica na Capoeira, comparando m\xE9todos tradicionais (usado pelos antigos mestres) com abordagens cient\xEDficas modernas. Compreendemos que a Capoeira desenvolve for\xE7a funcional, flexibilidade, coordena\xE7\xE3o e resist\xEAncia de forma integrada, diferente de treinos isolados. Foi apresentado o modelo de portf\xF3lio - nossa forma de sistematizar e refletir sobre todo o aprendizado do semestre, conectando teoria, pr\xE1tica e viv\xEAncia pessoal. Planejamos a semana de musicalidade na Capoeira, explorando como ritmo, canto e instrumentos s\xE3o fundamentais para manter viva essa arte. Encerramos com a certeza de que levaremos a Capoeira para al\xE9m da universidade, mantendo-a viva em nossas pr\xE1ticas e comunidades.",
        location: "Sala 3 + Laborat\xF3rios + Muscula\xE7\xE3o",
        tags: ["Prepara\xE7\xE3o", "Portf\xF3lio", "Musicalidade", "Laborat\xF3rio"],
        type: "mixed"
      }
    ];
    classesData.forEach((classData) => this.createClass(classData));
    const activitiesData = [
      {
        title: "Entrega das Sementes de Caba\xE7a",
        description: "Primeira imagem do projeto: entrega das sementes de caba\xE7a aos alunos, marcando o in\xEDcio do processo de cultivo que conecta teoria e pr\xE1tica. Cada estudante recebeu sementes para germinar em casa, compreendendo o ciclo completo desde o plantio at\xE9 a confec\xE7\xE3o do berimbau.",
        date: "In\xEDcio do semestre",
        imageUrl: "/src/public/image5.jpeg",
        category: "practice"
      },
      {
        title: "Roda de Capoeira na Aula - 21/05",
        description: "Segunda imagem registrada: roda de capoeira realizada em aula no dia 21/05, fechamento do ciclo TGfU com Capoeira Angola. Momento de aplica\xE7\xE3o pr\xE1tica dos fundamentos aprendidos, com participa\xE7\xE3o ativa de todos os estudantes na roda tradicional.",
        date: "21/05/2025",
        imageUrl: "/src/public/image6.jpeg",
        category: "practice"
      },
      {
        title: "Cartaz - Roda em Homenagem aos Povos Origin\xE1rios",
        description: "Terceira imagem: divulga\xE7\xE3o do cartaz para a roda em homenagem ao Dia dos Povos Origin\xE1rios. Evento organizado pelos alunos divididos em 3 grupos como atividade de reposi\xE7\xE3o, reconhecendo a contribui\xE7\xE3o ind\xEDgena fundamental na forma\xE7\xE3o da capoeira.",
        date: "19/04/2025",
        imageUrl: "/src/public/image7.jpeg",
        category: "event"
      },
      {
        title: "Encontro com Mestre Junior Orca - 12/06",
        description: "Quarta imagem registrada: encontro e homenagem ao Mestre Junior Orca no dia 12/06. Momento especial de conex\xE3o com a tradi\xE7\xE3o, fortalecendo os la\xE7os com mestres tradicionais e compreendendo a linhagem hist\xF3rica da capoeira no Rio Grande do Norte.",
        date: "12/06/2025",
        imageUrl: "/src/public/image8.jpeg",
        category: "event"
      }
    ];
    activitiesData.forEach((activity) => this.createActivity(activity));
    const seminarsData = [
      {
        groupNumber: 1,
        topic: "Filosofia e Capoeira",
        members: ["Normann", "Mariana", "Paulo Victor"],
        description: "An\xE1lise filos\xF3fica dos aspectos da capoeira"
      },
      {
        groupNumber: 2,
        topic: "Hist\xF3ria e Capoeira",
        members: ["Andr\xE9", "Jonatan", "Francisco"],
        description: "Estudo hist\xF3rico da capoeira no Brasil"
      },
      {
        groupNumber: 3,
        topic: "Antropologia e Capoeira",
        members: ["Joel", "Elbert"],
        description: "Aspectos antropol\xF3gicos da manifesta\xE7\xE3o cultural"
      },
      {
        groupNumber: 4,
        topic: "Arte e Capoeira",
        members: ["Alex", "Lucicledson"],
        description: "Express\xF5es art\xEDsticas na capoeira"
      },
      {
        groupNumber: 5,
        topic: "Pedagogia do Esporte e Capoeira",
        members: ["Josean", "Andr\xE9 Lucas", "Roberto"],
        description: "M\xE9todos pedag\xF3gicos aplicados \xE0 capoeira"
      },
      {
        groupNumber: 6,
        topic: "Fisiologia do Exerc\xEDcio e Capoeira",
        members: ["Brendha", "Laysia"],
        description: "Aspectos fisiol\xF3gicos da pr\xE1tica da capoeira"
      },
      {
        groupNumber: 7,
        topic: "Biomec\xE2nica e Capoeira",
        members: ["Victor Hugo", "Gustavo"],
        description: "An\xE1lise biomec\xE2nica dos movimentos"
      },
      {
        groupNumber: 8,
        topic: "Anatomia do Movimento e Capoeira",
        members: ["Carlos Vitor", "Pablo", "Jos\xE9"],
        description: "Estudo anat\xF4mico dos movimentos da capoeira"
      }
    ];
    seminarsData.forEach((seminar) => this.createSeminar(seminar));
    const reflectionsData = [
      {
        title: "A Din\xE2mica da Capoeira Viva",
        content: "Durante o semestre, compreendi que a metodologia do professor em nos levar constantemente para outros espa\xE7os - diferentes salas, gin\xE1sios, ambientes externos - reflete uma verdade fundamental sobre a capoeira: ela s\xF3 se mant\xE9m viva quando sai dos espa\xE7os tradicionais. A capoeira exige que tomemos a iniciativa de lev\xE1-la para onde as pessoas est\xE3o. N\xE3o basta conhecer os movimentos; \xE9 preciso compartilhar, ensinar, praticar em comunidade. Essa din\xE2mica espacial conecta-se diretamente com a resist\xEAncia hist\xF3rica dos quilombos e a necessidade de mobilidade para a sobreviv\xEAncia cultural."
      },
      {
        title: "Metodologia TGfU e Aprendizado Significativo",
        content: "O Teaching Games for Understanding (TGfU) foi a metodologia central do curso, sempre fechando ciclos com rodas pr\xE1ticas. Diferente do ensino t\xE9cnico tradicional, o TGfU nos permitiu compreender a capoeira como jogo antes de decompor seus elementos. Primeiro vivenciamos a roda, depois entendemos os movimentos, depois contextualizamos historicamente. Esta sequ\xEAncia invertida fez todo sentido: a capoeira \xE9 jogo, \xE9 cultura, \xE9 resist\xEAncia - n\xE3o apenas uma sequ\xEAncia de golpes."
      },
      {
        title: "Cultivo da Caba\xE7a como Met\xE1fora Pedag\xF3gica",
        content: "A experi\xEAncia de cultivar as sementes da caba\xE7a simbolizou perfeitamente a metodologia do curso: come\xE7amos com algo pequeno, cuidamos com dedica\xE7\xE3o, e eventualmente colhemos os frutos que se tornar\xE3o instrumentos. O processo avaliativo paralelo - visita\xE7\xE3o ao IPHAN, registro de grupos - nos ensinou que a capoeira \xE9 patrim\xF4nio vivo que precisa ser documentado e preservado. Assim como a caba\xE7a cresce lentamente, nossa compreens\xE3o da capoeira se desenvolveu ao longo do semestre atrav\xE9s da pr\xE1tica constante."
      },
      {
        title: "Tr\xEAs Momentos Avaliativos: Uma Pedagogia Participativa",
        content: "Os tr\xEAs momentos avaliativos refletiram a pr\xF3pria ess\xEAncia da capoeira: 1) Participa\xE7\xE3o (maior peso) - porque na capoeira, estar presente e engajado \xE9 fundamental; 2) Semin\xE1rios cient\xEDficos - conectando tradi\xE7\xE3o com conhecimento acad\xEAmico contempor\xE2neo; 3) Projetos externos - levando a capoeira para a comunidade. N\xE3o foram apenas formas de avaliar, mas de vivenciar integralmente o que significa ser capoeirista na universidade."
      },
      {
        title: "Integra\xE7\xE3o entre Angola e Regional",
        content: "Vivenciar tanto a Capoeira Angola quanto a Regional, com suas metodologias espec\xEDficas (chamadas de p\xE9 do berimbau versus sequ\xEAncias de Mestre Bimba), mostrou que ambas s\xE3o caminhos v\xE1lidos de preserva\xE7\xE3o cultural. A Angola nos conectou com a ancestralidade e o ritual; a Regional nos ensinou sistematiza\xE7\xE3o e pedagogia. Ambas fecharam seus ciclos com rodas, sempre retornando ao jogo como elemento central."
      },
      {
        title: "Hist\xF3ria, Quilombos e Legado da Capoeira",
        content: "Durante o semestre, aprofundei meus conhecimentos sobre a hist\xF3ria do Brasil, especialmente sobre os quilombos e a capoeira. Compreendi a import\xE2ncia de conhecer esse passado, de enxergar os tra\xE7os e o legado deixado por essas comunidades de resist\xEAncia, e como tudo isso se reflete na cultura e na sociedade atual. Esse aprendizado me fez valorizar ainda mais a capoeira como express\xE3o viva de luta, identidade e transforma\xE7\xE3o social."
      }
    ];
    reflectionsData.forEach((reflection) => this.createReflection(reflection));
  }
  // Classes methods
  async getAllClasses() {
    return Array.from(this.classes.values()).sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("/").map(Number);
      const [dayB, monthB, yearB] = b.date.split("/").map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA.getTime() - dateB.getTime();
    });
  }
  async getClassById(id) {
    return this.classes.get(id);
  }
  async createClass(classData) {
    const id = this.currentClassId++;
    const newClass = {
      ...classData,
      id,
      location: classData.location ?? null,
      tags: classData.tags ?? null
    };
    this.classes.set(id, newClass);
    return newClass;
  }
  // Activities methods
  async getAllActivities() {
    return Array.from(this.activities.values());
  }
  async getActivityById(id) {
    return this.activities.get(id);
  }
  async createActivity(activity) {
    const id = this.currentActivityId++;
    const newActivity = {
      ...activity,
      id,
      date: activity.date ?? null,
      imageUrl: activity.imageUrl ?? null
    };
    this.activities.set(id, newActivity);
    return newActivity;
  }
  // Seminars methods
  async getAllSeminars() {
    return Array.from(this.seminars.values()).sort((a, b) => a.groupNumber - b.groupNumber);
  }
  async getSeminarById(id) {
    return this.seminars.get(id);
  }
  async createSeminar(seminar) {
    const id = this.currentSeminarId++;
    const newSeminar = {
      ...seminar,
      id,
      description: seminar.description ?? null,
      members: seminar.members ?? null
    };
    this.seminars.set(id, newSeminar);
    return newSeminar;
  }
  // Reflections methods
  async getAllReflections() {
    return Array.from(this.reflections.values());
  }
  async getReflectionById(id) {
    return this.reflections.get(id);
  }
  async createReflection(reflection) {
    const id = this.currentReflectionId++;
    const newReflection = {
      ...reflection,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.reflections.set(id, newReflection);
    return newReflection;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/classes", async (req, res) => {
    try {
      const classes = await storage.getAllClasses();
      res.json(classes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch classes" });
    }
  });
  app2.get("/api/classes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const classItem = await storage.getClassById(id);
      if (!classItem) {
        return res.status(404).json({ error: "Class not found" });
      }
      res.json(classItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch class" });
    }
  });
  app2.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getAllActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });
  app2.get("/api/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const activity = await storage.getActivityById(id);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activity" });
    }
  });
  app2.get("/api/seminars", async (req, res) => {
    try {
      const seminars = await storage.getAllSeminars();
      res.json(seminars);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch seminars" });
    }
  });
  app2.get("/api/reflections", async (req, res) => {
    try {
      const reflections = await storage.getAllReflections();
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reflections" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import os from "os";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const frontendPort = parseInt(process.env.FRONTEND_PORT || "80", 10);
  const backendPort = parseInt(process.env.BACKEND_PORT || "5050", 10);
  const host = process.env.SERVER_HOST || "0.0.0.0";
  const domain = process.env.DOMAIN;
  server.listen({
    port: backendPort,
    host,
    reusePort: true
  }, () => {
    const ifaces = os.networkInterfaces();
    let localIp = "localhost";
    for (const dev in ifaces) {
      for (const details of ifaces[dev]) {
        if (details.family === "IPv4" && !details.internal) {
          localIp = details.address;
        }
      }
    }
    let logMsg = `
---
Servidor iniciado!
`;
    if (domain) logMsg += `Dom\xEDnio: http://${domain}
`;
    logMsg += `Local: http://localhost:${backendPort}
`;
    logMsg += `Rede: http://${localIp}:${backendPort}
---
`;
    log(logMsg);
  });
})();
