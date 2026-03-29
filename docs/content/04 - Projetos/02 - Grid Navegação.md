# Projeto 02: Grid Navegação (Robótica e Geração de Problemas)

Neste projeto, saímos do mundo dos blocos e entramos na navegação em **grades (grids)**. Este cenário é a base para robôs de armazém, drones e agentes de jogos.

## Objetivos de Aprendizagem
- Modelar conectividade entre células.
- Integrar PDDL com **Python** para gerar problemas dinamicamente.
- Lidar com obstáculos e restrições de movimento.

---

## 1) O Cenário
O agente vive em um grid de `N x M` células.
- Cada célula tem coordenadas `(x, y)`.
- O agente pode se mover para células adjacentes (norte, sul, leste, oeste).
- Algumas células podem ser **obstáculos** (bloqueadas).
- O objetivo é chegar em uma célula de destino específica.

## 2) O Desafio da Escala
Escrever manualmente o `problem.pddl` para um grid de `10x10` (100 células) é exaustivo. Aqui entra o Python:
- Use o conhecimento da aula de [Manipulação de Problemas](file:///e:/02_CODES/PPDL/PDDL-Tutorial-pt-br/docs/content/02%20-%20Python/04%20-%20Manipula%C3%A7%C3%A3o%20de%20Problemas.md) para automatizar a criação do arquivo PDDL.

## 3) Predicados e Ações
- `(at ?agent ?pos)`: O agente está na posição X.
- `(adjacent ?pos1 ?pos2)`: As células Pos1 e Pos2 estão conectadas.
- `(blocked ?pos)`: A célula Pos está bloqueada por um obstáculo.

### Ação `move`
```lisp
(:action move
  :parameters (?from ?to)
  :precondition (and (at ?from) (adjacent ?from ?to) (not (blocked ?to)))
  :effect (and (not (at ?from)) (at ?to)))
```

---

## Desafio Prático
1. Analise o exemplo em [exemplos/grid](file:///e:/02_CODES/PPDL/PDDL-Tutorial-pt-br/docs/exemplos/grid).
2. Escreva um script Python (`generate_grid.py`) que:
   - Receba o tamanho do grid (ex.: `5 5`).
   - Gere todos os fatos `(adjacent ...)` necessários.
   - Sorteie algumas células para serem `(blocked ...)`.
   - Crie o arquivo `problem.pddl` pronto para o planner.

### Reflexão
Como você modificaria o domínio para incluir um robô que precisa **recolher amostras** em certas células antes de chegar ao destino final?

---

### Próximo Projeto
[[03 - Logística]]
