# Efeitos Condicionais e Quantificadores (quando, para todo, existe)

Conforme os domínios crescem, você pode sentir necessidade de expressar regras como:
- “Se houver obstáculo, então entra em modo de desvio”
- “Para todos os itens, marque como verificado”
- “Existe algum recurso disponível”

Essas construções aumentam a expressividade, mas também aumentam:
- complexidade de planejamento
- risco de incompatibilidade com planners

Por isso, esta aula é deliberadamente cautelosa: apresenta o essencial e discute quando evitar.

## Objetivos de aprendizagem
- Entender e usar efeitos condicionais com `when`.
- Reconhecer o papel de `forall` e `exists` em condições/efeitos.
- Identificar quando essas features podem tornar o planejamento mais difícil.

## Pré-requisitos
- Ter concluído o módulo básico `01 - PDDL`.
- Recomendado: [[02 - Fluents Numéricos e Métrica]].

---

# 1) Efeitos condicionais (`when`)

Um efeito condicional tem a forma:

```lisp
(when CONDICAO EFEITO)
```

Interpretação:
- se `CONDICAO` for verdadeira quando o efeito for aplicado, então `EFEITO` ocorre

Exemplo didático:

```lisp
:effect (and
  (when (alarme-ativo) (modo-seguro))
)
```

Requisitos típicos:
- `:conditional-effects`

---

# 2) Quantificador universal (`forall`)

`forall` permite aplicar um efeito para “todos” os objetos de um tipo.

Exemplo didático (marcar todos os itens como inspecionados):

```lisp
(forall (?i - item)
  (when (na-area ?i) (inspecionado ?i)))
```

Requisitos típicos:
- `:quantified-preconditions` (para quantificação em condições)
- e, em alguns dialetos, suporte adicional para quantificação em efeitos

Observação prática:
- use `forall` quando você realmente precisa de efeito “em lote”
- caso contrário, prefira modelagens mais simples (ações iterativas por item)

---

# 3) Quantificador existencial (`exists`)

`exists` é útil para expressar “existe ao menos um”.

Exemplo didático:

```lisp
(exists (?b - bateria) (disponivel ?b))
```

Uso comum:
- em pré-condições (para permitir uma ação se algum recurso existir)

---

# 4) Pré-condições disjuntivas (`or`)

Às vezes, você quer permitir alternativas:

```lisp
:precondition (or (tem-chave) (porta-destrancada))
```

Requisito típico:
- `:disjunctive-preconditions`

Nota pedagógica:
- disjunções aumentam ramificação na busca; use com parcimônia.

---

# 5) Armadilhas comuns

- Usar `when` sem clareza do momento em que a condição é avaliada (especialmente em domínios temporais).
- Criar `forall` com efeitos grandes que explodem a quantidade de fatos.
- Declarar muitos `:requirements` “por precaução” e depois descobrir que seu planner não suporta.

---

# 6) Exercícios

1) Modele (em PDDL) a regra:
“Se o agente estiver com baixa bateria, então a ação `mover` também ativa `(modo-economia)`.”
Use `when` no efeito.

2) Explique em 3–5 linhas quando você preferiria:
- uma ação por item (iterativa)
em vez de
- um `forall` que altera todos os itens de uma vez.

3) Dê um exemplo de uma pré-condição com `or` que faça sentido no seu domínio (em português) e escreva a versão PDDL.

### Gabarito sugerido
1) Espera-se um efeito com `(when (bateria-baixa ?a) (modo-economia ?a))` (adaptando nomes e parâmetros).  
2) Ação iterativa é mais controlável e geralmente mais compatível; `forall` pode aumentar complexidade e dificultar suporte.  
3) Resposta varia; esperado um `or` coerente com duas formas alternativas de habilitar uma ação.

### <- Aula anterior
[[02 - Fluents Numéricos e Métrica]]

### -> Próxima aula
[[04 - Compatibilidade de Planners e requirements]]
