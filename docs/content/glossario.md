# Glossario de PDDL e Planejamento

Este glossario complementa o roadmap: o roadmap mostra a ordem de estudo; o glossario ajuda a consultar termos rapidamente durante as aulas e projetos.

## A

**Ação (action)**
Regra que descreve uma transicao de estado. Em PDDL, inclui `:parameters`, `:precondition` e `:effect`.

**Aditivo (efeito de adicao)**
Efeito que torna um fato verdadeiro apos executar uma acao.

**Aridade**
Quantidade de argumentos de um predicado. Ex.: `(conectada ?a ?b)` tem aridade 2.

## D

**Dominio (domain)**
Arquivo PDDL com as regras gerais do mundo: predicados, acoes, requisitos e tipos.

**Declarativo (paradigma)**
Abordagem em que voce descreve o que deve ser verdadeiro, em vez de programar passo a passo como resolver.

## E

**Efeito (effect)**
Mudanca causada por uma acao no estado do mundo. Pode adicionar fatos ou remover fatos via `not`.

**Estado**
Conjunto de fatos verdadeiros em um dado momento do plano.

**Estado inicial (`:init`)**
Fatos verdadeiros no comeco do problema.

## F

**Fato**
Instancia concreta de um predicado. Ex.: `(em robo A)`.

## G

**Goal (objetivo, `:goal`)**
Condicao que precisa ser satisfeita ao final do planejamento.

## H

**Heuristica**
Estimativa usada por algoritmos de busca para guiar a exploracao do espaco de estados e acelerar a busca.

## I

**Instanciacao**
Substituicao de variaveis de uma acao por objetos concretos do problema.

## P

**PDDL (Planning Domain Definition Language)**
Linguagem padrao para modelar problemas de planejamento automatico.

**Planner**
Ferramenta/algoritmo que recebe dominio + problema e tenta gerar um plano valido.

**Plano (plan)**
Sequencia ordenada de acoes que leva do estado inicial ao objetivo.

**Predicado (`:predicates`)**
Relacao/propriedade logica que pode ser verdadeira ou falsa no estado.

**Pre-condicao (`:precondition`)**
Condicao que precisa ser verdadeira para uma acao poder ser aplicada.

**Problema (problem)**
Arquivo PDDL de instancia: objetos, estado inicial e objetivo para um dominio especifico.

## R

**Requisitos (`:requirements`)**
Recursos de linguagem usados no dominio, como `:strips` e `:typing`.

**Remocao (efeito negativo)**
Efeito com `not` que torna um fato falso apos a acao.

**Restricao (`:constraints`)**
Regra global do plano (quando suportada pelo planner). Nem todo planner suporta.

## S

**STRIPS**
Subconjunto classico de planejamento com pre-condicoes e efeitos proposicionais.

## T

**Tipos (`:types` e `:typing`)**
Categorias de objetos (ex.: agente, lugar) para restringir instanciacoes invalidas e melhorar a modelagem.

## V

**Variavel**
Simbolo iniciado por `?` usado em predicados e parametros de acao (ex.: `?de`, `?para`).

---

## Como usar este glossario

1. Use durante leitura das aulas para tirar duvidas rapidas de termos.
2. Em depuracao, verifique termos parecidos que costumam confundir: predicado vs fato, pre-condicao vs efeito, dominio vs problema.
3. Atualize quando surgir novo termo recorrente nos projetos.
