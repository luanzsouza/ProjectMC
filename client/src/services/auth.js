export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const NOME_USUARIO = '&nome-usuario';
export const USER_TYPE ='&user-type';

export const login = token =>{
    localStorage.setItem(TOKEN_KEY,token);
}
export const logout=()=>{localStorage.clear()};
export  const setIdUsuario = id => localStorage.setItem(ID_USUARIO,id);
export const getIdUsuario =() => localStorage.getItem(ID_USUARIO);

export  const setTipoUsuario = type => localStorage.setItem(USER_TYPE,type);
export const getTipoUsuario =() => localStorage.getItem(USER_TYPE);

export  const setNomeUsuario = nome => localStorage.setItem(NOME_USUARIO,nome);
export const getNomeUsuario =() => localStorage.getItem(NOME_USUARIO);
export const getToken = () => localStorage.getItem(TOKEN_KEY);