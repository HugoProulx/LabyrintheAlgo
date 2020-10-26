import Node from './node'
import _ from 'lodash'




class Labyrinthe {
    //Tableau seulement utile pour la création initial.
    tableau = []
    meilleurRoute = []
    positionPresente = new Node(null, null, null)
    cheminParcourue = []

    /**
     * Le constructeur créer le tableau et par la suite connecter les liens entres chacuns des nodes.
     */
    constructor() {
        let node
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i === 0 && j === 0) {
                    node = new Node(i, j, "d")
                    this.tableau.push(node)
                }
                else if (i === 4 && j === 1) {
                    node = new Node(i, j, "f")
                    this.tableau.push(node)
                }
                else if ((i === 1 && j === 0) ||
                    (i === 1 && j === 1) ||
                    (i === 1 && j === 3) ||
                    (i === 3 && j === 1) ||
                    (i === 3 && j === 2) ||
                    (i === 3 && j === 3)) {
                }
                else {
                    node = new Node(i, j, " ")
                    this.tableau.push(node)
                }
            }
        }
        this.Connection()
        this.positionPresente = this.tableau[0]

    }

    /**
     * La méthode connection permet de connecter les noeux du labyrinthe entre eux.
     */
    Connection() {
        var position
        var positionComparaison
        for (let i = 0; i < this.tableau.length; i++) {
            position = _.cloneDeep(this.tableau[i].GetPosition())
            for (let j = 0; j < this.tableau.length; j++) {
                positionComparaison = _.cloneDeep(this.tableau[j].GetPosition())
                if (position[0] === (positionComparaison[0]) && (position[1] === positionComparaison[1] - 1) ||
                    position[0] === (positionComparaison[0] - 1) && (position[1] === positionComparaison[1]) ||
                    position[0] === (positionComparaison[0]) && (position[1] === positionComparaison[1] + 1) ||
                    position[0] === (positionComparaison[0] + 1) && (position[1] === positionComparaison[1])) {

                    this.tableau[j].ConnecteurLink(this.tableau[i])
                }
            }
        }
        this.positionPresente = this.tableau[0]
    }


    /**
     * Méthode permettant de parcourir le tableau au complet
     */
    Parcourir() {

        for (let i = 0; i < this.tableau.length; i++) {
            //Transfere est la variable de transger, elle prend la valeur d'une valeur suivant. 
            var transfere = this.positionPresente.NextPosition()
            //Si celle-ci n'est pas null, elle va devenir la possition présente.

            if (transfere !== null) {
                this.positionPresente = transfere;
                this.cheminParcourue.push(this.positionPresente)

            }
            else {
                this.SetParcourue( this.cheminParcourue.pop())
                this.positionPresente = _.cloneDeep(this.cheminParcourue[this.cheminParcourue.length - 1])
            }
            //Si celle-ci est null, c'est-à-dire qu'elle n'a pas de position suivante valide, 
            //celle-ci va retourner null.
            //Et donc, elle va revenir d'une position.

        }

        return this.cheminParcourue

    }


    SetParcourue(cheminParcourueRetour){
        for (let i = 0; i< this.tableau.length; i++){
            if ( this.tableau[i].positionX === cheminParcourueRetour.positionX && 
                this.tableau[i].positionY === cheminParcourueRetour.positionY )
                this.tableau[i].parcourue =true
        }
    }






}
export default Labyrinthe;
