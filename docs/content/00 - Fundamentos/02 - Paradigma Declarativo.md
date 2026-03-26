# Paradigma Declarativo

Um paradigma de programação é um modelo de pensar e estruturar soluções computacionais. Ele influencia como o código é organizado, como problemas são representados e como se entende a execução.

O PDDL utiliza o **paradigma declarativo**: o foco está em **descrever o que deve ser alcançado**, e não **como** alcançar (como ocorre no paradigma imperativo). Em vez de definir uma sequência de instruções, o desenvolvedor especifica propriedades, regras e objetivos, deixando a execução a cargo de um mecanismo externo (por exemplo, um planner).

## Objetivos de aprendizagem
- Compreender o que caracteriza o paradigma declarativo.
- Comparar, em alto nível, abordagens declarativas e imperativas.
- Relacionar a ideia de “descrição” ao uso de PDDL.

---
# Definição
No paradigma declarativo, um programa é composto por **declarações** que descrevem relações, restrições e estados desejados. A lógica de execução não é explicitamente definida pelo programador, mas sim inferida por um sistema que interpreta essas declarações.

Esse modelo contrasta diretamente com o paradigma imperativo, no qual o programador controla explicitamente o fluxo de execução por meio de comandos sequenciais.

# Funcionamento
Em abordagens declarativas, o problema é modelado em termos de:
- Fatos: o que é verdadeiro.
- Regras: como os fatos se relacionam.
- Objetivos: o que se deseja alcançar.

A partir dessas definições, um **mecanismo de inferência** (como um planner, no caso do PDDL) é responsável por determinar os passos necessários para atingir o objetivo.

# Exemplo Conceitual
Considere o problema de encontrar números pares em uma lista.

##### Imperativo (Python)
```python
pares = []
for n in lista:
    if n % 2 == 0:
        pares.append(n)
```

##### Declarativo (Ideia)
```
pares = {n | n é par}
```

No segundo caso, não há descrição de como iterar ou filtrar, apenas da propriedade que define o resultado.

# Relação com PDDL

PDDL é uma linguagem declarativa porque o desenvolvedor não especifica o algoritmo de solução. Em vez disso, ele descreve:
- O estado inicial do problema
- As ações possíveis e suas regras
- O objetivo desejado

A partir dessa descrição, um planner é responsável por encontrar uma sequência válida de ações.

Isso significa que, ao trabalhar com PDDL, o principal desafio não é implementar algoritmos, mas sim **modelar corretamente o problema**.


# Implicações práticas
O uso do paradigma declarativo traz algumas consequências importantes.

A modelagem passa a ser o ponto central do desenvolvimento. Uma descrição inadequada pode tornar o problema insolúvel, mesmo que exista uma solução válida. Além disso, o comportamento do sistema depende fortemente do mecanismo de inferência utilizado, o que pode tornar o processo menos previsível para iniciantes.

Por outro lado, esse paradigma permite lidar com problemas complexos de forma mais abstrata, reduzindo a necessidade de implementar manualmente algoritmos de busca ou otimização.

## Exercícios

1) Em uma frase, explique a diferença entre “declarar” e “implementar um algoritmo”.

2) Marque V (verdadeiro) ou F (falso):
- ( ) Em um modelo declarativo, o programador descreve o fluxo de execução detalhado.
- ( ) Em PDDL, o planner é responsável por encontrar uma sequência de ações.
- ( ) A qualidade da modelagem influencia diretamente se um plano será encontrado.

### Gabarito sugerido
1) Declarar é especificar propriedades/objetivos e restrições; implementar um algoritmo é descrever passos e controle de fluxo para produzir o resultado.  
2) F, V, V.

### -> Próxima aula
[[01 - Visão Geral]]

