# Exercícios Intermediários

## Prova prática 

Esta prova é a “mão na massa” que consolida o módulo `01 - PDDL` antes de seguir para `02 - Python`. O objetivo não é decorar sintaxe, e sim demonstrar que você consegue:
- modelar um domínio coerente (sem estados inconsistentes)
- construir problemas (instâncias) e obter planos
- depurar quando “não encontra plano”

### Pré-requisitos
- Ter concluído `01 - PDDL/10 - Exemplo Completo`.
- Ter realizado pelo menos o `exercicios/01 - Básicos` uma vez (planner online ou local).

---

# Parte A — Modelagem do domínio (obrigatória)

## Cenário: “Entrega com chave”

Você tem um robô que se move entre salas conectadas. Existe uma porta trancada entre duas salas. Para atravessar essa porta, o robô precisa estar com a chave.

### Requisitos de modelagem

Crie um domínio chamado `entrega_chave` com:

1) **Tipos**
- `agente`, `sala`, `chave`

2) **Predicados mínimos**
- `(em ?a - agente ?s - sala)`
- `(conectada ?x - sala ?y - sala)` (movimento livre)
- `(porta-entre ?x - sala ?y - sala)` (existe uma porta no caminho)
- `(porta-trancada ?x - sala ?y - sala)` (porta está trancada)
- `(tem-chave ?a - agente ?k - chave)`
- `(chave-em ?k - chave ?s - sala)`

3) **Ações mínimas**
- `mover-livre`: mover entre salas conectadas que **não exigem chave**
- `pegar-chave`: pegar uma chave quando o robô está na mesma sala da chave
- `atravessar-porta`: mover por uma porta, exigindo que a porta esteja destrancada **ou** que o robô tenha a chave

### Critérios (o que será avaliado)
- Seus predicados são consistentes (mesma aridade/assinatura em todo o domínio).
- Suas ações não geram “duplicação” de estado (ex.: robô em duas salas ao mesmo tempo).
- Suas pré-condições são suficientes para evitar teletransporte.
- Sua modelagem permite resolver os problemas da Parte B.

---

# Parte B — Modelagem de problemas

Crie dois problemas que usam seu domínio.

## Problema 1 — Sem chave
- O robô começa em `A`.
- Existe caminho livre de `A` até `B` (sem porta).
- Objetivo: robô em `B`.

Você deve obter um plano com apenas movimentos livres.

## Problema 2 — Com porta e chave
- O robô começa em `A`.
- Existe uma porta trancada entre `B` e `C`.
- A chave está em alguma sala acessível (por exemplo, `A` ou `B`).
- Objetivo: robô em `C`.

Você deve obter um plano que envolva pegar a chave (se necessário) e atravessar a porta.

---

# Parte C — Execução

Para cada problema:
1) Execute o planner.
2) Cole o plano retornado (sequência de ações).
3) Explique em português o efeito de cada ação no estado.

Se algum problema não tiver plano:
- registre qual erro apareceu (se houver)
- descreva a hipótese (ex.: “faltou declarar um predicado no domínio”, “pré-condição forte demais”)
- descreva a correção aplicada

---

# Parte D — Perguntas de entendimento

Responda em 2–5 linhas cada:

1) Onde você garantiu que o robô não fica em duas salas ao mesmo tempo?
2) Se o planner retornar um plano vazio no Problema 1, quais hipóteses isso sugere sobre o `:init` e o `:goal`?
3) Dê um exemplo de erro de aridade que faria o domínio “quebrar” e explique por quê.

---

# Parte E — Bônus

1) Faça a porta destrancar permanentemente ao usar a chave (isto é, depois de atravessar uma vez, ela deixa de estar trancada).
2) Modele chaves específicas para portas (uma chave abre uma porta, outra chave abre outra).

---

# Checklist de aprovação

Você está pronto para `02 - Python` se conseguir:
- obter planos nos dois problemas
- explicar por que cada pré-condição existe (qual comportamento ela bloqueia)
- explicar por que cada efeito existe (qual fato ele adiciona/remove)
- corrigir um erro simples sem “chutar” (usando diagnóstico)

# Gabarito

> [!important] Antes de olhar
> Só consulte esta seção depois de tentar montar o domínio e os dois problemas. A prova é para consolidar modelagem e depuração.

## Parte A — Um domínio de referência (uma solução possível)

Uma forma coerente (entre várias) é tratar “porta” como um tipo de conexão especial: o movimento “livre” acontece por `(conectada ...)` e o movimento “com porta” acontece por `(porta-entre ...)`.

Predicados (mesma ideia do enunciado):

```lisp
(:predicates
  (em ?a - agente ?s - sala)
  (conectada ?x - sala ?y - sala)
  (porta-entre ?x - sala ?y - sala)
  (porta-trancada ?x - sala ?y - sala)
  (tem-chave ?a - agente ?k - chave)
  (chave-em ?k - chave ?s - sala))
```

### Ação `mover-livre` (sem porta)

```lisp
(:action mover-livre
  :parameters (?a - agente ?de - sala ?para - sala)
  :precondition (and (em ?a ?de) (conectada ?de ?para))
  :effect (and (not (em ?a ?de)) (em ?a ?para)))
```

### Ação `pegar-chave`

```lisp
(:action pegar-chave
  :parameters (?a - agente ?k - chave ?s - sala)
  :precondition (and (em ?a ?s) (chave-em ?k ?s))
  :effect (and (not (chave-em ?k ?s)) (tem-chave ?a ?k)))
```

### Ação `atravessar-porta`

Uma versão simples é permitir atravessar se:
- existe porta entre as salas
- o robô está na sala de origem
- e a porta não está trancada **ou** o robô tem alguma chave

```lisp
(:action atravessar-porta
  :parameters (?a - agente ?de - sala ?para - sala ?k - chave)
  :precondition (and
    (em ?a ?de)
    (porta-entre ?de ?para)
    (or (not (porta-trancada ?de ?para)) (tem-chave ?a ?k)))
  :effect (and (not (em ?a ?de)) (em ?a ?para)))
```

Observações:
- Essa modelagem usa uma chave genérica “que serve” para abrir a porta (não associa chave a porta). Isso é intencional para manter a prova no nível intermediário.
- A não duplicação de localização está garantida no `:effect` (remove `(em ?a ?de)` e adiciona `(em ?a ?para)`).

## Parte B — Problemas de referência (uma solução possível)

### Problema 1 — Sem chave
Uma instância mínima:

```lisp
(:objects robo - agente A B - sala k1 - chave)
(:init
  (em robo A)
  (conectada A B))
(:goal (em robo B))
```

Plano típico:
- `mover-livre robo A B`

### Problema 2 — Com porta e chave
Uma instância mínima:

```lisp
(:objects robo - agente A B C - sala k1 - chave)
(:init
  (em robo A)
  (conectada A B)
  (porta-entre B C)
  (porta-trancada B C)
  (chave-em k1 A))
(:goal (em robo C))
```

Plano típico:
- `pegar-chave robo k1 A`
- `mover-livre robo A B`
- `atravessar-porta robo B C k1`

## Parte D — Respostas esperadas

1) A não duplicação foi garantida nos efeitos das ações de movimento, removendo `(em ?a ?de)` e adicionando `(em ?a ?para)`.  
2) Sugere que o `:goal` já está satisfeito no `:init` (por exemplo, `(em robo B)` já verdadeiro no Problema 1), ou que o objetivo foi definido igual ao estado inicial.  
3) Exemplo: declarar `(conectada ?x ?y)` e usar `(conectada A)` no `:init`/pré-condição. Isso quebra porque a aridade não bate (faltou um argumento).

### -> Próximo passo
Após essa prova: `02 - Python/01 - Visão Python`
