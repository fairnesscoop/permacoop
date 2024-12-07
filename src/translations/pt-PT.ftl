common-form-save = Registar
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
login-email = Email
login-password = Palavra passe
login-submit = Conectar
login-error-failed = O endereço de e-mail ou a palavra-passe estão incorretos. Por favor, tente novamente.
login-error-auth-required = Por favor inicie sessão para aceder a esta página.

home-title = Bom dia, {$user} !
home-pending-leaves-title = Deixe solicitações
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
    [mission] Mission
    [dojo] Dojos
    [support] Supports
    [formationConference] Formations / Confs
    [leave] Deixar
    [holiday] Feriado
    *[other] Outro
}
faircalendar-taskId-title = Mission
faircalendar-projectId-title = Projet
faircalendar-time-title = Temps passé
faircalendar-summary-title = Commentaire
faircalendar-filters-month-title = Mois
faircalendar-filters-year-title = Année
faircalendar-filters-userId-title = Coopérateur·ice - salarié·e
faircalendar-overview-days = {$days ->
    [0] 0
    [1] 1 jour
    *[other] {$days} jours
}
faircalendar-view-toggle = Vue
faircalendar-view-list = Vue liste
faircalendar-view-list-add-event = Ajouter un CRA
faircalendar-view-calendar = Vue calendrier

crm-title = FairCRM

crm-customers-title = Clients
crm-customers-table-caption = Liste des clients
crm-customers-add-title = Ajouter un client
crm-customers-edit-title = Édition du client "{$name}"
crm-customers-name = Nom du client
crm-customers-street = Adresse
crm-customers-zipCode = Code postal
crm-customers-city = Ville

crm-projects-title = Projets
crm-projects-add-title = Ajouter un projet
crm-projects-edit-title = Édition du projet "{$name}"
crm-projects-name-title = Nom du projet
crm-projects-customer-title = Client
crm-projects-active = Actif

crm-tasks-title = Missions
crm-tasks-name = Nom de la mission
crm-tasks-add-title = Ajouter une mission
crm-tasks-edit-title = Édition de la mission "{$name}"

profile-title = Mon compte
profile-firstName = Prénom
profile-lastName = Nom
profile-email = Adresse e-mail
profile-password = Mot de passe

people-title = FairRH

leaves-title = Congés
leaves-summary-title = Synthèse
leaves-list-title = Liste des congés
leaves-user = Coopérateur·ice - salarié·e
leaves-period = Période
leaves-type = Type de congé
leaves-type-value = {$type ->
    [paid] Congé payé
    [unpaid] Congé sans solde
    [special] Congé exceptionnel
    [medical] Congé maladie
    [illimited] Congé illimité
    [postponedWorkedFreeDay] Congé jour férié glissant
    [relocation] Congé déménagement
    *[other] Autre
}
leaves-type-value-plural = {$type ->
    [paid] Congés payés
    [unpaid] Congés sans solde
    [special] Congés exceptionnels
    [medical] Congés maladie
    [illimited] Congés illimités
    [postponedWorkedFreeDay] Congés jours fériés glissants
    [relocation] Congés déménagement
    *[other] Autre
}
leaves-startDate = Du
leaves-endDate = Au
leaves-period-value = Du {$startDate} au {$endDate}
leaves-allDay = Toute la journée
leaves-comment = Commentaire
leaves-status = État
leaves-status-value = {$status ->
    [pending] En attente de validation
    [accepted] Accepté
    [refused] Refusé
    *[other] Autre
}
leaves-duration = Durée
leaves-duration-value = {$days ->
    [1] 1 jour
    *[other] {$days} jours
}
leaves-moderator = Modérateur⋅ice
leaves-moderateAt = Modéré le
leaves-see-requests = Voir les demandes de congés
leave-requests-add-title = Faire une demande de congés
leave-requests-detail-title = Demande de {$user}
leave-requests-edit-title = Édition de la demande de {$user}
leave-requests-error-cannot-moderate = Vous ne pouvez pas modérer cette demande de congés.
leave-requests-moderation = Modération
leave-requests-moderation-accept = Accepter la demande de congés
leave-requests-moderation-deny = Refuser la demande de congés
leave-requests-delete = Annuler ce congé
leave-requests-delete-title = Annuler ce congé ?
leave-requests-delete-yes = Oui, annuler
leave-requests-delete-no = Non, ne pas annuler
leave-requests-create-notification-message = Salut 👋, {$userFirstName} a fait une demande de congé du {$startDate} au {$endDate} ({$duration} jour(s)). Vous pouvez la visualiser ici: {$link}
leave-requests-approve-notification-emoji-name = white_check_mark
leave-requests-approve-notification-message = Demande de congé approuvée par {$moderatorFirstName}
leaves-calendar-url-title = Lien d'abonnement au calendrier
-leaves-overview-days-value = {$days ->
    [0] 0
    [1] 1 jour
    *[other] {$days} jours
}
leaves-overview-daysRemaining = Congés payés restants
leaves-overview-daysRemaining-showExplanation = Voir l'explication
leaves-overview-daysRemaining-value = {$daysRemaining ->
    [0] 0
    [1] 1 jour
    *[other] {$daysRemaining} jours
}
leaves-overview-daysRemaining-explanation = {$daysPerYear ->
    [0] 0
    [1] 1 jour
    *[other] {$daysPerYear} jours
} par an, réinitialisé le 01/06, hors congés exceptionnels

payroll-elements-title = Éléments de paie
payroll-elements-page-title = Éléments de paie {DATETIME($date, month: "long", year: "numeric")}
payroll-elements-user = Salarié·e / stagiaire
payroll-elements-contract = Contrat
payroll-elements-contract-value = { users-contract-value } {$executivePosition ->
    [yes] Cadre
    *[no] {""}
}
payroll-elements-joiningDate = Date d'entrée
payroll-elements-annualEarnings = Salaire brut annuel
payroll-elements-monthlyEarnings = Salaire brut mensuel
payroll-elements-workingTime = TC / TP
payroll-elements-executive = Cadre
payroll-elements-transportFee = Transport
payroll-elements-sustainableMobilityFee = Mobilité durable
payroll-elements-mealTickets = Tickets resto
payroll-elements-healthInsurance = Mutuelle
payroll-elements-paidLeaves = Congés payés
payroll-elements-unpaidLeaves = Congés sans solde
payroll-elements-medicalLeaves = Congés maladie
payroll-elements-specialLeaves = Congés exceptionnels
payroll-elements-postponedWorkedFreeDayLeaves = Congés jours fériés glissants
payroll-elements-relocationLeaves = Congés déménagement
payroll-elements-download = Télécharger
payroll-elements-filename = Fairness - Éléments de paie - {$date}.csv
payroll-elements-wiki = Voir le Wiki
payroll-elements-filters-month-title = Mois
payroll-elements-filters-year-title = Année

meal-tickets-title = Tickets resto
meal-tickets-user = Coopérateur·ice - Salarié·e
meal-tickets-num-tickets = Nb tickets restaurant
meal-tickets-num-exceptions = Nb exceptions
meal-tickets-add-removal-title = Ajouter une exception
meal-tickets-removal-date = Je ne souhaite pas recevoir de ticket restaurant pour la date du :


users-title = Coopérateur·ices et salarié·es
users-add-title = Ajouter un·e coopérateur·ice-salarié·e
users-edit-title = Mise à jour des informations administratives de {$user}
users-firstName = Prénom
users-lastName = Nom
users-email = Adresse e-mail
users-role = Rôle
users-role-value = {$role ->
    [cooperator] Coopérateur·ice
    [employee] Salarié·e
    [accountant] Comptable
    *[other] Autre
}
users-contract = Contrat de travail
users-contract-value = {$contract ->
    [cdi] CDI
    [cdd] CDD
    [ctt] CTT
    [apprenticeship] Apprentissage
    [professionalization] Professionalisation
    *[other] Autre
}
users-workingTime = Temps de travail
users-workingTime-value = {$workingTime ->
    [full_time] Temps plein
    [part_time] Temps partiel
    *[other] Autre
}
users-executivePosition = Statut cadre
users-healthInsurance = Mutuelle
users-annualEarnings = Salaire annuel brut
users-transportFee = Frais de transport
users-sustainableMobilityFee = Forfait mobilité durable
users-joiningDate = Date d'entrée
users-leavingDate = Date de sortie

clipboard-copy = Copier dans le presse papier

theme-toggle = Alterner le thème
