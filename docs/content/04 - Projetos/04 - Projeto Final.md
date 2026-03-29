# Projeto Final: Operação de Armazém Automatizado

Este é o desafio final que consolida **tudo** o que você aprendeu: modelagem PDDL, automação com Python, execução de planners e análise de resultados.

## Objetivos de Aprendizagem
- Integrar todos os módulos do curso em um único pipeline.
- Criar um sistema de planejamento completo.
- Validar resultados reais com scripts Python.

---

## 1) O Cenário
Você é o engenheiro responsável por um armazém de e-commerce. O cenário inclui:
- **Prateleiras** com produtos.
- **Robôs** que podem carregar **bandejas**.
- **Estações de embalagem** onde os pedidos devem ser entregues.
- **Zonas de bateria** onde robôs podem carregar (opcional: use PDDL Avançado para modelar bateria).

## 2) Requisitos do Projeto
Seu projeto deve conter:
1. **Domínio PDDL**: Completo, com ações de `mover`, `pegar-bandeja`, `largar-bandeja`, etc.
2. **Gerador de Problemas (Python)**: Um script que receba o número de robôs, pedidos e tamanho do armazém e gere o `problem.pddl`.
3. **Runner de Planejamento (Python)**: Um script que invoque o planner (ex.: Fast Downward) e capture o plano gerado.
4. **Validador/Visualizador (Python)**: Um script que leia o arquivo de plano e imprima uma lista de passos legível ou uma estatística da execução (ex.: total de ações).

## 3) O Desafio
Modele um cenário onde:
- Existem 2 robôs e 4 pedidos em locais opostos do armazém.
- Os robôs devem cooperar para entregar tudo nas estações de embalagem no menor tempo possível.

---

## Estrutura do Projeto Final
Recomendamos a seguinte organização de arquivos:
- `domain.pddl`: O domínio do armazém.
- `generator.py`: O script Python que cria problemas.
- `planner_runner.py`: O script que executa o planner e salva o resultado.
- `main.py`: O script principal que orquestra todo o pipeline.

---

## Conclusão do Curso
Parabéns por chegar até aqui! Você agora domina o ciclo completo de planejamento automático com PDDL e sua integração com linguagens de programação modernas como Python.

### O que vem depois?
- Explore o módulo de [[05 - PDDL Avançado]] para aprender sobre tempo, bateria e custos.
- Tente aplicar esses conceitos em problemas reais de logística, robótica ou otimização de processos.

---

**Fim do Módulo de Projetos.**
