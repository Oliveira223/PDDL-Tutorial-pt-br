# Ambiente para Planners Locais (sem sustos)

Integrar PDDL com Python fica muito mais útil quando você consegue rodar um planner localmente. Porém, “instalar e operar um planner” pode ser a parte mais difícil para quem está começando. Esta aula desacelera essa etapa e organiza um caminho seguro.

O objetivo aqui não é escolher “o melhor planner”, e sim:
- preparar um ambiente mínimo de execução
- entender como rodar comandos de forma reproduzível
- evitar problemas comuns de caminhos, permissões e arquivos

## Objetivos de aprendizagem
- Entender o que precisa existir para rodar um planner local (executável + arquivos + terminal).
- Organizar pastas de projeto para evitar confusão de caminhos.
- Validar que o ambiente está pronto antes de integrar com Python.

## Pré-requisitos
- Ter lido: [[05 - Integração com Planner]].

---

# 1) O que significa “ter um planner local”

Você precisa de três itens:
1) Um **executável** (ou script) do planner
2) Um local com seus arquivos `domain.pddl` e `problem.pddl`
3) Um **terminal** onde o comando consegue ser executado

O planner pode rodar:
- no próprio sistema (Linux/macOS)
- em uma camada compatível (ex.: WSL2 no Windows)

O curso é agnóstico ao ambiente: o que importa é você conseguir rodar um comando e capturar saída.

---

# 2) Estrutura recomendada de pastas (para evitar erros)

Um layout simples e robusto:
- `domain.pddl`
- `problems/` (vários `*.pddl`)
- `runs/` (logs de execução)
- `plans/` (planos extraídos ou copiados)
- `scripts/` (scripts Python do curso)

A regra didática é: comandos devem ser executados sempre “a partir da pasta do projeto”, onde `domain.pddl` está visível.

---

# 3) Validação mínima do ambiente (antes de automatizar)

Antes de escrever código, valide manualmente:
- Você consegue rodar o planner com `--help` (ou equivalente)?
- Você consegue rodar uma instância pequena com domínio/problema?

Exemplo de checagem genérica:

```bash
planner --help
```

Se o seu planner tiver um comando específico (como Fast Downward), use esse.

Resultados esperados:
- o comando deve retornar com sucesso (exit code 0)
- o stdout deve mostrar ajuda/opções

---

# 4) Problemas comuns (e como resolver de forma sistemática)

## 4.1) “Command not found”
Significa que:
- o executável não está no PATH, ou
- você está chamando um nome diferente do correto

Soluções típicas:
- chamar com caminho relativo/absoluto (ex.: `./fast-downward.py`)
- ajustar PATH (quando fizer sentido)

## 4.2) “Arquivo não encontrado”
Significa que:
- o comando está rodando em um diretório diferente do que você pensa, ou
- os caminhos passados para domínio/problema estão errados

Solução didática:
- usar caminhos explícitos e organizar o `cwd` do comando
- evitar espaços e caracteres estranhos em nomes de pastas, quando possível

## 4.3) “Erro de parsing” no PDDL
Significa que:
- o PDDL tem sintaxe inválida, ou
- você declarou features em `:requirements` que o planner não suporta

Solução:
- reduzir o PDDL para um caso mínimo (um predicado e uma ação) e confirmar suporte

## 4.4) “No plan found”
Não é erro de execução. Pode ser:
- problema insolúvel, ou
- domínio incompleto, ou
- instância grande com configuração fraca

Solução:
- aplicar a metodologia de debug do módulo `03 - Planners`

---

# 5) Exercícios

1) Desenhe (em texto) uma estrutura de pastas para um domínio com 30 problemas e logs de execução.

2) Você está rodando um comando e recebe “arquivo não encontrado” para `domain.pddl`.  
Liste duas causas prováveis e duas correções.

3) Explique a diferença (em 2–3 linhas) entre:
- erro de parsing
- “no plan found”

### Gabarito sugerido
1) Exemplo: `domain.pddl`, `problems/`, `runs/`, `plans/`, `scripts/`.  
2) Causas: `cwd` errado; caminho relativo incorreto; arquivo com nome diferente. Correções: executar no diretório certo; passar caminho absoluto; padronizar nomes.  
3) Parsing é entrada inválida; “no plan found” é execução válida que não encontrou solução (por modelagem ou complexidade).

### <- Aula anterior
[[05 - Integração com Planner]]

### -> Próxima aula
[[07 - Runner real (Fast Downward e alternativas)]]
