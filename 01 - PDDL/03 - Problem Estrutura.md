# Estrutura do Problema

O arquivo de **problema** em PDDL descreve uma **instância específica** de um domínio: quais objetos existem, qual é o estado inicial e qual objetivo deve ser alcançado. Se o domínio define as regras do “mundo”, o problema define uma “situação concreta” dentro desse mundo.

## Objetivos de aprendizagem
- Entender os blocos principais de um arquivo de problema.
- Identificar o que pertence a `:objects`, `:init` e `:goal`.
- Relacionar o problema ao domínio por meio de `:domain`.

---

# Estrutura geral
Um arquivo de problema segue, de forma simplificada, a seguinte estrutura:

```lisp
(define (problem nome-do-problema)
  (:domain nome-do-dominio)
  (:objects
    ...)
  (:init
    ...)
  (:goal
    ...))
```

# Componentes

## 1) Nome do problema (`problem`)
Identifica a instância do domínio.

```lisp
(define (problem ir-de-a-para-b)
  ...)
```

## 2) Referência ao domínio (`:domain`)
Conecta o problema ao domínio, permitindo que o planner saiba quais predicados e ações são válidos.

```lisp
(:domain transporte)
```

O nome usado aqui deve ser o mesmo definido no domínio, por exemplo: `(define (domain transporte) ...)`.

## 3) Objetos (`:objects`)
Declara os objetos concretos que existem nessa instância. Eles são os valores que podem substituir variáveis nas ações (por exemplo, `?de` e `?para`).

Exemplo:

```lisp
(:objects A B)
```

Se o domínio usar tipos, os objetos podem ser declarados com tipo (veremos isso na aula de tipos).

## 4) Estado inicial (`:init`)
Lista os fatos que são verdadeiros no início do planejamento. Em planejamento clássico, o que não aparece em `:init` é assumido como falso.

Exemplo:

```lisp
(:init
  (em A)
  (conectada A B))
```

## 5) Objetivo (`:goal`)
Descreve o estado desejado a ser alcançado. Em geral, é uma fórmula lógica (muito comum usar `and`).

Exemplo:

```lisp
(:goal (and (em B)))
```

# Exemplo completo (mínimo)
O exemplo abaixo mostra domínio e problema “se encaixando” pela referência `:domain` e pelo uso dos mesmos predicados.

```lisp
(define (problem ir-de-a-para-b)
  (:domain transporte)
  (:objects A B)
  (:init
    (em A)
    (conectada A B))
  (:goal (and (em B))))
```

# Armadilhas comuns
- Declarar objetos e usar nomes diferentes em `:init`/`:goal` (por exemplo, declarar `A` e escrever `a`).
- Esquecer fatos necessários no `:init` (o planner não “assume” conexões, permissões ou estados implícitos).
- Escrever objetivos que não podem ser alcançados pelas ações disponíveis no domínio.

## Exercícios 

1) Classifique cada item como `:objects`, `:init` ou `:goal`:
- “A e B existem como lugares no problema.”
- “No início, o agente está em A.”
- “Queremos terminar com o agente em B.”

2) Por que o problema precisa declarar `(:domain ...)`?

3) Escreva um `:goal` que exija duas condições ao mesmo tempo (use `and`).

### Gabarito sugerido
1) `:objects`; `:init`; `:goal`.  
2) Porque o planner precisa saber quais regras (predicados e ações) definem o mundo daquele problema.  
3) Exemplo: `(:goal (and (em B) (alguma-outra-condicao)))`.

### <- Aula anterior
[[02 - Estrutura do Domínio]]

### -> Próxima aula
[[04 - Predicados]]
