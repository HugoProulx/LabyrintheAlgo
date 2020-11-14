#Hugo Proulx
#DA : 1801324
#Le main gère l’entièreté du projet

extends Node

export(float) var vitesse = 0.1


# Le graphe est décrit sous la forme de liste d'adjacence
# Chaque noeud est lié à la liste des noeuds avec lesquels il est connecté par une arête
# Les murs sont bien sûr exclus du graphe
var routePossible = 1
var graphe = {
	1: [2],
	2: [1,3],
	3: [2,4,8],
	4: [3,5],
	5: [4,10],
	8: [3,13],
	10: [5,15],
	11: [16,12],
	12: [11,13],
	13: [12,8,14],
	14: [13,15],
	15: [14,10,20],
	16: [11,21],
	20: [15,25],
	21: [16,22],
	22: [21,23],
	23: [22,24],
	24: [23,25],
	25: [24,20]
}
var grapheTentativeDistance = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0,
	8: 0,
	10: 0,
	11: 0,
	12: 0,
	13: 0,
	14: 0,
	15: 0,
	16: 0,
	20: 0,
	21: 0,
	22: 0,
	23: 0,
	24: 0,
	25: 0
}
# Le tableau parcours nous sert de file pour effectuer le parcours en largeur
var parcours = []
# si le numéro du noeud s'y retrouve, c'est qu'il a été visité
# On se servira de ce tableau pour l'animation finale du parcours de l'algorithme
var visite = []
var destinationFinalePointage



	
	
# Algorithme du parcours en largeur
func parcours_largeur():
	# On commence par enfiler le premier noeud et le marquer comme visité
	parcours.push_front(graphe[1])
	visite.append(1)
	var case = get_node("Noeud" + str(1))
	var present = 1
	var destinationFinale
	var new_tentative_distance = 0
	var smallest_tentative_distance = -1
	# Ensuite tant que notre file n'est pas vide :
	# - On défile un noeud
	# - Chaque voisin qui n'a pas été visité est marqué
	# - Ces voisins non visités sont ajoutés à la file
	while case._getColor() != Color("d36666") || parcours.empty():
		var noeud = parcours.pop_back()
		for voisin in noeud:
			present = _trouverCleNoeud(noeud)
			case = get_node("Noeud" + str(voisin))
			if !visite.has(voisin):
				new_tentative_distance = grapheTentativeDistance[present] + 1
				if grapheTentativeDistance[voisin] < new_tentative_distance:
					grapheTentativeDistance[voisin] = new_tentative_distance
					destinationFinale =new_tentative_distance
				visite.append(voisin)
				parcours.push_front(graphe[voisin])
				
			if grapheTentativeDistance[voisin] < smallest_tentative_distance || smallest_tentative_distance == -1:
				smallest_tentative_distance = grapheTentativeDistance[voisin]
	# Le Timer est démarré pour afficher l'animation un fois que l'algorithme a fini son travail
	$Timer.start(vitesse)
	return destinationFinale


# Fonctions utilitaires pour l'affichage et le GUI
func _on_Timer_timeout():
	if !visite.empty():
		var index = visite.pop_front()
		var case = get_node("Noeud" + str(index))
		case._visite()
	else:
		#_reset()
		_parcourPlusCourt()
		$Timer.stop()
		
		
		
# Fonction qui remet le programme à zero
func _reset():
	get_tree().call_group("Cases", "_reset_color")



# Détecteur de pression sur le bouton largeur 
func _on_Boutonlargeur_pressed():
	destinationFinalePointage = parcours_largeur()



# Détecteur de pression sur le bouton reset
func _on_BoutonReset_pressed():
	parcours = []
	visite= []
	_reset()
	
	
	
# Méthode permettant de trouver un noeud selon le noeud qu’il est
func _trouverCleNoeud(noeud):
	for key in graphe:
		if graphe[key] == noeud:
			return key;
			
			
			
# Méthode permettant de trouver un noeud selon la valeur qu’il a
func _trouverCleNoeudPointage(noeud):
	for key in grapheTentativeDistance:
		if grapheTentativeDistance[key] == noeud:
			return key;
			
			
# Méthode permettant de trouver le chemin le plus court lorsque la sortie est trouver.
func _parcourPlusCourt():
	var parcourPlusCourt=[]
	var present = destinationFinalePointage
	var presentKey = _trouverCleNoeudPointage(present)
	var presentVoisin = graphe[presentKey]
	parcourPlusCourt.push_back(presentKey)
	var entrer = 1
	while  presentKey != entrer :
		presentVoisin = graphe[presentKey]
		for voisin in presentVoisin:
			print (parcourPlusCourt)
			
			if (present > grapheTentativeDistance[voisin] && grapheTentativeDistance[voisin] != 0) || voisin == 1:
				present = grapheTentativeDistance[voisin]
				presentKey = voisin
				presentVoisin = graphe[presentKey]
				parcourPlusCourt.push_back(voisin)
	print("out")
	for key in parcourPlusCourt:
		var case = get_node("Noeud" + str(key))
		case._bestRoute()

