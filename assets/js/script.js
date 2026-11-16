// ============================================================
// CONFIGURAÇÃO DO WHATSAPP
// ============================================================
// Link oficial de mensagem do WhatsApp Business (todos os botões usam este link)
const WHATSAPP_LINK = "https://wa.me/message/MIWH2KFDYFC5F1";
// Número exibido no site
const WHATSAPP_DISPLAY = "+55 53 99155-4294";

// Links wa.me/message não aceitam texto pré-preenchido, então todos abrem o mesmo link
const waLink = () => WHATSAPP_LINK;

document.querySelectorAll("[data-whats]").forEach((el) => {
  el.href = WHATSAPP_LINK;
  el.target = "_blank";
  el.rel = "noopener";
});

document.querySelectorAll(".js-phone").forEach((el) => {
  el.textContent = WHATSAPP_DISPLAY;
});

// ============================================================
// Menu mobile
// ============================================================
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ============================================================
// Abas de situações
// ============================================================
const SITUACOES = [
  {
    id: "trabalhador",
    icon: "⚒",
    label: "Trabalhador",
    title: "Seus direitos trabalhistas, explicados e defendidos",
    intro: "Para quem saiu (ou ainda está) em um emprego e sente que algo não foi pago ou respeitado.",
    pains: [
      "Rescisão paga com valores que você não entende",
      "Horas extras e adicional noturno sem pagamento",
      "Trabalho sem carteira assinada",
      "FGTS sem depósito ou multa de 40% não paga",
    ],
    services: [
      ["Revisão de rescisão", "Conferência de cada verba recebida no desligamento."],
      ["Horas extras", "Jornada, intervalos, banco de horas e adicional noturno."],
      ["Vínculo de emprego", "Reconhecimento de carteira assinada e direitos do período."],
      ["Insalubridade e periculosidade", "Adicionais por exposição a riscos no trabalho."],
    ],
    msg: "Olá, Dra. Lisiane! Tenho uma dúvida trabalhista e gostaria de agendar uma consulta.",
  },
  {
    id: "aposentadoria",
    icon: "◷",
    label: "Aposentadoria",
    title: "Planejamento e pedido de aposentadoria sem surpresas",
    intro: "Saiba quando e como se aposentar com o melhor benefício possível dentro das regras atuais.",
    pains: [
      "Dúvidas sobre as regras de transição da reforma",
      "Períodos de trabalho que não aparecem no CNIS",
      "Tempo especial (insalubre) não reconhecido",
      "Aposentadoria concedida com valor abaixo do esperado",
    ],
    services: [
      ["Planejamento previdenciário", "Análise do histórico e da melhor regra para o seu caso."],
      ["Pedido de aposentadoria", "Organização dos documentos e protocolo junto ao INSS."],
      ["Aposentadoria especial", "Reconhecimento de períodos com exposição a agentes nocivos."],
      ["Revisão de benefício", "Verificação de erros no cálculo do valor concedido."],
    ],
    msg: "Olá, Dra. Lisiane! Gostaria de uma orientação sobre aposentadoria.",
  },
  {
    id: "incapacidade",
    icon: "✚",
    label: "Doença e INSS",
    title: "Doente ou acidentado? Você não precisa enfrentar o INSS sozinho(a)",
    intro: "Para quem não consegue trabalhar por motivo de saúde, ou teve um benefício negado ou cortado.",
    pains: [
      "Perícia do INSS negou o auxílio",
      "Benefício cortado mesmo sem condições de voltar",
      "Acidente de trabalho sem a devida estabilidade",
      "Família com pessoa idosa ou com deficiência sem renda (BPC/LOAS)",
    ],
    services: [
      ["Auxílio por incapacidade", "Pedido, recurso e ação para o antigo auxílio-doença."],
      ["Aposentadoria por incapacidade", "Para casos de incapacidade permanente."],
      ["BPC/LOAS", "Benefício assistencial a idosos e pessoas com deficiência."],
      ["Pensão por morte", "Garantia do benefício aos dependentes."],
    ],
    msg: "Olá, Dra. Lisiane! Tive um problema com benefício do INSS e gostaria de ajuda.",
  },
  {
    id: "empresas",
    icon: "▣",
    label: "Empresas",
    title: "Assessoria jurídica para a sua empresa crescer com segurança",
    intro: "Prevenção de passivos trabalhistas e suporte no dia a dia de pequenas e médias empresas.",
    pains: [
      "Insegurança na hora de contratar ou demitir",
      "Reclamatórias trabalhistas sem defesa estruturada",
      "Contratos e documentos internos desatualizados",
      "Dúvidas recorrentes sem um jurídico de confiança",
    ],
    services: [
      ["Assessoria preventiva", "Orientação contínua sobre rotinas e decisões trabalhistas."],
      ["Defesa em reclamatórias", "Atuação em audiências, acordos e recursos."],
      ["Contratos e documentos", "Contratos de trabalho, políticas internas e advertências."],
      ["Treinamento de gestores", "Boas práticas para reduzir riscos com a equipe."],
    ],
    msg: "Olá, Dra. Lisiane! Gostaria de conhecer a assessoria jurídica para empresas.",
  },
];

const STEPS = [
  ["Conte o seu caso", "Pelo WhatsApp, sem compromisso."],
  ["Análise dos documentos", "Presencial ou online."],
  ["Orientação clara", "Você sabe exatamente o próximo passo."],
];

const tabsEl = document.querySelector(".tabs");
const panelEl = document.getElementById("tab-panel");

function renderPanel(s) {
  panelEl.innerHTML = `
    <div>
      <h3>${s.title}</h3>
      <p class="intro">${s.intro}</p>
      <p class="panel-label">Situações comuns</p>
      <ul class="pains">${s.pains.map((p) => `<li>${p}</li>`).join("")}</ul>
      <p class="panel-label">Como posso ajudar</p>
      <div class="services">
        ${s.services.map(([t, d]) => `<div class="service"><strong>${t}</strong><small>${d}</small></div>`).join("")}
      </div>
    </div>
    <aside class="panel-side">
      <p class="panel-label">Como começar</p>
      <ol class="mini-steps">
        ${STEPS.map(([t, d]) => `<li><div><strong>${t}</strong><small>${d}</small></div></li>`).join("")}
      </ol>
      <a class="btn btn-gold" href="${waLink(s.msg)}" target="_blank" rel="noopener">Falar sobre ${s.label.toLowerCase()} →</a>
    </aside>`;
  // reinicia a animação de entrada
  panelEl.style.animation = "none";
  void panelEl.offsetWidth;
  panelEl.style.animation = "";
}

SITUACOES.forEach((s, i) => {
  const b = document.createElement("button");
  b.className = "tab";
  b.type = "button";
  b.role = "tab";
  b.id = `tab-${s.id}`;
  b.setAttribute("aria-controls", "tab-panel");
  b.setAttribute("aria-selected", i === 0);
  b.innerHTML = `<span class="tab-ico" aria-hidden="true">${s.icon}</span>${s.label}`;
  b.addEventListener("click", () => {
    tabsEl.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", t === b));
    renderPanel(s);
  });
  tabsEl.appendChild(b);
});
renderPanel(SITUACOES[0]);

// ============================================================
// Checklist "Tenho direito?"
// ============================================================
const checks = document.querySelectorAll("#check-list input");
const countEl = document.getElementById("check-count");
const textEl = document.getElementById("check-text");
const sendEl = document.getElementById("check-send");

let checklistMsg = "";

function updateChecklist() {
  const sel = [...checks].filter((c) => c.checked).map((c) => c.value);
  countEl.textContent = sel.length;
  if (sel.length === 0) {
    textEl.textContent = "Selecione os itens ao lado";
    sendEl.setAttribute("aria-disabled", "true");
    sendEl.href = "#";
    checklistMsg = "";
    return;
  }
  textEl.textContent =
    sel.length === 1
      ? "situação marcada. Vale a pena conversar sobre ela."
      : "situações marcadas. Vale a pena analisar o seu caso.";
  sendEl.removeAttribute("aria-disabled");
  checklistMsg = `Olá, Dra. Lisiane! Fiz o checklist no site e marquei:\n\n${sel.map((s) => `• ${s}`).join("\n")}\n\nGostaria de agendar uma análise.`;
  sendEl.href = WHATSAPP_LINK;
  sendEl.target = "_blank";
  sendEl.rel = "noopener";
}

// Ao enviar, copia o resumo do checklist para a pessoa colar na conversa
sendEl.addEventListener("click", () => {
  if (!checklistMsg) return;
  try {
    navigator.clipboard.writeText(checklistMsg).then(() =>
      showToast("Resumo copiado! Cole na conversa do WhatsApp.")
    );
  } catch {}
});

function showToast(text) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => t.classList.remove("show"), 4500);
}

checks.forEach((c) => c.addEventListener("change", updateChecklist));
updateChecklist();

// ============================================================
// Feed do Instagram (automático, via função /api/instagram no Vercel)
// ============================================================
const INSTAGRAM_URL = "https://www.instagram.com/lisianesedrezadvocacia/";
const instaGrid = document.getElementById("insta-grid");

function instaFallback() {
  // Sem token configurado ou rodando localmente: mostra um convite para o perfil
  instaGrid.classList.add("insta-empty");
  instaGrid.innerHTML = "";
  const a = document.createElement("a");
  a.href = INSTAGRAM_URL;
  a.target = "_blank";
  a.rel = "noopener";
  a.className = "insta-cta";
  a.innerHTML =
    '<img src="assets/img/lisiane-retrato.jpg" alt="" loading="lazy" />' +
    "<span><strong>Dicas, direitos e novidades toda semana</strong>" +
    "<small>Acompanhe @lisianesedrezadvocacia no Instagram →</small></span>";
  instaGrid.appendChild(a);
}

async function loadInstagram() {
  try {
    const r = await fetch("/api/instagram?limit=6");
    if (!r.ok) throw new Error(r.status);
    const { posts } = await r.json();
    if (!posts || !posts.length) throw new Error("vazio");

    instaGrid.innerHTML = "";
    posts.forEach((p) => {
      const a = document.createElement("a");
      a.className = "insta-post";
      a.href = p.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", p.caption ? `Post: ${p.caption.slice(0, 80)}` : "Post no Instagram");

      const img = document.createElement("img");
      img.src = p.image;
      img.alt = "";
      img.loading = "lazy";
      a.appendChild(img);

      if (p.type === "VIDEO" || p.type === "CAROUSEL_ALBUM") {
        const badge = document.createElement("span");
        badge.className = "insta-badge";
        badge.textContent = p.type === "VIDEO" ? "▶" : "❐";
        a.appendChild(badge);
      }

      const cap = document.createElement("span");
      cap.className = "insta-caption";
      cap.textContent = p.caption || "Ver no Instagram";
      a.appendChild(cap);

      instaGrid.appendChild(a);
    });
  } catch {
    instaFallback();
  }
}
loadInstagram();

// ============================================================
// Animações de entrada ao rolar
// ============================================================
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
