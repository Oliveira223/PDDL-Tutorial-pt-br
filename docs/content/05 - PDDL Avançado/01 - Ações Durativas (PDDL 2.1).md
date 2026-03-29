# Ações Durativas (PDDL 2.1) — introdução gradual

Até aqui, o curso trabalhou com planejamento **clássico**: ações instantâneas que mudam o estado de uma vez. Em muitos cenários reais, porém, ações têm **duração**, e condições podem precisar valer “durante” a execução (por exemplo, “a bateria deve permanecer acima de um limite enquanto o robô se move”).

Esta aula introduz **ações durativas** de forma progressiva, com foco em compreensão e modelagem segura.

## Objetivos de aprendizagem
- Entender o que muda quando ações deixam de ser instantâneas.
- Ler e escrever uma `:durative-action` com `:duration`, `:condition` e `:effect`.
- Diferenciar condições `at start`, `over all` e `at end`.

## Pré-requisitos
- Ter concluído: `01 - PDDL/10 - Exemplo Completo`.
- Recomendado: ter visto resultados de planner no módulo `03 - Planners`.

---

# 1) Modelo mental: linha do tempo

Em ações instantâneas, você pensa em “passos”.

Em ações durativas, você pensa em “intervalos”:
- a ação começa em um tempo `t`
- termina em `t + duração`
- certas condições precisam valer no início, no fim, ou durante todo o intervalo

---

# 2) Declarando requisitos

Em geral, ações durativas exigem declarar no domínio:
- `:durative-actions`

Exemplo de cabeçalho (mínimo ilustrativo):

```lisp
(define (domain robot-temporal)
  (:requirements :strips :typing :durative-actions)
  ...)
```

---

# 3) Estrutura de uma ação durativa

Uma ação durativa típica tem:
- `:parameters`
- `:duration`
- `:condition`
- `:effect`

Exemplo didático: mover um robô de uma sala para outra em 5 unidades de tempo.

```lisp
(:durative-action mover
  :parameters (?r - robo ?de - sala ?para - sala)
  :duration (= ?duration 5)
  :condition (and
    (at start (em ?r ?de))
    (over all (conectada ?de ?para))
  )
  :effect (and
    (at start (not (em ?r ?de)))
    (at end (em ?r ?para))
  )
)
```

---

# 4) Entendendo `at start`, `over all`, `at end`

## 4.1) `at start`
Condições que precisam ser verdadeiras no instante de início.
Exemplo: “o robô está em `?de` quando começa”.

## 4.2) `over all`
Condições que precisam permanecer verdadeiras durante toda a duração.
Exemplo: “o caminho está livre durante todo o movimento”.

## 4.3) `at end`
Condições que precisam ser verdadeiras no instante final (menos comum em exemplos básicos, mas útil).

---

# 5) Armadilhas comuns

- Esquecer de declarar `:durative-actions` em `:requirements`.
- Tentar usar `:precondition`/`:effect` (da ação instantânea) dentro de `:durative-action`.
- Colocar fatos em `over all` que o próprio domínio faz variar durante o tempo (criando impossibilidade).

---

# 6) Exercícios

1) Modifique o exemplo de `mover` para exigir que o robô esteja “operacional” durante todo o movimento:
- adicione um predicado `(operacional ?r - robo)`
- coloque a condição como `over all`

2) Em 3–5 linhas, explique a diferença semântica entre:
- remover `(em ?r ?de)` no `at start`
- remover `(em ?r ?de)` no `at end`

3) Proponha uma ação durativa `carregar-bateria` com duração fixa.  
Não use fluentes numéricos ainda; modele o resultado como um predicado `(bateria-ok ?r)`.

### Gabarito sugerido
1) Deve incluir `(over all (operacional ?r))` na `:condition`.  
2) `at start` significa que o robô “deixa de estar” em `?de` assim que começa; `at end` significa que ele ainda está em `?de` durante a execução e só deixa ao final, mudando a possibilidade de outras ações concorrentes.  
3) Uma `:durative-action` com `:effect (at end (bateria-ok ?r))` e condição mínima (por exemplo, `(at start (em ?r base))`).

### <- Aula anterior
Recomendado: retomar `03 - Planners/01 - Visão Planners`.

### -> Próxima aula
[[02 - Fluents Numéricos e Métrica]]
