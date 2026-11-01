// ============================================
// app.js - envia os agendamentos para o Google Forms
// ============================================
// Cada agendamento vira uma resposta do Google Forms, que cai
// automaticamente na Planilha Google vinculada a ele.
// (O navegador não deixa confirmar a resposta do Google; assumimos
// sucesso se não houver erro local.)

function enviarParaGoogleForm(dados) {
  return new Promise((resolve, reject) => {
    try {
      const form = document.getElementById("formOculto");
      form.action = GOOGLE_FORM_ACTION_URL;
      form.innerHTML = "";

      const campos = {
        [ENTRY_IDS.nomeAnimal]: dados.nomeAnimal,
        [ENTRY_IDS.especie]: dados.especie,
        [ENTRY_IDS.nomeTutor]: dados.nomeTutor,
        [ENTRY_IDS.telefone]: dados.telefone,
        [ENTRY_IDS.data]: formatarData(dados.data),
        [ENTRY_IDS.horario]: dados.horario,
        [ENTRY_IDS.motivo]: dados.motivo || ""
      };

      Object.entries(campos).forEach(([nomeCampo, valor]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = nomeCampo;
        input.value = valor;
        form.appendChild(input);
      });

      form.submit();

      setTimeout(() => {
        resolve({
          ok: true,
          registro: {
            id: gerarIdLocal(),
            nome_animal: dados.nomeAnimal,
            especie: dados.especie,
            nome_tutor: dados.nomeTutor,
            telefone: dados.telefone,
            data_consulta: dados.data,
            horario: dados.horario,
            motivo: dados.motivo
          }
        });
      }, 900);
    } catch (erro) {
      reject(erro);
    }
  });
}

function gerarIdLocal() {
  return (crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(16).slice(2));
}

function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function codigoProtocolo(id) {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

// Evita que texto digitado vire código HTML no comprovante
function escaparHtml(texto) {
  return String(texto == null ? "" : texto).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

// Máscara (99) 99999-9999
function mascararTelefone(valor) {
  const v = valor.replace(/\D/g, "").slice(0, 11);
  let o = "";
  if (v.length > 0) o = "(" + v.slice(0, 2);
  if (v.length >= 3) o += ") " + v.slice(2, 7);
  if (v.length > 7) o += "-" + v.slice(7);
  return o;
}
