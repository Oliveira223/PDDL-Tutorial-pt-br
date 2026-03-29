# Curso: PDDL + Python (PT-BR)

Este curso está organizado como uma trilha progressiva:
- **00 - Fundamentos**: modelo mental (declarativo, estado/ações/objetivo).
- **01 - PDDL**: como escrever domínios e problemas (sintaxe e modelagem).
- **02 - Python**: automação (ler/gerar PDDL, montar instâncias, integrar com planner).
- **03 - Planners**: como planners funcionam, algoritmos e heurísticas (para entender resultados).
- **04 - Projetos**: estudos de caso (domínios completos e variações).
- **05 - PDDL Avançado (Opcional)**: extensões comuns (tempo, numéricos, otimização) e compatibilidade.
- **exemplos**: arquivos de referência para testar planejamento.
- **exercicios**: listas de atividades guiadas e desafios.

## Pré-requisitos
- Lógica proposicional básica ajuda, mas não é obrigatória.
- Para a parte de Python: familiaridade com terminal e ambiente virtual (venv) ajuda.

## Como estudar (ordem sugerida)

O curso pode ser seguido como uma trilha única, mas para reduzir “saltos grandes” ele também oferece trilhas explícitas por objetivo.

### Trilha 1 — Essencial (planejamento + PDDL básico)
Objetivo: aprender a modelar domínios/problemas e entender planos.
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

### Trilha 2 — Automação (Python)
Objetivo: transformar PDDL em um fluxo repetível e automatizado.
1) `02 - Python/01 - Visão Python`
2) `02 - Python/02 - Leitura PDDL`
3) `02 - Python/03 - Criação de Domínios`
4) `02 - Python/04 - Manipulação de Problemas`
5) `02 - Python/05 - Integração com Planner`
6) `02 - Python/06 - Ambiente para Planners Locais`
7) `02 - Python/07 - Runner real (Fast Downward e alternativas)`
8) `02 - Python/08 - Parsing e validação de planos`

### Trilha 3 — Operação e diagnóstico (Planners)
Objetivo: operar planners com segurança e depurar quando falhar.
1) `03 - Planners/01 - Visão Planners`
2) `03 - Planners/02 - Algoritmos de Busca`
3) `03 - Planners/03 - Heurísticas`
4) `03 - Planners/04 - Fast Downward`
5) `03 - Planners/05 - Debug de Planejamento`

### Trilha 4 — Projetos (aplicação)
Objetivo: consolidar modelagem em domínios completos.
- `04 - Projetos/*` (Blocksworld, Grid, Logística, Projeto Final)

### Trilha 5 — Avançada (opcional)
Objetivo: aprender extensões comuns e compatibilidade entre planners.
- `05 - PDDL Avançado/*` (tempo, fluents numéricos, métrica, efeitos condicionais, quantificação)

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
