# Pré-condições em PDDL

Em PDDL, **pré-condições** são as condições lógicas que precisam ser verdadeiras no estado atual para que uma ação possa ser aplicada. Elas funcionam como o “portão de entrada” de uma ação: se a pré-condição não for satisfeita, a ação simplesmente não é válida naquele momento.

## Objetivos de aprendizagem
- Entender o papel de `:precondition` nas ações.
- Ler pré-condições com `and`, `or` e `not`.
- Entender o que significa uma ação ser aplicável em um estado.
- Evitar erros comuns ao definir pré-condições.

---

# O que significa “ser aplicável”
Considere um estado como um conjunto de fatos verdadeiros. A ação é aplicável se a fórmula em `:precondition` for satisfeita por esse estado.

Exemplo de estado:

```lisp
(:init
  (em A)
  (conectada A B))
```

Se uma ação exige `(em A)` na pré-condição, então ela é aplicável nesse estado. Se exigir `(em B)`, ela não é aplicável (a menos que `(em B)` também esteja verdadeiro).

# Formas comuns de pré-condição

## 1) Um único predicado
```lisp
:precondition (em ?de)
```

Interpretação: a ação só pode ocorrer se o agente estiver em `?de`.

## 2) Conjunção (`and`)
Use `and` quando todas as condições precisam ser verdadeiras ao mesmo tempo.

```lisp
:precondition (and (em ?de) (conectada ?de ?para))
```

Interpretação: estar em `?de` e existir conexão de `?de` para `?para`.

## 3) Disjunção (`or`)
Use `or` quando basta uma condição dentre várias.

```lisp
:precondition (or (tem-chave) (porta-aberta))
```

Interpretação: ou o agente tem a chave, ou a porta já está aberta.

## 4) Negação (`not`)
Use `not` quando você precisa que um fato não seja verdadeiro no estado atual.

```lisp
:precondition (not (porta-trancada))
```

Interpretação: a porta não pode estar trancada.

# Exemplo completo (mover)
```lisp
(:action mover
  :parameters (?de ?para)
  :precondition (and (em ?de) (conectada ?de ?para))
  :effect (and (not (em ?de)) (em ?para)))
```

Aqui, a pré-condição impede teletransporte e limita movimentos apenas para conexões existentes.

# Como depurar pré-condições
Quando uma ação “não aparece” no plano, quase sempre ela não está aplicável em nenhum estado visitado. Para depurar, verifique:
- se os predicados usados na pré-condição realmente aparecem em `:init` (ou podem ser produzidos por efeitos de outras ações)
- se você não deixou a pré-condição forte demais (ex.: exigindo um fato impossível)
- se os nomes/argumentos estão consistentes (por exemplo, `A` vs `a`)

# Armadilhas comuns
- Usar pré-condições fracas demais e “compensar” no `:goal` (o goal não controla aplicabilidade).
- Confundir `not` em pré-condição (exigir ausência) com `not` em efeito (remover um fato).
- Criar pré-condições que dependem de fatos que nunca são adicionados por nenhuma ação.

## Exercícios

Considere o estado inicial:

```lisp
(:init
  (em A)
  (conectada A B)
  (porta-trancada))
```

1) No estado acima, quais pré-condições abaixo são satisfeitas?
- `(em A)`
- `(em B)`
- `(and (em A) (conectada A B))`
- `(not (porta-trancada))`

2) Escreva uma pré-condição para permitir mover de `?de` para `?para` apenas se houver conexão.

3) Em uma frase, explique quando faz sentido usar `or` em pré-condições.

### Gabarito sugerido
1) Satisfeitas: `(em A)` e `(and (em A) (conectada A B))`. Não satisfeitas: `(em B)` e `(not (porta-trancada))`.  
2) Exemplo: `:precondition (and (em ?de) (conectada ?de ?para))`.  
3) Quando existem alternativas válidas para habilitar a ação (qualquer uma das condições basta).

### <- Aula anterior
[[05 - Ações]]

### -> Próxima aula
[[07 - Efeitos]]
