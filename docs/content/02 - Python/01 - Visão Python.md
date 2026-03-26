# Visão Python (Automação de PDDL)

Até aqui, você aprendeu a modelar domínios e problemas em PDDL. A partir deste módulo, o objetivo é usar **Python** para transformar PDDL em um fluxo repetível:
- gerar instâncias de problema em lote
- validar consistência básica (nomes, aridade, arquivos presentes)
- executar planners e coletar planos automaticamente
- organizar experimentos (múltiplas variações do mesmo domínio)

## Objetivos de aprendizagem
- Entender por que Python é útil no ciclo de planejamento.
- Reconhecer os principais “pontos de automação” em PDDL.
- Preparar um ambiente mínimo para rodar scripts e organizar arquivos.

## Pré-requisitos
- Ter concluído o módulo `01 - PDDL` (especialmente `10 - Exemplo Completo`).
- Ter feito pelo menos um exercício prático em `exercicios/` (planner online ou local).

---

# 1) Por que usar Python com PDDL

## 1.1) Repetição é inevitável em PDDL
Em projetos reais, você raramente resolve “um” problema. Normalmente você tem:
- um domínio fixo
- dezenas/centenas de instâncias (problemas) com objetos e `:init` diferentes
- necessidade de comparar resultados (plano encontrado, tamanho do plano, tempo)

Escrever e gerenciar essas instâncias manualmente vira um gargalo. Python entra para automatizar.

## 1.2) O ciclo completo (manual vs automatizado)

### Manual (didático, mas lento)
1) editar `domain.pddl` e `problem.pddl`
2) rodar um planner
3) ler a saída e corrigir
4) repetir

### Automatizado (com Python)
1) gerar/alterar `problem.pddl` via script (ou gerar vários)
2) executar planner via subprocesso
3) capturar plano e logs
4) registrar resultados em arquivos/pastas

# 2) O que exatamente Python vai fazer
Neste curso, a automação será organizada em três frentes:
- **Leitura**: carregar PDDL (ou inspecionar texto) para identificar predicados, ações e objetos.
- **Geração**: criar problemas parametrizados (por exemplo, “Grid 10x10”, “Blocksworld com N blocos”).
- **Integração**: chamar um planner local (ou usar uma ferramenta) e coletar o plano.

Mesmo quando não usamos um parser completo, Python já ajuda muito com:
- organização de diretórios (domínio único, vários problemas)
- templates de problemas
- validações simples (arquivo existe, cabeçalhos corretos, nomes consistentes)

# 3) Estrutura de diretórios recomendada (para experimentos)
Uma estrutura prática é:
- `domain.pddl` (fixo)
- `problems/` (vários `problem-*.pddl`)
- `plans/` (saídas do planner)
- `runs/` (logs e métricas)

Você pode replicar essa lógica dentro de `exemplos/` quando começar a automatizar.

# 4) Ambiente mínimo (Python)

## 4.1) Python e venv
O caminho recomendado é usar um ambiente virtual por projeto:

```bash
python -m venv .venv
```

Ativar (Windows PowerShell):

```powershell
.\.venv\Scripts\Activate.ps1
```

Ativar (Linux/macOS):

```bash
source .venv/bin/activate
```

## 4.2) Dependências
Neste ponto do curso, não vamos assumir bibliotecas específicas. Primeiro vamos aprender o fluxo com Python “puro” e, se necessário, introduzir um parser depois.

# 5) Exercícios

1) Explique, em 2–4 linhas, qual parte do seu processo com PDDL hoje é mais repetitiva e como Python poderia ajudar.

2) Esboce uma estrutura de pastas para um domínio com 20 problemas diferentes e a saída de seus planos.

### Gabarito sugerido
1) Resposta varia. O esperado é mencionar geração de instâncias, execução repetida do planner, coleta de planos/logs e comparação de resultados.  
2) Exemplo: `domain.pddl`, `problems/`, `plans/`, `runs/` (ou similar), com nomes consistentes.

### <- Aula anterior
[[01 - PDDL/10 - Exemplo Completo]]

### -> Próxima aula
[[02 - Leitura PDDL]]
