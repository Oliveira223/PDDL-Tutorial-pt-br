# Compatibilidade de Planners e `:requirements` (como evoluir sem quebrar tudo)

Quando você aprende PDDL, é natural querer usar “todas as features” rapidamente. O problema é que planners reais variam bastante:
- alguns suportam um subconjunto pequeno e estável (ex.: STRIPS + typing)
- outros suportam partes de PDDL 2.1 (durations, numéricos)
- poucos suportam “tudo” com o mesmo nível de robustez

Esta aula define uma estratégia didática e prática: **crescer em camadas** sem perder reprodutibilidade.

## Objetivos de aprendizagem
- Entender o papel de `:requirements` como “contrato” entre seu PDDL e o planner.
- Identificar quais extensões aumentam risco de incompatibilidade.
- Adotar uma progressão de modelagem: do básico para o avançado com checkpoints.

## Pré-requisitos
- Ter concluído o módulo `01 - PDDL`.
- Recomendado: `03 - Planners/01 - Visão Planners`.

---

# 1) `:requirements` como contrato

Quando você escreve:

```lisp
(:requirements :strips :typing)
```

Você está dizendo ao planner:
- “meu domínio usa estas features; você precisa suportá-las para rodar corretamente”

Se você declara uma requirement que o planner não suporta:
- alguns planners falham no parsing
- outros podem ignorar (o que é perigoso, pois produz resultados incorretos)

Regra prática:
- declare apenas o que você realmente usa.

---

# 2) Uma progressão recomendada (por estágios)

## Estágio 0 — base didática (alta compatibilidade)
- `:strips`
- `:typing` (opcional, mas recomendado)

Objetivo: aprender modelagem e depurar lógica.

## Estágio 1 — mais expressivo, ainda controlado
- `:negative-preconditions` (quando você realmente usa `not` em pré-condições)
- `:disjunctive-preconditions` (quando você usa `or`)

Objetivo: representar alternativas e restrições mais realistas.

## Estágio 2 — temporal e numérico (PDDL 2.1)
- `:durative-actions`
- `:numeric-fluents`

Objetivo: representar duração e consumo/custo.

## Estágio 3 — efeitos e quantificação avançados
- `:conditional-effects`
- quantificadores (`forall`, `exists`) quando suportados

Objetivo: expressar regras complexas com cuidado e validação extra.

---

# 3) Checkpoints (para não dar “saltos grandes”)

Sempre que você subir um estágio:
1) Crie uma instância pequena de problema
2) Confirme que o planner aceita o parsing
3) Confirme que encontra um plano (quando deveria)
4) Registre stdout/stderr e o plano

Se algo quebrar, volte um estágio e isole a feature que causou a falha.

---

# 4) Como “evitar o avançado” sem perder expressividade

Muitas vezes, você consegue um resultado equivalente com modelagem clássica:
- em vez de fluents, use predicados discretos por faixas (ex.: `(bateria-cheia)`, `(bateria-baixa)`)
- em vez de `forall`, use ações iterativas
- em vez de `when`, use ações separadas que explicitam o caso

Isso pode aumentar o tamanho do domínio, mas melhora:
- compatibilidade
- depuração
- previsibilidade de busca

---

# 5) Exercícios

1) Você escreveu um domínio com `:durative-actions`, mas seu planner acusa erro de parsing.  
Liste duas estratégias para continuar o projeto sem ficar travado.

2) Escolha um domínio didático do curso e escreva duas versões:
- Versão A: apenas `:strips` (e `:typing` se quiser)
- Versão B: adiciona exatamente uma extensão (por exemplo `:disjunctive-preconditions`)
Explique o que mudou e por quê.

3) Em 2–4 linhas, explique por que declarar requirements “a mais” pode ser ruim.

### Gabarito sugerido
1) Trocar de planner/ambiente para um que suporte; reduzir o domínio para versão clássica equivalente; remover temporais e simular duração como custo discreto; criar duas versões (básica e avançada).  
2) Espera-se uma mudança mínima e justificável (por exemplo, introduzir `or` para alternativa).  
3) Porque aumenta risco de incompatibilidade e pode confundir o diagnóstico; além disso, alguns planners podem rejeitar ou interpretar de forma inesperada.

### <- Aula anterior
[[03 - Efeitos Condicionais e Quantificadores]]

### -> Próxima aula
[[05 - Mini-projeto (Tempo, bateria e custo)]]
