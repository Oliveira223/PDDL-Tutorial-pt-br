# Heurísticas (como planners aceleram a busca)

Se a aula anterior explicou “por que o espaço de busca cresce”, esta aula explica a ferramenta mais importante para lidar com isso: **heurísticas**.

Uma heurística é uma função `h(s)` que, dado um estado `s`, estima “o quão longe” ele está do objetivo. Em busca informada (como A*), a heurística serve para guiar o planner para estados mais promissores.

## Objetivos de aprendizagem
- Entender o papel de heurísticas em busca (especialmente A*).
- Reconhecer o que torna uma heurística “boa” na prática.
- Identificar o trade-off entre heurísticas mais fortes e custo de cálculo.

## Pré-requisitos
- Ter lido: [[02 - Algoritmos de Busca]].

---

# 1) O problema sem heurística

Sem heurística, a busca pode:
- explorar muitas alternativas irrelevantes
- gastar muito tempo antes de chegar perto do objetivo

Em termos práticos: “roda, roda, e parece que não sai do lugar”.

---

# 2) O que é uma heurística (visão operacional)

Uma heurística é uma estimativa:
- `h(s) = 0` quando o estado já satisfaz o objetivo
- `h(s)` maior quando o estado parece “longe” do objetivo

Ela não precisa ser perfeita para ajudar. Na prática:
- heurísticas aproximadas frequentemente são suficientes para guiar bem
- heurísticas muito caras podem anular o ganho (porque o planner gasta tempo calculando `h`)

---

# 3) Propriedades clássicas (para criar intuição)

## 3.1) Admissível (noção útil, mas nem sempre exigida)
Uma heurística é admissível se nunca superestima o custo real até o objetivo.

Por que isso importa:
- em A*, admissibilidade está ligada a garantias de otimalidade

Por que isso nem sempre é prioridade:
- muitos planejadores e configurações preferem encontrar “alguma solução boa” rápido

## 3.2) Informativa
Uma heurística é informativa quando distingue bem estados promissores dos não promissores.

Na prática, esta costuma ser a propriedade mais “sentida”:
- se `h` retorna valores parecidos para tudo, ela guia pouco
- se `h` varia de modo coerente com progresso real, ela guia bem

---

# 4) De onde vem heurísticas em planejamento

Planners usam heurísticas derivadas de relaxações e análises do problema. Uma intuição comum é:
- “relaxar” o problema (tornar mais fácil)
- calcular um custo aproximado nesse problema relaxado
- usar esse custo como `h(s)`

Exemplo de relaxação intuitiva:
- ignorar efeitos negativos (remoções) e considerar apenas adições  
Isso tende a tornar o problema “mais fácil”, mas ainda informativo.

---

# 5) Como isso aparece em ferramentas reais

Você vai encontrar, em planners populares, nomes de heurísticas como:
- heurísticas baseadas em “relaxed plans”
- heurísticas baseadas em landmarks
- heurísticas mais pesadas (mas mais fortes) para casos difíceis

Você não precisa memorizar fórmulas. O que importa é saber:
- diferentes heurísticas podem mudar drasticamente desempenho
- se o planner “trava”, trocar heurística ou estratégia de busca pode resolver

---

# 6) Exercícios

1) Em 2–4 linhas, explique como uma heurística pode acelerar A* sem “mudar” o domínio/problema.

2) Você observa que:
- Com heurística H1, o planner encontra solução em 2 segundos.
- Com heurística H2, o planner encontra solução em 2 minutos.

Liste duas hipóteses plausíveis para isso (sem assumir bug).

3) Verdadeiro ou falso:
- ( ) Uma heurística sempre precisa ser admissível para ser útil.
- ( ) Heurísticas mais fortes podem custar mais para calcular.

### Gabarito sugerido
1) Porque a heurística prioriza a expansão de estados que parecem mais próximos do objetivo, reduzindo estados explorados antes de achar um plano.  
2) H2 pode ser mais cara de calcular; H2 pode guiar pior para esse domínio; a busca configurada com H2 pode ser diferente (por exemplo, mais focada em otimalidade).  
3) Falso; Verdadeiro.

### <- Aula anterior
[[02 - Algoritmos de Busca]]

### -> Próxima aula
[[04 - Fast Downward]]
