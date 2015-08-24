/**
 * $format
 * 
 * Formatador de texto
 * 
 * @module $format
 * @author Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 * 
 *        $format('Nome: {0}, CPF: {1:999.999.999-99} e Data de Nascimento: {2:99/99/9999}', ['cleber.programmer', '98765432100', '25011988']);
 * 
 */
Ninja.module('$format', ['$curry', '$iterator', '$join', '$slice', '$map'], function ($curry, $iterator, $join, $slice, $map) {
  
  function translation(pattern, args) {
    
    var hash = {
      
      '9': char.bind(null, /[0-9]/),
      'A': char.bind(null, /[a-zA-Z]/),
      '#': char.bind(null, /[a-zA-Z0-9]/),
      
      '.': gap.bind(null, /[\.]/),
      ',': gap.bind(null, /[\,]/),
      ':': gap.bind(null, /[\:]/),
      '-': gap.bind(null, /[\-]/),
      '/': gap.bind(null, /[\/]/),
      '(': gap.bind(null, /[\(]/),
      ')': gap.bind(null, /[\)]/),
      ' ': gap.bind(null, /[\ ]/),
      
    };
    
    function char(regexp, item) {
      return current(regexp) || mapper(item);
    }
    
    function current(regexp) {
      return regexp.test(args.next()) ? args.current() : !1;
    }
    
    function gap(regexp, item) {
      return current(regexp) || (args.prev() && item);
    }
    
    function mapper(item) {
      return args.hasNext() ? hash[item](item) : null;
    }
    
    return $join($map($slice(pattern), mapper), '');
    
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
   *        $format('Nome: {0}, CPF: {1:999.999.999-99} e Data de Nascimento: {2:99/99/9999}', ['cleber.programmer', '98765432100', '25011988']);
   * 
   */
  function format(a, b) {
    
    function solve(gap, index, hasPattern, pattern) {
      return hasPattern ? translation(pattern, $iterator(b[index] || '')) : b[index] || gap;
    }
    
    return a.replace(/{(\d+)(:(.+?))?}/g, solve);
    
  };
  
  /**
   * Revelacao do servico $format, encapsulando a visibilidade das funcoes
   * privadas
   */
  return $curry(format);
	
});
