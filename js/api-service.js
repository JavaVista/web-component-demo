import md5 from 'md5';
import dotenv from 'dotenv';
dotenv.config();


const API = (() => {
    const ts = new Date().getTime();
    const publicKey = process.env.PUBLIC_KEY;
    const privateKey = process.env.PRIVATE_KEY;
    const hash = md5(ts + privateKey + publicKey);

    const fetchCharacter = async characterName => {
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${characterName}`;
        const response = await fetch(url);
        return response.json();
    };

    const fetchCharactersThatStartWith = async characterName => {
        const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${characterName}`;
        const response = await fetch(url);
        return response.json();
    };

    return {
        fetchCharacter,
        fetchCharactersThatStartWith
    };
})();

export default API;
