### $format

Formatador de texto a funcao curry

```javascript
Ninja(['$format'], function ($format) {
  console.log($format('Nome: {0}, Data de Nascimento: {2:99/99/9999}', ['cleber.programmer', '25011988']));
});
```
