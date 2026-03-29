# Exercícios Básicos

Este conjunto de exercícios serve para consolidar o “ciclo completo” do planejamento:
1) escrever (ou adaptar) um domínio e um problema
2) validar a modelagem (predicados, aridade, ações)
3) executar um planner
4) interpretar o plano e corrigir a modelagem quando necessário

## Pré-requisitos
- Ter concluído o módulo `01 - PDDL` até `10 - Exemplo Completo`.
- Para executar em planner local (Opção 2), recomenda-se também:
  - `02 - Python/06 - Ambiente para Planners Locais` e `02 - Python/07 - Runner real (Fast Downward e alternativas)`, ou
  - `03 - Planners/04 - Fast Downward` (operação prática).

---

# Exercício 1 — Do domínio ao plano (movimentação)

## Objetivo
Obter um plano para levar o robô de `A` até `C` usando o domínio `transporte` da aula de exemplo completo.

## Parte A — Preparar os arquivos 

Neste exercício, o objetivo é você conseguir montar os arquivos a partir do que aprendeu. Use como referência a aula: `01 - PDDL/10 - Exemplo Completo`.

1) Crie um arquivo `domain.pddl` para o domínio `transporte` contendo:
- `:requirements` com `:strips` e `:typing`
- `:types` com `agente` e `lugar`
- `:predicates` com `em(agente, lugar)` e `conectada(lugar, lugar)`
- uma ação `mover` que:
  - exige que o agente esteja em `?de` e exista conexão `?de -> ?para`
  - remove a posição antiga e adiciona a posição nova

Template (preencha os `...`):

```lisp
(define (domain transporte)
  (:requirements :strips :typing)
  (:types agente lugar)

  (:predicates
    ...
  )

  (:action mover
    :parameters (...)
    :precondition (...)
    :effect (...)))
```

2) Crie um arquivo `problem.pddl` com um problema `ir-de-a-para-c` contendo:
- `:domain transporte`
- `:objects` com `robo - agente` e `A B C - lugar`
- `:init` com o robô começando em `A` e conexões `A->B` e `B->C`
- `:goal` para terminar com o robô em `C`

Template (preencha os `...`):

```lisp
(define (problem ir-de-a-para-c)
  (:domain transporte)
  (:objects
    ...)
  (:init
    ...)
  (:goal ...))
```

## Parte B — Executar o planner

Você pode escolher uma das opções:

### Opção 1 (recomendada) — Planner online
- Cole `domain.pddl` e `problem.pddl` em um solver online de PDDL.
- Execute e observe o plano produzido.

### Opção 2 — Planner local
- Use um planner local (por exemplo, Fast Downward em WSL2 no Windows).
- Execute com os arquivos do domínio e problema e observe o plano produzido.

## Parte C — Interpretar o plano

1) Liste a sequência de ações retornada (na ordem).
2) Explique, em português, o que muda no estado em cada passo.

## Parte D — Modificações 

1) Modifique o problema para que o objetivo seja chegar em `B` em vez de `C`.  
Qual plano você espera receber?

2) Modifique o problema para permitir um plano em um único passo de `A` para `C`.  
Qual linha você adicionaria no `:init`?

---

# Gabarito
> Só consulte esta seção depois de tentar montar `domain.pddl` e `problem.pddl`. A intenção é você praticar a modelagem e identificar sozinho onde cada bloco entra.

## Parte A
## Solução (PDDL)

### domain.pddl

```lisp
(define (domain transporte)
  (:requirements :strips :typing)
  (:types agente lugar)

  (:predicates
    (em ?a - agente ?l - lugar)
    (conectada ?x - lugar ?y - lugar))

  (:action mover
    :parameters (?a - agente ?de - lugar ?para - lugar)
    :precondition (and
      (em ?a ?de)
      (conectada ?de ?para))
    :effect (and
      (not (em ?a ?de))
      (em ?a ?para))))
```

### problem.pddl

```lisp
(define (problem ir-de-a-para-c)
  (:domain transporte)

  (:objects
    robo - agente
    A B C - lugar)

  (:init
    (em robo A)
    (conectada A B)
    (conectada B C))

  (:goal (em robo C)))
```

## Parte C 
- `mover robo A B`
- `mover robo B C`

Interpretação:
- Após `mover robo A B`: remove `(em robo A)` e adiciona `(em robo B)`
- Após `mover robo B C`: remove `(em robo B)` e adiciona `(em robo C)`

## Parte D
1) Goal em `B` tende a gerar um plano de um passo:
- `mover robo A B`

2) Adicionar ao `:init`:
- `(conectada A C)`
