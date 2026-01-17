// ===== MENU MOBILE =====
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

    menuEl.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });

    document.addEventListener("click", handleOutsideClick, true);
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

// ===== FORMULÁRIO (SIMULAÇÃO) =====
function submitForm(e) {
  e.preventDefault();

  const f = e.target;

  const data = {
    nome: f.name?.value || "",
    telefone: f.phone?.value || "",
    servico: f.service?.value || "",
    datetime: f.datetime?.value || "",
    mensagem: f.message?.value || ""
  };

  alert(
    "Pedido enviado!\n" +
    "Nome: " + data.nome + "\n" +
    "Serviço: " + data.servico + "\n" +
    "Entraremos em contato."
  );

  f.reset();
  return false;
}
