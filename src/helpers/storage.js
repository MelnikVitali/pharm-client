import jwt from 'jsonwebtoken';

class STORAGE {
    static setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

    static getItem = key => localStorage.getItem(key) !== "undefined" ? JSON.parse(localStorage.getItem(key)) : null;

    static removeItem = key => localStorage.removeItem(key);

    static clear = () => localStorage.clear();

    static jwtDecode = token => jwt.decode(token);
}

export default STORAGE;
