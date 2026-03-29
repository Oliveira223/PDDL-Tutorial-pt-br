# Debug de Planejamento (metodologia prática)

Depurar planejamento é diferente de depurar software tradicional:
- muitas “falhas” não são exceções; são consequência de modelagem (sem solução)
- um domínio pode estar sintaticamente correto e ainda assim ser logicamente inviável
- “não encontrar plano” pode ser insolubilidade ou apenas complexidade

Esta aula organiza uma metodologia incremental e repetível para diagnóstico.

## Objetivos de aprendizagem
- Separar erros de parsing, insolubilidade e complexidade (timeout).
- Aplicar uma checklist de validação de domínio/problema.
- Criar versões reduzidas do problema para isolar a causa do erro.

## Pré-requisitos
- Ter lido: [[01 - Visão Planners]].
- Recomendado: [[02 - Algoritmos de Busca]].

---

# 1) Três classes de problema (identifique antes de agir)

## 1.1) Parsing (entrada inválida)
Sinais:
- falha imediata
- mensagem de sintaxe/keyword/requirement

Ação:
- corrigir PDDL até o planner carregar sem erro

## 1.2) Insolúvel (modelagem/instância)
Sinais:
- planner termina dizendo “no plan” / “unsolvable”

Ação:
- investigar alcançabilidade do objetivo e consistência de estado

## 1.3) Complexidade (tempo/memória)
Sinais:
- roda muito, sem concluir, ou estoura limite

Ação:
- reduzir instância, melhorar modelagem, trocar configuração/heurística

---

# 2) Checklist de validação (antes de qualquer coisa)

Use esta lista como rotina. Ela evita perder tempo com hipóteses erradas.

## 2.1) Domínio vs problema
- O `(:domain ...)` do problema bate com o `(domain ...)` do domínio?
- Os nomes de predicados usados no problema existem no domínio?
- Os objetos usados nas ações do plano existem em `:objects`?

## 2.2) Estado inicial
- Os fatos essenciais para começar estão em `:init`?
- Não há contradições óbvias (por exemplo, “em A” e “em B” ao mesmo tempo sem modelagem que permita)?

## 2.3) Objetivo
- O objetivo pede fatos que podem ser produzidos por algum efeito?
- O objetivo pede fatos “em conjunto” que são incompatíveis pela dinâmica do domínio?

## 2.4) Ações
- Cada ação que deveria “avançar” realmente adiciona o fato esperado?
- Cada ação remove fatos antigos quando necessário (para manter consistência)?

---

# 3) Técnica principal: “problema mínimo reprodutível”

Quando um planner falha, reduza o caso até ficar pequeno:
- menos objetos
- menos metas
- menos conexões/itens no `:init`

Critério:
- a versão reduzida deve continuar exibindo o problema

O objetivo é isolar se o erro é:
- uma inconsistência lógica
- uma restrição excessiva
- uma explosão de combinações

---

# 4) Depurando insolubilidade (sem solução)

Perguntas guias:
- Existe alguma ação que possa gerar cada submeta do goal?
- Existe uma sequência “em palavras” que faria sentido no mundo?
- Alguma pré-condição impede o primeiro passo dessa sequência?

Técnica:
- selecione uma submeta e tente “voltar” quais ações poderiam produzi-la
- confira se as pré-condições dessa ação são alcançáveis a partir do `:init`

---

# 5) Depurando complexidade (timeout)

Sinais típicos de modelagem que pioram desempenho:
- ações muito genéricas (poucos filtros nas pré-condições)
- muitos objetos do mesmo tipo com papéis semelhantes (simetria)
- objetivo com muitas combinações possíveis antes de “fechar” a solução

Ações práticas:
- adicionar tipos e predicados que restrinjam instanciações
- reduzir objetos irrelevantes para a instância atual
- comparar duas configurações de busca/heurística

---

# 6) Logs e evidências (para não “depurar no escuro”)

Registre sempre:
- domínio e problema exatos usados
- comando com flags
- stdout/stderr
- plano (arquivo ou trecho do stdout)

Se você usar Python, organize isso em pastas por execução (aula `02 - Python/05`).

---

# 7) Exercícios

1) Você tem um problema que o planner declara “sem solução”.  
Liste 3 checagens que você faz antes de concluir que “o domínio está errado”.

2) Você tem um problema que só falha quando adiciona 30 objetos extras (irrelevantes).  
Explique por que isso pode piorar muito a busca mesmo sem “mudar o mundo”.

3) Crie um “plano de depuração” em 5 passos (uma lista numerada) que você aplicaria sempre.

### Gabarito sugerido
1) Verificar domínio referenciado; verificar se metas aparecem como efeitos de alguma ação; verificar se o estado inicial contém os fatos mínimos para iniciar; checar pré-condições críticas.  
2) Porque aumenta o grounding: mais combinações de parâmetros, mais ações instanciadas e, portanto, mais ramificação/estados exploráveis.  
3) Exemplo: (1) separar parsing vs insolúvel vs timeout; (2) validar consistência domínio/problema; (3) reduzir para caso mínimo; (4) inspecionar metas e ações que as produzem; (5) registrar evidências e comparar mudanças isoladas.

---

### 🚀 Desafio Final
Agora você tem todas as peças: modelagem, automação e ferramentas de diagnóstico. Mergulhe nos projetos avançados:
- **[[04 - Projetos/03 - Logística]]**
- **[[04 - Projetos/04 - Projeto Final]]**

---

### <- Aula anterior
[[04 - Fast Downward]]

### -> Próxima aula
Retorne ao módulo `04 - Projetos` para aplicar em domínios completos.
