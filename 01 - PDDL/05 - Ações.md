# Ações em PDDL

Em PDDL, uma **ação** descreve como o mundo pode mudar. Ela funciona como uma regra: quando certas condições são verdadeiras (pré-condições), a ação pode ocorrer e produz mudanças (efeitos).

## Objetivos de aprendizagem
- Entender a estrutura de uma ação (`:parameters`, `:precondition`, `:effect`).
- Diferenciar pré-condições de efeitos.
- Entender o que significa “instanciar” uma ação com objetos concretos.
- Reconhecer erros comuns ao escrever ações.

---

# Estrutura de uma ação
Uma ação típica tem a forma:

```lisp
(:action nome-da-acao
  :parameters (...)
  :precondition (...)
  :effect (...))
```

# Componentes

## 1) `:action` (nome)
O nome identifica a ação no plano produzido pelo planner.

Exemplo:

```lisp
(:action mover ...)
```

## 2) `:parameters` (variáveis da ação)
Parâmetros são variáveis (começam com `?`) que serão preenchidas pelo planner com objetos do problema.

Exemplo:

```lisp
:parameters (?de ?para)
```

Se o problema tem os objetos `A` e `B`, o planner pode instanciar `?de = A` e `?para = B`.

## 3) `:precondition` (quando a ação pode ocorrer)
Pré-condições são fatos que precisam ser verdadeiros para a ação ser aplicável no estado atual.

Exemplo:

```lisp
:precondition (and (em ?de) (conectada ?de ?para))
```

Interpretação: só posso mover se eu estiver em `?de` e houver conexão de `?de` para `?para`.

## 4) `:effect` (o que muda no mundo)
Efeitos descrevem as alterações no estado quando a ação é executada. Em planejamento clássico, o estado pode ser entendido como um conjunto de fatos verdadeiros:
- adicionar um fato torna esse fato verdadeiro
- `(not ...)` remove um fato, tornando-o falso

Exemplo:

```lisp
:effect (and (not (em ?de)) (em ?para))
```

Interpretação: depois de mover, eu não estou mais em `?de` e passo a estar em `?para`.

# Exemplo completo de ação

```lisp
(:action mover
  :parameters (?de ?para)
  :precondition (and (em ?de) (conectada ?de ?para))
  :effect (and (not (em ?de)) (em ?para)))
```

# Instanciação: do modelo para o plano
Uma ação no domínio é um “modelo”. Um planner gera ações concretas substituindo variáveis por objetos.

Se o problema declara:

```lisp
(:objects A B)
(:init (em A) (conectada A B))
```

Então uma instância possível é:
- `mover A B`

E o estado evolui assim:
- Antes: `(em A)` é verdadeiro
- Depois: remove `(em A)` e adiciona `(em B)`

# Armadilhas comuns
- Definir `:effect` sem remover fatos antigos, causando estados “duplicados” (ex.: `(em A)` e `(em B)` ao mesmo tempo).
- Criar pré-condições fracas demais (a ação vira “teletransporte”) ou fortes demais (a ação nunca aplica).
- Esquecer de declarar predicados usados na ação em `:predicates`.
- Usar aridade diferente da declaração do predicado (por exemplo, declarar `(conectada ?a ?b)` e usar `(conectada ?a)`).

## Exercícios 

1) Em uma frase, diferencie pré-condição de efeito.

2) A ação abaixo permite um comportamento indesejado. Qual é o problema e como você corrigiria?

```lisp
(:action mover
  :parameters (?de ?para)
  :precondition (em ?de)
  :effect (em ?para))
```

3) Dado um problema com objetos `A` e `B`, escreva uma instância concreta (com objetos) da ação `mover` e descreva o que muda no estado.

### Gabarito sugerido
1) Pré-condição é o que precisa ser verdadeiro antes; efeito é o que se torna verdadeiro ou deixa de ser após executar a ação.  
2) Problema: não exige conexão e não remove `(em ?de)`, permitindo teletransporte e duplicação de localização. Correção típica: `:precondition (and (em ?de) (conectada ?de ?para))` e `:effect (and (not (em ?de)) (em ?para))`.  
3) Exemplo: `mover A B`; remove `(em A)` e adiciona `(em B)`.

### <- Aula anterior
[[04 - Predicados]]

### -> Próxima aula
[[06 - Pré-condições]]
