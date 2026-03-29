# Mini-projeto: Tempo, bateria e custo (integração de conceitos)

Este mini-projeto consolida o módulo avançado em um cenário controlado. A ideia é construir um domínio em camadas:
1) versão clássica (ações instantâneas, sem números)
2) versão com fluents numéricos (bateria/custo)
3) versão temporal (ações durativas)

Você vai perceber que a parte “difícil” não é escrever mais PDDL, e sim:
- manter o estado consistente
- evitar requisitos desnecessários
- manter o problema depurável (instâncias pequenas)

## Objetivos de aprendizagem
- Praticar evolução incremental de um domínio (do simples ao avançado).
- Criar instâncias pequenas para validação em cada etapa.
- Preparar arquivos para execução repetível com Python (módulo 02).

## Pré-requisitos
- Ter lido as aulas 01–04 deste módulo.

---

# 1) Cenário do mini-projeto

Um robô precisa visitar dois pontos (A e B) e retornar à base.

Requisitos funcionais:
- objetivo final: `(em robo base)` e `(visitado A)` e `(visitado B)`

Requisitos de recurso:
- há bateria (numérica) e mover consome
- opcional: minimizar custo total

Requisitos temporais:
- mover leva tempo

---

# 2) Etapa 1 — Versão clássica (sem números, sem tempo)

Predicados sugeridos:
- `(em ?r - robo ?l - local)`
- `(conectado ?x - local ?y - local)`
- `(visitado ?l - local)`
- `(ponto ?l - local)` (para diferenciar pontos da base, se desejar)

Ações sugeridas:
- `mover` (atualiza posição)
- `visitar` (marca `(visitado ?l)` quando o robô está no local)

Checklist de validação:
- o goal pede apenas fatos que podem ser produzidos
- `mover` remove a posição anterior

---

# 3) Etapa 2 — Adicionando bateria e custo

Adicione:
- `:numeric-fluents`
- `:functions` como `(bateria ?r) - number` e `(custo-total) - number`

Regras sugeridas:
- `mover` exige `(>= (bateria ?r) 10)` e faz `(decrease (bateria ?r) 10)`
- cada ação aumenta `(custo-total)` em 1 (ou custo específico por ação)
- problema minimiza `(custo-total)` (opcional)

Checklist de validação:
- inicialize bateria e custo no `:init`
- não crie restrições numéricas que eliminem todas as soluções

---

# 4) Etapa 3 — Tornando `mover` durativa

Adicione:
- `:durative-actions`
- `:durative-action mover` com duração fixa ou calculada

Regras sugeridas:
- `at start`: checa posição inicial
- `over all`: checa conectividade
- `at end`: atualiza posição

Observação:
- se você quiser consumo proporcional ao tempo, isso combina naturalmente com fluents

Checklist de validação:
- conferir se o planner suporta temporal + numérico no mesmo domínio
- se não suportar, mantenha duas versões do domínio (clássico e avançado)

---

# 5) Entregáveis do mini-projeto

Crie a seguinte estrutura:
- `domain-classico.pddl`
- `domain-numerico.pddl`
- `domain-temporal.pddl`
- `problem-01.pddl` (pequeno: 3 locais)
- `problem-02.pddl` (médio: 6 locais)

Critério:
- cada etapa deve rodar com pelo menos um problema pequeno antes de você avançar

---

# 6) Exercícios

1) Escreva os três domínios (clássico → numérico → temporal) e aponte exatamente quais trechos mudaram em cada etapa.

2) Crie um problema em que a bateria inicial é insuficiente e explique o que o planner deveria retornar (e por quê).

3) Se seu planner não suportar temporal+numérico, descreva uma estratégia para continuar:
- manter o domínio numérico instantâneo, ou
- manter o domínio temporal sem números, ou
- criar duas versões e comparar qualitativamente.

### Gabarito sugerido
1) Espera-se ver requirements e funções na etapa numérica; e `:durative-action` + `at start/over all/at end` na etapa temporal.  
2) Espera-se “sem solução” (insolúvel) se não houver ação para recarga, ou solução alternativa se existir.  
3) Espera-se uma estratégia de “versionamento de domínio” e validação por instâncias pequenas.

### <- Aula anterior
[[04 - Compatibilidade de Planners e requirements]]
