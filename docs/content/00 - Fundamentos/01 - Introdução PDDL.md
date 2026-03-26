
# Introdução ao PDDL

PDDL (Planning Domain Definition Language) é uma **linguagem formal** para descrever problemas de **planejamento automático**. Ela foi criada para padronizar a forma de **representar problemas de planejamento em Inteligência Artificial**, isto é, permitir a modelagem de ambientes, ações e objetivos de forma padronizada, possibilitando que **algoritmos especializados** encontrem soluções **automaticamente**.

No PDDL, em vez de programar a solução passo a passo, você deve **descrever o mundo**, as **regras** e o **objetivo**. Em seguida, um **planner** é responsável por encontrar um **plano** (uma sequência de ações) que atinja o objetivo.

## Objetivos de aprendizagem
- Compreender o que é PDDL e para que serve.
- Identificar os componentes centrais de um problema de planejamento.
- Diferenciar modelagem declarativa de programação imperativa no contexto de planejamento.

---
# Modelo de Planejamento
Em planejamento clássico (o caso mais comum em PDDL introdutório), descrevemos um problema por três componentes fundamentais:
- **Estado inicial**: representa a configuração inicial do mundo (o que é verdadeiro no começo).
- **Ações**: definem como o mundo pode mudar.
  - **Pré-condições**: quando a ação pode ocorrer (o que precisa ser verdadeiro antes).
  - **Efeitos**: o que muda após a execução (o que passa a ser verdadeiro ou deixa de ser).
- **Objetivo (goal)**: define o estado desejado a ser alcançado.

Um planner tenta encontrar um plano que satisfaça o objetivo:

Estado inicial → (ação 1) → (ação 2) → … → (ação n) → Objetivo

# PDDL vs Programação Tradicional

| **PDDL**                    | **Programação Tradicional**      |
| --------------------------- | -------------------------------- |
| Paradigma declarativo       | Paradigma imperativo             |
| Descreve o problema         | Descreve o algoritmo             |
| Foco no estado e nas regras | Foco no controle de fluxo        |
| Solução gerada por planner  | Solução implementada manualmente |

# Exemplo Simples
O trecho abaixo ilustra a ideia de uma ação em PDDL. Ele não é um domínio completo; serve apenas para visualizar pré-condições e efeitos.

```lisp
(:action mover
  :parameters (?de ?para)
  :precondition (em ?de)
  :effect (and (not (em ?de)) (em ?para)))
```

- `:parameters` declara variáveis que serão instanciadas pelo planner (por exemplo, `?de = A` e `?para = B`).
- `:precondition (em ?de)` diz que a ação só pode ocorrer se o agente estiver em `?de`.
- `:effect` diz que, após executar, o agente deixa de estar em `?de` e passa a estar em `?para`.

# Conclusão
A principal mudança de paradigma ao utilizar PDDL é que o desenvolvedor deixa de implementar a lógica de resolução e passa a se concentrar na **modelagem do problema**.

# Aplicações
PDDL é utilizado em diversas áreas, incluindo:
- Planejamento em robótica.
- Sistemas logísticos.
- Inteligência artificial para jogos.
- Automação de tarefas.

# Observações importantes
PDDL **não é** uma linguagem de programação **completa**, ou seja, não possui estruturas de controle tradicionais (como `if`, `for`, `while`). Portanto, seu uso exige uma **modelagem correta** do domínio e do problema para que o planner funcione adequadamente.

## Armadilhas comuns
- Tentar “controlar” a ordem das ações como se fosse um algoritmo imperativo.
- Definir efeitos incompletos (por exemplo, adicionar um fato sem remover o fato anterior).
- Criar predicados ambíguos, com significado pouco claro ou inconsistente.

## Exercícios
Nesta etapa, o objetivo não é “codificar” PDDL, e sim consolidar o raciocínio de planejamento. As atividades abaixo são leves; a parte de escrita em PDDL é opcional.

### Parte A — Compreensão

1) Identifique os componentes (em português) do cenário: “Um robô está na sala A e quer chegar à sala B.”
- Estado inicial:
- Objetivo:
- Uma ação plausível (descrita em palavras):

2) Marque V (verdadeiro) ou F (falso):
- ( ) Em PDDL, eu descrevo um algoritmo passo a passo.
- ( ) Um planner tenta encontrar uma sequência de ações para atingir o objetivo.
- ( ) Em uma ação, efeitos descrevem o que muda no mundo.

### Parte B — Modelagem mínima

3) Proponha dois predicados (nomes e significado) úteis para o cenário do robô e das salas.

4) Escreva uma versão de `mover` que exija conexão entre salas (pode usar o modelo do exemplo).

### Gabarito sugerido
1) Estado inicial: “robô em A”; objetivo: “robô em B”; ação plausível: “mover de A para B (se for permitido)”.  
2) F, V, V.  
3) Exemplos: `(em ?sala)` “robô está na sala”; `(conectada ?a ?b)` “há conexão de ?a para ?b”.  
4) Exemplo:

```lisp
(:action mover
  :parameters (?de ?para)
  :precondition (and (em ?de) (conectada ?de ?para))
  :effect (and (not (em ?de)) (em ?para)))
```


### -> Próxima aula
[[02 - Paradigma Declarativo]]
