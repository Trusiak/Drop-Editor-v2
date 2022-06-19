export const useDropFromSession = () => {
    let drop:any = sessionStorage.getItem('drop');

    return JSON.parse(drop)
 }
