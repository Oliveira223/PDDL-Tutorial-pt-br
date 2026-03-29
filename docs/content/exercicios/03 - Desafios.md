# Desafios (abertos e com variações)

Estes desafios são menos “guiados” do que os exercícios anteriores. O objetivo é treinar a habilidade mais importante em PDDL: **modelar com clareza e depurar com método**, sem depender de um único domínio “de exemplo”.

## Pré-requisitos
- Ter concluído o módulo `01 - PDDL` (incluindo `10 - Exemplo Completo`).
- Recomendado: `03 - Planners/05 - Debug de Planejamento` (para diagnóstico).
- Se for usar Python para automatizar: `02 - Python/05` a `02 - Python/08`.
- Se quiser usar recursos avançados (tempo/numéricos): `05 - PDDL Avançado` (opcional).

---

# Como usar estes desafios

Para cada desafio:
1) Escreva um domínio e pelo menos um problema pequeno.
2) Rode um planner (online ou local).
3) Cole o plano e explique o efeito de cada ação.
4) Se não houver plano, registre hipótese e correção aplicada.

Entregáveis sugeridos por desafio:
- `domain.pddl`
- `problem-01.pddl` (pequeno, para validar rápido)
- `problem-02.pddl` (variação)
- `stdout.txt` e `stderr.txt` (se rodar local)
- `plan.txt` (se o planner gerar arquivo)

---

# Desafio 1 — Limpeza com restrições simples (clássico)

## Cenário
Você tem um agente que precisa visitar salas e “coletar lixo”. Algumas salas podem estar bloqueadas.

## Requisitos mínimos
- Objetivo: todo lixo deve estar “coletado”.
- O agente não pode entrar em sala bloqueada.

## Sugestões de modelagem (não obrigatórias)
- Tipos: `agente`, `sala`, `lixo`
- Predicados: `(em ?a ?s)`, `(lixo-em ?l ?s)`, `(coletado ?l)`, `(bloqueada ?s)`, `(conectada ?x ?y)`
- Ações: `mover`, `coletar`

## Variações
1) Adicione duas peças de lixo em salas diferentes.
2) Faça uma sala intermediária bloqueada e observe como isso muda o plano (ou torna insolúvel).

## Perguntas de reflexão
1) Em que parte do domínio você garantiu “não entra em sala bloqueada”?
2) Seu domínio permite que o agente “colete” lixo sem estar na sala correta? Como você bloqueou isso?

---

# Desafio 2 — Sequência obrigatória sem “programar o plano”

## Cenário
Você precisa impor que certas atividades ocorram em ordem (por exemplo, “pegar item” antes de “entregar”).

## Objetivo
Modelar a ordem sem escrever um algoritmo, apenas com predicados e efeitos.

## Sugestão
Use predicados de estado como:
- `(tem-item)`
- `(entregue)`

E garanta com pré-condições que:
- entregar exige `tem-item`
- pegar item adiciona `tem-item`
- entregar remove `tem-item` e adiciona `entregue`

## Variações
1) Exija que dois itens sejam coletados antes da entrega final.
2) Exija que o agente passe por um “checkpoint” antes de entregar.

## Perguntas de reflexão
1) Qual parte da sua modelagem garante a ordem?
2) Que erro de efeitos faria o planner “trapacear” (por exemplo, entregar sem pegar)?

---

# Desafio 3 — Automação com Python (instâncias em lote)

## Objetivo
Gerar automaticamente 10 variações de problema para o mesmo domínio e comparar:
- tamanho do plano
- se encontra plano ou não

## Requisitos
1) Um domínio fixo (pode ser o do Desafio 1).
2) Um gerador em Python que crie `problem-01.pddl` até `problem-10.pddl` variando:
- número de salas
- número de itens
- conexões (grafo)

## Entregáveis
- `problems/` com os 10 problemas
- `runs/` com stdout/stderr por execução
- um pequeno relatório (pode ser um `.txt`) com contagem de passos por problema

## Perguntas de reflexão
1) O que mais “explode”: número de objetos ou conectividade?
2) Que validação simples você implementou antes de rodar o planner (ex.: domínio do problema bate com domínio do arquivo)?

---

# Desafio 4 (opcional) — Tempo e/ou custo

Escolha uma única extensão para não dar salto grande:

## Opção A — Custo (métrica)
- Use `:numeric-fluents`
- Some custo em cada ação
- Use `:metric minimize`

## Opção B — Ação durativa
- Use `:durative-actions`
- Modele `mover` como durativa com `at start` e `at end`

## Perguntas de reflexão
1) Seu planner suportou a extension escolhida? O que aconteceu quando não suportou?
2) Que versão “clássica” você consegue manter como fallback, com objetivos equivalentes?
