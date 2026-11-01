// ============================================
// CONFIGURAÇÃO — Google Forms + Google Sheets
// ============================================

// URL de envio do Google Forms (termina em /formResponse)
const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdZcODM7WD4v18f0z45rN-r7BJYTXXFHlS2dZSTN5lyi4qWDg/formResponse";

// Códigos de cada pergunta do formulário
const ENTRY_IDS = {
  nomeAnimal: "entry.1549248913",
  especie: "entry.2018182640",
  nomeTutor: "entry.2062433681",
  telefone: "entry.1742993425",
  data: "entry.147349053",
  horario: "entry.1710488562",
  motivo: "entry.965552146"
};

// Planilha Google que recebe os agendamentos
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1ZldUvIqEhR5BL4larpT2JSE6LgmfI1QgpOl3ekTffcM/edit?usp=sharing";

// Senha da página agenda.html (troque por uma que só a equipe conheça)
const SENHA_AGENDA = "03022007";

// Horário de atendimento (usado na validação do formulário)
const HORARIO_ABERTURA = "08:00";
const HORARIO_FECHAMENTO = "18:00";
