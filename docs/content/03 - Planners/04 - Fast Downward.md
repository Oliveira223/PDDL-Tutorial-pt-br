# Fast Downward (uso prático e integração)

Fast Downward é uma das ferramentas mais usadas para planejamento clássico em PDDL. Esta aula apresenta um caminho gradual para:
- executar o planner localmente
- entender o que ele imprime
- coletar o plano e logs
- preparar integração com Python

## Objetivos de aprendizagem
- Rodar Fast Downward em linha de comando com domínio e problema.
- Reconhecer as principais formas de configuração (aliases e `--search`).
- Identificar onde o plano é salvo e como coletar evidências de execução.

## Pré-requisitos
- Ter lido: [[01 - Visão Planners]].
- Recomendado: [[02 - Python/05 - Integração com Planner]].

---

# 1) Instalação (visão geral por sistema)

Fast Downward é um projeto grande e o modo de instalar varia. O objetivo aqui é orientar um caminho estável sem travar o curso em detalhes de um sistema específico.

## 1.1) Linux
Em Linux, costuma ser possível clonar e compilar o Fast Downward localmente. A forma exata depende da distribuição e das dependências disponíveis.

## 1.2) Windows
Em Windows, uma abordagem comum e estável é rodar o planner no WSL2 (Linux dentro do Windows). Isso evita problemas de build nativo e compatibilidade de ferramentas.

## 1.3) macOS
Em macOS, também é possível compilar, mas pode exigir ajustes em toolchain. A recomendação é seguir as instruções oficiais do projeto.

Observação didática: o curso não exige que você compile o planner “do zero” agora. O que importa é aprender a operar a ferramenta quando ela estiver disponível.

---

# 2) Como rodar (padrões de comando)

Em geral, você executa o script principal do Fast Downward passando:
- arquivo de domínio
- arquivo de problema
- configuração de busca/heurística

Exemplo genérico (com alias):

```bash
./fast-downward.py domain.pddl problem.pddl --alias seq-sat-lama-2011
```

Exemplo genérico (com `--search`):

```bash
./fast-downward.py domain.pddl problem.pddl --search "astar(lmcut())"
```

O ponto importante:
- `--alias` é um “preset” (bom para começar)
- `--search` dá controle fino (bom para aprender e comparar)

---

# 3) Onde está o plano?

Há duas possibilidades comuns:
- o planner imprime o plano no stdout (às vezes com estatísticas misturadas)
- o planner salva o plano em um arquivo no diretório atual

No Fast Downward, é comum aparecer um arquivo chamado `sas_plan` (ou variações). Por isso, um pipeline robusto costuma:
- salvar stdout/stderr sempre
- verificar se um arquivo de plano foi gerado

---

# 4) Interpretando resultados (sem pânico)

## 4.1) “Solution found”
Significa que um plano foi encontrado. O que você faz:
- localizar o plano (stdout ou arquivo)
- verificar se as ações fazem sentido
- registrar a execução (para reproduzir depois)

## 4.2) “No solution”
Não implica “o planner é ruim”; na prática, significa:
- o problema é insolúvel com o domínio atual, ou
- a configuração escolhida não achou solução no limite de recursos, ou
- o problema usa features que essa configuração/planner não suporta

## 4.3) Erros de parsing
Geralmente indicam:
- PDDL inválido
- `:requirements` declaradas mas não suportadas

---

# 5) Exercícios

1) Qual a diferença prática entre usar `--alias` e `--search`?

2) Você vai integrar o Fast Downward com Python. Liste 4 arquivos/artefatos que você registraria por execução.

3) Você rodou o planner e não viu o plano no stdout.  
Quais duas ações você faria para localizar o plano?

### Gabarito sugerido
1) `--alias` escolhe um preset; `--search` define explicitamente a estratégia (busca/heurística), permitindo comparação e controle.  
2) Domínio, problema, stdout/stderr, arquivo de plano (se existir), comando executado, tempo/limites.  
3) Procurar arquivo de plano gerado no diretório; revisar stdout/stderr buscando indicação do caminho/nome do plano.

### <- Aula anterior
[[03 - Heurísticas]]

### -> Próxima aula
[[05 - Debug de Planejamento]]
