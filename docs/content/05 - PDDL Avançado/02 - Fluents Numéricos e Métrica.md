# Fluents Numéricos e Métrica (custos, bateria e otimização)

Em PDDL “clássico”, o estado é composto por fatos booleanos (verdadeiro/falso). Em PDDL 2.1 e extensões comuns, você pode introduzir **valores numéricos** por meio de `:functions` (fluents numéricos), permitindo modelar:
- bateria e consumo
- distância e custo
- tempo e recursos limitados
- objetivos com otimização (minimizar custo, tempo, etc.)

Esta aula introduz esses conceitos de forma segura e incremental.

## Objetivos de aprendizagem
- Declarar `:functions` e usar atribuições em `:init`.
- Usar efeitos numéricos `increase`/`decrease`.
- Definir uma `:metric` para otimização no problema.

## Pré-requisitos
- Ter lido: [[01 - Ações Durativas (PDDL 2.1)]] (recomendado, mas não obrigatório).
- Ter domínio de `:init` e `:goal` do módulo básico.

---

# 1) Requisitos típicos

Para fluents numéricos, geralmente você declara:
- `:numeric-fluents`

Exemplo (mínimo ilustrativo):

```lisp
(:requirements :strips :typing :numeric-fluents)
```

---

# 2) Declarando funções numéricas

No domínio, você declara as funções em `:functions`:

```lisp
(:functions
  (bateria ?r - robo) - number
  (custo-total) - number
)
```

Observações:
- funções podem ter parâmetros (como bateria por robô)
- também podem ser globais (como custo-total)

---

# 3) Inicializando valores no problema

No `:init`, você pode definir valores com `=`:

```lisp
(:init
  (= (bateria robo1) 100)
  (= (custo-total) 0)
)
```

---

# 4) Atualizando valores: `increase` e `decrease`

Dentro de efeitos, você pode modificar valores:

```lisp
:effect (and
  (decrease (bateria ?r) 5)
  (increase (custo-total) 1)
)
```

Esses efeitos são úteis para:
- representar consumo de recurso por ação
- acumular custo para otimização

---

# 5) Comparações numéricas em pré-condições

Você pode usar comparações como `>=`, `<=`, `<`, `>`:

```lisp
:precondition (and
  (>= (bateria ?r) 10)
)
```

Aqui, a ação só é aplicável se houver bateria suficiente.

---

# 6) Métrica de otimização (`:metric`)

Além de encontrar qualquer plano, alguns planners tentam **otimizar** um critério.

No problema, você pode declarar:

```lisp
(:metric minimize (custo-total))
```

Ou composições (dependendo do dialeto/suporte do planner):

```lisp
(:metric minimize (+ (custo-total) (bateria robo1)))
```

Pontos importantes:
- nem todo planner suporta todas as formas de `:metric`
- otimização costuma ser mais custosa que encontrar “qualquer solução”

---

# 7) Armadilhas comuns

- Declarar `:numeric-fluents` e usar funções, mas seu planner não suportar.
- Misturar objetivos booleanos com “objetivos numéricos” sem clareza (ex.: exigir e otimizar ao mesmo tempo sem necessidade).
- Criar restrições numéricas tão fortes que nenhum plano é possível.

---

# 8) Exercícios

1) Modele uma bateria mínima:
- função `(bateria ?r - robo)`
- pré-condição de mover: `(>= (bateria ?r) 10)`
- efeito de mover: `(decrease (bateria ?r) 10)`

2) Modele um custo total:
- função `(custo-total)`
- cada ação aumenta o custo em 1
- problema minimiza `(custo-total)`

3) Em 3–5 linhas, explique a diferença entre:
- impedir uma ação por pré-condição numérica
- permitir ações e pedir ao planner para minimizar um custo

### Gabarito sugerido
1) Espera-se uso de `:functions`, `=` no init, `>=` na pré-condição e `decrease` no efeito.  
2) Espera-se `increase (custo-total) 1` em efeitos e `:metric minimize (custo-total)` no problema.  
3) Pré-condição é uma restrição de viabilidade; métrica é critério de escolha entre planos viáveis.

### <- Aula anterior
[[01 - Ações Durativas (PDDL 2.1)]]

### -> Próxima aula
[[03 - Efeitos Condicionais e Quantificadores]]
