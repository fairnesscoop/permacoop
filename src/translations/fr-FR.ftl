common-form-save = Enregistrer
common-form-delete = Supprimer
common-view = Voir
common-add = Ajouter
common-edit = Modifier
common-actions = Actions
common-yes = Oui
common-no = Non
common-table-empty = Aucun élément
common-money = {NUMBER($value, style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2)} €
common-date = {DATETIME($date, month: "numeric", year: "numeric", day: "numeric")}
common-month-long = {DATETIME($date, month: "long")}

coop-name = Fairness
site-title = Permacoop
breadcrumb-title = Fil d'Ariane
nav-open = Ouvrir la navigation principale
nav-title = Navigation principale

http-error = Erreur {$statusCode} : {$errorName}
form-errors-title = Erreur

header-profile = Mon compte
header-dropdown = Voir plus d'actions
header-logout = Se déconnecter

login-title = Connexion
login-email = Adresse email
login-password = Mot de passe
login-submit = Se connecter
login-error-failed = L'adresse email ou le mot de passe est incorrect. Veuillez réessayer.

home-title = Bonjour, {$user} !
home-pending-leaves-title = Demandes de congés
home-pending-leaves = {$leaves ->
    [0] Aucune demande de congés
    [1] 1 demande de congés
    *[other] {$leaves} demandes de congés
} en attente de validation
home-pending-leaves-see-all = Voir les demandes de congés

dashboard-title = Tableau de bord

faircalendar-title = FairCalendar
faircalendar-page-title = FairCalendar {DATETIME($date, month: "long", year: "numeric")}
faircalendar-events-add-title = Ajout d'un CRA le {$startDate}
faircalendar-events-add-span-title = Ajout d'un CRA du {$startDate} au {$endDate}
faircalendar-events-edit-title = Édition du CRA du {$date}
faircalendar-type-title = Type de CRA
faircalendar-type-option = {$type ->
    [mission] Mission
    [dojo] Dojos
    [support] Supports
    [formationConference] Formations / Confs
    [leave] Congés
    [holiday] Jour férié
    *[other] Autre
}
faircalendar-taskId-title = Mission
faircalendar-projectId-title = Projet
faircalendar-time-title = Temps passé
faircalendar-filters-month-title = Mois
faircalendar-filters-year-title = Année
faircalendar-filters-userId-title = Coopérateur·ice - salarié·e
faircalendar-overview-days = {$days ->
    [0] 0
    [1] 1 jour
    *[other] {$days} jours
}

crm-title = FairCRM

crm-customers-title = Clients
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
leaves-user = Coopérateur·ice - salarié·e
leaves-period = Période
leaves-type = Type de congé
leaves-type-value = {$type ->
    [paid] Congé payé
    [unpaid] Congé sans solde
    [special] Congé exceptionnel
    [medical] Congé maladie
    [illimited] Congé illimité
    *[other] Autre
}
leaves-type-value-plural = {$type ->
    [paid] Congés payés
    [unpaid] Congés sans solde
    [special] Congés exceptionnels
    [medical] Congés maladie
    [illimited] Congés illimités
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
    [one] 1 jour
    *[other] {$days} jours
}
leaves-see-requests = Voir les demandes de congés
leave-requests-title = Demandes de congés
leave-requests-add-title = Faire une demande de congés
leave-requests-edit-title = Demande de {$user}
leave-requests-error-cannot-moderate = Vous ne pouvez pas modérer cette demande de congés.
leave-requests-moderation = Modération
leave-requests-moderation-accept = Accepter la demande de congés
leave-requests-moderation-deny = Refuser la demande de congés
leaves-calendar-url-title = Lien d'abonnement au calendrier

payroll-elements-title = Éléments de paie
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
payroll-elements-download = Télécharger
payroll-elements-filename = Fairness - Éléments de paie - {$date}.csv
payroll-elements-wiki = Voir le Wiki

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
