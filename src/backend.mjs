import PocketBase from "pocketbase" ;
const pb = new PocketBase("http://127.0.0.1:8090") ;

export async function allMaisons() {
    const records = await pb.collection('Maison').getFullList() ;
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
    