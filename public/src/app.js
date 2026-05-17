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
    brincar: ["Explora objetos com as mãos", "Brinca de 'esconde-achou' simples", "Interessa-se por espelhos"],
    imitacao: ["Imita sons simples", "Imita gestos como bater palmas"],
    cognitivo: ["Busca objeto parcialmente escondido", "Reconhece rosto no espelho", "Explora causa e efeito (bater para fazer barulho)"],
    motor_grosso: ["Rola de bruços para costas", "Sustenta a cabeça com firmeza", "Senta com apoio"],
    motor_fino: ["Transfere objeto de uma mão para outra", "Alcança e pega objetos", "Explora texturas"],
    socioemocional: ["Demonstra afeto por familiares", "Ansiedade com estranhos", "Expressa alegria e frustração"],
  },
  6: {
    linguagem_expressiva: ["Usa 'mama' e 'dada' com significado", "Imita entonação da fala", "Usa gestos como tchau e aponta"],
    linguagem_receptiva: ["Entende 'não'", "Responde a instruções simples com gesto", "Reconhece nomes de objetos comuns"],
    brincar: ["Bate dois objetos juntos", "Explora encaixes simples", "Brinca de dar e receber objetos"],
    imitacao: ["Imita ações simples do cotidiano", "Copia sons e palavras curtas"],
    cognitivo: ["Permanência do objeto consolidada", "Resolve problemas simples (puxar para alcançar)", "Categoriza objetos por forma"],
    motor_grosso: ["Fica em pé com apoio", "Engatinha", "Senta sem apoio com firmeza"],
    motor_fino: ["Pinça com polegar e indicador", "Vira páginas de livros grossos", "Coloca e retira objetos de recipiente"],
    socioemocional: ["Mostra objetos para chamar atenção", "Busca aprovação do adulto", "Jogo social com alternância de turnos"],
  },
  12: {
    linguagem_expressiva: ["Usa 5 a 20 palavras", "Combina palavras e gestos", "Nomeia objetos familiares"],
    linguagem_receptiva: ["Entende frases simples do cotidiano", "Segue instruções de 1 passo", "Aponta para partes do corpo"],
    brincar: ["Brincadeira funcional (empurra carrinho, coloca boneca para dormir)", "Interessa-se em brincar com outras crianças", "Explora causas e efeitos em brinquedos"],
    imitacao: ["Imita ações domésticas (varrer, falar no telefone)", "Imita pares em atividades simples"],
    cognitivo: ["Classifica objetos por cor e forma", "Resolve quebra-cabeças simples de 2-3 peças", "Compreende conceitos de dentro/fora"],
    motor_grosso: ["Corre", "Sobe escadas com apoio", "Chuta bola"],
    motor_fino: ["Rabisca espontaneamente", "Constrói torre de 3-4 blocos", "Usa colher com precisão"],
    socioemocional: ["Brinca de faz de conta simples", "Demonstra empatia básica", "Busca autonomia ('eu mesmo')"],
  },
  24: {
    linguagem_expressiva: ["Usa frases de 2-3 palavras", "Vocabulário de 50+ palavras", "Faz perguntas simples (o que é isso?)"],
    linguagem_receptiva: ["Segue instruções de 2 passos", "Entende conceitos espaciais (em cima, embaixo)", "Compreende perguntas 'onde' e 'o que'"],
    brincar: ["Brincadeira simbólica elaborada", "Brinca cooperativamente com pares", "Inventa histórias simples"],
    imitacao: ["Imita comportamentos sociais complexos", "Reproduz sequências de ações"],
    cognitivo: ["Conta até 3 objetos", "Conhece cores básicas", "Resolve problemas com planejamento simples"],
    motor_grosso: ["Pula com os dois pés", "Pedala triciclo", "Sobe e desce escadas alternando os pés"],
    motor_fino: ["Copia círculos e linhas", "Usa tesoura com supervisão", "Abotoa e desabotoa botões grandes"],
    socioemocional: ["Controle inicial de emoções", "Brinca em grupo pequeno", "Demonstra preferências claras"],
  },
  48: {
    linguagem_expressiva: ["Conta histórias com início, meio e fim", "Usa frases complexas", "Explica seus pensamentos e sentimentos"],
    linguagem_receptiva: ["Segue instruções de 3 passos", "Compreende conceitos de tempo (ontem, amanhã)", "Entende linguagem figurada simples"],
    brincar: ["Jogo de regras simples", "Brincadeira cooperativa elaborada", "Inventa jogos e convida outros a participar"],
    imitacao: ["Aprende comportamentos observando pares", "Imita personagens de histórias"],
    cognitivo: ["Reconhece letras e números", "Classifica por múltiplos atributos", "Resolve problemas com estratégia"],
    motor_grosso: ["Pula em um pé só", "Skipa (salta alternando os pés)", "Arremessa e pega bola com precisão"],
    motor_fino: ["Escreve nome", "Recorta figuras simples", "Desenha figura humana reconhecível"],
    socioemocional: ["Negocia com pares", "Controla impulsos na maior parte do tempo", "Demonstra orgulho e vergonha"],
  },
};

const faixas = [
  { mes: 0, label: "0–2 meses" },
  { mes: 3, label: "3–5 meses" },
  { mes: 6, label: "6–11 meses" },
  { mes: 12, label: "12–23 meses" },
  { mes: 24, label: "2–3 anos" },
  { mes: 48, label: "4–5 anos" },
];

const dicas = {
  linguagem_expressiva: "Converse com seu filho o tempo todo! Nomeie objetos, descreva ações e responda às vocalizações dele como se fosse uma conversa real.",
  linguagem_receptiva: "Leia livros juntos diariamente. Use linguagem simples, clara e direta. Dê instruções com gestos para facilitar a compreensão.",
  brincar: "Siga a liderança do seu filho nas brincadeiras. Deixe ele escolher e você imita! Isso fortalece a iniciativa e a criatividade.",
  imitacao: "Exagere expressões faciais e movimentos durante as interações. Crianças aprendem muito por imitação!",
  cognitivo: "Ofereça desafios adequados à idade. Quebra-cabeças, encaixes, livros de exploração e perguntas abertas estimulam o raciocínio.",
  motor_grosso: "Garanta tempo livre para se movimentar em espaços seguros. Parques, brincadeiras de correr e pular são essenciais!",
  motor_fino: "Ofereça massinha, pintura, encaixes e atividades de rasgar papel. A variedade de texturas fortalece a coordenação.",
  socioemocional: "Nomeie as emoções da criança e as suas próprias. 'Você está com raiva agora, né?' ajuda a desenvolver o vocabulário emocional.",
};

export default function App() {
  const [tela, setTela] = useState("home");
  const [filho, setFilho] = useState({ nome: "", nascimento: "" });
  const [inputNome, setInputNome] = useState("");
  const [inputNasc, setInputNasc] = useState("");
  const [areaSelecionada, setAreaSelecionada] = useState(null);
  const [checados, setChecados] = useState({});
  const [aiResposta, setAiResposta] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  function calcMeses() {
    if (!filho.nascimento) return 0;
    const nasc = new Date(filho.nascimento);
    const hoje = new Date();
    return Math.max(0, (hoje.getFullYear() - nasc.getFullYear()) * 12 + (hoje.getMonth() - nasc.getMonth()));
  }

  function getFaixaAtual() {
    const m = calcMeses();
    let faixa = faixas[0];
    for (const f of faixas) {
      if (m >= f.mes) faixa = f;
    }
    return faixa;
  }

  function getMarcos() {
    const f = getFaixaAtual();
    return marcos[f.mes] || marcos[0];
  }

  function toggleCheck(area, idx) {
    const key = `${area}-${idx}`;
    setChecados(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function progresso(area) {
    const m = getMarcos()[area] || [];
    if (!m.length) return 0;
    const feitos = m.filter((_, i) => checados[`${area}-${i}`]).length;
    return Math.round((feitos / m.length) * 100);
  }

  function progressoGeral() {
    const all = areas.map(a => progresso(a.id));
    return Math.round(all.reduce((s, v) => s + v, 0) / areas.length);
  }

  async function perguntarIA(pergunta) {
    setAiLoading(true);
    setAiResposta("");
    try {
      const meses = calcMeses();
      const faixa = getFaixaAtual();
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Você é um especialista em desenvolvimento infantil. Responda de forma calorosa, prática e acolhedora para pais. A criança tem ${meses} meses (faixa: ${faixa.label}). Seja objetivo e use linguagem simples. Máximo 4 parágrafos curtos.`,
          messages: [{ role: "user", content: pergunta }]
        })
      });
      const data = await resp.json();
      setAiResposta(data.content?.[0]?.text || "Não foi possível obter resposta.");
    } catch {
      setAiResposta("Erro ao conectar. Tente novamente.");
    }
    setAiLoading(false);
  }

  const pg = progressoGeral();

  if (tela === "home" && !filho.nome) {
    return (
      <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🌱</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1e293b", margin: 0 }}>Crescer Juntos</h1>
          <p style={{ color: "#64748b", marginTop: 8, fontSize: 15 }}>Acompanhe o desenvolvimento do seu filho com carinho</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "1.5rem", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}>
          <p style={{ fontWeight: 600, color: "#334155", marginBottom: 8 }}>Nome do seu filho(a)</p>
          <input
            value={inputNome}
            onChange={e => setInputNome(e.target.value)}
            placeholder="Ex: Maria"
            style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 15, marginBottom: 16, boxSizing: "border-box", outline: "none" }}
          />
          <p style={{ fontWeight: 600, color: "#334155", marginBottom: 8 }}>Data de nascimento</p>
          <input
            type="date"
            value={inputNasc}
            onChange={e => setInputNasc(e.target.value)}
            style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 15, marginBottom: 24, boxSizing: "border-box", outline: "none" }}
          />
          <button
            onClick={() => { if (inputNome && inputNasc) { setFilho({ nome: inputNome, nascimento: inputNasc }); setTela("home"); } }}
            style={{ width: "100%", padding: "14px", borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer" }}
          >
            Começar ✨
          </button>
        </div>
      </div>
    );
  }

  if (tela === "area" && areaSelecionada) {
    const area = areas.find(a => a.id === areaSelecionada);
    const m = getMarcos()[areaSelecionada] || [];
    const pg2 = progresso(areaSelecionada);
    return (
      <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: "1rem" }}>
        <button onClick={() => setTela("home")} style={{ background: "none", border: "none", color: "#6366f1", fontWeight: 600, fontSize: 15, cursor: "pointer", padding: "8px 0", marginBottom: 8 }}>← Voltar</button>
        <div style={{ background: area.color, borderRadius: 20, padding: "1.5rem", marginBottom: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>{area.icon}</div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1e293b" }}>{area.label}</h2>
          <p style={{ color: "#64748b", margin: "4px 0 12px", fontSize: 13 }}>{getFaixaAtual().label} · {filho.nome}</p>
          <div style={{ background: "#e2e8f0", borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${pg2}%`, height: "100%", background: area.accent, borderRadius: 99, transition: "width 0.4s" }} />
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: area.accent, fontWeight: 600 }}>{pg2}% concluído</p>
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
                  {ok && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                </div>
                <p style={{ margin: 0, fontSize: 14, color: ok ? "#94a3b8" : "#334155", textDecoration: ok ? "line-through" : "none", lineHeight: 1.5 }}>{marco}</p>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#fafafa", borderRadius: 16, padding: "1rem 1.25rem", border: "1px solid #f1f5f9", marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: "#334155", marginBottom: 6, fontSize: 15 }}>💡 Dica para estimular</p>
          <p style={{ color: "#475569", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{dicas[areaSelecionada]}</p>
        </div>

        <div style={{ background: "#f0f4ff", borderRadius: 16, padding: "1rem 1.25rem", border: "1px solid #e0e7ff" }}>
          <p style={{ fontWeight: 700, color: "#4338ca", marginBottom: 8, fontSize: 15 }}>🤖 Pergunte à IA</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              `Como estimular ${area.label.toLowerCase()} em ${filho.nome}?`,
              "Isso é normal para a idade?",
              "Quais atividades posso fazer em casa?"
            ].map((q, i) => (
              <button key={i} onClick={() => perguntarIA(q)}
                style={{ background: "#fff", border: "1px solid #c7d2fe", borderRadius: 99, padding: "6px 14px", fontSize: 13, color: "#4338ca", cursor: "pointer", fontWeight: 500 }}>
                {q}
              </button>
            ))}
          </div>
          {aiLoading && <p style={{ color: "#6366f1", fontSize: 14, marginTop: 12 }}>Gerando resposta...</p>}
          {aiResposta && (
            <div style={{ background: "#fff", borderRadius: 12, padding: "12px", marginTop: 12, border: "1px solid #e0e7ff" }}>
              <p style={{ color: "#334155", fontSize: 14, margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{aiResposta}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // HOME
  const meses = calcMeses();
  const faixa = getFaixaAtual();
  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: "1rem" }}>
      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 24, padding: "1.5rem", color: "#fff", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.8 }}>Olá! Acompanhando</p>
            <h2 style={{ margin: "2px 0 4px", fontSize: 24, fontWeight: 700 }}>{filho.nome} 🌟</h2>
            <p style={{ margin: 0, fontSize: 13, opacity: 0.85 }}>{meses} meses · {faixa.label}</p>
          </div>
          <button onClick={() => { setFilho({ nome: "", nascimento: "" }); setInputNome(""); setInputNasc(""); }}
            style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 99, padding: "6px 12px", color: "#fff", fontSize: 12, cursor: "pointer" }}>
            Trocar
          </button>
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

      <p style={{ fontWeight: 700, color: "#334155", fontSize: 15, marginBottom: 12 }}>Áreas de desenvolvimento</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {areas.map(area => {
          const pg3 = progresso(area.id);
          return (
            <div key={area.id} onClick={() => { setAreaSelecionada(area.id); setTela("area"); setAiResposta(""); }}
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

      <div style={{ background: "#fff7ed", borderRadius: 18, padding: "1rem 1.25rem", marginTop: 20, border: "1px solid #fed7aa" }}>
        <p style={{ fontWeight: 700, color: "#c2410c", margin: "0 0 6px", fontSize: 15 }}>🤖 Consultoria com IA</p>
        <p style={{ color: "#78350f", fontSize: 13, margin: "0 0 12px" }}>Tire dúvidas sobre o desenvolvimento de {filho.nome}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            "O desenvolvimento está dentro do esperado?",
            "Que atividades recomendam para esta fase?"
          ].map((q, i) => (
            <button key={i} onClick={() => { setAreaSelecionada(null); perguntarIA(`Criança: ${filho.nome}, ${meses} meses. ${q}`); }}
              style={{ background: "#fff", border: "1px solid #fdba74", borderRadius: 99, padding: "6px 14px", fontSize: 13, color: "#c2410c", cursor: "pointer", fontWeight: 500 }}>
              {q}
            </button>
          ))}
        </div>
        {aiLoading && <p style={{ color: "#ea580c", fontSize: 14, marginTop: 12 }}>Consultando...</p>}
        {aiResposta && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "12px", marginTop: 12, border: "1px solid #fed7aa" }}>
            <p style={{ color: "#334155", fontSize: 14, margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{aiResposta}</p>
          </div>
        )}
      </div>
    </div>
  );
}