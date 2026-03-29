# Predicados em PDDL

Em PDDL, **predicados** são o vocabulário lógico usado para descrever o estado do mundo. Um predicado representa uma propriedade ou relação que pode ser verdadeira ou falsa.

Na prática, o estado pode ser entendido como um conjunto de fatos verdadeiros. Um fato é uma instância de predicado com objetos concretos.

## Objetivos de aprendizagem
- Entender o que são predicados e qual seu papel no planejamento.
- Diferenciar predicado (forma) de fato (instância).
- Identificar aridade e variáveis em predicados.
- Evitar erros comuns de modelagem com predicados.

---

# Predicado vs fato

## Predicado (forma)
Um predicado é uma “frase com lacunas” que pode ser preenchida:

```lisp
(em ?lugar)
```

## Fato (instância)
Um fato é um predicado com objetos concretos:

```lisp
(em A)
```

Se `(em A)` aparece no `:init`, então ele é verdadeiro no estado inicial. Se não aparece, ele é assumido como falso (no planejamento clássico).

# Aridade (quantos argumentos)
A aridade é o número de argumentos do predicado:
- `(em ?lugar)` tem aridade 1.
- `(conectada ?a ?b)` tem aridade 2.

Em geral, você deve manter a aridade consistente em todo o domínio e problema. Se você declarar `(conectada ?a ?b)` e depois escrever `(conectada A)`, isso será um erro de modelagem.

# Variáveis e objetos
- Variáveis começam com `?` (por exemplo, `?lugar`, `?a`, `?b`) e aparecem no domínio, especialmente em ações.
- Objetos (por exemplo, `A`, `B`) aparecem no problema, em `:objects`, `:init` e `:goal`.

Exemplo de predicados no domínio:

```lisp
(:predicates
  (em ?lugar)
  (conectada ?a ?b))
```

Exemplo de fatos no problema:

```lisp
(:objects A B)
(:init (em A) (conectada A B))
(:goal (em B))
```

# Onde predicados aparecem
Predicados são usados em:
- `:predicates` (domínio): declaração do vocabulário.
- `:precondition` (ações): condições para aplicar uma ação.
- `:effect` (ações): fatos adicionados e removidos.
- `:init` (problema): fatos verdadeiros no início.
- `:goal` (problema): fatos que devem ser verdadeiros no final.

# Como escolher bons predicados
Um bom predicado deve ter:
- Significado claro e único.
- Nome consistente (mesmo verbo/substantivo para a mesma ideia).
- Granularidade adequada (nem genérico demais, nem específico demais).

Exemplos:
- Bom: `(em ?lugar)` para localização do agente.
- Bom: `(conectada ?a ?b)` para conexões.
- Evitar: `(ok)` sem explicar o que “ok” significa.

# Armadilhas comuns
- Predicados ambíguos (dificulta depuração e reutilização).
- Aridade inconsistente (declara com 2 argumentos e usa com 1).
- Misturar objetos e variáveis sem perceber (por exemplo, escrever `(em ?A)` no problema achando que `?A` é um objeto).
- Modelar “estado duplicado” por falta de efeitos negativos (por exemplo, permitir `(em A)` e `(em B)` ao mesmo tempo).

## Exercícios 

1) Diga se cada item é predicado (forma) ou fato (instância):
- `(conectada ?a ?b)`
- `(em sala1)`
- `(carregando ?objeto)`

2) Qual é a aridade de cada predicado?
- `(em ?lugar)`
- `(conectada ?a ?b)`
- `(em ?x ?y)`

3) Compare os dois objetivos abaixo:

```lisp
(:goal (em B))
```

```lisp
(:goal (and (em B)))
```

Eles são equivalentes? Em quais situações o uso de `and` deixa de ser opcional?

### Gabarito sugerido
1) Predicado; fato; predicado.  
2) 1; 2; 2.  
3) Sim, são equivalentes quando há apenas uma condição. `and` deixa de ser opcional quando você precisa exigir duas ou mais condições ao mesmo tempo, por exemplo: `(:goal (and (em B) (outra-condicao)))`.

### <- Aula anterior
[[03 - Problem Estrutura|03 - Estrutura do Problema]]

### -> Próxima aula
[[05 - Ações]]
