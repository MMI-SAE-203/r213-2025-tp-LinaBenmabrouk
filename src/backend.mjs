import PocketBase from "pocketbase" ;
const pb = new PocketBase("http://127.0.0.1:8090") ;


export async function allMaisons() {
    let records = await pb.collection('Maison').getFullList() ;
    records= records.map(m => {
        m.imgUrl = pb.files.getURL(m,m.Images);
        return m
    });
    console.log(records);
    
    return records ;
}

export async function oneID(id) {
    const oneRecord = await pb.collection('Maison').getFullList(id) ;
    return oneRecord ;
}

export async function allMaisonsFavori() {
    const records = await pb.collection('Maison').getFullList({filter: "Favori = True"}) ;
    return records ;
}


export async function allMaisonsSorted() {
    const sortedrecords = await pb.collection('Maison').getFullList({sort : "Prix"}) ;
    return sortedrecords ;
}


export async function bySurface(s) {
    const maisonSurface = await pb.collection('Maison').getFullList({filter : `Surface > ${s}`}) ;
    return maisonSurface ;
}


export async function getOffres() {
    try {
        let maisons = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        maisons = maisons.map((maison) => {
            maison.imageUrl= pb.getURL(maison, maison.Images);
            return maison;
        });
        return maisons;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}


export async function getOffre(id) {
    try {
        let data = await pb.collection('Maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.Images);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function addOffre(house) {
    try {
        await pb.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}


export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
            filter: `Prix >= ${prixMin} && Prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.Images);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}

export async function setFavori(house) {
    await pb.collection('Maison').update(house.id, {favori: !house.Favori});
}


export async function OffreAgents() {
    try {
        let agents = await pb.collection('Agent').getFullList({
            sort: '-created',
        });
        return agents;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}