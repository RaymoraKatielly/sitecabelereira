// ===============================
// MENU MOBILE
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-toggle");
  if (!btn) return;

  btn.setAttribute("aria-expanded", "false");

  let menuEl = null;

  function openMenu() {
    btn.setAttribute("aria-expanded", "true");

    menuEl = document.createElement("div");
    menuEl.className = "menu-open";
    menuEl.innerHTML = `
      <ul class="menu-open-list">
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#noivas">Noivas</a></li>
        <li><a href="#cursos">Cursos VIP</a></li>
        <li><a href="#galeria">Galeria</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#contato" class="cta">Agende</a></li>
      </ul>
    `;

    document.body.appendChild(menuEl);

    // Fecha ao clicar em um link do menu
    menuEl.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });

    // Fecha ao clicar fora
    document.addEventListener("click", handleOutsideClick, true);

    // Fecha no ESC
    document.addEventListener("keydown", handleEsc);
  }

  function closeMenu() {
    btn.setAttribute("aria-expanded", "false");

    if (menuEl) {
      menuEl.remove();
      menuEl = null;
    }

    document.removeEventListener("click", handleOutsideClick, true);
    document.removeEventListener("keydown", handleEsc);
  }

  function handleOutsideClick(e) {
    if (e.target.closest(".menu-toggle")) return;
    if (menuEl && e.target.closest(".menu-open")) return;
    closeMenu();
  }

  function handleEsc(e) {
    if (e.key === "Escape") closeMenu();
  }

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });
});


// ===============================
// FORMULÁRIO -> ENVIA PARA WHATSAPP
// ===============================

// Ajuste aqui se mudar o número:
const WHATSAPP_NUMBER = "5566992317646"; // DDI+DDD+numero (sem espaços)

// Converte "2026-01-18T14:30" -> "18/01/2026 14:30"
function formatDatetimeBR(value) {
  if (!value) return "";
  const [date, time] = value.split("T");
  if (!date || !time) return value;

  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y} ${time}`;
}

function submitForm(e) {
  e.preventDefault();

  const f = e.target;

  const nome = (f.name?.value || "").trim();
  const telefone = (f.phone?.value || "").trim();
  const servico = (f.service?.value || "").trim();
  const dataHora = formatDatetimeBR(f.datetime?.value || "");
  const mensagem = (f.message?.value || "").trim();

  // Monta texto bonito para WhatsApp
  const linhas = [
    "Olá, Lídia! Gostaria de agendar um horário 😊",
    "",
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
    `Serviço: ${servico}`,
    dataHora ? `Data e horário: ${dataHora}` : "Data e horário: (não informado)",
    mensagem ? `Mensagem: ${mensagem}` : null
  ].filter(Boolean);

  const texto = encodeURIComponent(linhas.join("\n"));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;

  // Abre WhatsApp com mensagem pronta
  window.open(url, "_blank", "noopener,noreferrer");

  // Limpa o formulário
  f.reset();

  return false;
}
