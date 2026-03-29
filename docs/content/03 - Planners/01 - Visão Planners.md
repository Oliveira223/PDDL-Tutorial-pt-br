# Visão de Planners (o que entra, o que sai e o que acontece no meio)

Um **planner** é um programa que recebe:
- um **domínio** (regras do mundo: predicados, ações, pré-condições e efeitos)
- um **problema** (objetos, estado inicial e objetivo)

E tenta produzir uma saída:
- um **plano**: sequência de ações que leva do estado inicial ao objetivo (quando existe)
- ou um diagnóstico: “sem solução”, “erro de parsing”, “timeout”, etc.

Nesta aula, o objetivo não é “estudar um planner específico”, e sim formar um **modelo mental operacional** para:
- saber o que esperar da entrada/saída
- interpretar mensagens comuns
- se preparar para depurar quando algo não dá certo

## Objetivos de aprendizagem
- Entender o pipeline geral de um planner (parsing → grounding → busca → plano).
- Reconhecer formatos típicos de saída (stdout e arquivo de plano).
- Diferenciar falhas de **modelagem** (sem solução) de falhas de **execução** (erro/timeout).

## Pré-requisitos
- Ter concluído: `01 - PDDL/10 - Exemplo Completo`.
- Recomendado: `02 - Python/05 - Integração com Planner` (para entender automação).

---

# 1) Entradas e saídas (o contrato do planner)

## 1.1) Entradas
Em geral, planners clássicos trabalham com:
- `domain.pddl`
- `problem.pddl`

Alguns planners exigem flags extras:
- escolha do algoritmo e heurística
- limites de tempo/memória
- opção de salvar o plano em arquivo

## 1.2) Saídas
Você vai encontrar dois padrões comuns:
- **Plano impresso no terminal (stdout)**: linhas com ações.
- **Plano salvo em arquivo**: por exemplo `sas_plan`, `plan.txt`, `output.plan`.

Como isso varia por planner, um fluxo robusto (especialmente com Python) é:
1) sempre salvar stdout/stderr
2) se existir arquivo de plano, salvá-lo também
3) só depois “interpretar” o plano (parsear ações)

---

# 2) O que acontece dentro de um planner (visão simplificada)

Muitos planners seguem um pipeline com quatro etapas conceituais:

1) **Parsing**
- o planner lê o PDDL e verifica sintaxe/keywords
- erros aqui tipicamente são “parênteses”, `:requirements` inconsistentes, nomes inválidos etc.

2) **Grounding (instanciação)**
- ações parametrizadas são instanciadas em ações concretas usando objetos do problema
- isso pode explodir de tamanho se o domínio permitir muitas combinações

3) **Busca**
- o planner procura uma sequência de ações que atinja o objetivo
- pode ser busca não informada (BFS) ou informada (A* com heurística)

4) **Extração do plano**
- se uma solução for encontrada, o planner imprime/salva o plano
- se não, ele pode declarar “unsolvable”, “dead end”, ou apenas “no plan found”

---

# 3) Tipos de “não deu certo” (e o que isso significa)

## 3.1) Erro de parsing (entrada inválida)
Sinais típicos:
- mensagens sobre token inesperado, parênteses, keyword desconhecida
- falha imediata (sem tentar buscar)

Correções comuns:
- revisar balanceamento de parênteses
- conferir `:requirements` e se o planner suporta o que você declarou
- conferir nomes (ex.: `:precondition` vs `:preconditions`, `:objects` etc.)

## 3.2) Sem solução (modelagem/problema)
Sinais típicos:
- o planner roda, tenta buscar, e conclui que não há plano

Causas comuns:
- objetivo inalcançável (faltam ações/efeitos)
- pré-condições muito restritivas
- estado inicial inconsistente (fatos faltando)
- efeitos incompletos (não removem fatos antigos, não adicionam o que deveria)

## 3.3) Timeout / explosão de busca (complexidade)
Sinais típicos:
- execução longa, sem retorno
- mensagem de timeout, “out of memory” ou busca expandindo muitos estados

Causas comuns:
- domínio com muitas combinações (grounding grande)
- heurística fraca/ausente
- problema grande demais para a configuração atual

---

# 4) O que você deve sempre registrar (para depuração)

Mesmo em projetos pequenos, mantenha um “pacote de evidências” por execução:
- `domain.pddl` usado
- `problem.pddl` usado
- `stdout.txt` e `stderr.txt`
- arquivo do plano (se existir)
- comando executado (incluindo flags)

Isso reduz muito o custo de depurar e comparar experimentos.

---

# 5) Exercícios

1) Classifique as situações abaixo como: (A) erro de parsing, (B) sem solução, (C) timeout/complexidade.
- i) O planner imprime “Unexpected token: :durative-actions” e encerra.
- ii) O planner roda, expande estados, e termina com “No plan found”.
- iii) O planner roda por 10 minutos e é interrompido por limite de tempo.

2) Escreva, em 3–5 linhas, o que você guardaria em uma pasta `runs/` para depurar uma execução.

### Gabarito sugerido
1) i) A, ii) B, iii) C.  
2) Domínio, problema, stdout/stderr, arquivo do plano, comando/flags, e opcionalmente versão do planner.

### <- Aula anterior
[[02 - Python/05 - Integração com Planner]]

### -> Próxima aula
[[02 - Algoritmos de Busca]]
