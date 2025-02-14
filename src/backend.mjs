import PocketBase from "pocketbase" ;
import Offres from "./pages/offres.astro";
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