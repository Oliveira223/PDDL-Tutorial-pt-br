# Algoritmos de Busca (como um planner procura planos)

Nesta aula, você vai estudar o “motor” conceitual por trás de muitos planners: **busca em espaço de estados**. A intenção não é provar teoremas nem cobrir todos os algoritmos, e sim:
- entender o que significa “procurar um plano”
- reconhecer por que alguns algoritmos explodem
- criar intuições que ajudam na depuração e na escolha de configurações de planner

## Objetivos de aprendizagem
- Modelar planejamento como busca: estados, ações aplicáveis, transições e objetivo.
- Diferenciar BFS, DFS, custo uniforme e A* em termos de garantia e custo.
- Reconhecer sintomas de explosão combinatória e como reduzir o problema.

## Pré-requisitos
- Ter lido: [[01 - Visão Planners]].

---

# 1) Planejamento como busca

## 1.1) Definições operacionais
- **Estado**: um conjunto de fatos verdadeiros (por exemplo, `(em robo A)`).
- **Ação aplicável**: ação cujas pré-condições são satisfeitas no estado atual.
- **Transição**: aplicar uma ação produz um novo estado (adiciona/remove fatos).
- **Objetivo (goal)**: condição que deve ser satisfeita por um estado alcançado.
- **Plano**: caminho do estado inicial até um estado que satisfaz o objetivo.

Se você imaginar um grafo:
- nós = estados
- arestas = ações aplicadas

Então planejar é encontrar um caminho até o objetivo.

---

# 2) Explosão combinatória (por que “fica grande” tão rápido)

Mesmo um domínio simples pode gerar muitos estados porque:
- há muitas ações possíveis por estado
- ações têm parâmetros → muitas combinações com objetos
- o plano pode ter muitos passos

O número de possibilidades cresce muito rápido (efeito “árvore”).

Por isso, a maior parte dos planners:
- usa **heurísticas** para guiar a busca (ver próxima aula)
- ou usa técnicas de compilação/redução internas

---

# 3) Quatro algoritmos para memorizar

## 3.1) BFS (Busca em largura)
Ideia: explora primeiro planos curtos.
- Vantagem: encontra o plano com menor número de passos (em custo uniforme por ação).
- Desvantagem: consome muita memória.

Quando aparece na prática:
- problemas pequenos
- domínios didáticos

## 3.2) DFS (Busca em profundidade)
Ideia: segue um caminho “até o fundo” e retrocede.
- Vantagem: pouca memória.
- Desvantagem: pode demorar muito e não garante melhor solução; pode “se perder”.

Na prática:
- raramente é a melhor escolha para planejamento clássico geral
- útil como intuição (por que alguns planejadores parecem “rodar sem fim”)

## 3.3) Busca de custo uniforme (Uniform-Cost Search)
Ideia: explora primeiro o menor custo acumulado (quando ações têm custo).
- Vantagem: encontra solução ótima em custo (se os custos forem não negativos).
- Desvantagem: pode ser lenta sem boa orientação.

## 3.4) A* (A-star)
Ideia: escolhe o próximo estado por:
- `f(n) = g(n) + h(n)`
  - `g(n)`: custo acumulado até o estado `n`
  - `h(n)`: estimativa do custo restante até o objetivo

Se `h` for bem construída, A* explora muito menos estados.

---

# 4) Uma mini-simulação (sem código)

Considere um problema de navegação simples com salas A→B→C.
- Estado inicial: `(em robo A)`
- Objetivo: `(em robo C)`
- Ação: `mover` (exige conexão e atualiza posição)

Uma busca em largura encontraria:
1) A (inicial)
2) B (após 1 ação)
3) C (após 2 ações) → objetivo

Se você adicionar muitas “salas extras” e conexões redundantes, BFS cresce muito.

---

# 5) Estratégias práticas para reduzir o espaço de busca

Quando você quer “tornar o problema mais fácil” (sem mudar o objetivo conceitual), faça uma ou mais:
- reduzir número de objetos no `:objects`
- restringir parâmetros por **tipos** e predicados mais específicos
- tornar pré-condições mais informativas (sem bloquear soluções reais)
- eliminar simetrias (modelagem que evita estados equivalentes)
- usar uma heurística mais forte (na configuração do planner)

---

# 6) Exercícios

1) Explique (em 2–4 linhas) por que ações com muitos parâmetros podem piorar muito a busca.

2) Você tem um problema que roda rápido com 5 objetos, mas trava com 20.  
Liste duas ações de modelagem que você faria para reduzir o espaço de busca (sem trocar de planner).

3) Complete: A* tende a ser eficiente quando a heurística `h(n)` é __________.

### Gabarito sugerido
1) Porque cada parâmetro pode assumir vários objetos, e isso cria muitas instâncias (ground actions), aumentando ramificação e estados alcançáveis.  
2) Exemplos: adicionar tipos e restrições de aplicabilidade; reduzir objetos irrelevantes; adicionar predicados que limitem combinações; remover simetrias.  
3) “informativa” (isto é, correlacionada ao custo restante; em alguns casos, também admissível/consistente, dependendo do objetivo).

### <- Aula anterior
[[01 - Visão Planners]]

### -> Próxima aula
[[03 - Heurísticas]]
