# Projeto 01: Blocksworld (O "Hello World" do PDDL)

O **Blocksworld** é o exemplo mais clássico de planejamento em IA. Ele consiste em um conjunto de blocos sobre uma mesa que podem ser empilhados uns sobre os outros.

## Objetivos de Aprendizagem
- Modelar estados e ações em um domínio puramente lógico (STRIPS).
- Entender a importância de pré-condições para evitar estados impossíveis.
- Resolver problemas de "re-arranjo" de blocos.

---

## 1) O Cenário
Imagine uma mesa com vários blocos (`A`, `B`, `C`).
- Um bloco pode estar **sobre a mesa** ou **sobre outro bloco**.
- Um bloco está **livre (clear)** se não houver nada sobre ele.
- Um **braço robótico** pode pegar um bloco (se ele estiver livre) e colocá-lo na mesa ou sobre outro bloco (que também deve estar livre).

## 2) Predicados Necessários
Para modelar esse mundo, precisamos de fatos como:
- `(on ?x ?y)`: Bloco X está sobre o bloco Y.
- `(ontable ?x)`: Bloco X está sobre a mesa.
- `(clear ?x)`: Bloco X não tem nada em cima.
- `(handempty)`: O braço robótico não está segurando nada.
- `(holding ?x)`: O braço robótico está segurando o bloco X.

## 3) Ações Principais
Você precisará implementar quatro ações:
1. **pick-up**: Pegar um bloco da mesa.
2. **put-down**: Colocar o bloco que está segurando na mesa.
3. **stack**: Empilhar um bloco sobre outro.
4. **unstack**: Desempilhar um bloco de cima de outro.

---

## Desafio Prático
1. Abra os arquivos de exemplo em [exemplos/blocksworld](file:///e:/02_CODES/PPDL/PDDL-Tutorial-pt-br/docs/exemplos/blocksworld).
2. Tente modificar o `problem.pddl` para criar uma torre de 4 blocos (`A` sobre `B` sobre `C` sobre `D`).
3. Use um planner (online ou local) para encontrar a sequência de passos.

### Reflexão
Por que precisamos de `(handempty)` como pré-condição para `pick-up`? O que aconteceria se esquecêssemos desse fato?

---

### Próximo Projeto
[[02 - Grid Navegação]]
