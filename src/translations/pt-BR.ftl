common-form-save = Registrar
common-form-update = Gravar
common-form-delete = Excluir
common-form-cancel = Cancelar
common-view = Ver
common-add = Incluir
common-edit = Alterar
common-actions = Ações
common-close = Fechar
common-yes = Sim
common-no = Não
common-table-empty = Sem dados
common-money = {NUMBER($value, style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2)} €
common-date = {DATETIME($date, month: "numeric", year: "numeric", day: "numeric")}
common-month-long = {DATETIME($date, month: "long")}
common-month-previous = Mês Anterior
common-month-today = Hoje
common-month-next = Próximo Mês

dialog-delete-title = Excluir?
dialog-delete-yes = Sim
dialog-delete-no = Não

coop-name = Justiça
site-title = Permacoop
breadcrumb-title = Breadcrumb
nav-open = Abrir navegação principal
nav-title = Navegação Principal

http-error = Erro {$statusCode} : {$errorName}
form-errors-title = Erro

header-profile = A minha conta
header-dropdown = Ver mais ações
header-logout = Desconectar

pagination = Paginação
pagination-previous = Página anterior
pagination-page = Página {$page}
pagination-next = Página seguinte

login-title = Conexão
login-email = E-mail
login-password = Senha
login-submit = Conectar
login-error-failed = O endereço de e-mail ou a senha estão incorretos. Por favor, tente novamente.
login-error-auth-required = Por favor inicie sessão para logar a esta página.

home-title = Bom dia, {$user} !
home-pending-leaves-title = Solicitações pendentes
home-pending-leaves = {$leaves ->
    [0] Sem pedidos de licença
    [1] 1 pedido de licença
    *[other] {$leaves} pedidos de licença
} a aguardar validação
home-pending-leaves-see-all = Ver pedidos de licença

dashboard-title = Painel

faircalendar-title = FairCalendar
faircalendar-page-title = FairCalendar {DATETIME($date, month: "long", year: "numeric")}
faircalendar-events-add-title = Adicionar CRA em {$startDate}
faircalendar-events-add-span-title = Adição de CRA de {$startDate} a {$endDate}
faircalendar-events-edit-title = Edição do CRA de {$date}
faircalendar-type-title = Tipo de CRA
faircalendar-type-option = {$type ->
    [mission] Tarefa
    [dojo] Dojos
    [support] Suporte
    [formationConference] Formação / Confs
    [leave] Ausência
    [holiday] Feriado
    *[other] Outro
}
faircalendar-taskId-title = Tarefa
faircalendar-projectId-title = Projeto
faircalendar-time-title = Tempo gasto
faircalendar-summary-title = Comentário
faircalendar-filters-month-title = Mês
faircalendar-filters-year-title = Ano
faircalendar-filters-userId-title = Colaborador - funcionário
faircalendar-overview-days = {$days ->
    [0] 0
    [1] 1 dia
    *[other] {$days} dias
}
faircalendar-view-toggle = Ver
faircalendar-view-list = Ver lista
faircalendar-view-list-add-event = Adicione em CRA
faircalendar-view-calendar = Ver calendário

crm-title = FairCRM

crm-customers-title = Clientes
crm-customers-table-caption = Lista de Clientes
crm-customers-add-title = Adicionar cliente
crm-customers-edit-title = Editar o cliente "{$name}"
crm-customers-name = Nome do Cliente
crm-customers-street = Morada
crm-customers-zipCode = Código Postal
crm-customers-city = Concelho

crm-projects-title = Projetos
crm-projects-add-title = Adicionar um projeto
crm-projects-edit-title = Edtar o projeto "{$name}"
crm-projects-name-title = Nome do projeto
crm-projects-customer-title = Cliente
crm-projects-active = Ativo

crm-tasks-title = Tarefas
crm-tasks-name = Nome da Tarefa
crm-tasks-add-title = Adicionar uma tarefa
crm-tasks-edit-title = Editar a tarefa "{$name}"

profile-title = A minha conta
profile-firstName = Nome
profile-lastName = Sobrenome
profile-email = E-mail
profile-password = Senha

people-title = FairRH

leaves-title = Ausência
leaves-summary-title = Síntese
leaves-list-title = Lista das ausências
leaves-user = Colaborador - funcionário
leaves-period = Periodo
leaves-type = Tipo de Ausência
leaves-type-value = {$type ->
    [paid] Licença remunerada
    [unpaid] Licença sem remuneração
    [special] Licença Excepcional
    [medical] Licença Médica
    [illimited] Licença ilimitada
    [postponedWorkedFreeDay] Feriado Móvel
    [relocation] Licença de mudança
    *[other] Outro
}
leaves-type-value-plural = {$type ->
    [paid] Licenças pagas
    [unpaid] Licenças sem remuneração
    [special] Licenças Excepcionais
    [medical] Licenças Médicas
    [illimited] Licenças Ilimitadas
    [postponedWorkedFreeDay] Feriados Móveis
    [relocation] Licenças de Mudanças
    *[other] Outro
}
leaves-startDate = De
leaves-endDate = Até
leaves-period-value = De {$startDate} até {$endDate}
leaves-allDay = Todos os dias
leaves-comment = Comentário
leaves-status = Estado
leaves-status-value = {$status ->
    [pending] Pendente
    [accepted] Aceito
    [refused] Recusado
    *[other] Outro
}
leaves-duration = Duração
leaves-duration-value = {$days ->
    [1] 1 dias
    *[other] {$days} dias
}
leaves-moderator = Moderador
leaves-moderateAt = Moderado em
leaves-see-requests = Ver pedidos de licença
leave-requests-add-title = Solicitar licença
leave-requests-detail-title = Solicitação de {$user}
leave-requests-edit-title = Editar Solicitação de {$user}
leave-requests-error-cannot-moderate = Não pode moderar este pedido de licença.
leave-requests-moderation = Moderação
leave-requests-moderation-accept = Aceitar pedido de licença
leave-requests-moderation-deny = Recusar pedido de licença
leave-requests-delete = Cancelar esta licença
leave-requests-delete-title = Cancelar esta licença ?
leave-requests-delete-yes = Sim, cancelar
leave-requests-delete-no = Não, não cancelar
leave-requests-create-notification-message = Saudações 👋, {$userFirstName} solicitou licença de {$startDate} até {$endDate} ({$duration} dia(s)). Poder ver aqui: {$link}
leave-requests-approve-notification-emoji-name = white_check_mark
leave-requests-approve-notification-message = Pedido de licença aprovado por {$moderatorFirstName}
leaves-calendar-url-title = Link de assinatura do calendário
-leaves-overview-days-value = {$days ->
    [0] 0
    [1] 1 dia
    *[other] {$days} dias
}
leaves-overview-daysRemaining = Solicitações de ausência restantes
leaves-overview-daysRemaining-showExplanation = Veja a explicação
leaves-overview-daysRemaining-value = {$daysRemaining ->
    [0] 0
    [1] 1 dia
    *[other] {$daysRemaining} dias
}
leaves-overview-daysRemaining-explanation = {$daysPerYear ->
    [0] 0
    [1] 1 dia
    *[other] {$daysPerYear} dias
} por ano, zero em 01/06, exceto feriados excecionais

payroll-elements-title = Itens de pagamento
payroll-elements-page-title = Itens de pagamento {DATETIME($date, month: "long", year: "numeric")}
payroll-elements-user = Funcionário / estagiário
payroll-elements-contract = Contrato
payroll-elements-contract-value = { users-contract-value } {$executivePosition ->
    [yes] Quadro
    *[no] {""}
}
payroll-elements-joiningDate = Data de adminissão
payroll-elements-annualEarnings = Salário bruto anual
payroll-elements-monthlyEarnings = Salário bruto mensal
payroll-elements-workingTime = TC / TP
payroll-elements-executive = Quadro
payroll-elements-transportFee = Transporte
payroll-elements-sustainableMobilityFee = Mobilidade sustentável
payroll-elements-mealTickets = Vale alimentação
payroll-elements-healthInsurance = Mútuo
payroll-elements-paidLeaves = Licenças pagas
payroll-elements-unpaidLeaves = Licenças não pagas
payroll-elements-medicalLeaves = Licenças médicas
payroll-elements-specialLeaves = Licenças excepcionais
payroll-elements-postponedWorkedFreeDayLeaves = Feriados móveis
payroll-elements-relocationLeaves = Licenças de mudanças
payroll-elements-download = Download
payroll-elements-filename = Justiça - Elementos salariais - {$date}.csv
payroll-elements-wiki = Ver o Wiki
payroll-elements-filters-month-title = Mês
payroll-elements-filters-year-title = Ano

meal-tickets-title = Vales alimentação
meal-tickets-user = Colaborador - funcionário
meal-tickets-num-tickets = Nb vales alimentação
meal-tickets-num-exceptions = Nb exceções
meal-tickets-add-removal-title = Adicionar uma exceção
meal-tickets-removal-date = Não desejo receber voucher de restaurante para a data de :


users-title = Colaboradores e funcionários
users-add-title = Adicionar umAjouter um colaborador/funcionário
users-edit-title = Atualizar informações administrativas de {$user}
users-firstName = Nome
users-lastName = Sobrenome
users-email = E-mail
users-role = Função
users-role-value = {$role ->
    [cooperator] Colaborador
    [employee] Funcionário
    [accountant] Contabilista
    *[other] Outro
}
users-contract = Contrato de trabalho
users-contract-value = {$contract ->
    [cdi] CDI
    [cdd] CDD
    [ctt] CTT
    [apprenticeship] Aprendizado
    [professionalization] Profissionalização
    *[other] Outro
}
users-workingTime = Tempos de trabalho
users-workingTime-value = {$workingTime ->
    [full_time] Tempo integral
    [part_time] Tempo parcial
    *[other] Outro
}
users-executivePosition = Estado da estrutura
users-healthInsurance = Mútuo
users-annualEarnings = Ordenado anual bruto
users-transportFee = Custos de transporte
users-sustainableMobilityFee = Pacote de mobilidade sustentável
users-joiningDate = Data de entrada
users-leavingDate = Data de saída

clipboard-copy = Copiar para área de transferência

theme-toggle = Alterar Tema

