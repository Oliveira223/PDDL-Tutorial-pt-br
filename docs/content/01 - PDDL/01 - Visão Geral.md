﻿# Visão Geral do PDDL

Em PDDL, um problema de planejamento é descrito por meio de **duas estruturas principais**: o **domínio** e o **problema**. Essa separação permite modelar as regras gerais de um ambiente de forma independente de situações específicas.

## Objetivos de aprendizagem
- Entender o papel do arquivo de domínio e do arquivo de problema.
- Identificar o que pertence ao domínio e o que pertence ao problema.
- Compreender o fluxo básico de uso de um planner.


---
# Estrutura do PDDL

Um problema de PDDL é composto por dois arquivos distintos:
- Domínio (arquivo de domínio)
- Problema (arquivo de problema)

Cada um possui uma responsabilidade bem definida dentro da modelagem.

### -> Domínio
O domínio descreve as **regras gerais do ambiente**. Ele define:
- Os **predicados** (propriedades do mundo)
- As **ações possíveis**
- As **condições** para execução dessas ações
- Os **efeitos** gerados por elas

Em outras palavras, o domínio representa tudo aquilo que é **válido em qualquer situação daquele sistema**.
Abordaremos mais profundamente esse assunto na aula [[02 - Estrutura do Domínio]].
### -> Problema
O problema descreve uma **instância específica** do domínio. Ele define:
- O **estado inicial** do sistema
- Os **objetos envolvidos**
- O **objetivo (goal)** a ser alcançado

Cada problema utiliza um domínio previamente definido.
Abordaremos mais profundamente esse assunto na aula [[03 - Problem Estrutura|03 - Estrutura do Problema]].

# Intuição (sem sintaxe)
Uma forma prática de pensar é:
- Domínio: “quais ações existem e como elas mudam o mundo?”
- Problema: “qual é o mundo inicial e qual estado eu quero alcançar?”

# Relação entre Domínio e Problema
A separação entre domínio e problema permite a **reutilização**.

Um mesmo domínio pode ser utilizado para resolver diferentes problemas, desde que todos compartilhem as mesmas regras.

Isso significa que o domínio define o "mundo", enquanto o problema define uma "situação dentro desse mundo".

# Fluxo de execução
O processo de planejamento segue, de forma geral, o seguinte fluxo de ações:
1. Definir o domínio 
2. Definir o problema
3. Executar o planner
4. Gerar o plano (sequências de ações).

O planner é responsável por encontrar uma sequência válida de ações que leve do estado inicial ao objetivo.

# Exercícios

1) Classifique cada item como “Domínio” ou “Problema”:
- Lista de ações possíveis.
- Objetivo a ser alcançado.
- Predicados disponíveis.
- Objetos existentes em uma instância.
- Estado inicial.

2) Em uma frase, explique por que a separação entre domínio e problema ajuda na reutilização.

### Gabarito sugerido
1) Domínio; Problema; Domínio; Problema; Problema.  
2) Porque o mesmo conjunto de regras (domínio) pode ser reaproveitado em várias instâncias (problemas) diferentes.

# Conclusão
A separação entre domínio e problema é uma das principais características do PDDL. Ela permite abstrair regras gerais e aplicá-las a múltiplos cenários, reduzindo a necessidade de redefinir comportamentos repetidamente.

# Observações importantes
- O domínio não depende de um problema específico.
- O problema sempre depende de um domínio.
- Erros na modelagem de qualquer um dos dois podem impedir a geração de um plano.

### <- Aula anterior
[[02 - Paradigma Declarativo]]

### -> Próxima aula
[[02 - Estrutura do Domínio]]


