export default function validaCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanhos = [12, 13];
  let dvs = [0, 0];

  tamanhos.forEach((tamanho, index) => {
    let numeros = cnpj.substring(0, tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    dvs[index] = resultado;
  });

  return (
    Number(cnpj.charAt(12)) === dvs[0] && Number(cnpj.charAt(13)) === dvs[1]
  );
}
