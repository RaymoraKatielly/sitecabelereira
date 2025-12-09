/* ============================================================
   ARQUIVO: script.js
   Função: controla menu mobile e envio simulado do formulário
   ============================================================ */

/* ---------- MENU MOBILE ---------- */
const btn = document.querySelector('.menu-toggle');
const menu = document.getElementById('main-menu');

btn?.addEventListener('click', () => {
  const aberto = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!aberto));

  if (!aberto) {
    const div = document.createElement('div');
    div.className = 'menu-open';

    div.innerHTML = `
      <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem">
        <li><a href="#servicos">Serviços</a></li>
        <li><a href="#galeria">Galeria</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#contato" class="cta">Agende</a></li>
      </ul>
    `;

    document.body.appendChild(div);
    btn._menuEl = div;
  } else {
    if (btn._menuEl) btn._menuEl.remove();
  }
});

/* ---------- ENVIO DO FORMULÁRIO (simulação) ---------- */
function submitForm(event) {
  event.preventDefault();
  
  const f = event.target;

  const dados = {
    nome: f.name.value,
    telefone: f.phone.value,
    servico: f.service.value,
    dataHora: f.datetime.value,
    mensagem: f.message.value
  };

  alert(
    `Pedido enviado!\nNome: ${dados.nome}\nServiço: ${dados.servico}\nEntraremos em contato.`
  );

  f.reset();
  return false;
}
