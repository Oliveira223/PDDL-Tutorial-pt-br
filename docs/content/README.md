# Curso: PDDL + Python (PT-BR)

Este curso está organizado como uma trilha progressiva:
- **00 - Fundamentos**: modelo mental (declarativo, estado/ações/objetivo).
- **01 - PDDL**: como escrever domínios e problemas (sintaxe e modelagem).
- **02 - Python**: automação (ler/gerar PDDL, montar instâncias, integrar com planner).
- **03 - Planners**: como planners funcionam, algoritmos e heurísticas (para entender resultados).
- **04 - Projetos**: estudos de caso (domínios completos e variações).
- **exemplos**: arquivos de referência para testar planejamento.
- **exercicios**: listas de atividades guiadas e desafios.

## Pré-requisitos
- Lógica proposicional básica ajuda, mas não é obrigatória.
- Para a parte de Python: familiaridade com terminal e ambiente virtual (venv) ajuda.

## Como estudar (ordem sugerida)

### Trilha principal (PDDL básico)
1) `00 - Fundamentos/01 - Introdução PDDL`
2) `00 - Fundamentos/02 - Paradigma Declarativo`
3) `01 - PDDL/01 - Visão Geral`
4) `01 - PDDL/02 - Estrutura do Domínio`
5) `01 - PDDL/03 - Estrutura do Problema`
6) `01 - PDDL/04 - Predicados`
7) `01 - PDDL/05 - Ações`
8) `01 - PDDL/06 - Pré-condições`
9) `01 - PDDL/07 - Efeitos`
10) `01 - PDDL/08 - Tipos`
11) `01 - PDDL/09 - Restrições`
12) `01 - PDDL/10 - Exemplo Completo`

### Próximos módulos (o “depois do básico”)
- **02 - Python**: transformar o que você modelou em PDDL em um fluxo automatizado (gerar arquivos, validar, executar planners e interpretar planos).
- **03 - Planners**: entender por que um planner encontra (ou não encontra) planos, e como heurísticas afetam desempenho.
- **04 - Projetos**: aplicar em domínios clássicos (Blocksworld, Grid, Logística) e aprender padrões de modelagem.

## Ambiente (opções)

O curso funciona com duas abordagens. Recomenda-se começar pela opção 1 e migrar para a 2 quando quiser um fluxo mais “profissional”.

### Opção 1 — Planner online (mais simples)
Use um serviço online de planejamento (por exemplo, um editor/solver de PDDL em navegador) para:
- validar se domínio/problema “fazem sentido”
- obter um plano rapidamente para conferir a modelagem

Vantagens: zero instalação local.  
Limitações: menos controle sobre o planner e logs.

### Opção 2 — Planner local (mais completo)
Instale um planner local (como Fast Downward) para:
- ter controle de versões e configurações
- debugar casos em que “não encontra plano”
- usar integração com Python

Em Windows, a forma mais estável costuma ser usar WSL2 (Linux no Windows) para rodar planners.

## Exercícios (recomendação)
Os exercícios completos ficam em `exercicios/` e seguem uma progressão:
- **Básicos**: ler/editar domínio e problema, rodar um planner e interpretar o plano.
- **Intermediários**: expandir domínios, adicionar tipos, melhorar modelagem e depurar.
- **Desafios**: modelagem mais aberta, com restrições e variações.

Comece por: `exercicios/01 - Básicos`.
