export const getNomeUsuarios = (value) => {
  var arr =['Administrador','Gerente','Funcionario'];
  return arr[value-1];
};
export const getNomeUsuarioLabel = (value) => {
    var arr =['success','error','primary'];
    return arr[value-1];
  };