# Estrutura do Domínio

O domínio em PDDL define as **regras gerais de um sistema**, especificando quais ações podem ser executadas e como elas **afetam o estado do mundo**. Em outras palavras, o domínio descreve o “universo de possibilidades” do seu problema, independentemente de uma instância específica.

## Objetivos de aprendizagem
- Entender os blocos principais de um arquivo de domínio.
- Reconhecer o papel de `:requirements`, `:predicates` e `:action`.
- Identificar onde erros de modelagem aparecem com mais frequência.


---

# Estrutura geral
Um arquivo de domínio segue, de forma simplificada, a seguinte estrutura:

```lisp
(define (domain nome-do-dominio)
  (:requirements ...)
  (:predicates
    ...)
  (:action nome-da-acao
    :parameters (...)
    :precondition (...)
    :effect (...)))
```

Cada uma dessas partes possui um papel específico na **definição do domínio**.

# Componentes
## 1) Nome do domínio
O domínio começa com:

```lisp
(define (domain transporte)
  ...)
```

Esse nome é referenciado no **arquivo de problema** (na seção `:domain`), conectando as duas descrições.

## 2) `:requirements` (o que seu domínio “usa”)
`requirements` informa quais recursos da linguagem PDDL você está utilizando. Em uma introdução, é comum ver:
- `:strips`: ações com pré-condições e efeitos proposicionais.
- `:typing`: uso de tipos.

Exemplo:

```lisp
(:requirements :strips)
```

Dependendo do planner, declarar corretamente ajuda na validação e evita interpretações inesperadas.

## 3) `:predicates` (o vocabulário do seu mundo)
Predicados representam propriedades e relações que podem ser verdadeiras ou falsas. Eles definem “o que pode aparecer” em:
- estado inicial e objetivo (no arquivo de problema)
- pré-condições e efeitos (nas ações)

Exemplo:

```lisp
(:predicates
  (em ?lugar)
  (conectada ?a ?b))
```

Regra prática: se você precisa escrever um fato, ele deve existir em `:predicates`.

## 4) `:action` (como o mundo muda)
Uma ação descreve uma transição de estados. Ela costuma ter:
- `:parameters`: variáveis que serão instanciadas pelo planner.
- `:precondition`: o que precisa ser verdadeiro antes.
- `:effect`: o que passa a ser verdadeiro ou deixa de ser verdadeiro depois.

### Como ler variáveis e negação
- Variáveis em PDDL começam com `?`. Por exemplo, `?de` e `?para` não são lugares específicos, e sim “caixas” que o planner preenche com objetos do problema (como `A` e `B`).
- Em planejamento clássico, o estado pode ser entendido como um conjunto de fatos verdadeiros. Se um fato está presente no estado, ele é verdadeiro; se não está, ele é falso.
- No `:effect`, escrever `(not (em ?de))` representa um efeito negativo: o fato `(em ?de)` deixa de ser verdadeiro (isto é, é removido do estado).

Exemplo (mesma ideia da aula introdutória, agora no contexto do domínio):

```lisp
(:action mover
  :parameters (?de ?para)
  :precondition (and (em ?de) (conectada ?de ?para))
  :effect (and (not (em ?de)) (em ?para)))
```

# Como Domínio e Problema se conectam
O domínio declara o vocabulário e as regras. O problema “preenche” esse vocabulário com dados concretos:
- Domínio: define `(em ?lugar)` e a ação `mover`.
- Problema: define quais lugares existem, onde o agente começa e para onde quer ir.

# Armadilhas comuns
- Esquecer de remover fatos antigos no `:effect` (ex.: adicionar `(em ?para)` sem remover `(em ?de)`).
- Criar predicados com significado ambíguo (dificulta depuração e reutilização).
- Declarar predicados e usá-los com aridade diferente (quantidade de parâmetros inconsistente).

## Exercícios

1) Explique, em uma frase, o papel de `:predicates` no domínio.

2) Classifique como “Domínio” ou “Problema”:
- Definir a ação `mover`.
- Declarar que existe conexão entre A e B.
- Declarar que o objetivo é “estar em B”.

3) Observe o efeito abaixo e diga qual problema ele pode causar:

```lisp
:effect (and (em ?para))
```

### Gabarito sugerido
1) `:predicates` define o vocabulário de fatos que podem aparecer nos estados, objetivos e ações.  
2) Domínio; Problema; Problema.  
3) Se o estado antes da ação tinha `(em ?de)`, esse efeito apenas adiciona `(em ?para)` e não remove `(em ?de)`. Assim, o agente pode acabar com `(em ?de)` e `(em ?para)` simultaneamente, isto é, “em dois lugares ao mesmo tempo”. Um efeito típico para evitar isso seria: `(and (not (em ?de)) (em ?para))`.

### <- Aula anterior
[[01 - Visão Geral]]

### -> Próxima aula
[[03 - Problem Estrutura|03 - Estrutura do Problema]]
