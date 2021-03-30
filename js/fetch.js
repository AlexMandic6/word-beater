export const fetchData = async function() {
    const url = 'https://random-word-api.herokuapp.com/word?number=200';

    try{
        const result = await fetch(url);
        const data = await result.json();
        return data;
    } catch(error) {
        alert('Error happened! Try refreshing the browser!')
    }
}