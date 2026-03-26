# Tipos em PDDL

Em PDDL, **tipos** permitem classificar objetos em categorias (por exemplo, `robô`, `sala`, `caixa`). O objetivo é deixar a modelagem mais clara e reduzir combinações inválidas na instanciação de ações (por exemplo, impedir que uma ação trate uma “sala” como se fosse um “robô”).

## Objetivos de aprendizagem
- Entender por que usar tipos em PDDL.
- Declarar tipos no domínio e objetos tipados no problema.
- Usar tipos em predicados e parâmetros de ações.
- Reconhecer erros comuns ao introduzir tipos

---

# Por que tipos existem
Sem tipos, o planner pode tentar combinar qualquer objeto com qualquer variável de ação (desde que a aridade dos predicados bata). Isso aumenta o espaço de busca e permite combinações sem sentido do ponto de vista do domínio.

Tipos resolvem isso de duas formas:
- restringem quais objetos podem preencher quais variáveis
- documentam a intenção do modelo (legibilidade e manutenção)

# Declarando tipos no domínio
Para usar tipos, o domínio normalmente declara o requisito `:typing` e uma lista de tipos.

Exemplo:

```lisp
(define (domain transporte)
  (:requirements :strips :typing)
  (:types lugar agente)
  (:predicates
    (em ?a - agente ?l - lugar)
    (conectada ?x - lugar ?y - lugar))
  ...)
```

Aqui:
- `agente` e `lugar` são tipos.
- `em` aceita um agente e um lugar.
- `conectada` aceita dois lugares.

# Tipando objetos no problema
No arquivo de problema, você declara objetos com seus tipos:

```lisp
(define (problem ir-de-a-para-b)
  (:domain transporte)
  (:objects
    robo - agente
    A B - lugar)
  (:init
    (em robo A)
    (conectada A B))
  (:goal (em robo B)))
```

Observe que, com tipos, o predicado `(em ...)` também muda: ele deixa de ser “apenas localização” e passa a indicar “qual agente está em qual lugar”.

# Tipos em parâmetros de ação
Em `:parameters`, você pode tipar as variáveis:

```lisp
(:action mover
  :parameters (?a - agente ?de - lugar ?para - lugar)
  :precondition (and (em ?a ?de) (conectada ?de ?para))
  :effect (and (not (em ?a ?de)) (em ?a ?para)))
```

Isso impede, por exemplo, que o planner instancie `?a` com `A` (que é um `lugar`) ou que instancie `?de` com `robo` (que é um `agente`).

# Tipos e predicados: aridade e “assinatura”
Ao introduzir tipos, pense na “assinatura” do predicado:
- `em(agente, lugar)`
- `conectada(lugar, lugar)`

Essa assinatura deve ser respeitada em `:init`, `:goal`, pré-condições e efeitos.

# Armadilhas comuns
- Declarar `:types` e esquecer `:typing` em `:requirements`.
- Declarar objetos com tipos errados (ou omitir tipo e assumir algo diferente).
- Manter predicados antigos sem atualizar seus argumentos (por exemplo, continuar usando `(em A)` quando agora o correto é `(em robo A)`).
- Usar variáveis sem tipo em ações e achar que o planner vai “deduzir” o tipo desejado.

## Exercícios

Considere o predicado tipado abaixo:

```lisp
(em ?a - agente ?l - lugar)
```

1) Por que o predicado `em` tem dois argumentos quando usamos tipos?

2) Classifique cada termo como `agente` ou `lugar`:
- `robo`
- `A`
- `B`

3) Dado o parâmetro `(?a - agente ?de - lugar ?para - lugar)`, cite uma instanciação inválida e explique por que é inválida.

### Gabarito sugerido 
1) Porque a localização sozinha não identifica “quem” está no lugar; com tipos/modelagem mais explícita, `em` passa a representar a relação entre um agente e um lugar.  
2) `robo`: agente; `A`: lugar; `B`: lugar.  
3) Exemplo inválido: `?a = A`, pois `A` é do tipo `lugar` e `?a` exige `agente`.

### <- Aula anterior
[[07 - Efeitos]]

### -> Próxima aula
[[09 - Restrições]]
