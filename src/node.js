class Node {
    positionX
    positionY
    specification
    parcourue = false;
    link = []


    constructor(x, y, specification) {
        this.positionX = x;
        this.positionY = y;
        this.specification = specification
        if (x === 0 && y === 0)
            this.parcourue = true
    }


    NextPosition() {
        //Parcour de toute la liste des liens que la case a.
        for (let i = 0; i < this.link.length; i++) {
            //Vérification si le liens a déjà été parcouru
            //Si il n'a pas été parcouru, il va être retourner.
            if (this.link[i].parcourue) {
                }
            else {
                this.link[i].parcourue = true
                return this.link[i]
            
            }

        }
        //Autrement, null va être retourner pour faire comprendre qu'il ne reste plus de liens valide sur cette case.
        return null
    }

    ConnecteurLink(node) {
        this.link.push(node);
    }

    GetLink() {
        return this.link;
    }

    GetPosition() {
        var position = [this.positionX, this.positionY]
        return position
    }
    GetSpecification() {
        this.parcourue = true;
        return this.specification
    }

    GetParcourue() {
        return this.parcourue
    }

}
export default Node;
