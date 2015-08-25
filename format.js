/**
 * $format
 * 
 * Formatador de texto a funcao curry
 * 
 * @module $format
 * @author Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 * 
 *        $format('Nome: {0}, Data de Nascimento: {2:99/99/9999}', ['cleber.programmer', '25011988']);
 * 
 */
Ninja.module('$format', [
  
  '$curry',
  '$replace',
  '$translation'

], function ($curry, $replace, $translation) {
  
  /**
   * Se o gap tiver uma mascara para formatar seu valor, sera
   * utilizado o $translation para formatar
   *
   * @private
   * @method solve
   * @param {Array} args Argumentos que seram substituido pelo gap
   * @param {String} gap Marcacao
   * @param {String} i Index do argumento que sera includo no lugar do gap
   * @param {String} has Se contem uma mascara
   * @param {String} pattern Mascara para formatar o valor do gap
   * @return {String} Gap formatado
   * @example
   *
   *        solve(['hi', 'cleber.programmer'], {0}, 0, undefined, undefined);
   *
   */
  function solve(args, gap, i, has, pattern) {
    return has ? $translation(pattern, args[i] || '') : args[i] || gap;
  }
  
  /**
   * Formatador de texto
   * 
   * @public
   * @module $format
   * @param {String} a Texto com gaps
   * @param {Array} b Colecao de valores para serem vinculado nos gaps
   * @return {String} Texto formatado
   * @example
   * 
   *        $format('Nome: {0}, Data de Nascimento: {2:99/99/9999}', ['cleber.programmer', '25011988']);
   * 
   */
  function format(a, b) {debugger;
    return $replace(a, /{(\d+)(:(.*?))?}/g, solve.bind(null, b));
  };
  
  /**
   * Revelacao do servico $format, encapsulando a visibilidade das funcoes
   * privadas
   */
  return $curry(format);
	
});
