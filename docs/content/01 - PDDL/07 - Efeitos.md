# Efeitos em PDDL

Em PDDL, **efeitos** descrevem como o estado do mundo muda quando uma ação é executada. Se as pré-condições dizem quando uma ação pode ocorrer, os efeitos dizem o que essa ação faz com o mundo.

## Objetivos de aprendizagem
- Entender o papel de `:effect` nas ações.
- Diferenciar efeitos de adição e efeitos de remoção (`not`).
- Entender como `and` é usado para compor múltiplos efeitos.
- Reconhecer erros comuns de modelagem relacionados a efeitos.

---

# Intuição: estado como conjunto de fatos
No planejamento clássico, o estado pode ser entendido como um conjunto de fatos verdadeiros:
- Se um fato aparece, ele é verdadeiro.
- Se um fato não aparece, ele é falso.

Efeitos são operações sobre esse conjunto:
- adicionar um fato → torna verdadeiro
- remover um fato (com `not`) → torna falso

# Efeitos de adição
Um efeito de adição coloca um fato no estado:

```lisp
:effect (em B)
```

Interpretação: depois da ação, `(em B)` é verdadeiro.

# Efeitos de remoção (efeitos negativos)
Um efeito de remoção usa `not`:

```lisp
:effect (not (em A))
```

Interpretação: depois da ação, `(em A)` deixa de ser verdadeiro.

Isso não é “inverter um booleano” no sentido de variável armazenada; é remover o fato do conjunto de fatos verdadeiros.

# Composição com `and`
Na prática, quase sempre você precisa aplicar vários efeitos ao mesmo tempo:

```lisp
:effect (and (not (em ?de)) (em ?para))
```

Interpretação: remover a localização antiga e adicionar a nova no mesmo passo.

# Exemplo: por que remover é importante
Considere o estado inicial:

```lisp
(:init (em A))
```

Se a ação tem apenas:

```lisp
:effect (em B)
```

O estado pode ficar com `(em A)` e `(em B)` simultaneamente. Em muitos domínios, isso é indesejado (agente em dois lugares ao mesmo tempo). A correção típica é remover a localização anterior:

```lisp
:effect (and (not (em A)) (em B))
```

# Efeitos e objetivos: papéis diferentes
- `:effect` muda o estado (é “dinâmico”).
- `:goal` apenas testa o estado final (é “critério”, não mudança).

Por isso, “evitar duplicação” (como `(em A)` e `(em B)`) é responsabilidade de efeitos bem definidos, não de `:goal`.

# Armadilhas comuns
- Esquecer efeitos de remoção, gerando estados inconsistentes.
- Remover o fato errado (por exemplo, remover `(em ?para)` em vez de `(em ?de)`).
- Criar efeitos que nunca podem acontecer porque a ação nunca fica aplicável (problema de pré-condição).
- Usar predicados em efeitos que não foram declarados em `:predicates`.

## Exercícios

1) Dado o estado inicial: `(em A)`. Após executar uma ação com efeito `:effect (em B)`, quais fatos podem ficar verdadeiros no estado? Explique.

2) Escreva um `:effect` para uma ação `mover` que garanta que o agente fique em apenas um lugar por vez.

3) Classifique como “adição” ou “remoção”:
- `(em B)`
- `(not (em A))`

### Gabarito sugerido 
1) Pode ficar com `(em A)` e `(em B)`, pois o efeito apenas adiciona `(em B)` e não remove `(em A)`.  
2) Exemplo: `:effect (and (not (em ?de)) (em ?para))`.  
3) Adição; remoção.

### <- Aula anterior
[[06 - Pré-condições]]

### -> Próxima aula
[[08 - Tipos]]
