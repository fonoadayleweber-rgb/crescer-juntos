import { useState, useEffect } from "react";

const areas = [
  { id: "linguagem_expressiva", label: "Linguagem Expressiva", icon: "🗣️", color: "#e8f4fd", accent: "#3b82f6" },
  { id: "linguagem_receptiva", label: "Linguagem Receptiva", icon: "👂", color: "#fdf4e8", accent: "#f59e0b" },
  { id: "brincar", label: "Brincar", icon: "🎮", color: "#f0fdf4", accent: "#22c55e" },
  { id: "imitacao", label: "Imitação", icon: "🎭", color: "#fdf0f8", accent: "#a855f7" },
  { id: "cognitivo", label: "Cognitivo", icon: "🧠", color: "#fff0f0", accent: "#ef4444" },
  { id: "motor_grosso", label: "Motor Grosso", icon: "🤸", color: "#f0f9ff", accent: "#06b6d4" },
  { id: "motor_fino", label: "Motor Fino", icon: "✋", color: "#fefce8", accent: "#eab308" },
  { id: "socioemocional", label: "Socioemocional", icon: "💛", color: "#fff7ed", accent: "#f97316" },
];

const marcos = {
  0: {
    linguagem_expressiva: ["Chora para comunicar necessidades", "Emite sons de vogais (aa, ee)", "Sorri em resposta ao rosto humano"],
    linguagem_receptiva: ["Reage a sons altos", "Se acalma com a voz dos pais", "Localiza sons virando a cabeça"],
    brincar: ["Observa rostos com atenção", "Explora com a boca", "Reage a objetos coloridos"],
    imitacao: ["Imita expressões faciais simples", "Responde ao sorriso do adulto"],
    cognitivo: ["Fixa o olhar em objetos", "Acompanha objetos com os olhos", "Reconhece o rosto dos cuidadores"],
    motor_grosso: ["Levanta a cabeça brevemente de bruços", "Movimenta braços e pernas ativamente"],
    motor_fino: ["Reflexo de preensão palmar", "Abre e fecha as mãos"],
    socioemocional: ["Preferência pela voz materna", "Contato visual com cuidadores", "Primeiros sorrisos sociais"],
  },
  3: {
    linguagem_expressiva: ["Balbucia (ba, ma, da)", "Ri alto", "Vocaliza para chamar atenção"],
    linguagem_receptiva: ["Vira a cabeça ao ouvir o nome", "Reconhece vozes familiares", "Responde a tom emocional da voz"],
    brincar: ["Explora objetos com as mãos", "Brinca de esconde-achou simples", "Interessa-se por espelhos"],
    imitacao: ["Imita sons simples", "Imita gestos como bater palmas"],
    cognitivo: ["Busca objeto parcialmente escondido", "Reconhece rosto no espelho", "Explora causa e efeito"],
    motor_grosso: ["Rola de bruços para costas", "Sustenta a cabeça com firmeza", "Senta com apoio"],
    motor_fino: ["Transfere objeto de uma mão para outra", "Alcança e pega objetos", "Explora texturas"],
    socioemocional: ["Demonstra afeto por familiares", "Ansiedade com estranhos", "Expressa alegria e frustração"],
  },
  6: {
    linguagem_expressiva: ["Usa mama e dada com significado", "Imita entonação da fala", "Usa gestos como tchau e aponta"],
    linguagem_receptiva: ["Entende nao", "Responde a instrucoes simples com gesto", "Reconhece nomes de objetos comuns"],
    brincar: ["Bate dois objetos juntos", "Explora encaixes simples", "Brinca de dar e receber objetos"],
    imitacao: ["Imita acoes simples do cotidiano", "Copia sons e palavras curtas"],
    cognitivo: ["Permanencia do objeto consolidada", "Resolve problemas simples", "Categoriza objetos por forma"],
    motor_grosso: ["Fica em pe com apoio", "Engatinha", "Senta sem apoio com firmeza"],
    motor_fino: ["Pinca com polegar e indicador", "Vira paginas de livros grossos", "Coloca e retira objetos de recipiente"],
    socioemocional: ["Mostra objetos para chamar atencao", "Busca aprovacao do adulto", "Jogo social com alternancia de turnos"],
  },
  12: {
    linguagem_expressiva: ["Usa 5 a 20 palavras", "Combina palavras e gestos", "Nomeia objetos familiares"],
    linguagem_receptiva: ["Entende frases simples do cotidiano", "Segue instrucoes de 1 passo", "Aponta para partes do corpo"],
    brincar: ["Brincadeira funcional com carrinhos e bonecas", "Interessa-se em brincar com outras criancas", "Explora causas e efeitos em brinquedos"],
    imitacao: ["Imita acoes domesticas como varrer", "Imita pares em atividades simples"],
    cognitivo: ["Classifica objetos por cor e forma", "Resolve quebra-cabecas simples de 2-3 pecas", "Compreende conceitos de dentro e fora"],
    motor_grosso: ["Corre", "Sobe escadas com apoio", "Chuta bola"],
    motor_fino: ["Rabisca espontaneamente", "Constroi torre de 3-4 blocos", "Usa colher com precisao"],
    socioemocional: ["Brinca de faz de conta simples", "Demonstra empatia basica", "Busca autonomia"],
  },
  24: {
    linguagem_expressiva: ["Usa frases de 2-3 palavras", "Vocabulario de 50 palavras ou mais", "Faz perguntas simples"],
    linguagem_receptiva: ["Segue instrucoes de 2 passos", "Entende conceitos espaciais", "Compreende perguntas onde e o que"],
    brincar: ["Brincadeira simbolica elaborada", "Brinca cooperativamente com pares", "Inventa historias simples"],
    imitacao: ["Imita comportamentos sociais complexos", "Reproduz sequencias de acoes"],
    cognitivo: ["Conta ate 3 objetos", "Conhece cores basicas", "Resolve problemas com planejamento simples"],
    motor_grosso: ["Pula com os dois pes", "Pedala triciclo", "Sobe e desce escadas alternando os pes"],
    motor_fino: ["Copia circulos e linhas", "Usa tesoura com supervisao", "Abotoa e desabotoa botoes grandes"],
    socioemocional: ["Controle inicial de emocoes", "Brinca em grupo pequeno", "Demonstra preferencias claras"],
  },
  48: {
    linguagem_expressiva: ["Conta historias com inicio, meio e fim", "Usa frases complexas", "Explica seus pensamentos e sentimentos"],
    linguagem_receptiva: ["Segue instrucoes de 3 passos", "Compreende conceitos de tempo", "Entende linguagem figurada simples"],
    brincar: ["Jogo de regras simples", "Brincadeira cooperativa elaborada", "Inventa jogos e convida outros"],
    imitacao: ["Aprende comportamentos observando pares", "Imita personagens de historias"],
    cognitivo: ["Reconhece letras e numeros", "Classifica por multiplos atributos", "Resolve problemas com estrategia"],
    motor_grosso: ["Pula em um pe so", "Arremessa e pega bola com precisao", "Anda de bicicleta com apoio"],
    motor_fino: ["Escreve o nome", "Recorta figuras simples", "Desenha figura humana reconhecivel"],
    socioemocional: ["Negocia com pares", "Controla impulsos na maior parte do tempo", "Demonstra orgulho e vergonha"],
  },
};

const atividades = {
  0: {
    linguagem_expressiva: ["Converse com seu bebe durante as trocas e banhos", "Responda as vocalizacoes dele como numa conversa", "Cante musicas de ninar suavemente"],
    linguagem_receptiva: ["Chame o nome do bebe de lugares diferentes do quarto", "Use tons de voz variados ao falar", "Apresente sons suaves como chocalho e musica calma"],
    brincar: ["Mostre objetos coloridos a 30cm do rosto", "Faca esconde-achou cobrindo seu rosto com as maos", "Deixe o bebe explorar texturas diferentes com as maos"],
    imitacao: ["Faca caretas e espere a reacao do bebe", "Abra e feche a boca devagar olhando para ele", "Sorria bastante e observe se ele sorri de volta"],
    cognitivo: ["Mova objetos lentamente para ele acompanhar com o olhar", "Apresente objetos novos um por vez", "Coloque o bebe diante de um espelho"],
    motor_grosso: ["Faca tummy time por alguns minutos varias vezes ao dia", "Segure o bebe no colo em posicao semi-sentada", "Mova suavemente as perninhas em movimento de bicicleta"],
    motor_fino: ["Coloque um dedo na palma da mao do bebe para ele agarrar", "Ofereca objetos leves e seguros para ele segurar", "Massageie suavemente as maozinhas abertas"],
    socioemocional: ["Mantenha contato visual frequente e sorria muito", "Responda prontamente ao choro para construir confianca", "Faca massagem suave no corpinho do bebe"],
  },
  3: {
    linguagem_expressiva: ["Repita os sons que ele faz e espere a resposta", "Leia livros com ilustracoes simples e coloridas", "Cante musicas com gestos"],
    linguagem_receptiva: ["Chame o nome dele de diferentes distancias", "Use expressoes faciais exageradas ao falar", "Apresente sons do cotidiano como campainha e passaros"],
    brincar: ["Brinque de esconde-achou com um pano", "Ofereca brinquedos com diferentes texturas", "Coloque-o diante do espelho e brinque junto"],
    imitacao: ["Bata palmas devagar e encoraje-o a imitar", "Faca tchau com a mao repetidamente", "Imite os sons que ele faz para criar um dialogo"],
    cognitivo: ["Esconda parcialmente um brinquedo favorito e deixe-o encontrar", "Ofereca brinquedos de causa e efeito", "Mostre objetos do cotidiano nomeando cada um"],
    motor_grosso: ["Aumente o tempo de tummy time gradualmente", "Segure-o sentado apoiando o tronco", "Faca-o rolar gentilmente de costas para o lado"],
    motor_fino: ["Ofereca argolas coloridas para segurar", "Deixe-o explorar diferentes texturas com as maos", "Coloque brinquedos ao alcance para ele pegar"],
    socioemocional: ["Brinque de vez: voce faz algo, espera, ele reage", "Expresse emocoes claramente", "Crie uma rotina previsivel de brincadeiras"],
  },
  6: {
    linguagem_expressiva: ["Nomeie tudo ao redor: olha o cachorro, cadeira!", "Ensine gestos: tchau, mandinho beijo, aponta", "Leia livros apontando para as figuras e nomeando"],
    linguagem_receptiva: ["De instrucoes simples com gesto: vem ca abrindo os bracos", "Brinque de apontar partes do corpo", "Use o nome dele frequentemente nas frases"],
    brincar: ["Ofereca potes e tampas para encaixar e tirar", "Brinque de jogar e pegar objetos entre voces", "Apresente brinquedos de encaixe simples"],
    imitacao: ["Finja falar no telefone e passe para ele", "Faca de conta que come com a colher e ofereca para ele", "Bata palmas em ritmo e encoraje-o a repetir"],
    cognitivo: ["Esconda um brinquedo sob um pano e deixe-o encontrar", "Ofereca 2 objetos diferentes para ele escolher", "Brinque com caixas de diferentes tamanhos"],
    motor_grosso: ["Estimule o engatinhamento colocando brinquedos a frente", "Deixe-o ficar em pe apoiado no sofa", "Brinque de empurrar bola no chao"],
    motor_fino: ["Ofereca pedacos de alimentos macios para pegar", "Brinque com potes para colocar e tirar objetos", "Apresente livros de paginas grossas para virar"],
    socioemocional: ["Brinque de esconde-achou escondendo o rosto", "Mostre entusiasmo quando ele realizar algo novo", "Crie momentos de brincadeira com outras criancas"],
  },
  12: {
    linguagem_expressiva: ["Expanda o que ele diz: ele fala au, voce diz e o cachorro!", "Faca perguntas simples: onde esta a bolinha?", "Leia livros todos os dias, mesmo que curtos"],
    linguagem_receptiva: ["De instrucoes simples: pega o sapato, joga a bola", "Brinque de apontar figuras em livros e nomear", "Use musicas com instrucoes como bata palmas"],
    brincar: ["Ofereca carrinhos, bonecas, panelas de brinquedo", "Brinque de empilhar e derrubar blocos", "Simule situacoes do dia a dia: dar comida a boneca"],
    imitacao: ["Varra o chao e de uma vassoura pequena para ele", "Finja falar no telefone e passe para ele imitar", "Cozinhe e deixe-o mexer numa panela com colher"],
    cognitivo: ["Separe objetos por cor: vamos colocar os vermelhos aqui", "Ofereca quebra-cabecas de 2-3 pecas grandes", "Brinque de o que e isso com objetos do dia a dia"],
    motor_grosso: ["Jogue bola rolando no chao entre voces", "Suba e desça degraus baixos de mao dada", "Corra e encoraje-o a correr atras de voce"],
    motor_fino: ["Rabisque com giz de cera grosso junto com ele", "Empilhe blocos grandes e deixe-o derrubar", "Ofereca massinha para apertar e explorar"],
    socioemocional: ["Nomeie as emocoes: voce ficou bravo porque caiu", "Encoraje-o a fazer coisas sozinho: vestir, comer", "Organize encontros com outras criancas da mesma idade"],
  },
  24: {
    linguagem_expressiva: ["Faca perguntas abertas: o que aconteceu, como foi?", "Conte historias simples na hora de dormir", "Encoraje-o a pedir as coisas com palavras"],
    linguagem_receptiva: ["De instrucoes de 2 passos: pega o sapato e coloca na caixa", "Explore conceitos: em cima, embaixo, dentro, fora", "Faca perguntas sobre livros: onde esta o urso?"],
    brincar: ["Brinque de casinha, medico, mercadinho", "Construa castelos de blocos juntos", "Encoraje brincadeiras com outras criancas"],
    imitacao: ["Cozinhem juntos: mexer, despejar, misturar", "Brinque de fazer igual: voce faz um movimento, ele repete", "Assista e imite personagens de historias juntos"],
    cognitivo: ["Conte objetos juntos: 1, 2, 3 blocos!", "Nomeie e separe objetos por cor e forma", "Brinque de o que vem depois em historias conhecidas"],
    motor_grosso: ["Pule na cama com supervisao ou em cama elastica pequena", "Ande de triciclo ou bicicleta com rodas de apoio", "Jogue bola chutando e arremessando"],
    motor_fino: ["Recorte revistas com tesoura de ponta arredondada", "Cole figuras em papel para fazer colagens", "Modele com massinha: bolinhas, cobrinhas"],
    socioemocional: ["Crie combinados simples e explique o porque das regras", "Leia livros sobre emocoes: raiva, tristeza, alegria", "Elogie o esforco, nao so o resultado"],
  },
  48: {
    linguagem_expressiva: ["Peca que conte como foi o dia com detalhes", "Invente historias juntos, alternando quem fala", "Encoraje-o a explicar como fez algo"],
    linguagem_receptiva: ["De instrucoes de 3 passos no dia a dia", "Explore conceitos de tempo: ontem, hoje, amanha", "Faca perguntas de interpretacao sobre historias"],
    brincar: ["Jogue jogos de tabuleiro simples com regras", "Encoraje brincadeiras de grupo com regras combinadas", "Brinque de teatro e fantasia"],
    imitacao: ["Assista a dancas e dancem juntos imitando", "Encoraje-o a observar e aprender com amigos", "Monte pecas de teatro com personagens de historias"],
    cognitivo: ["Apresente letras e numeros de forma ludica", "Jogue memoria, domino e quebra-cabecas maiores", "Faca experimentos simples: o que afunda, o que flutua?"],
    motor_grosso: ["Pratique pular em um pe so e equilibrar", "Jogue futebol e basquete adaptado", "Ande de bicicleta sem rodinhas com apoio"],
    motor_fino: ["Escreva o nome dele com letras grandes para copiar", "Recorte figuras mais detalhadas", "Desenhe, pinte e faca artesanato variado"],
    socioemocional: ["Converse sobre amizade e como resolver conflitos", "Encoraje-o a expressar o que sente com palavras", "Comemore conquistas e aprenda com os erros juntos"],
  },
};

const faixas = [
  { mes: 0, label: "0-2 meses" },
  { mes: 3, label: "3-5 meses" },
  { mes: 6, label: "6-11 meses" },
  { mes: 12, label: "12-23 meses" },
  { mes: 24, label: "2-3 anos" },
  { mes: 48, label: "4-5 anos" },
];

function loadFromStorage(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export default function App() {
  const [tela, setTela] = useState("home");
  const [filho, setFilho] = useState(() => loadFromStorage("cj_filho", { nome: "", nascimento: "" }));
  const [inputNome, setInputNome] = useState("");
  const [inputNasc, setInputNasc] = useState("");
  const [areaSelecionada, setAreaSelecionada] = useState(null);
  const [checados, setChecados] = useState(() => loadFromStorage("cj_checados", {}));

  useEffect(() => { saveToStorage("cj_filho", filho); }, [filho]);
  useEffect(() => { saveToStorage("cj_checados", checados); }, [checados]);

  function calcMeses() {
    if (!filho.nascimento) return 0;
    const nasc = new Date(filho.nascimento);
    const hoje = new Date();
    return Math.max(0, (hoje.getFullYear() - nasc.getFullYear()) * 12 + (hoje.getMonth() - nasc.getMonth()));
  }

  function getFaixaAtual() {
    const m = calcMeses();
    let faixa = faixas[0];
    for (const f of faixas) { if (m >= f.mes) faixa = f; }
    return faixa;
  }

  function getMarcos() { return marcos[getFaixaAtual().mes] || marcos[0]; }
  function getAtividades() { return atividades[getFaixaAtual().mes] || atividades[0]; }

  function toggleCheck(area, idx) {
    const key = `${area}-${idx}`;
    setChecados(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function progresso(area) {
    const m = getMarcos()[area] || [];
    if (!m.length) return 0;
    return Math.round(m.filter((_, i) => checados[`${area}-${i}`]).length / m.length * 100);
  }

  function progressoGeral() {
    const all = areas.map(a => progresso(a.id));
    return Math.round(all.reduce((s, v) => s + v, 0) / areas.length);
  }

  function sairPerfil() {
    setFilho({ nome: "", nascimento: "" });
    setChecados({});
    saveToStorage("cj_filho", { nome: "", nascimento: "" });
    saveToStorage("cj_checados", {});
    setInputNome(""); setInputNasc("");
  }

  const pg = progressoGeral();

  if (!filho.nome) {
    return (
      <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🌱</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1e293b", margin: 0 }}>Crescer Juntos</h1>
          <p style={{ color: "#64748b", marginTop: 8, fontSize: 15 }}>Acompanhe o desenvolvimento do seu filho com carinho</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "1.5rem", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
          <p style={{ fontWeight: 600, color: "#334155", marginBottom: 8 }}>Nome do seu filho(a)</p>
          <input value={inputNome} onChange={e => setInputNome(e.target.value)} placeholder="Ex: Maria"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 15, marginBottom: 16, boxSizing: "border-box", outline: "none" }} />
          <p style={{ fontWeight: 600, color: "#334155", marginBottom: 8 }}>Data de nascimento</p>
          <input type="date" value={inputNasc} onChange={e => setInputNasc(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 15, marginBottom: 24, boxSizing: "border-box", outline: "none" }} />
          <button onClick={() => { if (inputNome && inputNasc) setFilho({ nome: inputNome, nascimento: inputNasc }); }}
            style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}>
            Comecar
          </button>
        </div>
      </div>
    );
  }

  if (tela === "area" && areaSelecionada) {
    const area = areas.find(a => a.id === areaSelecionada);
    const m = getMarcos()[areaSelecionada] || [];
    const ativ = getAtividades()[areaSelecionada] || [];
    const pg2 = progresso(areaSelecionada);
    return (
      <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: "1rem" }}>
        <button onClick={() => setTela("home")} style={{ background: "none", border: "none", color: "#6366f1", fontWeight: 600, fontSize: 15, cursor: "pointer", padding: "8px 0", marginBottom: 8 }}>
          Voltar
        </button>
        <div style={{ background: area.color, borderRadius: 20, padding: "1.5rem", marginBottom: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>{area.icon}</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1e293b" }}>{area.label}</h2>
          <p style={{ color: "#64748b", margin: "4px 0 12px", fontSize: 13 }}>{getFaixaAtual().label} - {filho.nome}</p>
          <div style={{ background: "#e2e8f0", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${pg2}%`, height: "100%", background: area.accent, borderRadius: 99, transition: "width 0.4s" }} />
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: area.accent, fontWeight: 600 }}>{pg2}% concluido</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "1rem 1.25rem", border: "1px solid #f1f5f9", marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: "#334155", marginBottom: 12, fontSize: 15 }}>Marcos esperados</p>
          {m.map((marco, i) => {
            const key = `${areaSelecionada}-${i}`;
            const ok = !!checados[key];
            return (
              <div key={i} onClick={() => toggleCheck(areaSelecionada, i)}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < m.length - 1 ? "1px solid #f8fafc" : "none", cursor: "pointer" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${ok ? area.accent : "#cbd5e1"}`, background: ok ? area.accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                  {ok && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>v</span>}
                </div>
                <p style={{ margin: 0, fontSize: 14, color: ok ? "#94a3b8" : "#334155", textDecoration: ok ? "line-through" : "none", lineHeight: 1.5 }}>{marco}</p>
              </div>
            );
          })}
        </div>

        <div style={{ background: area.color, borderRadius: 16, padding: "1rem 1.25rem", border: `1px solid ${area.accent}33` }}>
          <p style={{ fontWeight: 700, color: "#334155", marginBottom: 12, fontSize: 15 }}>Como estimular em casa</p>
          {ativ.map((at, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < ativ.length - 1 ? 12 : 0, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: 99, background: area.accent, color: "#fff", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <p style={{ margin: 0, fontSize: 14, color: "#334155", lineHeight: 1.6 }}>{at}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const meses = calcMeses();
  const faixa = getFaixaAtual();
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: "1rem" }}>
      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 24, padding: "1.5rem", color: "#fff", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>Acompanhando</p>
            <h2 style={{ margin: "2px 0 4px", fontSize: 24, fontWeight: 700 }}>{filho.nome}</h2>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>{meses} meses - {faixa.label}</p>
          </div>
          <button onClick={sairPerfil} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 99, padding: "6px 12px", color: "#fff", fontSize: 12, cursor: "pointer" }}>Trocar</button>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, opacity: 0.85 }}>Progresso geral</span>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{pg}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 99, height: 10, overflow: "hidden" }}>
            <div style={{ width: `${pg}%`, height: "100%", background: "#fff", borderRadius: 99, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>

      <p style={{ fontWeight: 700, color: "#334155", fontSize: 15, marginBottom: 12 }}>Areas de desenvolvimento</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {areas.map(area => {
          const pg3 = progresso(area.id);
          return (
            <div key={area.id} onClick={() => { setAreaSelecionada(area.id); setTela("area"); }}
              style={{ background: area.color, borderRadius: 18, padding: "1rem", cursor: "pointer", border: `1.5px solid ${area.accent}22`, transition: "transform 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{area.icon}</div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{area.label}</p>
              <div style={{ background: "#e2e8f0", borderRadius: 99, height: 5, marginTop: 8, overflow: "hidden" }}>
                <div style={{ width: `${pg3}%`, height: "100%", background: area.accent, borderRadius: 99 }} />
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: area.accent, fontWeight: 600 }}>{pg3}%</p>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: 28, paddingBottom: 16 }}>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>Elaborado por</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", margin: "2px 0 0" }}>Fono Adayle</p>
      </div>
    </div>
  );
}