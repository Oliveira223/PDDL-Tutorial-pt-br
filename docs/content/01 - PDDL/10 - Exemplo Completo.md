# Exemplo Completo em PDDL (Domínio + Problema)

Esta aula reúne os conceitos anteriores em um exemplo único e coerente: um pequeno domínio de “movimentação entre lugares” e um problema específico para ele.

O objetivo aqui não é criar um domínio “perfeito” ou cheio de recursos, e sim mostrar como as peças se encaixam:
- `:requirements`, `:types`, `:predicates` e `:action` no domínio
- `:domain`, `:objects`, `:init` e `:goal` no problema

## Objetivos de aprendizagem
- Ler um domínio e um problema completos e entender o papel de cada bloco.
- Identificar onde aparecem predicados, ações, pré-condições e efeitos.
- Entender como tipos restringem instanciações inválidas.

---

# 1) Domínio completo
Neste domínio, temos:
- um agente (robô) que se move entre lugares
- uma relação de conexão entre lugares
- uma ação `mover` com pré-condições e efeitos típicos (remove a posição antiga e adiciona a nova)

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

## Leitura guiada
- `(:requirements :strips :typing)`: estamos usando efeitos negativos e tipos.
- `(:types agente lugar)`: define categorias de objetos.
- `(em ?a - agente ?l - lugar)`: predicado de localização (relação entre agente e lugar).
- `(conectada ?x - lugar ?y - lugar)`: define as conexões permitidas.
- `mover`: só é aplicável se o agente estiver no lugar de origem e houver conexão; após isso, troca a localização.

# 2) Problema completo
Neste problema, criamos uma instância concreta do domínio:
- objetos: `robo`, `A`, `B`, `C`
- estado inicial: `robo` começa em `A` e existem conexões
- objetivo: terminar com o `robo` em `C`

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

## O que um planner pode produzir
Um plano típico seria:
- `mover robo A B`
- `mover robo B C`

Note que:
- o problema não “lista” ações; ele só descreve o mundo inicial e o objetivo
- a sequência de ações é descoberta pelo planner

# 3) Checklist de depuração (quando “não encontra plano”)

## Verifique o encaixe domínio ↔ problema
- O `:domain` do problema bate com o `(domain ...)` do domínio?
- Os predicados usados no problema existem em `:predicates`?
- As assinaturas batem? (tipos e quantidade de argumentos)

## Verifique aplicabilidade
- A pré-condição da primeira ação é satisfeita pelo `:init`?
- Você declarou as conexões necessárias em `:init`?

## Verifique efeitos
- A ação está mudando o estado do jeito esperado? (remove o antigo, adiciona o novo)

# 4) Exercícios 

1) No problema acima, qual fato impede um “teletransporte” direto de `A` para `C`?

2) Modifique o problema para que o objetivo seja chegar em `B` em vez de `C`. Escreva apenas o `:goal`.

3) Adicione ao `:init` uma conexão que permita um plano em um único passo de `A` para `C`. Qual linha você adicionaria?

### Gabarito sugerido
1) A ausência de `(conectada A C)` e a pré-condição `(conectada ?de ?para)` na ação `mover`.  
2) `(:goal (em robo B))`.  
3) `(conectada A C)`.

# Encerramento do módulo
Se você chegou até aqui, concluiu o módulo básico de PDDL. Antes de seguir para a integração com Python, recomenda-se fazer uma prática completa para consolidar modelagem e depuração:
- [[exercicios/01 - Básicos]]
- [[exercicios/02 - Intermediários]]

---

### Desafio Recomendado
Agora é o momento ideal para realizar o:
- **[[04 - Projetos/01 - Blocksworld]]**
Este projeto consolida tudo o que você aprendeu sobre ações, efeitos e pré-condições clássicas.

### <- Aula anterior
[[09 - Restrições]]

### -> Próxima aula
[[02 - Python/01 - Visão Python]]
